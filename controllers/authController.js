const { matchedData } = require('express-validator')
const User = require('../models').User
const jwt = require('jsonwebtoken')
const secrets = require('../constants/constants').secrets
module.exports = {

  /** Authorization API and create user */
  create: async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    let data = matchedData(req, { locations: ['body'] })
    let accessToken = '';
    if (token == null) {
      accessToken = jwt.sign({ email: data.email }, secrets.ACCESS_TOKEN_SECRET)
    }

    res.json({
      accessToken: accessToken
    })
  },

  getLogin: async (req, res) => {
    //logic for redirection with redirect url
    res.sendStatus(200);
  },

  register: async (req, res) => {
    data = matchedData(req, { locations: ['body'] })
    //call register api with the data
    res.sendStatus(200);
  },

  getRegister : async(req,res) =>{
    //redirect logic for the registeration page
    res.sendStatus(200);
  },

  logout : async(req,res) => {
    //redirects to log out page
    res.sendStatus(200);
  }


}
