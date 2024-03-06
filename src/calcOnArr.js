export const getTotalQuantity = (ordersArr) => {
  let totalQuantity = 0;

  ordersArr.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
};


export const getTotalSum = (ordersArr) => {
  let totalSum = 0;

  ordersArr.forEach((item) => {
    totalSum += item.quantity * item.price;
  });

  return totalSum;
};
