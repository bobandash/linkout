const { S3 } = require('aws-sdk');
const uuid = require('uuid').v4;
require('dotenv').config();

exports.s3Uploadsv2 = async (file) => {
  try {
    const s3 = new S3();
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
      ContentDisposition: 'inline',
    };
    const result = await s3.upload(params).promise();
    return result;
  } catch (error) {
    console.error('Error during S3 upload:', error);
    throw Error;
  }
};
