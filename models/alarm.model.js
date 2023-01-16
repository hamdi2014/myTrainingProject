const mongoose=require('mongoose');

const alarmSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    kind: {
        type: String
    },
    boxNo: String,
    lampNo: String,
    description: String,
    section:{
        type:String,
        required:true
    },
    system:{
        type:String,
        required:true
    },
    device: String,
    sensor: String,
    limit: String,
    causes: String,
    reqActions: String
});

module.exports=mongoose.model('Alarm',alarmSchema);