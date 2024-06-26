import mongoose from "mongoose";

const eventSchema =  new mongoose.Schema({
    name : String,
    description : String,
    date : Date,
    location : String,
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    vendors : [{
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        name : String,
        contact : Number,
        task : String,
        status : String
    }],
    budget : {
        type : Number,
        default : 0
    },
    attendees : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    type : {
        type : String,
        enum : ['conferences', 'weddings', 'parties']
    },
    isPrivate : {
        type : Boolean,
        default : false
    },
})

const Event = mongoose.model('Event', eventSchema)

export default Event;