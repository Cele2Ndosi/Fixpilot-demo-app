function checkout(order, paymentService) {
  paymentService.charge(order.total);
  order.status = 'confirmed';
  return Promise.resolve(order);
}

module.exports = { checkout };
