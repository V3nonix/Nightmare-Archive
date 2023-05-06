const { S3Client, PutObjectCommand, DeleteObjectCommand, HeadBucketCommand } = require('@aws-sdk/client-s3');
const errorHandler = require('../utils/errorHandler');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function uploadFile(file) {
    const key = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });
    try {
        const res = await s3.send(command);
        console.log(`\x1B[32mSuccess! \u001b[0m| File uploaded successfully to ${res.Location}`);
        return {key, url: res.Location};
    } catch (err) {
        errorHandler(__dirname, __filename, 'upload', err);
        throw new Error('Error uploading file to S3')
    }
}

async function deleteFile(key) {

}

async function checkS3Bucket() {
    try {
        const params = { Bucket: process.env.AWS_S3_BUCKET };
        await s3.send(new HeadBucketCommand(params));
        console.log(`\x1B[32mSuccess! \u001b[0m| Bucket [${process.env.AWS_S3_BUCKET}] exists and is accessible.`)
        return true;
    } catch (err) {
        if (error.code === 'NotFound'){
            console.error(`${process.env.AWS_S3_BUCKET}\x1B[31mDoes not exist!`);
        } else {
            console.error(`\x1B[31mAWS S3 Connection error! \u001b[0m| Bucket: ${process.env.AWS_S3_BUCKET} | \x1B[31m`, err);
        }
        return false;
    }
}

module.exports = {
    uploadFile,
    checkS3Bucket,
}