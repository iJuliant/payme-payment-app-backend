const wrapper = require('../../helpers/wrapper')
// const bcrypt = require('bcrypt')
const transactionModel = require('./transactionModel')

module.exports = {
  getBalance: async (req, res) => {
    try {
      const { id } = req.params
      const result = await transactionModel.getBalance(id)
      console.log(result)
      return wrapper.response(res, 200, 'Success get user balance', result)
    } catch (error) {
      console.log(req.params)
      console.log(error)
      return wrapper.response(res, 400, 'Bad request', error)
    }
  },

  topUp: async (req, res) => {
    try {
      let { amount } = req.body
      amount = +amount
      const { id } = req.params
      const currentBalance = await transactionModel.getBalance(id)
      const setData = {
        balance: currentBalance[0].balance + amount
      }
      const result = await transactionModel.update(setData, id)

      return wrapper.response(res, 200, 'topup success', result)
    } catch (err) {
      console.log(err)
    }
  },

  hello: (req, res) => {
    console.log('nih<<')
  }
}
