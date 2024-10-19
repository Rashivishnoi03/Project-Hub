const Project= require("../Models/projectModel");


const createProjectController = async (req,res)=>{

    try {
        
        const data = req.body;
        const images = data.image
           console.log("from the project controller",images)
        const project = new Project(data);
        await project.save();

        res.status(200).json({
            success:"true",
            message:"Successfully Project added!!",
            project:data
        })
    } catch (error) {
        // res.status(400).json({
        //     success:"false",
        //     message:`Error: ${error.message}`
        // }) 
        console.log(error.message)
    }

}

const getAllProjectController = async (req,res)=>{
    try {
        const allProject = await Project.find();
        // console.log(allProject);

        res.status(200).json({
            success: true,
            message: "Projects retrieved successfully",
            projects: allProject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
        console.log(error.message);  
    }
}

module.exports = {createProjectController, getAllProjectController};