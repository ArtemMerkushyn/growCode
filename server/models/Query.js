import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        text: {
            type: String,
        },
        topic: {
            type: String,
            default: 'other'
        },
        username: { type: String },
        author: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        profession: { type: String },
        views: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true },
);

export default mongoose.model('Query', QuerySchema);