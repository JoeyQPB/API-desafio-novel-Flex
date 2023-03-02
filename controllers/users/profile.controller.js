export const profileUserController = {
  profile(req, res) {
    const loggedInUser = req.currentUser;
    return res.status(201).json(loggedInUser);
  },
};
