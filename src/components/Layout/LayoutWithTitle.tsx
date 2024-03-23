import Header from './Header/Header';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';
import PageTitle from './PageTitle';
import GetTitle from '../../utils/getTitle';

const LayoutWithTitle = () => {
  return (
    <div>
      <Header />
      <PageTitle title={GetTitle()} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWithTitle;
