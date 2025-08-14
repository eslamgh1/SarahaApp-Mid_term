export const validation = (schema) => {
  return (req, res, next) => {
    console.log(Object.keys(schema));

    let validationError = [];
    for (const key of Object.keys(schema)) {
      console.log(key);
      const data = schema[key].validate(req[key], { abortEarly: false });
      if (data?.error) {
        validationError.push(data?.error?.details);
      }
    }

    if (validationError.length) {
      return res.status(400).json({ error: validationError });
    }

    return next();
  };
};
