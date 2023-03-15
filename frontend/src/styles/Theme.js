const pixelToRem = size => `${size / 16}rem`;

const fontSizes = {
  title: pixelToRem(28),
  paragraph: pixelToRem(18),
  font_normal: pixelToRem(16),
  font_small: pixelToRem(12),
  font_micro: pixelToRem(10),
};

const fontWeight = {
  // 나눔바른고딕체를 사용합니다.
  ExtraLight: 'NanumBarunGothicExtraLight',
  Light: 'NanumBarunGothicLight',
  Regular: 'NanumBarunGothic',
  Bold: 'NanumBarunGothicBold',
};

const margin = {
  margin_browser: pixelToRem(32),
  margin_content: pixelToRem(20),
  margin_component: pixelToRem(25),
};

const colors = {
  white: '#ffffff',
  white_grey: '#f2f2f2',
  black: '#000000',
  red: '#ff0000',
  blue: '#2d9cdb',
  grey: '#989898',
  light_grey: '#a8a8a8',
  very_light_gray: '#ddd',
  chinese_silver: '#ccc',
};

const flexbox = {
  flex: `
    display: flex;
    align-items: center;
  `,
  flexColumn: `
    display: flex;
    flex-direction: column;
  `,
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

const theme = {
  fontSizes,
  fontWeight,
  colors,
  flexbox,
  margin,
};

export default theme;
