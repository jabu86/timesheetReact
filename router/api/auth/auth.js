import express from 'express';
import auth from '../../../middleware/auth.js';
import User from '../../../model//User.js';
const router = express.Router();


//@route    GET     /api/auth
//@desc     Get user
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
     } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});



export default router;