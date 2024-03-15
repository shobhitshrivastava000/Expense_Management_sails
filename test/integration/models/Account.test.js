const { expect } = require('chai');

describe('User Model', () => {
  describe('Attributes', () => {
    it('should have the correct attribute', () => {
      // console.log(User.attributes)
      expect(Account.attributes).to.haveOwnProperty('user');
      expect(Account.attributes).to.haveOwnProperty('name');
      expect(Account.attributes).to.haveOwnProperty('transactions');
    });

    it('should have the correct types', () => {
      expect(Account.attributes.user.model).to.equal('user');
      expect(Account.attributes.name.type).to.equal('string');
      expect(Account.attributes.transactions.type).to.equal('string');
    });

    it('should have the correct attributes validations', () => {
      expect(Account.attributes.user.required).to.be.true;
      expect(Account.attributes.email.required).to.be.true;
      expect(Account.attributes.password.required).to.be.true;
     
    });
  });
});
