import React, { useState, useEffect, useRef } from "react";

const STATE = {
  LOADING: "Loading",
  SUCCESS: "Success",
  ERROR: "Error",
};

function TypeAhead() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const cache = useRef({});

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      if (query.trim() === "") {
        setResult([]);
        setStatus("");
        return;
      }

      try {
        setStatus(STATE.LOADING);

        // Retrieve cached data from localStorage
        const storedData = JSON.parse(localStorage.getItem("productsData")) || {};
        if (storedData[query]) {
          console.log("Data retrieved from localStorage");
          setResult(storedData[query]);
          setStatus(STATE.SUCCESS);
          return; // Skip API call if data exists in localStorage
        }

        // if (cache.current[query]) {
        //   console.log("Data retrived from cache");
        //   setResult(cache.current[query]);
        //   setStatus(STATE.SUCCESS);
        //   return;
        // }
        
        // Fetching from API if no cached data is found
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          { signal }
        );

        const data = await res.json();
        setStatus(STATE.SUCCESS);
        setResult(data.products);

        //  Save the result to localStorage
        const updatedData = { ...storedData, [query]: data.products };
        localStorage.setItem("productsData", JSON.stringify(updatedData));
        // cache.current[query] = data.products;
        // console.log(data);
      } catch (error) {
        if (error.name != "AbortError") {
          setStatus(STATE.ERROR);
        }
      }
    };
    const timerId = setTimeout(fetchData, 1000);

    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [query]);

  return (
    <div>
      <h1 className="text-white text-2xl p-2">TYPE-AHEAD</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />

      {status === STATE.LOADING && (
        <div className="text-white text-2xl p-2">Loading...</div>
      )}
      {status === STATE.ERROR && (
        <div className="text-white text-2xl p-2">Error Occured</div>
      )}
      {status === STATE.SUCCESS && (
        <ul className="text-white text-left text-2xl py-2">
          {result.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>
      )}
      {status === STATE.SUCCESS && result.length === 0 && (
        <div className="text-white text-2xl p-2">No Results Found</div>
      )}
    </div>
  );
}

export default TypeAhead;

// Debouncing : time-up hone ke baad fectch call hota hai (setTimeout ki help se)

// AbortController : request lagne ke baad abort karta hai (jab user tezi se type karte huye ruk jata hai or phir likhna shuru karta hai to phicla incomplete query koabort karna hota hai )


