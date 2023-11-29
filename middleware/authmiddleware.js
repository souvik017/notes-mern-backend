
import jwt from 'jsonwebtoken'

const checkLoggedIn = (req, res, next) => {

  let token = req.header('Authorization');
  token = token.split(" ")[1]

  if (!token) {
    return res.status(404).json({ message: 'Unauthorized: Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`); 
    const { username } = decoded;
    req.username = username;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default checkLoggedIn;
