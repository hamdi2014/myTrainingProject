const router=require('express').Router();
const Alarm=require('./alarm.model');
const path=require('path');

router.get('/',async(req,res,next)=>{
    try {
        const alarms=await Alarm.find();
        if(!alarms || alarms.length<1){
            throw new Error('No alarms yet!');
        }else{
            console.log(alarms);
            
            res.render('allAlarms',alarms);
        }
    } catch (error) {
        next(error)
    }
    
})
router.get('/turbine',async(req,res,next)=>{
    try {
        const tbAlarms=await Alarm.find({section:"turbine"});
        if(!tbAlarms || tbAlarms.length<1){
            throw new Error('No alarms yet!')
        }else{
            res.send(tbAlarms);
        }
    } catch (error) {
        next(error)
    }
})

router.get('/boiler',async(req,res,next)=>{
    const boilerAlarms=await Alarm.find({section:"boiler"});
    if(!boilerAlarms || boilerAlarms.length<1){
        res.send('No alarms yet!')
    }else{
        res.send(boilerAlarms);
        console.log(boilerAlarms[0].title);
    }
})

router.post('/add',async(req,res,next)=>{
    try {
        console.log(req.body.title);
        console.log(req.body.section);
        console.log(req.body.system);
        console.log(req.body)
        if(!req.body.title || !req.body.section || !req.body.system){
            throw new Error('Required fields are Empty!')
        }
        const alarm=await new Alarm({
            title: req.body.title,
            kind: req.body?.kind,
            boxNo: req.body?.boxNo,
            lampNo: req.body?.lampNo,
            description: req.body?.description,
            section: req.body.section,
            system: req.body.system,
            device: req.body?.device,
            sensor: req.body?.sensor,
            limit: req.body?.limit,
            causes: req.body?.causes,
            reqActions: req.body?.reqActions
        }).save();
        res.json(alarm);
        console.log('alarm successfully saved!');
    } catch (error) {
        next(error)
    }
})

router.get('/add',(req,res,next)=>{
    try {
        res.render('addAlarm');
    } catch (error) {
        next(error)
    }
});

module.exports=router