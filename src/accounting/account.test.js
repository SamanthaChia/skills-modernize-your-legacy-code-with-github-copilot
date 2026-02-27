const { Account } = require('./index');

describe('Accounting business logic', () => {
  let account;

  beforeEach(() => {
    account = new Account(); // starts with 1000
  });

  test('TC-001: View initial balance', () => {
    expect(account.viewBalance()).toBeCloseTo(1000.00);
  });

  test('TC-002: Credit account with valid amount', () => {
    const newBal = account.credit(200);
    expect(newBal).toBeCloseTo(1200.00);
    expect(account.viewBalance()).toBeCloseTo(1200.00);
  });

  test('TC-003: Debit account with sufficient funds', () => {
    account.credit(200); // bring to 1200
    const newBal = account.debit(500);
    expect(newBal).toBeCloseTo(700.00);
    expect(account.viewBalance()).toBeCloseTo(700.00);
  });

  test('TC-004: Debit account with insufficient funds', () => {
    // balance is 1000
    expect(() => account.debit(2000)).toThrow('Insufficient funds');
    expect(account.viewBalance()).toBeCloseTo(1000.00);
  });

  test('negative amounts should be rejected for credit', () => {
    expect(() => account.credit(-50)).toThrow('Invalid amount');
  });

  test('negative amounts should be rejected for debit', () => {
    expect(() => account.debit(-50)).toThrow('Invalid amount');
  });

  test('non-numeric amounts should be rejected', () => {
    expect(() => account.credit('abc')).toThrow('Invalid amount');
    expect(() => account.debit('xyz')).toThrow('Invalid amount');
  });
});