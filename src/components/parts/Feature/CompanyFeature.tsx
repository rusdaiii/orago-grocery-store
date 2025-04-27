const companyFeatureList = [
  {
    title: 'Years Of Experience',
    count: '10+',
  },
  {
    title: 'Happy Customers',
    count: '100k+',
  },
  {
    title: 'Qualified Team Members',
    count: '50+',
  },
  {
    title: 'Monthly Orders',
    count: '250k+',
  },
];

const CompanyFeature = () => {
  return (
    <section className="bg-[url('/images/company-feature-bg.webp')] bg-cover mb-16">
      <div className="bg-black bg-opacity-80 w-full h-full">
        <div className="container py-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {companyFeatureList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 text-center  
              backdrop-blur-md bg-green-gray-200/30 p-8 rounded-md"
            >
              <h3 className="text-4xl font-normal text-primary">
                {item.count}
              </h3>
              <p className="text-white font-light">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyFeature;
