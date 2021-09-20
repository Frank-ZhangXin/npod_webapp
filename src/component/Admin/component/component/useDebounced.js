import React, { useState, useEffect } from "react";

export default function useDebounced(initialValue, timeout) {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(actualValue);
    }, timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [actualValue, timeout]);
  return [debouncedValue, setActualValue, true];
}

// export default function useDebounced(value, timeout) {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       console.log("Setting the value");
//       setDebouncedValue(value);
//     }, timeout);
//     return () => {
//       console.log("clearing the timemout");
//       clearTimeout(timeoutId);
//     };
//   }, [value, timeout]);
//   return debouncedValue;
// }
