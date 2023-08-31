const fontSizes = {
  title: '40px',
  subtitle: '32px',
  tab: '30px',
  calendar: '25px',
  label: '24px',
  paragraph: '20px',
  navigation_menu: '18px',
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
  black: '#2c2c33',
  pureBlack: '#000000',
  red: '#FF3D00',
  blue: '#4EA1D3',
  grey: '#B3B3B3',
  light_grey: '#a8a8a8',
  very_light_gray: '#ddd',
  chinese_silver: '#ccc',
  purple: '#9747FF',
  cancleRed: '#FF8764',
  green: '#3CDA5B',
  darkblack: '#1E1E1E',
  lightgray: 'rgba(44, 44, 51, 0.20)',
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

const componentSize = {
  maxWidth: '1200px',
};

const itemColorByState = {
  background: {
    rent: 'transparent',
    unrent: colors.white,
    myRent: colors.white,
    waiting: colors.white,
    unavailable: 'transparent',
  },
  number: {
    rent: colors.white,
    unrent: colors.black,
    myRent: colors.black,
    wating: colors.white,
    unavailable: colors.white,
  },
  indicator: {
    rent: 'transperent',
    unrent: colors.blue,
    myRent: colors.purple,
    waiting: colors.grey,
    unavailable: 'transperent',
  },
  indicatorBorder: {
    rent: colors.white,
    unrent: colors.blue,
    myRent: colors.purple,
    waiting: colors.grey,
    unavailable: colors.white,
  },
  itemStatus: {
    rent: colors.white,
    unrent: colors.pureBlack,
    myRent: colors.pureBlack,
    waiting: colors.pureBlack,
    unavailable: colors.white,
  },
  button: {
    rent: colors.grey,
    unrent: colors.blue,
    myRent: colors.purple,
    wating: colors.grey,
    unavailable: colors.grey,
  },
};

const scheduleTypeColor = {
  amity: '#3CDA5B',
  hongikEvent: '#4EA1D3',
  academic: '#B99CF0',
};

const theme = {
  fontSizes,
  colors,
  flexbox,
  margin,
  componentSize,
  itemColorByState,
  scheduleTypeColor,
};

export default theme;
