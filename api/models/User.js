/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// User model

module.exports = {

  attributes: {

    username:{
      type:'string',
      required:true,
    },
    email:{
      type:'string',
      required:true,
      unique:true
    },
    password:{
      type:'string',
      required:true,
    },

  },

};

