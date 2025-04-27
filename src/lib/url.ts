export const combineSearchParams = (searchParams: any, newParams: any) => {
  const params = new URLSearchParams(searchParams);

  Object.keys(newParams).forEach((key: string) => {
    params.append(key, newParams[key]);
  });

  return params;
};

export const removeSearchParams = (searchParams: any, paramsToRemove: any) => {
  const params = new URLSearchParams(searchParams);

  paramsToRemove.forEach((key: string) => {
    params.delete(key);
  });

  return params;
};
