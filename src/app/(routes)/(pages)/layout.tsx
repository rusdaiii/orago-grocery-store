import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/parts/Navbar/Header'));
const BreadcrumbPath = dynamic(
  () => import('@/components/parts/BreadcrumbPath')
);
const BeforeFooter = dynamic(
  () => import('@/components/parts/Footer/BeforeFooter')
);
const Footer = dynamic(() => import('@/components/parts/Footer/Footer'));
const Bottombar = dynamic(() => import('@/components/parts/Navbar/Bottombar'));

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <main>
      <Header />
      <BreadcrumbPath />
      <section>{children}</section>
      <BeforeFooter />
      <Footer />
      <Bottombar />
    </main>
  );
};

export default Layout;
