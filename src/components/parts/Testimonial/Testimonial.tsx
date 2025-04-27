import Marquee from 'react-fast-marquee';

import testimonial from '@/lib/constants/testimonial.json';

import CardTestimonial from './CardTestimonial';

const Testimonial = () => {
  return (
    <section className="container flex flex-col gap-8 py-12">
      <div>
        <h1 className="text-primary">Testimonial</h1>
        <h2 className="md:text-4xl font-semibold">What Our Customers Say</h2>
      </div>

      <Marquee className="gap-7" gradient={true}>
        <div className="flex gap-7">
          {testimonial.map((item, index) => (
            <CardTestimonial
              key={index}
              user={item.name}
              role={item.role}
              testimonial={item.testimonial}
              rating={item.rating}
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default Testimonial;
