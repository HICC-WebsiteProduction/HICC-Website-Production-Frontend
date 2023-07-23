import calculateDueDate from './../components/util/CalculateDueDate';

// 알림에서 타입 별 고정메시지
export const notificationMessage = (type, payload) => {
  if (type === 'board') {
    return `${payload.nickname}님이 내 글에 댓글을 달았습니다.`;
  }

  if (type === 'schedule') {
    return `${payload.scheduleName}까지 D-${calculateDueDate(
      payload.dueDate,
    )} 남았습니다.`;
  }

  if (type === 'rent') {
    return `${payload.rentItem}반납일까지 D-${calculateDueDate(
      payload.dueDate,
    )} 남았습니다.`;
  }
};
