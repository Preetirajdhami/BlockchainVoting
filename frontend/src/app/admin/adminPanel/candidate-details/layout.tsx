import { ReactNode } from 'react';
import AdminSidebar from '@/app/components/AdminSidebar';

interface LayoutProps {
  children: ReactNode;
}

const VoterLayout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-12">
        <div className="col-span-4 h-screen">
        <AdminSidebar />
        </div>

        <div className='col-span-8 bg-grau-100 h-screen'>
            {children}
        </div>
        
      
    </div>

  );
};

export default VoterLayout;
