import User from '../models/user.model.js';

const registerUser = async (req, res) =>{
    try {
        const { username, email, password} = req.body;


        if(!username || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existing = await User.findOne({email: email.toLowerCase()});

        if(existing){
            return res.status(400).json({message: 'user alreadt exists'});
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        })
        return res.status(201).json({ message: 'User created successfully', user: { username: user.username, email: user.email } });
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export {
    registerUser
}