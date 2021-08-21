
import { useRef, useState } from "react";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"

function SearchBar(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setValue] = useState("");
    const searchRef = useRef();
    const {handleChange} = props;

    function toggleOpen(bool){ 
        if (bool){
            searchRef.current?.focus();
            console.log(searchRef.current);
        }
        setIsOpen(bool);
    };

    function update(searchWord){
        handleChange(searchWord);
        setValue(searchWord);
    }

    return (
        <div className={isOpen? "t-s flex-c p-a-xs br-a-xs right0 z3" : "t-s flex-c p-a-xs"} onClick={()=>{toggleOpen(true)}} style={{position: isOpen? "relative" : "relative"}}>
            <div className={isOpen ? "flex-c flex-no-wrap bc-d-l bc-2 p-a-xs br-a-xs point t-s" : "flex-c flex-no-wrap p-a-xs br-a-xs point t-s"}>
                <div className={isOpen? "box-xs-square p-a-xxs flex-c m-r-xs" : "box-xs-square p-a-xxs flex-c"}>
                    <SvgIcons iconName={"search"} />
                </div>
                <input 
                ref={searchRef}
                className={isOpen? "search-bar bc-2 show-from-right" : "search-bar bc-2 absolute z-1"} 
                onBlur={searchValue === "" ? ()=>toggleOpen(false) : null} 
                onChange={(e)=>update(e.target.value)}
                style={{width: isOpen? "auto" : "0px", pointerEvents: isOpen? null : "none"}} type="search"></input>  
            </div>
        </div>
    );
}

export default SearchBar;
