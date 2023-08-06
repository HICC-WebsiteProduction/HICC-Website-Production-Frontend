import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import theme from '../styles/Theme';
import '../styles/sweetalert2.css';
import useAlert from './useAlert';

const useConfirm = (title, confirm, confirmSuccessMessage, dismiss = null) => {
  const errorAlert = useAlert();
  if (!confirm || typeof confirm !== 'function') return;

  const alert = () => {
    const mySwal = withReactContent(Swal);

    mySwal
      .fire({
        background: theme.colors.white,
        title: <Title>{title}</Title>,
        heightAuto: false,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: theme.colors.blue,
        confirmButtonText: <ConfirmText>{`네`}</ConfirmText>,
        cancelButtonColor: theme.colors.cancleRed,
        cancelButtonText: <ConfirmText>{`아니오`}</ConfirmText>,
      })
      .then(result => {
        if (result.isConfirmed) {
          const result = confirm();
          result.then(res => {
            console.log(res);
            // confirm의 반환 타입이 string이 아니라면 (정상적으로 confirm이 실행)
            // 아니라면 반환된 메시지를 errorAlert에 넣어서  실행 (중간에 오류를 터뜨림)
            if (typeof res !== 'string') {
              mySwal
                .fire({
                  title: <AlertTitle>{confirmSuccessMessage}</AlertTitle>,
                  html: '',
                  icon: 'success',
                  heightAuto: false,
                  confirmButtonColor: theme.colors.blue,
                  customClass: {
                    title: 'custom-title-class',
                    icon: 'custom-icon-class',
                  },
                })
                .then(() => {
                  // 확인 버튼을 누르면 페이지 새로고침 (서버에서 다시 정보를 받아와야하기 때문)
                  window.location.reload();
                });
            } else {
              errorAlert(true, res);
            }
          });
        } else if (result.isDismissed) {
          if (dismiss === null || typeof dismiss !== 'function') return;
          dismiss();
        }
      });
  };
  return alert;
};

const Title = styled.div`
  padding: 20px 0;
  color: ${theme.colors.black};

  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 160%;
  white-space: pre-line;
`;

const ConfirmText = styled.div`
  font-size: ${theme.fontSizes.label};
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  line-height: 160%;
  font-weight: 600;
`;

const AlertTitle = styled.div`
  margin: 80px 0 20px 0;
  color: ${theme.colors.black};

  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 160%;
  white-space: pre-line;
`;

export default useConfirm;
