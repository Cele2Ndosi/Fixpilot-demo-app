class PaymentService {
  constructor() {
    this.listeners = [];
  }

  on(event, callback) {
    this.listeners.push({ event, callback });
  }

  // Simulates a real payment gateway: it takes time and resolves later.
  charge(amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.listeners
          .filter((l) => l.event === 'complete')
          .forEach((l) => l.callback());
        resolve({ success: true, amount });
      }, 50);
    });
  }
}

module.exports = { PaymentService };
