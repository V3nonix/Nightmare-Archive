# Nightmare-Archive

### Getting Started:
  [Launch the app!](https://nightmare-archive.herokuapp.com/)
  <br/><br/>
  After login or sign-up, you can upload images, along with a small description and title.

### Resources:
*TECHNOLOGIES:*
<br/>
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<br/>*LANGUAGES:*<br/> 
![HTML Logo.](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "HTML Logo")
![JavaScript Logo.](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black "JS Logo")
![CSS Logo.](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white "CSS Logo")
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
<br/>*PROGRAMS:*<br/>
![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
![VSC Logo.](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white "VSC Logo")
![GIMP Logo.](https://img.shields.io/badge/gimp-5C5543?style=for-the-badge&logo=gimp&logoColor=white "GIMP Logo")
<br/>*HOSTING:*<br/> 
![MongoDb.](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white "MongoDb")
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white "Heroku")
<br/>*OTHER:*<br/> 
[![GitHub](https://badgen.net/badge/icon/github?icon=github&label)](https://github.com)
[![Npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://https://npmjs.com/)
<br/>Resource Links:<br/>
| [ERD](https://lucid.app/documents/view/627718e7-8ae5-4374-afea-944f3a0bad44) |-----| [Wire Frames](https://whimsical.com/nightmarearchive-LxiehSykgMvmzTJQTJkje2) |-----| [Trello](https://trello.com/b/RmEfioWy/nightmarearchive) |<br/>
### Description:
  This application allows authenticated users to upload images along with a small description and title. These images are persisted within an AWS S3 bucket, and are only accessible via a signed URL, with a hour long expiration, routed through an AWS CloudFront distribution. This means that these images are not available to the public so long as this URL is not shared. 
<br/><br/>
**CODE BLOCKS:**
<details>
Code I am most proud of:
  
```
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
        ContentType: file.mimetype
    });
    try {
        await s3.send(command);
        console.log('\x1B[32mSuccess! \u001b[0m| File uploaded successfully.');
        return {key, url: `${process.env.AWS_CLOUDFRONT_URL}/${key}`}
    } catch (err) {
        errorHandler(__dirname, __filename, 'uploadFile', err);
        throw new Error('Error uploading file to S3');
    }
}

async function deleteFile(key) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key   
    });
    try {
        const res = await s3.send(command);
        console.log(`\x1B[32mSuccess! \u001b[0m| File deleted successfully.`);
        return res;
    } catch (err) {
        errorHandler(__dirname, __filename, 'deleteFile', err);
        throw new Error('Error deleting file from S3')
    }
}

async function checkS3Bucket() {
    try {
        const params = { Bucket: process.env.AWS_S3_BUCKET };
        await s3.send(new HeadBucketCommand(params));
        console.log(`\x1B[32mSuccess! \u001b[0m| Bucket [${process.env.AWS_S3_BUCKET}] exists and is accessible.`);
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
```
Code I struggled with:
  
```

export async function sendPostData(reqFormData) {
    const headers= {
        'Content-Type': 'multipart/form-data',
    }
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    try {
        const response = await axios.post(`${BASE_URL}/create`, reqFormData, {headers});
        return response.data;
    } catch (err) {
        throw err;
    }
}
```
</details>
<br/>
  
### Screenshots:
Auth Page<br/>
<img src="https://github.com/V3nonix/Nightmare-Archive/assets/124533881/9902cccd-16c7-4b2b-bd38-a39ec1484b55"  width="60%" height="30%">
<br/>User Page<br/>
<img src="https://github.com/V3nonix/Nightmare-Archive/assets/124533881/5f595515-e95b-4684-8a8d-0ff2b0c297b8"  width="60%" height="30%">
<br/>Post Page<br/>
<img src="https://github.com/V3nonix/Nightmare-Archive/assets/124533881/b5afb13e-e058-4ed8-8e30-524cc63f81ff"  width="60%" height="30%">

### Roadmap:
<br/>1. Allow users to toggle posts between public and private.
<br/>2. Enable users to view other's posts.
<br/>3. Make users able to comment on other's posts.
<br/>4. Have functionality for users to react to other's posts.
<br/>5. Record how many times a post has been viewed.
