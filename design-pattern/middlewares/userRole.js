const checkUserRole = (req, res, next) => {
  if (req.user[1].role === "admin") {
    next();
  } else {
    res.send("You are player");
  }
};

module.exports = checkUserRole;
