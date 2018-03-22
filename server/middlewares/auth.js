import jwt from 'jsonwebtoken';

/**
 * @description check if logged in user has a valid session token
 * 
 * @param{object} req - api request
 *
 * @param{object} res - route response
 * 
 * @param{object} next - moving to the next handler
 * 
 * @return{undefined}
 */
export default function authenticate(req, res, next) {
  const token = req.body.token || req.headers.token;
  if (!token) {
    res.status(401).send({ message: 'token is required!' });
  } else {
   // checks if token mathes the one provided at login
   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
     if (err) {
       res.status(401)({ message: 'token is invalid!' });
     } else {
       req.user = decoded;
       next();
     }
   });
  }
}
