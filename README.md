# GREEN-API WhatsApp Chat

Простой одностраничный чат на React с интеграцией GREEN-API.

Приложение позволяет:

- авторизоваться через GREEN-API
- подключить WhatsApp через QR-код
- выбрать номер абонента
- загрузить историю сообщений
- отправлять сообщения
- получать новые сообщения

## Demo

https://zainkovskiy.github.io/green-api-test/

## Стек

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- TanStack Query
- React Hook Form
- GREEN-API

## Требования

Для запуска проекта необходимы:

- Node.js 22+
- npm
- аккаунт GREEN-API
- созданный instance

## Установка и запуск

```bash
git clone https://github.com/zainkovskiy/green-api-test.git
cd green-api-test
npm install
npm run dev
```

После запуска Vite покажет адрес приложения:

```text
http://localhost:5173
```

## Использование

1. Введите `idInstance`.
2. Введите `apiTokenInstance`.
3. Нажмите **Продолжить**.
4. Если instance не авторизован, отсканируйте QR-код через WhatsApp.
5. После успешной авторизации введите номер абонента.
6. После этого откроется чат с выбранным пользователем.

## GREEN-API

Для работы приложения необходимы:

```text
idInstance
apiTokenInstance
```

Их можно получить в личном кабинете GREEN-API после создания instance.

Instance должен быть авторизован в WhatsApp.
