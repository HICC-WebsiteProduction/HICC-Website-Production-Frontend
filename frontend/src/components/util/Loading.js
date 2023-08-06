import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

function Loading() {
  return (
    <OvalContainer>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </OvalContainer>
  );
}

export default Loading;

const OvalContainer = styled.div`
  width: 100%;
  height: 100%;
`;
