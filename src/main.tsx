import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { store } from './store/store.ts'
import Path from './utils/path.ts';
import Game from './components/game/Game.tsx'
import { Home } from './views/home/Home.tsx';
import { Layout } from './views/layout/Layout.tsx';
import { NotFound } from './views/not-found/NotFound.tsx';

import './index.scss'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Path.Root} element={<Layout />} errorElement={<NotFound />}>
      <Route
        path={Path.Home}
        element={<Home />}
      />
      <Route
        path={Path.Game}
        element={<Game />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
