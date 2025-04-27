import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/components/pages/Dashboard'));

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Dashboard' },
  { withSuffix: true }
);

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
