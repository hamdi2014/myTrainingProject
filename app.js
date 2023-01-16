const express=require('express')
const app=express()
const alarmsRout=require('./routes/alarms');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const path=require('path');
const cors = require('cors');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/alarms',(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('DB is connected...')
    }
});

app.use(morgan('tiny'));

const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}
 
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/',(req,res,next)=>{
    res.render('alarms')
})

app.get('/home', (req, res, next) => {
    res.render('home')
})

app.get('/documents', (req, res, next) => {
    res.render('documents')
})

app.get('/documents/turbine', (req, res, next) => {
    res.render('turbine')
})

app.get('/documents/turbine/cap', (req, res, next) => {
    res.render('cap')
})

app.use('/alarms',alarmsRout);

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.render('error', {error: err})
})

app.listen(3000,'localhost',()=>{
    console.log('listening on port 3000...')
})