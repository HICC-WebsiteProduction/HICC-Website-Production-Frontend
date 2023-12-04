// rentStatus: 서버에서 가져온 값
// myName: 내 이름
function checkMyRent(rentStatus, myName) {
  if (rentStatus === null) return;

  const isMyRent = rentStatus
    .filter(item => item.member !== null)
    .find(item => item.member.nickname === myName);

  if (isMyRent !== undefined) {
    const rentListIncludeMyRent = rentStatus.map(item => {
      if (item.id === isMyRent.id) {
        return {
          ...item,
          rentalStatus: 'myRent',
        };
      } else {
        return item;
      }
    });
    return rentListIncludeMyRent;
  } else {
    return rentStatus;
  }
}

export default checkMyRent;
