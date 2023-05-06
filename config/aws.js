const { S3Client, PutObjectCommand, DeleteObjectCommand, HeadBucketCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function upload(file, id) {
    const params = {
        
    }
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
    checkS3Bucket,
}