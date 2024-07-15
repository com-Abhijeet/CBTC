import Event from "../Model/event.js";
import Ticket from "../Model/ticket.js";

export const bookTicket = async (req, res) => {
    try {
        const { 
            eventId, 
            attendee, // This should be renamed to attendees
            paymentId, 
            PaymentStatus, 
            totalAmount,
            bookedBy 
        } = req.body;

        console.log(attendee); // Corrected log statement

        const newTicket = new Ticket({
            eventId,
            attendees: attendee, // Corrected field name
            paymentId,
            paymentStatus: PaymentStatus, // Corrected field name
            totalAmount,
            bookedBy
        });

        console.log('Received data:', req.body);
        console.log('new ticket created: ', newTicket);
        
        await newTicket.save()
        .then(() => {
            return res.status(201).json({
                message: 'Ticket booked successfully'
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
export const getTicketsForEvent = async (req, res) => {
    try{
        const {
            eventId
        } = req.params;
        
        const tickets = await Ticket.find({event : eventId});
        
        return res.status(200).json({
            tickets
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message : 'Internal server error'
        })
    }
}
export const getTicketByUserId = async (req, res) => {
    try{
        const {
            UserId
        } = req.params;

        const ticket = await Ticket.find({UserId}).populate();
        return res.status(200).json({
            ticket
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message : 'Internal server error'
        })
    }
}

// export const getTicketByUserId = async (req, res) => {
//     try{
//         const {
//             UserId
//         } = req.params;

//         const ticket = await Ticket.find({UserId});

//         const eventName = await event.find({Ticket.key.eventId})
//         return res.status(200).json({
//             ticket
//         })
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({
//             message : 'Internal server error'
//         })
//     }
// }


