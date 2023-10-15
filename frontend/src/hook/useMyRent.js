import { useEffect, useState } from 'react';

// 내가 대여한 것이 있는지를 체크하는 커스텀 훅
function useMyRent(rentStatus, myName) {
  // rentStatus: 서버에서 가져온 값
  // myName: 내 이름
  const [myRent, setMyRent] = useState([]);

  useEffect(() => {
    function checkMyRent() {
      if (rentStatus === null || rentStatus === undefined) return [];

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

    setMyRent(checkMyRent());
  }, [myName, rentStatus]);

  return myRent;
}

export default useMyRent;
