import AccountSidebar from '@/components/parts/Navbar/AccountSidebar/AccountSidebar';

const AccoutLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="container flex flex-col lg:flex-row gap-5">
      <AccountSidebar />
      <section className="w-full">{children}</section>
    </main>
  );
};

export default AccoutLayout;
