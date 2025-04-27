import qs from 'qs';

export const queryGenerator = (query: any) => {
  return qs.stringify(
    {
      ...query,
      populate: {
        ...query.populate,
        categories: '*',
        image: {
          fields: ['name', 'url'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
};
