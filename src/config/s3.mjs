import "dotenv/config";
import { S3 } from "../../globalExports.mjs";
import { nanoid } from "nanoid";

const bucketName = process.env.AWS_BUCKET_NAME;

const region = process.env.AWS_BUCKET_REGION;

const accessKeyId = process.env.AWS_ACCESS_KEY;

const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadFile = (file) => {
  let fileType = file.originalname.split(".")[1];
  let fileName = nanoid();
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: `${fileName}.${fileType}`,
  };

  return s3.upload(uploadParams).promise();
};
export { uploadFile};
