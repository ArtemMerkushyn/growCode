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

// get all queries 
export const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort('-createdAt');
        const popularQueries = await Query.find().sort('-views')
        if(!queries) return res.json({ message: 'Питання відсутні' });

        res.json({ queries, popularQueries });
    } catch (error) {
        res.json({ message: 'Щось пішло не так' });
    }
}

// get my queries
export const getMyQueries = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.queries.map((query) => {
                return Query.findById(query._id);
            }),
        );

        res.json(list);
    } catch (error) {
        res.json({ message: `Щось пішло не так: ${error}` });
    }
}

// get user queries
export const getUserQueries = async (req, res) => {
    const idUser = req.params.id;
    try {
        const user = await User.findById(idUser);
        const list = await Promise.all(
            user.queries.map((query) => {
                return Query.findById(query._id);
            })
        );
        res.json(list);
    } catch (error) {
        res.json({ message: `Щось пішло не так: ${error}` });
    }
}