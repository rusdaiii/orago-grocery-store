import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/repositories/products/types';

import AdditionalDescription from './AdditionalDescription';
import AdditionalInformation from './AdditionalInformation';
import CustomerFeedback from './CustomerFeedback';

type AdditionalProductDetailProps = {
  product: Product;
};

const AdditionalProductDetail = ({ product }: AdditionalProductDetailProps) => {
  return (
    <Tabs defaultValue="descriptions" className="py-12">
      <div className="flex flex-col justify-center">
        <TabsList className="bg-transparent flex flex-wrap">
          <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
          <TabsTrigger value="additionalInformation">
            Additional Information
          </TabsTrigger>
          <TabsTrigger value="customerFeedback">Customer Feedback</TabsTrigger>
        </TabsList>
      </div>

      <div className="pt-16 md:py-10">
        <TabsContent value="descriptions">
          <AdditionalDescription
            description={product.attributes.additionalDescription}
            mrpPrice={product.attributes.mrp}
            sellingPrice={product.attributes.sellingPrice}
            type={product.attributes.type}
          />
        </TabsContent>
        <TabsContent value="additionalInformation">
          <AdditionalInformation
            weight={product.attributes.itemQuantityType}
            color={product.attributes.color}
            type={product.attributes.type}
            category={product.attributes.categories.data[0].attributes.name}
          />
        </TabsContent>
        <TabsContent value="customerFeedback">
          <CustomerFeedback productId={product.id} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AdditionalProductDetail;
