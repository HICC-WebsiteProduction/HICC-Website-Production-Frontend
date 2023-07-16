function useMyRent(rentStatus, myName) {
  if (!Array.isArray(rentStatus)) return;
  if (typeof myName !== 'string') return;

  const checkMyRent = rentStatus.find(item => item.lender === myName);

  if (checkMyRent !== undefined) {
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

export default useMyRent;
