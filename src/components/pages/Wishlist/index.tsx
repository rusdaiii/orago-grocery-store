import WishlistTable from '@/components/parts/Wishlist/WishlistTable';

const Wishlist = () => {
  return (
    <section className="container">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center my-4">
        My Wishlist
      </h1>
      <WishlistTable />
    </section>
  );
};

export default Wishlist;
