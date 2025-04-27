import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import { IoLeafOutline, IoPricetagsOutline } from 'react-icons/io5';

type AdditionalDescriptionProps = {
  description: BlocksContent;
  mrpPrice: number;
  sellingPrice: number;
  type: string;
};

const AdditionalDescription = ({
  description,
  mrpPrice,
  sellingPrice,
  type,
}: AdditionalDescriptionProps) => {
  const discount = Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {description ? (
        <article className="text-gray-400">
          <BlocksRenderer content={description} />
        </article>
      ) : (
        <article className="flex justify-center items-center text-gray-400">
          <p>No description available</p>
        </article>
      )}

      <div className="flex flex-col gap-5 place-self-end w-full">
        <Image
          src="/images/courier.webp"
          alt="product-detail"
          width={500}
          height={500}
          className="w-full"
        />

        <div className="flex flex-col justify-start sm:flex-row sm:justify-center gap-5 border border-gray-100 p-5 rounded-md">
          {sellingPrice && (
            <div className="flex gap-5 items-center">
              <IoPricetagsOutline className="w-8 h-8 text-primary" />

              <span className="flex flex-col gap-1">
                <h1 className="font-medium">{`${discount}%`} Discount</h1>
                <h2 className="text-sm text-gray-400">
                  save your {`${discount}%`} money with us
                </h2>
              </span>
            </div>
          )}
          <div className="flex gap-5 items-center">
            <IoLeafOutline className="w-8 h-8 text-primary" />
            <span className="flex flex-col gap-1">
              <h1 className="font-medium">
                {type === 'Organic' ? 'Organic' : 'Non Organic'}
              </h1>
              <h2 className="text-sm text-gray-400">
                {type === 'Organic'
                  ? '100% organic product'
                  : 'This product is not organic'}
              </h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDescription;
