const db = require('../models');
const { Order, OrderItem } = db;
const sequelize = db.sequelize;

module.exports = {
  postOrder: async(req, res) => {
    const t = await sequelize.transaction();
    try {
      const { name, phone, email, address, amount, items } = req.body;

      let order = await Order.create({
        name,
        phone,
        email,
        address,
        amount,
        status: 1
      }, { transaction: t });

      let quantities = 0;
      for (let item of items) {
        quantities += item.quantity;
        await OrderItem.create({
          ProductId: item.productId,
          OrderId: order.id,
          price: item.price,
          quantity: item.quantity
        }, { transaction: t });
      }
      
      await t.commit();

      return res.json({
        code: 200,
        data: {
          id: order.id,
          amount: order.amount,
          status: 1,
          quantities: quantities
        }
      });
    }
    catch (err) {
      console.error(`postOrder fail, ${err.message}`);
      await t.rollback();
      return res.json({
        code: 500,
        message: err.message
      });
    }
  }
}