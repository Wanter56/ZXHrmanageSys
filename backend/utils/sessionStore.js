const crypto = require("crypto");
const SESS = new Map();

function createSession(payload, ttlMs = 2 * 60 * 60 * 1000) {
  const sid = crypto.randomBytes(24).toString("hex");
  const exp = Date.now() + ttlMs;
  SESS.set(sid, { ...payload, exp });
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
function destroySession(sid) {
  SESS.delete(sid);
}

module.exports = { createSession, getSession, destroySession };
