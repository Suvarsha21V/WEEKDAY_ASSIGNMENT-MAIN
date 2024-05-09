import { useEffect, useState } from "react";

const useInfiniteScroll = (fetchData, offset, setOffset) => {
  // State to track loading status
  const [loading, setLoading] = useState(false);

  // Add event listener when component mounts, for infinite scrolling
  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, []);

  const infiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading) {
          setLoading(true);
          setOffset((prevOffset) => prevOffset + 9);
          fetchData();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Return loading state
  return loading;
};

export default useInfiniteScroll;
