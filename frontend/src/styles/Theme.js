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

const fontstyle = {
  head1: `
    font-family: S-Core Dream;
    font-size: 64px;  
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
  `,
  head2: `
    font-family: Gmarket Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  `,
  head3: `
    font-family: Gmarket Sans;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  `,
  head4: `
    font-family: Gmarket Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  `,
  head5: `
    font-family: Gmarket Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
  `,
  head6: `
    font-family: Gmarket Sans;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  head7: `
    font-family: Gmarket Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  `,
  head8: `
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,
  head9: `
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,
  head10: `
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  `,
  head11: `
    font-family: Gmarket Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  `,
  head12: `
    font-family: Gmarket Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  `,

  body1: `
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,
  body2: `
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; 
  `,
  body3: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
  `,
  body4: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 
  `,
  body5: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal; 
  `,
  body6: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; 
  `,
  body7: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal; 
  `,
  body8: `
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
  `,
  body9: `
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; 
  `,
  body10: `
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,
  body11: `
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  `,
  body12: `
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  `,
  body13: `
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%;
  `,
  body14: `
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  `,

  // 메인페이지 통계 숫자 스타일
  number: `
    font-family: Pretendard;
    font-size: 80px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,

  // 메인페이지 하단 버튼
  mainButton: `
    font-family: Gmarket Sans;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  `,
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
  error: '#ff9494',
};

const componentSize = {
  maxWidth: '1200px',
};

const itemColorByState = {
  background: {
    rented: 'transparent',
    available: colors.white,
    myRent: colors.white,
    waiting: colors.white,
    under_maintenance: 'transparent',
    lost: 'transparent',
  },
  number: {
    rented: colors.white,
    available: colors.black,
    myRent: colors.black,
    wating: colors.white,
    under_maintenance: colors.white,
    lost: colors.white,
  },
  indicator: {
    rented: 'transperent',
    available: colors.blue,
    myRent: colors.purple,
    waiting: colors.grey,
    under_maintenance: 'transperent',
    lost: 'transperent',
  },
  indicatorBorder: {
    rented: colors.white,
    available: colors.blue,
    myRent: colors.purple,
    waiting: colors.grey,
    under_maintenance: colors.white,
    lost: colors.white,
  },
  itemStatus: {
    rented: colors.white,
    available: colors.pureBlack,
    myRent: colors.pureBlack,
    waiting: colors.pureBlack,
    under_maintenance: colors.white,
    lost: colors.white,
  },
  button: {
    rented: colors.grey,
    available: colors.blue,
    myRent: colors.purple,
    wating: colors.grey,
    under_maintenance: colors.grey,
    lost: colors.grey,
  },
};

const scheduleTypeColor = {
  amity: '#3CDA5B',
  hongikEvent: '#4EA1D3',
  academic: '#B99CF0',
};

const fontstyle = {
  head1: `
    font-family: S-Core Dream;
    font-size: 64px;  
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
  `,
  head2: `
    font-family: Gmarket Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  `,
  head3: `
    font-family: Gmarket Sans;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  `,
  head4: `
    font-family: Gmarket Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  `,
  head5: `
    font-family: Gmarket Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
  `,
  head6: `
    font-family: Gmarket Sans;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  head7: `
    font-family: Gmarket Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  `,
  head8: `
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,
  head9: `
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,
  head10: `
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  `,
  head11: `
    font-family: Gmarket Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  `,
  head12: `
    font-family: Gmarket Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  `,

  body1: `
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,
  body2: `
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; 
  `,
  body3: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
  `,
  body4: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 
  `,
  body5: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal; 
  `,
  body6: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; 
  `,
  body7: `
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal; 
  `,
  body8: `
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
  `,
  body9: `
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; 
  `,
  body10: `
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,
  body11: `
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  `,
  body12: `
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  `,
  body13: `
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%;
  `,
  body14: `
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  `,

  // 메인페이지 통계 숫자 스타일
  number: `
    font-family: Pretendard;
    font-size: 80px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,

  // 메인페이지 하단 버튼
  mainButton: `
    font-family: Gmarket Sans;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  `,
};

const theme = {
  fontSizes,
  colors,
  fontstyle,
  componentSize,
  itemColorByState,
  scheduleTypeColor,
  fontstyle,
};

export default theme;
