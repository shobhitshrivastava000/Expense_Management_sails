/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

//Expense Model

module.exports = {

  attributes: {

    userId:{
      model:'User',
      required:true ,
    },

    account:{
      collection:'Account',
      via:'transactions'
    },

    amount:{
      type:'number',
      required:true,
    },

    description:{
      type:'string',
      required:true,
    },

    category:{
      type:'string',
      required:true
    },
  },

};

