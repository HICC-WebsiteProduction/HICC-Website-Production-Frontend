// 컨펌에서 띄울 메시지를 여기에 정의
// 지금 직접 임의로 작성해놓은 것이 있으나
// 내용이 확정되면 이 곳으로 옮길 예정

// gradeChange 랜덤 보여주기는 다음에 적용해보자
const ConfirmMessage = {
  noPermission:
    '세상에 아직 권한이 없군요.. \n조금만 기다려보자구요.. 일할거에요..',
  duplicateCheck: [
    '어머낫 중복이라는데..\n 좀 더 참신한 아이디어는..?',
    '오. 단박에 성공한 당신.\n센스가 만점인걸요?',
  ],
  alreadyUsed: '아앗.. 어쩌죠..?\n이미 사용중이에요..ㅜㅜ',
  rentUmbrella: '빌리고 싶은 당신..\n반납할 생각이 있으시긴 한거죠?',
  gradeChange: {
    title: '[등급 수정] 내용을 저장하시겠습니까?',
    body: '후회 안하실거죠?\n책임 안집니다?',
  },
  getOutMember: {
    title: '강퇴하시겠습니까?',
    body: '당신의 선택...\n달게 받겠습니다...................\n조금... 슬플지도...?',
  },
  denyMembership: {
    title: '[승인 거부] 하시겠습니까?',
    body: `왜...왜..요?
  당신의 선택으로
  예비동아리원이 한 명 줄었습니다^^`,
  },
  approveMembership: {
    title: '[승인 허가] 하시겠습니까?',
    body: `당신의 선택...\n후회하지 않을 자신 있으십니까?`,
  },
  saveState: {
    title: '변경 사항을 저장하시겠습니까?',
    body: '실수하신 부분은 없으신 거 맞죠?\n꼼꼼히 확인 하셨을거라 믿습니다.',
  },
  returnItem: {
    title: '정말 반납하시겠습니까?',
    body: '반납 처리 완료 시 되돌릴 수 없습니다.',
  },
  rentItem: {
    title: '정말 대여하시겠습니까?',
    body: '대여 신청 완료 시 되돌릴 수 없습니다.',
  },
};

export default ConfirmMessage;
