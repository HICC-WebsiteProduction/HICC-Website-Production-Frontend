import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './Theme';

const GlobalStyle = createGlobalStyle`
    ${reset};
    
    *{
      margin: 0;
      padding: 0;
      box-sizing:border-box;
      font-family: NanumBarunGothic, sans-serif;
    }
    
    body {
        margin: 0 ${theme.margin.margin_browser};
    }
`;

export default GlobalStyle;
