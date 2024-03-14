/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { HTTP_STATUS } = require('../../config/constants');

module.exports = {

  //Create Account of the User
  createNewAccount: async (req, res) => {
    try {
      const { userId, name } = req.body;
      if (!userId || !name) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('REQUIRED'),
        });
      }
      const user = await User.findOne(userId);
      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('USER_NOT_FOUND'),
        });
      }
      const newAccount = await Account.create({
        user: userId,
        name,
        transactions: [],
      }).fetch();

      return res.status(HTTP_STATUS.SUCCESS).send({
        success: req.i18n.__('SUCCESS_TRUE'),
        data: newAccount,
        newAccount,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  //Get all the accounts list, made by User
  getAllAccounts: async (req, res) => {
    try {
      const userId = req.params.id;
      const accounts = await Account.findOne({ user: userId });

      if (!accounts) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('ACCOUNT_NOT_FOUND'),
        });
      }
      return res.status(HTTP_STATUS.SUCCESS).send({
        message: req.i18n.__('ACCOUNT_FOUND'),
        accounts,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  //Update the account details,e.g. Name of account
  updateAccount: async (req, res) => {
    try {
      const accountId = req.params.accountid;
      const updateData = req.body;
      if (!updateData) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('REQUIRED'),
        });
      }

      const updateAccount = await Account.updateOne(accountId).set(updateData);

      return res.status(HTTP_STATUS.SUCCESS).send({
        message: req.i18n.__('ACCOUNT_UPDATED'),
        updateAccount,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  //Delete the account made by user
  deleteAccount: async (req, res) => {
    try {
      const accountId = req.params.accountid;

      const availableAccount = await Account.findOne(accountId);

      if (!availableAccount) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('ACCOUNT_NOT_FOUND'),
        });
      }
      const deleteAccount = await Account.destroy(accountId);
      return res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SUCCESS_TRUE'),
        message: req.i18n.__('ACCOUNT_DELETED'),
        data: deleteAccount,
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
