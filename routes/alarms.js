const router=require('express').Router();
const Alarm=require('../models/alarm.model');
const path=require('path');
const api = require('../api/alarm');


const filter = (search) => {
    const condition = { $regex: '.*' + search + '.*' }
    return [
                {title: condition}, 
                {kind: condition},
                {boxNo: condition},
                {lampNo: condition},
                {description: condition},
                {section: condition},
                {system: condition},
                {device: condition},
                {sensor: condition},
                {limit: condition},
                {causes: condition},
                {reqActions: condition}
            ]
} 

router.get('/', api.getAlarms);
router.post('/', async(req, res, next) => {
    try {
        const perPage = 10;
        let page = req.query.page || 1;
        const search = req.body.search;
        const section = req.body.section;
        let count = await Alarm.count();
        if (!search) {
            throw new Error("Required field Empty!")
        }
        let alarms;
        if (section) {
            alarms = await Alarm.find({section: req.body.section, $or: filter(search)}).skip((perPage*page)-perPage).limit(perPage);
            count = alarms.length;
        } else {
            alarms = await Alarm.find({$or: filter(search)}).skip((perPage*page)-perPage).limit(perPage);
            count = alarms.length;
        }
        if(!alarms || alarms.length<1){
            throw new Error('Not found!');
        }else{
            console.log(Math.ceil(count / perPage))
            res.render('allAlarms',{alarms: alarms, section: req.body.section, current: page, pages: Math.ceil(count / perPage)});
        }
    } catch (error) {
        next(error)
    }
    
})
router.get('/show-details', api.getDetails);

router.get('/test', (req, res, next) => {
    res.render('showAlarm')
})

router.post('/add',async(req,res,next)=>{
    try {
        console.log(req.body.title);
        console.log(req.body.section);
        console.log(req.body.system);
        console.log(req.body.type)
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
        console.log('alarm successfully saved!');
        res.redirect('/alarms/add');
    } catch (error) {
        next(error)
    }
})

router.get('/add',async(req,res,next)=>{
    try {
        res.render('addAlarm');
    } catch (error) {
        next(error)
    }
})

module.exports=router