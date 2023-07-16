const Regex = {
  ID: {
    pattern: /^[A-Z][0-9]{6}$/,
  },
  PW: {
    pattern:
      /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}|(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/,
  },
  nickname: {
    pattern: /^([가-힣a-zA-Z0-9]){3,}$/,
  },
  koreanName: {
    pattern: /^[가-힣]+$/,
  },
  major: {
    pattern: /^([가-힣]){3,14}$/,
  },
  call: {
    pattern: /^010-[0-9]{4}-[0-9]{4}$/,
  },
};

export default Regex;
