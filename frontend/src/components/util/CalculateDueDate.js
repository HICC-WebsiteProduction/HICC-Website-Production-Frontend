import { formatDistanceToNow, parse } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

// 남은 시간, 분, 초를 계산해서 반환해주는 함수
// 정확하지 않아 수정해줌
function calculateDueDate(dueDate) {
  const date = formatDistanceToNow(
    utcToZonedTime(
      parse(dueDate, 'yyyy/MM/dd HH:mm:ss', new Date()),
      'Asia/Seoul',
      {
        unit: '초' | '분' | '시간' | '일' | '개월' | '년',
      },
    ),
  );
  return date;
}

export default calculateDueDate;
