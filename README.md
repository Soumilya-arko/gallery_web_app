# Celebrare Photo Gallery

A responsive photo gallery web application built with React, Vite, and Tailwind CSS. This project was developed as a pre-screening assignment for the Frontend React Internship at Celebrare.

## Overview
The application fetches a list of photos from a public API, displays them in a fully responsive grid, allows users to filter photos by the author's name in real-time, and lets users mark photos as favourites. 

## Features
* **Custom Data Fetching:** Utilises a custom `useFetchPhotos` hook to retrieve 30 images from the Picsum API, complete with loading spinners and error handling states.
* **Responsive Grid:** Built entirely with Tailwind CSS, adapting seamlessly from 1 column on mobile, to 2 on tablets, and 4 on desktop screens.
* **Real-time Search:** Users can filter the fetched photos by author name instantly. The filtering logic is optimised using `useMemo` and `useCallback` to prevent unnecessary re-renders.
* **Persistent Favourites:** Users can toggle a "favourite" status on any photo. This complex state is managed using `useReducer` and persists across page refreshes via `localStorage`.
* **Zero UI Libraries:** All styling and components (inputs, buttons, grids) are built from scratch using pure Tailwind CSS utility classes, strictly adhering to the project constraints.

## Tech Stack
* **Framework:** React (Functional Components)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **State Management:** `useState`, `useReducer`, `useEffect`
* **Performance Optimisation:** `useMemo`, `useCallback`
