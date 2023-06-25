import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './Theme';

import Pretendard_SemiBold from './fonts/Pretendard/Pretendard-SemiBold.woff2';
import Pretendard_Light from './fonts/Pretendard/Pretendard-Light.woff2';
import SCDream8 from './fonts/SCDream/SCDream8.woff2';

const GlobalStyle = createGlobalStyle`
    ${reset};
    
    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard SemiBold'),
        url(${Pretendard_SemiBold}) format('woff2');
        font-weight: 600;
    }

    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard Light'),
        url(${Pretendard_Light}) format('woff2');
        font-weight: 300;
    }

    @font-face {
        font-family: 'SCDream';
        src: local('SCDream 800'),
        url(${SCDream8}) format('woff2');
        font-weight: 800;
    }

    @font-face {
        font-family: 'GmarketSansMedium';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    *{
      margin: 0;
      padding: 0;
      box-sizing:border-box;
      font-family: sans-serif;
    }
    
    body {
        margin: 0 ${theme.margin.margin_browser};
        background-color: #2C2C33;
    }
`;

export default GlobalStyle;
