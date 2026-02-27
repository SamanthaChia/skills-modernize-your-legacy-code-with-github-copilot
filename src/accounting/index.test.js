const { Account } = require('./index');

describe('Accounting business logic', () => {
  test('TC-001: view balance the first time', () => {
    const account = new Account();
    expect(account.viewBalance()).toBeCloseTo(1000.00);
  });

  test('TC-002: credit account with valid amount', () => {
    const account = new Account();
    const newBal = account.credit(200);
    expect(newBal).toBeCloseTo(1200.00);
    expect(account.viewBalance()).toBeCloseTo(1200.00);
  });

  test('TC-003: debit account with sufficient funds', () => {
    const account = new Account(1200.00);
    const newBal = account.debit(500);
    expect(newBal).toBeCloseTo(700.00);
    expect(account.viewBalance()).toBeCloseTo(700.00);
  });

  test('TC-004: debit account with insufficient funds throws error', () => {
    const account = new Account(700.00);
    expect(() => account.debit(1000)).toThrow('Insufficient funds');
    expect(account.viewBalance()).toBeCloseTo(700.00);
  });

  test('invalid credit amount throws error', () => {
    const account = new Account();
    expect(() => account.credit(-50)).toThrow('Invalid amount');
    expect(() => account.credit(NaN)).toThrow('Invalid amount');
  });

  test('invalid debit amount throws error', () => {
    const account = new Account();
    expect(() => account.debit(-20)).toThrow('Invalid amount');
    expect(() => account.debit(NaN)).toThrow('Invalid amount');
  });
});
