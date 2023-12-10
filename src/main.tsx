import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './app/store.ts'

import { App } from './App.tsx'
import { MovieDetails } from './components/MovieDetails/MovieDetails.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: 'movie/:movieId',
    element: <MovieDetails />
  }
]);




ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>

)
