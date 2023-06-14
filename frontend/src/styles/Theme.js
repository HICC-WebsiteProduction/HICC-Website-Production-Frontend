const fontSizes = {
  title: '40px',
  label: '24px',
  paragraph: '18px',
  font_normal: '16px',
  font_small: '12px',
  font_micro: '10px',
};

const margin = {
  margin_browser: '32px',
  margin_content: '20px',
  margin_component: '36px',
};

const colors = {
  white: '#EDF0F8',
  white_grey: '#f2f2f2',
  black: '#000000',
  red: '#FF3D00',
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
  colors,
  flexbox,
  margin,
};

export default theme;
