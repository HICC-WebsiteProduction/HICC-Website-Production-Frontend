import moment from 'moment';

// https://devbirdfeet.tistory.com/269
function calculateDueDate(dueDate) {
  if (dueDate === undefined) {
    return '';
  }

  const today = moment();
  const postingDate = moment(dueDate);
  const dayDiff = postingDate.diff(today, 'days');
  const hourDiff = postingDate.diff(today, 'hours');
  const minutesDiff = postingDate.diff(today, 'minutes');

  if (dayDiff === 0 && hourDiff === 0) {
    // 작성한지 1시간도 안지났을때
    return `${Math.ceil(-minutesDiff)}분 전`;
  }

  if (dayDiff === 0 && hourDiff <= 24) {
    // 작성한지 1시간은 넘었지만 하루는 안지났을때,
    return `${Math.ceil(-hourDiff)}시간 전`; // '시간'으로 표시
  }

  return `${-dayDiff}일 전`; // '일'로 표시
}

export default calculateDueDate;
