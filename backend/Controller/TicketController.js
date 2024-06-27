import Ticket from "../Model/ticket.js";

export const bookTicket = async (req, res) => {
    try {
        const { event, ticket, paymentDetails } = req.body;
        if (!event || !ticket || !paymentDetails) {
            return res.status(400).json({
                message: 'Please fill all fields'
            })
        }
        const newTicket = new Ticket({
            event,
            ticket,
            paymentDetails
        });

        newTicket.save();

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
export const getTicketDetails = async (req, res) => {
    try{
        const {
            eventId
        } = req.params;
        
        const tickets = Ticket.find({event : eventId});
        
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