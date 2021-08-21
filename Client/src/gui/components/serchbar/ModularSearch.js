import { useEffect, useRef, useState } from "react";
import "../../choa/choa.sass"
import SvgIcons from "../../icons/SvgIcons.js"

export function ModularSearch( { tabDetails,  searchOptionsList} ) {
    /* props
    Search options:
        searchOptionsList:[
            {
                id: "stock-source-selection-1"
                title: "Sources"
                type: "circles"
                multiSelect: true
                primaryEdit: false
                fastEdit: true
            }   
        ]

    Tab details:
        tabDetails:{
            id: "library-search-1"
            title: "Library"
        }   
    */

    const [currentView, setCurrentView] = useState("initial"); 
    /*  view and setView
    initial: initial view when initialized
    search: reduced search view on top while search results are displayed
    fast-edit: view displaying options to change on the fly
    full-edit: view displaying all editing options
    */
    function updateView(newView){
        setCurrentView(newView);
    }

    const [conditions, setConditions] = useState([{id:0, value:"none"}]);
    let isSearchable = false;
    useEffect(()=>{

        let initialConditions = searchOptionsList.map((option)=>{
                if(option.type === "searchBar") isSearchable = true;
                return ({id: option.id, value: option.defaultValue});
            });
        setConditions(initialConditions);
        
    },[])

    
    function updateConditions(id, newValue){
        setConditions( (previousState)=>{
            let updatedConds;
            let prevState = previousState;
            if( prevState.find(el => el.id === id) !== undefined ){
                updatedConds = prevState.map(item => { 
                    if(item.id === id)
                    return {...item, value: newValue}
                    else return item
                });
            }else{
                updatedConds = prevState.push({id, value: newValue});
                console.log("adding new one");
            }
            return updatedConds;
        });
    }

    useEffect(()=>{
        console.log(conditions);
    },[conditions])

    
    const [searchoptions, setSearchOptions] = useState([]);
    /* 
    searchOptionsList:[
        {
            id: "stock-source-selection-1",
            title: "Sources",
            type: "circles",
            multiSelect: true,
            primaryEdit: false,
            views: ["search", "fast-edit", "full-edit"],
            values: ["tiktok", "instagram", "twitter", "facebook", "youtube"],
            defaultValue: ["instagram", "youtube"]
        }   
    ]
    */
   const [primarySearch, setPrimarySearch] = useState(null);
    useEffect(()=>{
        setSearchOptions(
            searchOptionsList.map( option => {
                if(option.primarySearch){ setPrimarySearch(()=>ChooseOptionComponent(option, currentView));
                }else{ return ChooseOptionComponent(option, currentView);}
            })
        );
    },[conditions, currentView]);


    function ChooseOptionComponent(option, currentView){
        switch (option.type){
            case "circlesList":
                return <CirclesList updateConditions={updateConditions} key={option.id} option={option} currentView={currentView} />

            case "categoriesList":
                return <CategoriesList updateConditions={updateConditions} key={option.id} option={option} currentView={currentView} />

            case "searchBar":
                return <SearchBar updateConditions={updateConditions} updateView={updateView} key={option.id} option={option} currentView={currentView} />
            
            default:
                return null;
        }
    }

    return(
        <div className={( currentView ==="initial" || currentView==="search" ) ? "slide-menu slide-menu-closed" : "slide-menu" }>
            
            {( currentView ==="fast-edit" || currentView==="full-edit" ) && // This is the top bar with the title
            <div className="item l-c-r-menu p-l-s p-r-s">
                <button className="btn-plain item-left" onClick={()=>{setCurrentView("initial");}}><SvgIcons iconName="x"/></button>
                <div className="item-center flex-c"><h3>Edit Search</h3></div>
                <button className="btn-plain item-right"><SvgIcons iconName="settings"/></button>
            </div>
            }

            <div className="l-c-r-menu">
                <div className="item-center h-list">{primarySearch}</div>
                { currentView === "initial" &&
                <button className="btn-plain item-right bc-transparent m-r-s" onClick={()=>{updateView("fast-edit")}}>
                    <SvgIcons iconName="search" />
                </button>
                }
            </div>

            {searchoptions}
            
        </div>
    );
}


const CategoriesList = ({updateConditions, option, currentView}) =>{
    const [value, setValue] = useState(option.defaultValue);
    
    const list = option.values.map((listValue)=>{
        return (
            <li className={listValue === value ? "btn btn-plain-tint" : "btn btn-grey"}
                onClick={()=>{setValue(listValue); updateConditions(option.id, listValue);}}
            > 
                <h4>{listValue}</h4>
            </li>
        );
    });

    if(option.views.find(view => view === currentView) !== undefined){
        return(
            <ul className="item item-center h-list">
                {list}
            </ul>  
        );
    }else{
        return null;
    }
}


const CirclesList = ({updateConditions, option, currentView}) =>{
    const [value, setValue] = useState(option.defaultValue);

    const list = option.values.map((listValue)=>{
        return (
            <li className={listValue === value ? "btn btn-basic" : "btn btn-tinted"}
                onClick={()=>{setValue(listValue); updateConditions(option.id, listValue);}}
            > 
                <SvgIcons iconName={listValue}/>
            </li>
        );
    });

    if(option.views.find(view => view === currentView) !== undefined){
        return(
            <ul className="item item-center h-list">
                {list}
            </ul>  
        );
    }else{
        return null;
    }
}

const SearchBar = ({updateConditions, updateView, option, currentView}) =>{
    
    const [value, setValue] = useState(option.defaultValue);
    const searchRef = useRef();

    if(option.views.find(view => view === currentView) !== undefined){
        return(
            <div className="item">
                <div className={currentView === "fast-edit" ?"l-c-r-menu bc-transparent br-a-l p-a-xs" : "l-c-r-menu"}>
                    <button className="btn-grey item-left" onClick={()=> value !== "" && updateView("search")}>
                        <SvgIcons iconName="search" />
                    </button>
                    <input className="item-center" type="text" ref={searchRef} value={value} onClick={()=>updateView("fast-edit")} onChange={()=>setValue(searchRef.value)} />
                    { value !== "" && <button className="btn-grey item-right" onClick={()=>{  currentView !== "fast-edit" && updateView("initial"); setValue(""); }}><SvgIcons iconName="x" /></button>}
                </div>
            </div> 
        );
    }else{
        return null;
    }

}