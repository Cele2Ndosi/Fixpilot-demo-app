function checkout(order, paymentService) {
  return paymentService.charge(order.total).then(() => {
    order.status = 'confirmed';
    return order;
  });
}

module.exports = { checkout };
