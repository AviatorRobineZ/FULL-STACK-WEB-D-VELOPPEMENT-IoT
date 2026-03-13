import { useState, useEffect } from "react";

const useSensorData = (initialValue) => {
  const [value, setValue]   = useState(initialValue);
  const [history, setHistory] = useState([])
  const[trend, setTrend] = useState('stable')

  useEffect(() => {
    const interval = setInterval(() => {
   
      const variation = initialValue * 0.1;
      const newValue  = +(initialValue + (Math.random() * variation * 2 - variation)).toFixed(1);

      setValue(newValue);

      setHistory((prev) => [
        ...prev.slice(-19),  
        {
          value: newValue,
          time:  new Date().toLocaleTimeString(),
        },
      ]);
    }, 2000);

    return () => clearInterval(interval); 
  }, [initialValue]);


  return { value, history, trend }; 
};

export default useSensorData;