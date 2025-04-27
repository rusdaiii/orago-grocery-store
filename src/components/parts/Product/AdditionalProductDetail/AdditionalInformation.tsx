type AdditionalInformationProps = {
  weight: string;
  color: string;
  type: string;
  category: string;
};

const AdditionalInformation = ({
  weight,
  color,
  type,
  category,
}: AdditionalInformationProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex gap-5">
        <span className="font-medium">Weight:</span>
        <h2 className="text-gray-400 absolute translate-x-32 ">{weight}</h2>
      </span>
      <span className="flex gap-5">
        <span className="font-medium">Color:</span>
        <h2 className="text-gray-400 absolute translate-x-32 capitalize">
          {color}
        </h2>
      </span>
      <span className="flex gap-5">
        <span className="font-medium">Type:</span>
        <h2 className="text-gray-400 absolute translate-x-32 capitalize">
          {type}
        </h2>
      </span>
      <span className="flex gap-5">
        <span className="font-medium">Category:</span>
        <h2 className="text-gray-400 absolute translate-x-32 capitalize">
          {category}
        </h2>
      </span>
    </div>
  );
};

export default AdditionalInformation;
