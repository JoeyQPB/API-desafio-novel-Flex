export const uploadImageController = {
  upload(req, res) {
    if (!req.file) {
      return res.status(400).json({ msg: "Upload fail" });
    }
    return res.status(201).json({ url: req.file.path });
  },
};
