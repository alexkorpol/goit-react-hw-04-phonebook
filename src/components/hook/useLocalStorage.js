import { useState, useEffect } from 'react';

 function useLocalStorage(data) {
    const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? data;
    });

   useEffect(() => {
     console.log("useEffect", Date.now())
     window.localStorage.setItem('contacts', JSON.stringify(state));
    }, [state]);

  return [state, setState];
};

export default useLocalStorage
