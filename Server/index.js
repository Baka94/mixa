const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")
const fs = require("fs")
const { finished } = require("stream")

const app = express()

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(express.static('public'))

//Set up express file-upload
app.use(fileUpload())

//Set up CORS
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

//Set up PORT and start server
const PORT = 5000
app.listen(PORT, ()=> console.log("App is listening on port "+PORT) )


// Env variables
DIRECTORY_FORMATS = "public/data/formats"


//------------------------------------------------

//Set up routes
app.get('/',(req, res) => {
    res.send("Hello World")
})

// Load all formats
app.get( '/formats', (req, res) => {
    let formats = [];
    let i = 0;
    fs.readdirSync(path.resolve(__dirname, DIRECTORY_FORMATS)).map(
        (child) => {
            let file = fs.readFileSync(path.resolve(__dirname, DIRECTORY_FORMATS, child));
            formats[i] = JSON.parse(file);
            i++;
        })
    res.send(formats);
})


app.post('/upload', async (req, res) => {
    //res.json("Kinda works")
        if(!req.files){
            return res.status(500).send({ msg: "file is not found" })
        }
        const myFile = req.files.file
        
        myFile.mv(`${__dirname}/public/${myFile.name}`, function (err){
            if (err){
                console.log(err)
                return res.status(500).send({ msg: "Error occured" })
            }
            return res.send({name: myFile.name, path: `/${myFile.name}`});
        })
})



function dirTree(directoryPath){
    let stats = fs.lstatSync(path.resolve(__dirname, directoryPath));
    let info = {
        path: directoryPath,
        name: path.basename(directoryPath)
    };

    if(stats.isDirectory()){
        info.type = "folder";
        info.children = fs.readdirSync(path.resolve(__dirname, directoryPath)).map(
            function (child){
                return dirTree(directoryPath+"/"+child)
            }
        );
    }else{
        info.type = "project"
    }
    return info;
}

// Load app data at page load (formats, popular templates, for-you content, news, pro plans)

// Load user data at log in (recent files, configuration and profile for fast UI set-up)
app.post('/loadUserData', async (req, res) => {
    let userPath = path.resolve(__dirname, 'public/users', req.body.userId);

    let configurationPath = path.resolve(userPath, "configuration.json",);
    let profilePath = path.resolve(__dirname, 'public/users', req.body.userId+"/profile.json",);
    let recentDataPath = path.resolve(userPath, "data/recentData.json",); 

    let userData = {};
    userData.profile = JSON.parse(fs.readFileSync( profilePath ));
    userData.configuration = JSON.parse(fs.readFileSync( configurationPath ));
    let recentData = JSON.parse(fs.readFileSync( recentDataPath ));

    res.send({userData, recentData});
})


// Single project

app.post('/loadProject', async (req, res) => {
    try{
        let projectsPath = path.resolve(__dirname, 'public/users', req.body.userId, "data/projects");
        let project = null;
        let files = fs.readdirSync(projectsPath);
        files.map((file)=>{
            if(file ===  req.body.projectId+".json"){
                project = JSON.parse( fs.readFileSync( path.resolve(projectsPath, file) ) );
                return;
            }
        });
        res.send({project});
    }catch{
        res.status(500);
    }
})

app.post('/deleteProject', async (req, res) => {
    try{
        // Delete project from projects folder
        let projectsPath = path.resolve(__dirname, 'public/users', req.body.userId, "data/projects");
        fs.unlinkSync( path.resolve(projectsPath, req.body.projectId+".json") );

        // Delete project from recent data file
        let recentDataPath = path.resolve(__dirname, 'public/users', req.body.userId, "data/recentData.json");
        let recentData = JSON.parse(fs.readFileSync(recentDataPath));
        recentData.projects = recentData.projects.filter((project)=>{ 
            return project.id != req.body.projectId; 
       });
       let writeRecentData = JSON.stringify(recentData, null, 2);
       fs.writeFileSync(recentDataPath, writeRecentData, {flag: 'w'});

        res.send({status: true, recentData});
    }catch{
        res.status(500);
        console.log("bad");
    }
})

app.post('/createProject', async (req, res) => {
    try{
        let newPath = path.resolve(__dirname, 'public/projects', req.body.projectName+".JSON",); 
        let newData = JSON.stringify(req.body.projectData, null, 2);
        fs.writeFileSync(newPath, newData, {flag: 'w'});
        res.send(true);
        return;
    }catch{
        res.send(false);
        return;
    }
})


// Library

app.put('/deleteFile', async (req, res) => {
    try{
        fs.unlinkSync( path.resolve(__dirname, 'public/projects', req.body.file) );
        res.send(true);
    }catch{
        res.status(500);
    }
})





