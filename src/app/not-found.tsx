import dynamic from 'next/dynamic';

const NotFound = dynamic(() => import('@/components/pages/NotFound'));

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
