// 컨펌에서 띄울 메시지를 여기에 정의
// 지금 직접 임의로 작성해놓은 것이 있으나
// 내용이 확정되면 이 곳으로 옮길 예정
const ConfirmMessage = {
  noPermission:
    '세상에 아직 권한이 없군요.. \n조금만 기다려보자구요.. 일할거에요..',
  duplicateCheck: [
    '어머낫 중복이라는데..\n 좀 더 참신한 아이디어는..?',
    '오. 단박에 성공한 당신.\n센스가 만점인걸요?',
  ],
  alreadyUsed: '아앗.. 어쩌죠..?\n이미 사용중이에요..ㅜㅜ',
  rentUmbrella: '빌리고 싶은 당신..\n반납할 생각이 있으시긴 한거죠?',
  membershipApproval:
    '가입을 거부/승인하시겠습니까?!!!!!\n진짜? 정말? 후회 없죠?',
  gradeChange: '이 결정...\n후회하지 않을 자신 있습니까..?',
  getOutMember: '저에게 죄가 있다면..\n달게 받는 수밖에....',
  denyMembership: {
    title: '[승인 거부] 하시겠습니까?',
    body: `왜...왜..요?
  당신의 선택으로
  예비동아리원이 한 명 줄었습니다^^`,
  },
  approveMembership: `당신의 선택...
  후회하지 않을 자신 있으십니까?`,
};

export default ConfirmMessage;
