const { getSession } = require("./sessionStore");
module.exports = function requireAuth(req, res, next) {
  const sid = req.cookies?.sid;
  const s = sid && getSession(sid);
  if (!s) return res.status(401).json({ message: "未登录" });
  req.user = s;
  next();
};
