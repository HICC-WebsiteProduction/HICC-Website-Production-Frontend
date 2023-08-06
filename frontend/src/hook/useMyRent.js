function useMyRent() {
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
