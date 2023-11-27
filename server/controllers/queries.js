import Query from '../models/Query.js';
import User from '../models/User.js';

// create query
export const createQuery = async (req, res) => {
    try {
        const { question, text, topic} = req.body;
        const user = await User.findById(req.userId);

        const newQuery = new Query({
            question,
            text,
            topic,
            username: user.username,
            profession: user.profession,
            author: req.userId,
        });
        await newQuery.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { queries: newQuery },
        });

        return res.json(newQuery);
    } catch (error) {
        res.json({ message: `Щось пішло не так ${error}` });
    }
}