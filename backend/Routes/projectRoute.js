const express = require("express");
// const {createPorjectController, getAllProjectController} = require('./../Controllers/projectController')
const upload = require('../Middleware/multerConfig.js')
const {createProjectController , getAllProjectController} = require("../Controllers/projectController")
const uploadImageToCloudinary = require('../Middleware/cloudinaryMiddleware')
const router= express.Router();

router.post('/add-project', upload.single('image'), uploadImageToCloudinary, createProjectController);

router.get("/",getAllProjectController);


module.exports= router;

