const commonMiddleware = {
  validateRequest: (req, res, next, schema) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const message = `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`;
      res.status(422).json({ success: false, error: message });
    } else {
      req.body = value;
      next();
    }
  },
};
export default commonMiddleware;
