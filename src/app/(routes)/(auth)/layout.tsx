const AuthProviderLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="min-h-dvh flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthProviderLayout;
