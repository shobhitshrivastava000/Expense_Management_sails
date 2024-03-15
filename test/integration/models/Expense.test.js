const { expect } = require('chai');

describe('Expense Model', () => {
  describe('Attributes', () => {
    it('should have the correct attribute', () => {
      console.log(Expense.attributes)
      expect(Expense.attributes).to.haveOwnProperty('userId');
      expect(Expense.attributes).to.haveOwnProperty('account');
      expect(Expense.attributes).to.haveOwnProperty('amount');
      expect(Expense.attributes).to.haveOwnProperty('description');
      expect(Expense.attributes).to.haveOwnProperty('category');
    });

    it('should have the correct types', () => {
      expect(Expense.attributes.userId.model).to.equal('user');
      expect(Expense.attributes.account.collection).to.equal('account');
      expect(Expense.attributes.account.via).to.equal('transactions');
      expect(Expense.attributes.amount.type).to.equal('number');
      expect(Expense.attributes.description.type).to.equal('string');
      expect(Expense.attributes.category.type).to.equal('string');
    });

    it('should have the correct attributes validations', () => {
      expect(Expense.attributes.userId.required).to.be.true;
      expect(Expense.attributes.amount.required).to.be.true;
      expect(Expense.attributes.description.required).to.be.true;
      expect(Expense.attributes.category.required).to.be.true;
     
    });
  });
});
