const Alarm = require('../models/alarm.model');

const getAlarms = async(req,res,next)=>{
    try {
        const perPage = 10;
        let page = req.query.page || 1;
        let section;
        let alarms;
        let count = await Alarm.count();
        console.log('--------------------------------------------------')
        console.log(req.query.section);
        console.log(page);
        console.log('--------------------------------------------------')
        if(req.query.section){
            section = req.query.section;
            count = await Alarm.find({section: req.query.section}).count()
            alarms = await Alarm.find({section: req.query.section}).skip((perPage*page)-perPage).limit(perPage);
            section = JSON.stringify(section).toUpperCase();
            section = JSON.parse(section);
        }else{
            alarms=await Alarm.find().skip((perPage*page)-perPage).limit(perPage);
        }
        if(!alarms || alarms.length<1){
            throw new Error('No alarms yet!');
        }else{
            console.log(count)
            console.log(Math.ceil(count / perPage))
            res.render('allAlarms',{alarms: alarms, section, current: page, pages: Math.ceil(count / perPage)});
        }
    } catch (error) {
        next(error)
    }
};

const getDetails = async(req, res, next) => {
    try {
        if(!req.query.id){
            throw {
                message: 'Bad Request!',
                status: 204
            }
        }
        const alarm = await Alarm.findById(req.query.id);
        console.log(alarm)
        res.render('test',{alarm: alarm});
    } catch (error) {
        console.log(error.status)
       next(error);
    }
}

const alarmApi = {
    getAlarms,
    getDetails
};

module.exports = alarmApi;