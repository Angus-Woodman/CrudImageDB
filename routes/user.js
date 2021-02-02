const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../model/user"); 

router.get("/", async (req, res) => {
    try {
        let user = await User.find();
        res.json(user);
    } catch (err) {
        console.log(err);
    }});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

     // Create new user
    let user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      lens: req.body.lens,
      camera: req.body.camera,
      emoji1: '0',
      emoji2: '0',
      emoji3: '0',
      comments: [],
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }}); 

router.delete("/:id", async (req, res) => {
    try {
        // Find user by id
        let user = await User.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id);
        // Delete user from db
        await user.remove();
        res.json(user);
    } catch (err) {
        console.log(err);
    }});


router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        
        const data = {
        name: req.body.name || user.name,
        lens: req.body.lens || user.lens,
        camera: req.body.camera || user.camera,
        emoji1: req.body.emoji1 || user.emoji1,
        emoji2: req.body.emoji2 || user.emoji2,
        emoji3: req.body.emoji3 || user.emoji3,
        comments:req.body.comments || user.comments,
        };
        user = await User.findByIdAndUpdate(req.params.id, data, {
    new: true
    });
        res.json(user);
    } catch (err) {
        console.log(err);
    }});

 module.exports = router;