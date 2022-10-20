const express = require('express');
const app = express();
let cors = require("cors");
const s3Controller = require('./src/s3-controller');

// app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.post('/upload-to-s3',s3Controller.s3Upload);

app.post('/delete-from-s3',s3Controller.s3Delete);

app.get('/list', s3Controller.s3Get);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('App running on port:'+PORT);
});
// module.exports = router