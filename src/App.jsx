import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./Layout/AppLayout";
import { Categories, Favourites, GifPage, Home, SearchPage } from "./Pages";
import GifProvider from "./context/GifContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:type/:slug" element={<GifPage />} />
        <Route path="/:category" element={<Categories />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    )
  );

  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
