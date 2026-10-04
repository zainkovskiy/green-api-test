import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteNotification,
  getChatHistory,
  getContactInfo,
  receiveNotification,
} from '@/actions/chat';
import { useGlobalStore } from '@/hooks/use-global-provider';
import type { ChatMessage } from '@/types/chat';

export const useChat = () => {
  const queryClient = useQueryClient();

  const { idInstance, apiTokenInstance, phone } = useGlobalStore(
    (store) => store,
  );

  const hasChatData = !!idInstance && !!apiTokenInstance && !!phone;

  const historyQuery = useQuery({
    queryKey: ['chat-history', idInstance, phone],
    queryFn: () =>
      getChatHistory({
        idInstance: idInstance!,
        apiTokenInstance: apiTokenInstance!,
        phone: phone!,
      }),
    enabled: hasChatData,
  });

  const contactQuery = useQuery({
    queryKey: ['contact-info', idInstance, phone],
    queryFn: () =>
      getContactInfo({
        idInstance: idInstance!,
        apiTokenInstance: apiTokenInstance!,
        phone: phone!,
      }),
    enabled: hasChatData,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!hasChatData) return;

    let isActive = true;

    const receiveMessages = async () => {
      while (isActive) {
        try {
          const notification = await receiveNotification({
            idInstance: idInstance!,
            apiTokenInstance: apiTokenInstance!,
          });

          if (!notification) {
            continue;
          }

          const { receiptId, body } = notification;

          const isIncoming = body.typeWebhook === 'incomingMessageReceived';

          const isOutgoing =
            body.typeWebhook === 'outgoingAPIMessageReceived' ||
            body.typeWebhook === 'outgoingMessageReceived';

          const textMessage =
            body.messageData?.textMessageData?.textMessage ??
            body.messageData?.extendedTextMessageData?.text;

          if ((isIncoming || isOutgoing) && textMessage) {
            const message: ChatMessage = {
              type: isIncoming ? 'incoming' : 'outgoing',
              idMessage: body.idMessage,
              timestamp: body.timestamp,
              typeMessage: body.messageData.typeMessage,
              chatId: body.senderData.chatId,
              textMessage,
            };

            queryClient.setQueryData<ChatMessage[]>(
              ['chat-history', idInstance, phone],
              (messages = []) => {
                const exists = messages.some(
                  (item) => item.idMessage === message.idMessage,
                );

                if (exists) {
                  return messages;
                }

                return [message, ...messages];
              },
            );
          }

          await deleteNotification({
            idInstance: idInstance!,
            apiTokenInstance: apiTokenInstance!,
            receiptId,
          });
        } catch (error) {
          console.error(error);
          break;
        }
      }
    };

    receiveMessages();

    return () => {
      isActive = false;
    };
  }, [hasChatData, idInstance, apiTokenInstance, phone, queryClient]);

  return {
    messages: historyQuery.data?.toReversed() ?? [],
    contact: contactQuery.data,
    isLoadingHistory: historyQuery.isLoading,
    isLoadingContact: contactQuery.isLoading,
    isError: historyQuery.isError || contactQuery.isError,
  };
};
