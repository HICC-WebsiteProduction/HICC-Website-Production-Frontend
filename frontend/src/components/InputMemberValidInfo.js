const InputMemberValidInfo = {
  ID: {
    validPattern: /^[A-Z][0-9]{6}$/,
    invalidPatternWarning: '알파벳 1자리, 숫자 6자리로 입력이 가능합니다.',
  },
  PW: {
    validPattern:
      /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}|(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/,
    invalidPatternWarning:
      '문자,숫자,특수문자 2자리 조합 10자리 이상 또는 3가지 조합 8자리 이상으로 입력이 가능합니다.',
  },
  nickname: {
    validPattern: /^[가-힣|a-z|A-Z|0-9|].{3,}$/,
    invalidPatternWarning:
      '한글, 영어대소문자, 숫자로 이루어진 4~16자리로 입력이 가능합니다.',
  },
  koreanName: {
    validPattern: /^[가-힣]+$/,
    invalidPatternWarning: '한글로 이루어진 2~7자리로 입력이 가능합니다.',
  },
  studentID: {
    validPattern: /^[0-9]{2}$/,
    invalidPatternWarning: '숫자로 이루어진 2자리로 입력이 가능합니다. ex) 23',
  },
  grade: {
    validPattern: /^[1-5]$/,
    invalidPatternWarning:
      '숫자로 이루어진 1자리로 (1~5) 입력이 가능합니다. ex) 1',
  },
  call: {
    validPattern: /^010-[0-9]{4}-[0-9]{4}$/,
    invalidPatternWarning: '010-xxxx-xxxx형식으로 입력이 가능합니다.',
  },
};

export default InputMemberValidInfo;
