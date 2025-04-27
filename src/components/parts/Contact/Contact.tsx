import AddressCard from './AddressCard';
import NewsletterCard from './NewsletterCard';
import PhoneCard from './PhoneCard';

const Contact = () => {
  return (
    <section className="container grid grid-cols-2 lg:grid-cols-4 gap-5 py-10">
      <AddressCard />
      <PhoneCard />
      <NewsletterCard className="col-span-2" />
    </section>
  );
};

export default Contact;
