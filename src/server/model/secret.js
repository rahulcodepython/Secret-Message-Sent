import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        name: { type: String, required: true },
        link: { type: String, required: true },
        token: { type: String, required: true },
        message: [{
            name: { type: String, required: true },
            msg: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }],
    }
)

const Secret = mongoose.models.Secret || mongoose.model("Secret", schema)

export default Secret