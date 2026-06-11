import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreatePokemonPage from './pages/CreatePokemonpage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <CreatePokemonPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)