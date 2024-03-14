/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

//Account model

module.exports = {

  attributes: {

    user:{
      model:'User',
      required:true
    },
    name:{
      type:'string',
      required:true,
    },
    transactions:{
      collection:'Expense',
      via:'account',
      dominant:true
    }
  },

};

