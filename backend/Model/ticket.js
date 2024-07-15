import mongoose from 'mongoose';
import AutoIncrement from 'mongoose'

const TicketSchema = new mongoose.Schema({
    eventId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', 
        required: true 
    },
    attendees: [{
        name: { 
            type: String, 
        },
        contact: { 
            type: Number,  
        },
        gender: { 
            type: String,  
        },
        age: { 
            type: Number,  
        },
    }],
    paymentId: { 
        type: String, 
        unique: true
        },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'], 
        default: 'Pending' 
        },
    totalAmount: { 
        type: Number, 
        required: true 
        },
    purchaseDate: { 
        type: Date, 
        default: Date.now 
        },
    bookedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
});

export default mongoose.model('Ticket', TicketSchema);