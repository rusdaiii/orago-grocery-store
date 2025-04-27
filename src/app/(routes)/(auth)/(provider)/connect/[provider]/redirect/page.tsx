import AuthProviderRedirect from '@/components/pages/Auth/AuthProviderRedirect';

type Params = {
  params: {
    provider: string;
  };
};

const AuthProvider = ({ params }: Params) => {
  const { provider } = params;

  return <AuthProviderRedirect provider={provider} />;
};

export default AuthProvider;
