import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id, username) => {
  return jwt.sign({ _id, username }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.register(username, email, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
