import { useRef, useState } from "react";
import { useHistory } from "react-router";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"

import { createProject } from "../../linkers/DirectoryFunctions.js"


export function NewProject(props) {

    const history = useHistory();
    const [pName, setPName] = useState("");
    const pNameRef = useRef();

    function create(){
        let pData = {
            "title":pName, 
            "seqs": [
                {
                    "position": 0,
                    "id": "id-clip-3",
                    "title":"Doggos doing zoomies",
                    "src": "https://socialflowagency.com/wp-content/uploads/2021/04/Dog-Resting-On-Grass-Field.mp4",
                    "start": 10,
                    "end": 15 
                }
            ]
        }
        createProject(pName, pData);
        history.push("/studio");
    }

return (
    <div className="full-w">
        <div className="p-l-m p-r-m p-t-l">
            <div className="full-w flex-c tc-2 relative m-b-m">
                <div className="btn-round-xs-basic no-stroke b-c1 absolute left0" >
                    <SvgIcons iconName={"back"} />
                </div>
                <h3 className="fw-6">Create new project</h3>
                <div className="btn-round-xs-basic no-stroke b-c1 absolute right0" >
                    <SvgIcons iconName={"info"} />
                </div>
            </div>
        </div>
        <div className="p-l-m p-r-m flex-v-to-h">
            <div className="full-w flex-sb m-b-m">
                <input ref={pNameRef} className="input-l full-w" type="text" value={pName} placeholder="Project name" onChange={(e)=>setPName(e.target.value)}/>
                <div className="btn-round-m-basic no-stroke m-l-s" onClick={()=>pNameRef.current?.focus()}>
                    <SvgIcons iconName={"edit"} />
                </div>
            </div>
            <div className="full-w flex-sb m-b-m">
                <div className="flex-c">
                    <div className="btn-square-m-accent">
                        <SvgIcons iconName={"folder"} />
                    </div>
                    <div className="flex-v m-l-s">
                        <h6 className="tc-2">Dashboard / folder /</h6>
                        <h4 className="fw-6">
                            Current folder
                        </h4>
                    </div>
                </div>
                <div className="btn-round-m-basic no-stroke m-l-s">
                    <SvgIcons iconName={"edit"} />
                </div>
            </div>
        </div>

        <div className="">
            <h4 className="p-l-m fw-5 tc-2">Select formats</h4>
            <div className="full-w p-l-m p-r-m flex scroll-x p-t-s p-b-s no-over-y">
                
                <div className="point box-l m-r-m box-h-xl bc-2 br-a-m relative" style={{minWidth:"200px"}}>
                    <div className="top0 left0 absolute p-a-s">
                        <h4> Portrait </h4>
                        <h6>9:16</h6>
                    </div>
                    <div className="top0 right0 flex-v absolute p-a-s">
                        <div className="btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"tiktok"} />
                        </div>
                        <div className="m-t-s btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"instagram"} />
                        </div>
                        <div className="m-t-s btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"instagram-reel"} />
                        </div>
                        <div className="m-t-s btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"instagram-story"} />
                        </div>
                    </div>
                </div>

                <div className="point box-l m-r-m box-h-xl bc-2 br-a-m relative" style={{minWidth:"200px"}}>
                    <div className="top0 left0 absolute p-a-s">
                        <h4> Landscape </h4>
                        <h6>16:9</h6>
                    </div>
                    <div className="top0 right0 flex-v absolute p-a-s">
                        <div className="btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"youtube"} />
                        </div>
                        <div className="m-t-s btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"facebook"} />
                        </div>
                    </div>
                </div>

                <div className="point box-l m-r-m box-h-xl bc-2 br-a-m relative" style={{minWidth:"200px"}}>
                    <div className="top0 left0 absolute p-a-s">
                        <h4> Square </h4>
                        <h6>1:1</h6>
                    </div>
                    <div className="top0 right0 flex-v absolute p-a-s">
                        <div className="btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"instagram"} />
                        </div>
                        <div className="m-t-s btn-round-xs-grey no-stroke m-l-s">
                            <SvgIcons iconName={"facebook"} />
                        </div>
                    </div>
                </div>

                <div className="point box-l m-r-m box-h-xl bc-2 br-a-m relative" style={{minWidth:"200px"}}>
                    <div className="top0 left0 absolute p-a-s">
                        <h4> Custom </h4>
                        <h6>x:y</h6>
                    </div>
                </div>

                <div className="point box-s box-h-xl br-a-m relative" style={{minWidth:"1rem"}}>
     
                </div>

            </div>
        </div>


        <div className="p-l-m p-r-m p-b-l">
            <div className="full-w flex-c m-t-m" style={{display: "one"}}>
                <div className="btn-tictac-blue" onClick={create}> 
                    <h4 className=""> Create </h4> 
                </div>
            </div>
        </div>

    </div>
  );
}