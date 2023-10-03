import styled from 'styled-components';
import Header from '../header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './../main/Footer';

function Layout() {
  const location = useLocation();
  const url = location.pathname.split('/');
  const page = url[1];

  return (
    <Container>
      <Header background={page ? 1 : 0} />
      <Outlet />
      <Footer />
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100%;

  margin: 0 auto;
`;
