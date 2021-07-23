const db = require('../models');
const { Product } = db;

module.exports = {
  getProduct: async(req, res) => {
    try {
      let { id } = req.params;
      let product = await Product.findByPk(id);
      if (!product) {
        return res.json({
          code: 400,
          message: 'productId does not exist'
        });
      }
      product = product.toJSON();
      return res.json({
        code: 200,
        data: product
      });
    }
    catch (err) {
      console.error(`getProduct fail, ${err.message}`);
    }
  }
}