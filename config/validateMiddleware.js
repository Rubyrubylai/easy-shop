module.exports = (schema) => {
  return (req, res, next) => { 
    let validate = schema.validate(req.body);
      if (validate.error) {
        return res.status(400).json({
          code: 400,
          message: validate.error.message
        });
      }
      return next();
  } 
}