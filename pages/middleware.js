
// middleware.js

export function middleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}