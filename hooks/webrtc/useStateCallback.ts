import { useState, useCallback ,useRef, useEffect} from 'react';

export const useStateCallback = (initialState: any) => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef<((state: any) => void) | null>(null); // mutable ref to store current callback
    
    const setStateCallback = useCallback((state: any, cb: null) => {
        cbRef.current = cb; // store passed callback to ref
        setState(state); // may have to change this and use a function to get the previous state and pass it to the callback ;not sure
    }, []);
    
    useEffect(() => { 
        if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null;
        }
    }, [state]);
    
    return [state, setStateCallback];
    }
