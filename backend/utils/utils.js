const corsOptions = [
  'https://card-mesto.herokuapp.com',
  'https://react-mesto-api-full-j4gcd95l1-lina7227.vercel.app',
  'https://react-mesto-api-full-one-lina7227.vercel.app',
  'https://react-mesto-api-full-one-git-main-lina7227.vercel.app',
  'https://react-mesto-api-full-one-three.vercel.app',
  'http://localhost:3001',
  'http://localhost:3000',
  'https://web.postman.co',
];

/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  if (corsOptions.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const reqHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', reqHeaders);

    return res.end();
  }

  next();
};
