const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(value)
    .replace(/\,00$/, '');
};

export default formatCurrency;
