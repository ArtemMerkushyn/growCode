import Post from '../models/Post.js';
import User from '../models/User.js';
// create post
export const createPost = async (req, res) => {
    try {
        const { imgUrl, title, text } = req.body;
        // Проверка на пустые значения title и text
        if (!title || !text) {
            return res.json({ message: 'Поля заголовку і тексту не можуть бути порожніми' });
        }
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

// get my posts
export const getMyPosts = async (req, res) => {
    try {
       const user = await User.findById(req.userId);
       const list = await Promise.all(
          user.posts.map((post) => {
              return Post.findById(post._id);
          }),
       );
 
       res.json(list);
    } catch (error) {
       res.json({ message: 'Щось пішло не так.' });
    }
 }