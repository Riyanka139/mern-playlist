const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

class UserController {
  async register(req, res) {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).send({ message: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    try {
      await user.save();
      // Generate JWT and it's expires in 10days
      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10d' });
      res.status(200).json({user, token: token});
    } catch (err) {
      console.log(err)
      res.status(500).json({message: 'Failed to register',error:err});
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Validate password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT and it's expires in 10days
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10d' });
    res.status(200).json( {user, token: token});

    } catch (error) {
      res.status(500).json({message: 'Failed to login',error:err});
    }

    
}
}

module.exports = new UserController();
