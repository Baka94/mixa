
import { useEffect, useContext, useRef, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
//import TimelineContext, { TimelineContextProvider } from "../../logic/contexts/TimelineContext.js";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js";

import Timeline from "../components/Timeline.js"
import EditorPreview from "../components/EditorPreview.js"
import AppDataContext from "../../logic/contexts/AppDataContext.js";
import { createProject } from "../../linkers/DirectoryFunctions.js";

function EditorsPage() {

  const history = useHistory();
  const {loadedProject} = useContext(AppDataContext);

  const [seqs, setSeqs] = useState();
  const [prevSeqs, setPrevSeqs] = useState(null);
  const [selectedSeqP, setSelectedSeqP] = useState(0);

  const [currentT, setCurrentT] = useState(0);
  const [seqT, setSeqT] = useState(0);

  const [update, setUpdate] = useState(false);

  useEffect(()=>{
    if(loadedProject){ 
      setSeqs(loadedProject.seqs);
      console.log(loadedProject);
    }
    else setSeqs(null);
  },[loadedProject]);

  function updateSelection(position){
    //let seqIndex = findIndex(seqs, id);
    setSelectedSeqP(position);
  }

  function updateSeq(scrollXs, index, action){
    let newSeqs = makeNewSeqs(seqs, scrollXs, index, action);
    setUpdate(!update);
    setSeqs(newSeqs);
  }

  const [videoSrc, setVideoSrc] = useState();

  useEffect(()=>{
    let index = null;
    seqs?.map( (item, i) => {
      if (item.start < currentT && item.end > currentT){
        index = i;
        return;
      }
    });
    if(index !== null ){ 
      setVideoSrc(seqs[index].src);
      setSeqT(currentT-seqs[index].start);
    }else{
      setVideoSrc(null);
    }
  }, [currentT, seqs]);


  function saveCurrentProject(){
    let pData = {
      "title":loadedProject.title, 
      "seqs": seqs
    }
    createProject(loadedProject.title, pData);
    history.goBack();
  }

  return (
    <div className="full-vw full-vh flex-v flex-c bc-2 no-over" >

      <div className="relative full-w flex-c" style={{height:"70%"}}>

        <div className="p-a-s absolute flex-v left0 top0" style={{alignItems: "flex-start"}}>
          <div className="flex-c m-b-xs">
            <div className="btn-square-m-accent2 m-r-xs">
              <h3 className="i-s-m flex-c">G</h3>
            </div>
            <div className="btn-square-m-accent2">
              <SvgIcons iconName={"diamond-yellow"} />
            </div>
          </div>
          <div className="btn-square-m-accent3 m-b-xs">
            <SvgIcons iconName={"settings"} />
          </div>
          <div className="btn-square-m-accent3" onClick={saveCurrentProject}>
            <SvgIcons iconName={"back"} />
          </div>
        </div>

        <div className="p-a-s absolute flex-c top0">
          <div className="btn-square-m-accent3">
            <h5>{loadedProject?.title}</h5>
          </div>
        </div>

        <div className="p-a-s absolute flex-c bottom0">
        <div className="btn-square-m-accent3">
            <SvgIcons iconName={"undo"} />
          </div>
          <div className="btn-square-m-accent3 m-l-xs m-r-xs">
            <SvgIcons iconName={"add-frame"} />
          </div>
          <div className="btn-square-m-accent3">
            <SvgIcons iconName={"redo"} />
          </div>
        </div>

        <div className="p-a-s absolute right0 top0">
          <div className="btn-square-m-accent2">
            <SvgIcons iconName={"export"} />
            <h5 className="fw-5 m-l-xs"> Export </h5>
          </div>
        </div>

          <EditorPreview src={videoSrc} seqT={seqT} />
      </div>

      <div className="relative full-w" style={{height:"30%"}}>
        <Timeline seqs={seqs} updateSeq={updateSeq} update={update} setCurrentT={setCurrentT} />
      </div>


    </div>
  );
}
export default EditorsPage;

function findIndex(array, x){
  let index = 0;
  array.map( (item, i) => {
    if (item.id === x){
      index = i;
      return;
    }
  });
  return index;
}

function makeNewSeqs(newSeqs, scrollXs, index, action){
  if(scrollXs < 0) scrollXs=0;
  switch(action){
    case "move":
      let newLenght = newSeqs[index].end - newSeqs[index].start;
      if(scrollXs > newSeqs[index-1]?.end && scrollXs < newSeqs[index-1]?.end+2)
        scrollXs = newSeqs[index-1]?.end;
      if(scrollXs+newLenght > newSeqs[index+1]?.start-2 && scrollXs+newLenght < newSeqs[index+1]?.start)
        scrollXs = newSeqs[index+1]?.start-newLenght;
      newSeqs[index].end = scrollXs+newLenght;
      newSeqs[index].start = scrollXs;
      if(newSeqs[index].end > newSeqs[index+1]?.start){
          newSeqs = makeNewSeqs(newSeqs, scrollXs+newLenght, index+1, action);
      }
      if(newSeqs[index-1]?.end > newSeqs[index].start){
        let newLenght2 = newSeqs[index-1]?.end - newSeqs[index-1]?.start;
        newSeqs = makeNewSeqs(newSeqs, scrollXs-newLenght2, index-1, action);
      }
      break;
    case "start":
      if(scrollXs >  newSeqs[index].end-1) scrollXs=newSeqs[index].end-1;
      if(scrollXs > newSeqs[index-1]?.end && scrollXs < newSeqs[index-1]?.end+2)
        scrollXs = newSeqs[index-1]?.end;
      newSeqs[index].start = scrollXs;
      if(newSeqs[index-1]?.end > newSeqs[index].start){
        let newLenght2 = newSeqs[index-1]?.end - newSeqs[index-1]?.start;
        newSeqs = makeNewSeqs(newSeqs, scrollXs-newLenght2, index-1, "move");
      }
      break;
    case "end":
      if(scrollXs <  newSeqs[index].start+1) scrollXs=newSeqs[index].start+1;
      if(scrollXs > newSeqs[index+1]?.start-2 && scrollXs < newSeqs[index+1]?.start)
        scrollXs = newSeqs[index+1]?.start;
      newSeqs[index].end = scrollXs;
      if(newSeqs[index].end > newSeqs[index+1]?.start ){
        newSeqs = makeNewSeqs(newSeqs, newSeqs[index].end, index+1, "move");
      }
      break;
    case "transition":
      if(newSeqs[index].end >= newSeqs[index+1]?.start){
        newSeqs[index+1].start = scrollXs;
      }
      newSeqs[index].end = scrollXs;
      break;
  }
  return newSeqs;
}