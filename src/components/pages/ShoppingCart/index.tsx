import ShoppingCartComponent from '@/components/parts/ShoppingCart/ShoppingCartComponent';

const ShoppingCart = () => {
  return (
    <section className="container">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center my-4">
        My Shopping Cart
      </h1>
      <ShoppingCartComponent />
    </section>
  );
};

export default ShoppingCart;
