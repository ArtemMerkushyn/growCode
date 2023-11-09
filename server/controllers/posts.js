import Post from '../models/Post.js';
import User from '../models/User.js';
// create post
export const createPost = async (req, res) => {
    try {
        const { imgUrl, title, text } = req.body;
        const user = await User.findById(req.userId);

        const newPost = new Post({
            username: user.username,
            imgUrl,
            title,
            text,
            author: req.userId,
        });

        await newPost.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPost },
        });
        return res.json(newPost);
    } catch (error) {
        res.json({ message: `Щось пішло не так. ${error}` });
    }
}