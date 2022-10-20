const formidable = require('formidable');
const { deleteFromS3Bucket } = require('./s3-service');
const {uploadFileToS3} =  require('./s3-service');

async function s3Upload (req, res){
     const formData = await readFormData(req);
    try{
        await uploadFileToS3(formData.file, 'mybucket-21232313');
        res.send( 'Uploaded!!'+formData);
    }catch(ex) {
        res.send('ERROR!!!!'+ex);
    }
}

async function s3Get (req, res) {
    try{
        const bucketData = await getBucketListFromS3('mybucket-21232313');
        const {Contents = []} = bucketData;
        res.send(Contents.map(content=>{
        return{
            key: content.Key,
            size: (content.Size/1024).toFixed(1) + ' KB',
            lastModified: content.LastModified
        }
    }));

    }catch(ex) {
       res.send([]);
    }
}

async function readFormData(req){
     return new Promise(resolve=>{
        const data0bj  = {};
        var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('file', (name, file) =>{
            data0bj.name = name;
            data0bj.file = file;
        });

        form.on('end',() => {
            resolve(data0bj);
         });
    });
}

async function s3Delete (req, res){
    const formData = await readFormData(req);
    try{
        // console.log(formData.fileName);
        await deleteFromS3Bucket(formData.fileName, 'mybucket-21232313');
        res.send( 'Deleted!!');
    }catch(ex) {
        res.send('ERROR!!!!');
    }
}

module.exports={
    s3Get,
    s3Upload,
    s3Delete
}
