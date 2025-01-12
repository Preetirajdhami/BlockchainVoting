
import React from 'react';
import AdminSidebar from '@/app/components/AdminSidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ">{children}</main>
    </div>
  );
};

export default AdminLayout;
