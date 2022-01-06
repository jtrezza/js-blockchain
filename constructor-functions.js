function Transaction(sender, recipient) {
  this.sender = sender;
  this.recipient = recipient;
}
Transaction.prototype.displayTransaction = function displayTransaction() {
  return `Transaction from ${this.sender} to ${this.recipient}`;
}

function HashTransaction(sender, recipient) {
  if (!new.target) {
    return new HashTransaction(sender, recipient);
  }
  Transaction.call(this, sender, recipient);

  // Better to add this to the prototype
  /*this.calculateHash = function calculateHash() {
    ...
  }*/
}

HashTransaction.prototype = Object.create(Transaction.prototype);
HashTransaction.prototype.calculateHash = function calculateHash() {
  const data = [this.sender, this.recipient].join('');
  let hash = 0, i = 0;
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
  }
  return hash**2;
}
HashTransaction.prototype.constructor = HashTransaction;

const tx = new HashTransaction('josetrezza@gmail.com', 'lauramartinez-26@hotmail.com');
const tx2 = new HashTransaction('person1@example.com', 'person2@example.com');

console.log(Transaction.prototype.isPrototypeOf(tx));
console.log(tx.calculateHash === tx2.calculateHash);
console.log(tx.__proto__);
console.log(tx.__proto__.__proto__);
console.log(tx.displayTransaction());
console.log(tx.calculateHash());
