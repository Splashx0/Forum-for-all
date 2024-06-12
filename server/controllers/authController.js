import { register as _register, login as _login } from "../models/user";
import { sign } from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id, username) => {
  return sign({ _id, username }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};
//Register
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await _register(username, email, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await _login(email, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { register, login };
