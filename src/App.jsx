import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from './hooks/useFetchPhotos';
import { favouritesReducer, initFavourites } from './reducers/favouritesReducer';

function App() {
  // 1. Data Fetching
  const { photos, loading, error } = useFetchPhotos();

  // 2. State Management (Search and Favourites)
  const [searchQuery, setSearchQuery] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  // Sync favourites to localStorage
  useEffect(() => {
    localStorage.setItem('celebrare_favourites', JSON.stringify(favourites));
  }, [favourites]);

  // 3. Performance Hook: useCallback
  // We wrap the search handler in useCallback so this function isn't recreated on every render.
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []); // Empty dependency array because state setter functions are stable

  // 4. Performance Hook: useMemo
  // We compute the filtered list with useMemo so it only recalculates when 'photos' or 'searchQuery' changes.
  const filteredPhotos = useMemo(() => {
    if (!searchQuery) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  // Helper to dispatch the favourite action
  const toggleFavourite = (photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Bar */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-6">
            Celebrare Gallery
          </h1>
          <input
            type="text"
            placeholder="Search by author name..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </header>

        {/* Loading & Error States */}
        {loading && (
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        )}

        {/* Responsive Photo Grid */}
        {!loading && !error && (
          // Tailwind Grid: 1 col on mobile, 2 cols on md screens, 4 cols on lg screens
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map((photo) => {
                const isFavourite = favourites.includes(photo.id);
                
                return (
                  <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={photo.download_url}
                      alt={`By ${photo.author}`}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4 flex justify-between items-center">
                      <span className="font-semibold text-gray-700 truncate pr-2">
                        {photo.author}
                      </span>
                      <button
                        onClick={() => toggleFavourite(photo.id)}
                        className="focus:outline-none transform hover:scale-110 transition-transform"
                        aria-label="Toggle Favourite"
                      >
                        {/* Heart SVG */}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-7 w-7 ${isFavourite ? 'text-red-500 fill-current' : 'text-gray-300 hover:text-red-300'}`} 
                          fill={isFavourite ? "currentColor" : "none"} 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-500 mt-10 text-lg">
                No photos found for "{searchQuery}".
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;