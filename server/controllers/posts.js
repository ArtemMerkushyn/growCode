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

//get post by id
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
         },
         { new: true });
   
         res.json(post);
    } catch (error) {
        res.json({ message: 'Щось пішло не так.' });
    }
}

// update post
export const updatePost = async (req, res) => {
    try {
        const { imgUrl, title, text, id } = req.body;
        const post = await Post.findById(id);

        post.imgUrl = imgUrl;
        post.title = title;
        post.text = text;

        await post.save();
        res.json({ post, message: 'Ви успішно оновили Вашу публікацію' });
    } catch (error) {
        res.json({ message: `Щось пішло не так. ${error}` });
    }
}