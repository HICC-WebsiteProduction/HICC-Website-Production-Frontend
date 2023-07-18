function calculateDueDate(dueDate) {
  const now = new Date();
  const time = new Date(Date.parse(dueDate));
  const diff = time - now;
  if (diff < 3600000) {
    return `${parseInt(diff / (1000 * 60))}분`;
  } else if (diff < 216000000) {
    return `${parseInt(diff / (1000 * 60 * 60))}시간`;
  } else {
    return `${parseInt(diff / (1000 * 60 * 60 * 24))}일`;
  }
}

export default calculateDueDate;
