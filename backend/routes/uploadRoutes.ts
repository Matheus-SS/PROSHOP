import path from 'path';
import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import fs from 'fs';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, 'backend/uploads');
  },
  filename(request, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) {
  const fileTypes = /jpg|jpeg|png/;
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return callback(null, true);
  } else {
    return callback(new Error('Images only!'));
  }
}

// compress the image based on type /jpg|png|jpeg/
function checkFileTypeToCompress(file: Express.Multer.File) {
  const fileType = path.extname(file.originalname);
  let data;

  if (fileType === '.jpg' || fileType === '.jpeg') {
    data = sharp(file.path).jpeg({ quality: 50 });
    return data;
  } else if (fileType === '.png') {
    data = sharp(file.path).png({ quality: 50 });
    return data;
  }
}

const upload = multer({
  storage,
  fileFilter: function (request, file, callback) {
    checkFileType(file, callback);
  },
});

uploadRouter.post(
  '/',
  upload.single('image'),
  asyncHandler(async (request: Request, response: Response) => {
    const { filename: image } = request.file;

    const compressedImageFolder = path.resolve(
      request.file.destination,
      'compressed',
      image
    );
    const data = checkFileTypeToCompress(request.file);

    //send the image compressed to a folder's name compressed
    await data?.toFile(compressedImageFolder);

    //remove the file from upload paste
    await fs.promises.unlink(request.file.path);

    const uploadPhoto = await cloudinary.v2.uploader.upload(
      compressedImageFolder
    );

    //remove the file from compressed paste
    await fs.promises.unlink(
      path.resolve(request.file.destination, 'compressed', image)
    );

    // console.log(uploadPhoto); // This will give you all the information back from the uploaded photo result
    // console.log(uploadPhoto.url); // This is what we want to send back now in the  res.send
    return response.send(uploadPhoto);
  })
);

export default uploadRouter;
