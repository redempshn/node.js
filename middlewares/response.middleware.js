const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query

  if (res.error) {
    return res.status(400).json({ error: res.error.message });
  } else if (res.data === undefined || res.data === null) {
    return res.status(404).json({ error: "Data not found" });
  } else {
    return res.status(200).json(res.data);
  }

  next();
};

export { responseMiddleware };
