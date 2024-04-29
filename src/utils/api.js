import { wait } from './index.js';

const balancesAPI = {
  async getBalances() {
    await wait(1000);
    const balances = localStorage.getItem('balances');

    if (balances === null) {
      localStorage.setItem('balances', '0');
      return 0;
    }

    return Number(balances);
  },
  async deposit(value) {
    const balances = await this.getBalances();
    localStorage.setItem('balances', `${balances + value}`);
  },
  async withdraw(value) {
    const balances = await this.getBalances();
    const newBalances = balances - value;

    if (newBalances < 0) throw new Error('not enough balances');

    localStorage.setItem('balances', `${newBalances}`);
  },
  async purge() {
    await wait(1000);
    localStorage.setItem('balances', '0');
  },
};

export { balancesAPI };
