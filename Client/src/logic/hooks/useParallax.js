import { useEffect, useState } from "react";


export const useParallax = (multiplier, range, itemRef) => {

    const [deltaY, setDeltaY] = useState(0);

    useEffect(()=>{
        setDeltaY(range/2);
    },[]);

    useEffect(()=>{
        let topDist = itemRef?.current.getBoundingClientRect().top + itemRef?.current.offsetHeight/2;
        let winHeight = window.innerHeight;
        if(topDist > 0 && topDist < winHeight ){
            setDeltaY( (((topDist-(winHeight/2))/100)).toFixed(3)*multiplier );
        }
    });

    return  [ deltaY ]
}