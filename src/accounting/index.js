#!/usr/bin/env node
// Simple accounting CLI mirroring the COBOL application logic
// Balance is stored in memory; operations: view, credit, debit, exit

class Account {
  constructor(initialBalance = 1000.00) {
    this.balance = initialBalance;
  }

  viewBalance() {
    return this.balance;
  }

  credit(amount) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      throw new Error('Invalid amount');
    }
    this.balance += amount;
    return this.balance;
  }

  debit(amount) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      throw new Error('Invalid amount');
    }
    if (this.balance >= amount) {
      this.balance -= amount;
      return this.balance;
    }
    throw new Error('Insufficient funds');
  }
}

// CLI implementation uses Account instance
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function ask(question) {
  return new Promise(resolve => readline.question(question, ans => resolve(ans)));
}

async function mainLoop() {
  const account = new Account();
  let continueFlag = true;
  while (continueFlag) {
    showMenu();
    const choice = await ask('Enter your choice (1-4): ');
    switch (choice.trim()) {
      case '1':
        console.log('Current balance: ' + account.viewBalance().toFixed(2));
        break;
      case '2': {
        const amtStr = await ask('Enter credit amount: ');
        const amt = parseFloat(amtStr);
        try {
          const newBal = account.credit(amt);
          console.log('Amount credited. New balance: ' + newBal.toFixed(2));
        } catch (e) {
          console.log(e.message);
        }
        break;
      }
      case '3': {
        const amtStr = await ask('Enter debit amount: ');
        const amt = parseFloat(amtStr);
        try {
          const newBal = account.debit(amt);
          console.log('Amount debited. New balance: ' + newBal.toFixed(2));
        } catch (e) {
          console.log(e.message.includes('Insufficient') ? 'Insufficient funds for this debit.' : e.message);
        }
        break;
      }
      case '4':
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }
  console.log('Exiting the program. Goodbye!');
  readline.close();
}

// run the main loop when executed
if (require.main === module) {
  mainLoop();
}

module.exports = { Account };
