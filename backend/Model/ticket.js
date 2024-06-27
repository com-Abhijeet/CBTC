import { Transaction } from "mongodb";
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Event'
    },
    ticket : [{
        attendee : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        status : {
            type : String,
            enum : ['booked', 'cancelled'],
            default : 'booked'
        },
        seat : {
            type : Number,
            required : false
        },   
        price : {
            type : Number,
            required : true
        },
        paymentDetails : {
            TransactionId : String,
            method : {
                type : String,
                enum : ['card', 'cash', 'upi'],
                required : true
            },  
            status : {
                type : String,
                enum : ['success', 'failed'],
                default : 'success'
            },
            time : {
                type : Date,
                default : Date.now()
            } 
        }
    }]
})

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;