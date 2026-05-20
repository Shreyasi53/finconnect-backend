import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true 
    },

    advisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    message:{
        type: String,
        default: ""
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
},
{
    timestamps: true
});

export const Booking = mongoose.model("Booking", bookingSchema);