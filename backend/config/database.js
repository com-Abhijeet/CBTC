import { connect } from 'mongoose';

const Database=()=>{
connect('mongodb+srv://shindeabhijeet552:Abhijeet143d!@cluster0.pfzykwx.mongodb.net/EventPlanner360?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
export default Database;

