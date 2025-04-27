import { RiLoader5Fill } from 'react-icons/ri';

const Loader = () => {
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <RiLoader5Fill className="animate-spin text-primary text-[100px]" />
    </div>
  );
};

export default Loader;
