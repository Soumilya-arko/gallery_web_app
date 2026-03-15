// This initializer function runs once when the component mounts.
// It checks localStorage for saved favourites so they persist across refreshes.
export const initFavourites = () => {
  try {
    const storedFavs = localStorage.getItem('celebrare_favourites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  } catch (error) {
    console.error("Failed to parse favourites from localStorage", error);
    return [];
  }
};

// The reducer handles the state transitions based on actions
export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      // If the ID is already in the state array, remove it.
      if (state.includes(action.payload)) {
        return state.filter(id => id !== action.payload);
      }
      // If the ID is not in the array, add it.
      return [...state, action.payload];
      
    default:
      return state;
  }
};