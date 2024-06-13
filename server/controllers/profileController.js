import { User } from "../models/user.js";
//Get profile
export const getProfile = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ username: id }).populate({
    path: "rooms",
    populate: { path: "topic" },
    options: {
      sort: { createdAt: -1 },
    },
  });
  res.status(200).json({ user });
};

//Edit Profile
export const editProfile = async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  const editUser = await User.updateOne(
    { username: id },
    {
      $set: {
        profileImg: req.file?.originalname,
        bio,
      },
    }
  );
  res.status(200).json({ editUser });
};
