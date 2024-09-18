import { ReactNode } from 'react';
import VoterSidebar from '@/app/components/VoterSidebar';

interface LayoutProps {
  children: ReactNode;
}

const VoterLayout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-12">
        <div className="col-span-4 h-screen">
        <VoterSidebar />
        </div>

        <div className='col-span-8 bg-grau-100 h-screen'>
            {children}
        </div>
        
      
    </div>

  );
};

export default VoterLayout;
