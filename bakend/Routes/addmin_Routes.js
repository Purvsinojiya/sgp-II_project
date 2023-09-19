const express = require('express');

const { addProduct } = require('../Controller/admin-controler');

const adminRouter = express.Router();

adminRouter.post('/addProduct',addProduct);


module.exports = adminRouter;