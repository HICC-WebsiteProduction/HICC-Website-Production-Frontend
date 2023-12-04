import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Pretendard_SemiBold from './fonts/Pretendard/Pretendard-SemiBold.woff2';
import Pretendard_Light from './fonts/Pretendard/Pretendard-Light.woff2';
import Pretendard_Medium from './fonts/Pretendard/Pretendard-Medium.woff2';
import SCDream8 from './fonts/SCDream/SCDream8.woff2';
import GmarketSansMedium from './fonts/GmarketSans/GmarketSansMedium.woff2';
import GmarketSansLight from './fonts/GmarketSans/GmarketSansLight.woff2';

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
        src: local('Pretendard Medium'),
        url(${Pretendard_Medium}) format('woff2');
        font-weight: 500;
    }

    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard Light'),
        url(${Pretendard_Light}) format('woff2');
        font-weight: 300;
    }

    @font-face {
        font-family: 'S-Core Dream';
        src: local('SCDream'),
        url(${SCDream8}) format('woff2');
        font-weight: 800;
    }

    @font-face {
        font-family: 'Gmarket Sans';
        src: local('GmarketSansMedium'),
        url(${GmarketSansMedium}) format('woff2');
        font-weight: 500;
    }

    @font-face {
        font-family: 'Gmarket Sans';
        src: local('GmarketSansLight'),
        url(${GmarketSansLight}) format('woff2');
        font-weight: 300;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }
    
    body {
        margin: 0;
        background-color: #2C2C33;
    }
`;

export default GlobalStyle;
