import SigninForm from '@/components/parts/Form/SigninForm';
import SignupForm from '@/components/parts/Form/SignupForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthForm = () => {
  return (
    <Tabs defaultValue="login" className="w-full flex flex-col">
      <TabsList className="w-full bg-background mb-5">
        <TabsTrigger value="login" className="uppercase w-full md:text-base">
          login
        </TabsTrigger>
        <TabsTrigger value="register" className="uppercase w-full md:text-base">
          register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <SigninForm />
      </TabsContent>
      <ScrollArea className="max-h-[400px] md:max-h-full">
        <TabsContent value="register">
          <SignupForm />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default AuthForm;
