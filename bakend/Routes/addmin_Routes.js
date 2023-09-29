const express = require('express');

const { addProduct,getAllProduct,deleteProduct,updateProduct,getAllUsers,allorder,cancelOrder, allstock,returnOrder,stockadd     } = require('../Controller/admin-controler');

const adminRouter = express.Router();

adminRouter.post('/addProduct',addProduct);
adminRouter.get('/getallProduct',getAllProduct);
adminRouter.delete('/deleteProduct/:productId',deleteProduct);
adminRouter.put('/updateProduct/:productId', updateProduct);
adminRouter.get('/user',getAllUsers);
adminRouter.get('/order',allorder);
adminRouter.post('/addstock',stockadd);
adminRouter.get('/stocks',allstock);
adminRouter.put('/order/cancel/:orderId',cancelOrder);
adminRouter.put('/order/return/:orderId',returnOrder);

module.exports = adminRouter;