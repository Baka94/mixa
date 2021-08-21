import axios from "axios";


/* User data loading */

export async function loadAppData(setAppData){
    axios.get("http://localhost:5000/loadAppData/"
    ).then(res => {
        setAppData(res.data.appData);
    }) 
}

export async function loadUserData(setUserData, setRecentData, userId){
    axios.post("http://localhost:5000/loadUserData/", {userId: userId}
    ).then(res => {
        setRecentData(res.data.recentData);
        setUserData(res.data.userData);
    }) 
}

/* General purpose */


/* Single project */

export async function loadProject(projectId, userId, setloadedProject){
    axios.post("http://localhost:5000/loadProject/", {projectId, userId}
    ).then(res => {
        setloadedProject(res.data.project);
    }) 
}

export async function deleteProject(projectId, userId, setRecentData){
    axios.post("http://localhost:5000/deleteProject/", {projectId, userId}
    ).then(res => {
        if(res.data.status){
            setRecentData(res.data.recentData);
            console.log("project deleted");
        } 
    })
}

export async function createProject(projectName, projectData){
    axios.post("http://localhost:5000/createProject/", {projectName:projectName, projectData:projectData}
    ).then(res => {
        if(res){
            console.log("Project created");
        }
        else{
            console.log("Error creating project");
        }
    })
}

