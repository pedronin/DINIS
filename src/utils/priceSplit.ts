// раздробить число по три цифры с конца
export const priceSplit = (price: number) => {
  return price
    .toString()
    .replace(/(\d{3})+$/, (g, g1, i) => (i ? ' ' : '') + g.match(/.{3}/g)?.join(' '));
};
