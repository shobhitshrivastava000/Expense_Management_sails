/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //UserController
  'POST /user/register':'UserController.register',
  'POST /user/login':'UserController.login',

  //AccountController
  'POST /account/createaccount':'AccountController.createNewAccount',
  'GET /account/getallaccount/:userid':'AccountController.getAllAccounts',
  'PUT /account/updateaccount/:accountid':'AccountController.updateAccount',
  'DELETE /account/deleteaccount/:accountid':'AccountController.deleteAccount',

  //Expense Controller
  'POST /expense/addexpense':'ExpenseController.addExpense',
  'GET /expense/getexpense/:accountId':'ExpenseController.getAllExpense',
  'PUT /expense/updateexpense/:transactionId':'ExpenseController.updateExpense',
  'DELETE /expense/deleteexpense/:transactionId':'ExpenseController.deleteExpense',
  'GET /expense/search/:userId/:date':'ExpenseController.searchTransaction'


};
