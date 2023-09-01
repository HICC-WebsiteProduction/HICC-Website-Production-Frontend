import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import theme from '../styles/Theme';
import '../styles/sweetalert2.css';

// 경고창을 띄우기 위한 커스텀 훅
const useAlert = () => {
  // isError (에러이면 true, 정상이면 false), message: 메시지
  const alert = (isError, message) => {
    const mySwal = withReactContent(Swal);

    mySwal.fire({
      title: <Title>{message}</Title>,
      html: ' ',
      background: theme.colors.black,
      confirmButtonColor: theme.colors.blue,
      confirmButtonText: <ConfirmText>{`확인`}</ConfirmText>,
      customClass: {
        container: 'confirm',
        popup: 'popup',
        title: 'title',
        htmlContainer: 'body',
        actions: 'buttonContainer',
        confirmButton: 'confirm-button',
      },
    });
  };

  return alert;
};

const Title = styled.div`
  color: ${theme.colors.white};

  font-size: ${theme.fontSizes.subtitle};
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  text-align: center;
  white-space: pre-line;
`;

const ConfirmText = styled.div`
  font-size: ${theme.fontSizes.label};
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-weight: 600;
`;

export default useAlert;
