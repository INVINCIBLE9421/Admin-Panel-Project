import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call
        const response = await fetch('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response to JSON
        const data = await response.json();

        // Store the response in local storage
        localStorage.setItem('apiData', JSON.stringify(data));
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false even if there's an error
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Your component content goes here */}
    </div>
  );
};

export default DataFetcher;
