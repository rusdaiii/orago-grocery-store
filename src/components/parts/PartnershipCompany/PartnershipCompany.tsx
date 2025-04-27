import Image from 'next/image';
import Marquee from 'react-fast-marquee';

import partnershipCompany from '@/lib/constants/partnership.json';

const PartnershipCompany = () => {
  return (
    <section className="container py-10">
      <Marquee className="" gradient={true} direction="right">
        <div className="flex gap-32">
          {partnershipCompany.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default PartnershipCompany;
