import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import theme from '../styles/Theme';
import '../styles/sweetalert2.css';

const useConfirm = (title, confirm, confirmSuccessMessage) => {
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
          confirm();
          mySwal.fire({
            title: <AlertTitle>{confirmSuccessMessage}</AlertTitle>,
            html: '',
            icon: 'success',
            heightAuto: false,
            confirmButtonColor: theme.colors.blue,
            customClass: {
              title: 'custom-title-class',
              icon: 'custom-icon-class',
            },
          });
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
