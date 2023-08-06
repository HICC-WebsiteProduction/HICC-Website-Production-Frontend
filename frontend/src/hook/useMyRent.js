// 내가 대여한 것이 있는지를 체크하는 커스텀 훅
function useMyRent() {
  // rentStatus: 서버에서 가져온 값
  // myName: 내 이름
  function checkMyRent(rentStatus, myName) {
    const isMyRent = rentStatus.find(item => item.lender === myName);

    if (isMyRent !== undefined) {
      const rentListIncludeMyRent = rentStatus.map(item => {
        if (item.lender === myName) {
          return {
            ...item,
            status: 'myRent',
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

  return checkMyRent;
}

export default useMyRent;
