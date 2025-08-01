import { Outlet } from 'react-router-dom';
import InstitutionalHeader from './InstitutionalHeader';
import InstitutionalFooter from './InstitutionalFooter';

const InstitutionalLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <InstitutionalHeader />
      <main className="flex-grow-1" style={{ paddingTop: '76px' }}>
        <Outlet />
      </main>
      <InstitutionalFooter />
    </div>
  );
};

export default InstitutionalLayout;