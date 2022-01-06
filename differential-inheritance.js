
const transaction = {
  sender: 'sender@example.com',
  recipient: 'recipient@example.com'
};

const hashTransaction = Object.create(transaction);

hashTransaction.calculateHash = function calculateHash() {
  const data = [this.sender, this.recipient].join('');
  let hash = 0, i = 0;
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
  }
  return hash**2;
}

console.log(hashTransaction.calculateHash());

const moneyTransaction = Object.setPrototypeOf({}, hashTransaction);
moneyTransaction.funds = 0.0;
moneyTransaction.addFunds = function addFunds(funds = 0) {
  this.funds += Number(funds);
};
moneyTransaction.addFunds(10);
console.log(moneyTransaction.calculateHash());
console.log(moneyTransaction.funds);
console.log(moneyTransaction.sender);
console.log(moneyTransaction.recipient);