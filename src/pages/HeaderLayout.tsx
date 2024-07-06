import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HeaderLayout;
