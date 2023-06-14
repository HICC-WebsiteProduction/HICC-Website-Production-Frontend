const InputMemberValidInfo = {
  ID: {
    validPattern: /^[A-Z][0-9]{6}$/,
  },
  PW: {
    validPattern:
      /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}|(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/,
  },
  nickname: {
    validPattern: /^[가-힣|a-z|A-Z|0-9|].{3,}$/,
  },
  koreanName: {
    validPattern: /^[가-힣]+$/,
  },
  studentID: {
    validPattern: /^[0-9]{2}$/,
  },
  call: {
    validPattern: /^010-[0-9]{4}-[0-9]{4}$/,
  },
};

export default InputMemberValidInfo;
