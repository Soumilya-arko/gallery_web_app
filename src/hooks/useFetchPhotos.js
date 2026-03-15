import { useState, useEffect } from 'react';

const useFetchPhotos = () => {
  // Initialize the three required states
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetch 30 photos from the Picsum API
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
        
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error('Failed to fetch photos from the server.');
        }
        
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Catch any network or parsing errors
        setError(err.message);
      } finally {
        // Ensure loading is set to false whether the fetch succeeds or fails
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []); // Empty dependency array ensures this only runs once on mount

  // The hook MUST return these exact three values
  return { photos, loading, error };
};

export default useFetchPhotos;