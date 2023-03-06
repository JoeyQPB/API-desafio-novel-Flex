export const uploadImageController = {
  upload(req, res) {
    // console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ msg: "Upload fail" });
    }
    return res.status(201).json({ url: req.file.path });
  },
};
