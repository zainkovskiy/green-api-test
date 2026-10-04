import moment from 'moment';
import { useMemo } from 'react';

interface DateSeparateProps {
  date: string;
}

const DateSeparator = ({ date }: DateSeparateProps) => {
  const label = useMemo(() => {
    const momentDate = moment(date);
    if (momentDate.isSame(moment(), 'day')) {
      return 'Сегодня';
    } else if (momentDate.isSame(moment().subtract(1, 'day'), 'day')) {
      return 'Вчера';
    }
    return momentDate.format('DD.MM.YYYY');
  }, [date]);

  return (
    <div className='bg-white px-2 border-1 border-on-primary py-1 text-gray-500 text-xs rounded-md'>
      {label}
    </div>
  );
};

export default DateSeparator;
