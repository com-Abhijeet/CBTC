import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  coverBanner: String,
  isPrivate: {
    type: Boolean,
    default: false,
  },
  host: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    altContact: String,
    status: {
      type: String,
      default: 'Invited',
    },
  },
  vendors: [{
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: String,
    cost: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
  }],
  ticketPrice :{
    type: Number,
    default : 800
  }

});

export default mongoose.model('Event', eventSchema);