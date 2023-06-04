const mongoose=require('mongoose');


const accidentSchema=new mongoose.Schema({

    date_time:{
        type: Date,
        default:Date.now
    },

    location: {
        type:{
            type:String,
            required:true
        },
        coordinates: {
            type: [Number],
            required:true
        }
    },

    videos: [{
        url: {
            type: String,
            required: true
        }
    }],

    pictures: [{
        url: {
            type: String,
            required: true
        }
    }],
    
    audio: [{
        url: {
            type: String,
            required: true
        }
    }],
    
});

// adding a 2dsphere index to the location field for geospatial queries

accidentSchema.index({location: '2dsphere'});

module.exports=mongoose.model('accidents',accidentSchema);
