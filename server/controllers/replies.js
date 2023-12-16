import Query from "../models/Query.js";
import Reply from "../models/Reply.js";
import User from "../models/User.js";

// create reply
export const createReply = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { queryId, reply } = req.body;
        if(!reply) return res.json({ message: 'Відповідь на питання не може бути путою' });

        const newReply = new Reply({
            query: queryId,
            author: req.userId,
            username: user.username,
            profession: user.profession,
            reply: reply,
        });
        await newReply.save();

        try {
            await Query.findByIdAndUpdate(queryId, {
                $push: { replies: newReply._id },
            });
        } catch (error) {
            console.log(error);
        }

        res.json(newReply);
    } catch (error) {
        res.json({ message: `Щось пішло нетак. ${error}` });
    }
}