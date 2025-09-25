// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// 超简内存会话（演示用，生产换 Redis/签名会话）
const SESS = new Map();
function createSession(user, ttlMs = 2 * 60 * 60 * 1000) {
  const sid = crypto.randomBytes(24).toString("hex");
  SESS.set(sid, { ...user, exp: Date.now() + ttlMs });
  return sid;
}
function getSession(sid) {
  const s = SESS.get(sid);
  if (!s) return null;
  if (s.exp < Date.now()) {
    SESS.delete(sid);
    return null;
  }
  return s;
}

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  // TODO: 这里换成真实的 DB 校验（bcrypt/argon2）
  if (!username || !password) return res.status(401).json({ message: "用户名或密码错误" });

  const user = { id: "u123", name: username, roles: ["editor"], perms: ["order:read"] };
  const sid = createSession(user);
  res.cookie("sid", sid, { httpOnly: true, sameSite: "lax", secure: false, maxAge: 2 * 60 * 60 * 1000 });
  res.json({ ok: true });
});

router.post("/logout", (req, res) => {
  const sid = req.cookies?.sid;
  if (sid) SESS.delete(sid);
  res.clearCookie("sid");
  res.json({ ok: true });
});

router.get("/me", (req, res) => {
  const sid = req.cookies?.sid;
  const s = sid && getSession(sid);
  if (!s) return res.status(401).json({ message: "未登录" });
  // 只返回最小必要信息
  res.json({ id: s.id, name: s.name, roles: s.roles, perms: s.perms });
});

module.exports = router;
