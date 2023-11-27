import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { findOne } from '../models/user';
const secretKey = process.env.SECRET_KEY;

async function authenticateUser(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = sign({ user: { id: user._id, username: user.username } }, secretKey, {
      expiresIn: '1h',
    });

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default authenticateUser;
