export const LockerStatusMent = status => {
  if (status === 'rented') return '대여 중';
  if (status === 'waiting') return '승인 대기 중';
  if (status === 'under_maintenance') return '대여 불가능';
  if (status === 'myRent') return '내가 대여';
  if (status === 'available') return '대여 가능';
};

export const UmbrellaStatusMent = status => {
  if (status === 'rented') return '대여 중';
  if (status === 'under_maintenance') return '도난';
  if (status === 'lost') return '분실';
  if (status === 'myRent') return '내가 대여';
  if (status === 'available') return '대여 가능';
};
