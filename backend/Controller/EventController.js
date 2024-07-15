import Event from "../Model/event.js";

export const createEvent = async (req, res) => {
    try {
      const {
        name,
        description,
        date,
        time,
        location,
        creator,
        budget,
        type,
        coverBanner,
        isPrivate,
        host,
        vendors,
      } = req.body;
  
      const newEvent = new Event({
        name,
        description,
        date,
        time,
        location,
        creator,
        budget,
        type,
        coverBanner,
        isPrivate,
        host,
        vendors,
      });
  
      await newEvent.save();
  
      res.status(200).json({ message: 'Event created successfully', event: newEvent });
      console.log(newEvent);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Error creating event', error: error.message });
    }
  };

export const getEvents = async (req,res) =>{
    try{
        const events = await Event.find();
        return res.status(200).json({
            events
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error', 
        })
    }
}

export const getEventBYId = async (req, res) => {
    try {
        const { _id } = req.params;
        
        // Log the incoming request parameters
        console.log("Request params:", req.params);
        console.log("id in server:", _id);

        // Check if _id is defined and not empty
        if (!_id) {
            console.error("No _id provided in request params");
            return res.status(400).json({
                message: 'Bad Request: No _id provided'
            });
        }

        // Attempt to find the event by _id
        const event = await Event.findById(_id);

        // Check if the event was found
        if (!event) {
            console.error("Event not found for _id:", _id);
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        // Return the found event
        return res.status(200).json({ event });
    } catch (error) {
        // Log the error and return a 500 status
        console.error("Error in getEventBYId:", error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
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
        
        const isEvent = await Event.findById(id);
        if(!isEvent){
            res.status(400).json({
                message : 'NO Event Found!'
            })
        }
        else{
            const updatedEvent = {
                name : name,
                description : description,
                date : date,
                location : location,
                creator : creator,
                vendors : vendors,
                budget : budget,
                attendees : attendees,
                type : type,
                isPrivate : isPrivate  
            }
            updatedEvent.save().then(()=>{
                res.status(200).json({
                    message : 'Event updated'
                })
            });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

