import Event from "../Model/event";

export const createEvent = (req,res) =>{
    try{
        const {
            name,
            description,
            date,
            location,
            creator,
            vendors,
            budget,
            attendees,
            type,
            isPrivate
        } = req.body;

        if(!name || !description || !date || !type){
            return res.status(400).json({
                message: 'Please fill all fields'
            })
        }
        const newEvent = new Event({
            name,
            description,
            date,
            location,
            creator,
            vendors,
            budget,
            attendees,
            type,
            isPrivate
        });

        newEvent.save();

    }catch(error){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const getEvents = (req,res) =>{
    try{
        const events = Event.find();
        return res.status(200).json({
            events
        })
    }catch(error){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const getEventBYId = async (req , res)=>{
    try{
        const {
            id
        } = req.params;
        const event =  await Event.findById({id});
        return res.status(200).json({
            event
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        })

    }
}

export const updateEvent = async (req,res) => {
    try{
        const {
            id
        } = req.params;
        const {
            name,
            description,
            date,
            location,
            creator,
            vendors,
            budget,
            attendees,
            type,
            isPrivate
        } = req.body;
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
