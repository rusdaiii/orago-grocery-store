import dynamic from 'next/dynamic';

const Settings = dynamic(() => import('@/components/pages/Settings'));

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Account Settings' },
  { withSuffix: true }
);

const SettingsPage = () => {
  return <Settings />;
};

export default SettingsPage;
