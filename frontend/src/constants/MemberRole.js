// 멤버 등급 enum
export const memberRole = {
  PRESIDENT: '회장',
  EXECUTIVE: '운영진',
  GENERAL: '일반',
  GRADUATE: '졸업생',
  GUEST: '승인대기자',
};

// 멤버 등급 우선순위 => 정렬을 할 때 사용
export const rolePriority = {
  PRESIDENT: 1,
  EXECUTIVE: 2,
  GENERAL: 3,
  GRADUATE: 4,
  GUEST: 5,
};