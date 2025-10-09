import User from './../models/user.js';
import md5 from 'md5';

const postSignup = async(req, res)=>{ 
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'name, email, and password are required'
        });
    }

    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameValidationRegex = /^[a-zA-Z\s]+$/;
    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (nameValidationRegex.test(name)===false) {
        return res.status(400).json({
             success: false,
              message: 'Name should only contain letters and spaces'
             });
    }
    if (emailValidationRegex.test(email)===false) {
        return res.status(400).json({
             success: false,
              message: 'Email is invalid'
            });
    }
    if (passwordValidationRegex.test(password)===false) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
        });
    }

    const existingUser = await User.findOne({ email, password: md5(password) }).select('-password');
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'User with this email already exists'
        });
        
    }
    
    const newUser = new User({ name, email, password: md5(password) });

    const savedUser = await newUser.save();
    res.json({ success: true, 
    message: 'User registered successfully',
    user: savedUser });
}

const postLogin = async (req, res)=>{ 
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'email and password are required'
        });
    }

    const existingUser = await User.findOne({ email, password: md5(password) }).select('-password');
    if (existingUser) {
        return res.status(401).json({
            success: true,
            message: 'User logged in successfully',
            user: existingUser
        });
    }

    res.json({
        success: false,
        message: 'Login failed.',
        user: null
    });
};

export { postSignup, postLogin };
