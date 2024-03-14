/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { HTTP_STATUS } = require('../../config/constants');

module.exports = {

  //Add expense into the particular account
  addExpense: async (req, res) => {
    try {
      const { userId, accountId, amount, description, category } = req.body;
      if (!userId || !accountId || !amount || !description || !category) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('REQUIRED'),
        });
      }
      const account = await Account.findOne(accountId).populate('transactions');

      if (!account) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('ACCOUNT_NOT_FOUND'),
        });
      }
      const transaction = await Expense.create({
        userId,
        account: accountId,
        amount,
        description,
        category,
      }).fetch();

      const addingExpense = await Expense.findOne({
        id: transaction.id,
      }).populate('account');

      res.status(HTTP_STATUS.CREATED).send({
        success: req.i18n.__('SUCCESS_TRUE'),
        message: req.i18n.__('ADD_EXPENSE'),
        data: addingExpense,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  //Get all the expenses of the particular account
  getAllExpense: async (req, res) => {
    try {
      const accountId = req.params.accountId;
      const transaction = await Account.find(accountId).populate(
        'transactions'
      );

      if (!transaction || transaction.length === 0) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('ACCOUNT_NOT_FOUND'),
        });
      }

      return res.status(HTTP_STATUS.SUCCESS).send({
        message: req.i18n.__('ACCOUNT_FOUND'),
        transaction,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  //update the expense details, e.g.: amount, dictionary, category
  updateExpense: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      console.log(transactionId);
      const { amount, description, category } = req.body;
      console.log(req.body);
      const updateExpense = await Expense.update(transactionId)
        .set({
          amount,
          description,
          category,
        })
        .fetch();
      console.log(updateExpense);
      return res.status(HTTP_STATUS.SUCCESS).send({
        message: req.i18n.__('EXPENSE_UPDATED'),
        updateExpense,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  //delete the expense
  deleteExpense: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      console.log(transactionId);

      const availableExpense = await Expense.findOne(transactionId);
      console.log('account', availableExpense);

      if (!availableExpense) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('EXPENSE_NOT_FOUND'),
        });
      }
      const deleteExpense = await Expense.destroy(transactionId);
      return res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SUCCESS_TRUE'),
        message: req.i18n.__('EXPENSE_DELETED'),
        data: deleteExpense,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },
};
