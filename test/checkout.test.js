const { checkout } = require('../src/checkout');
const { PaymentService } = require('../src/paymentService');

test('order is confirmed after payment completes', async () => {
  const paymentService = new PaymentService();
  const order = { id: 1, total: 42, status: 'pending' };

  const result = await checkout(order, paymentService);

  expect(result.status).toBe('confirmed');
});

test('order is not confirmed before payment resolves', () => {
  const paymentService = new PaymentService();
  const order = { id: 1, total: 42, status: 'pending' };

  checkout(order, paymentService);

  // PaymentService.charge() is async (setTimeout-based), so right after
  // calling checkout() - before that timer has fired - the order must
  // still be pending. If this is confirmed already, checkout() confirmed
  // the order without actually waiting for payment.
  expect(order.status).not.toBe('confirmed');
});
