import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Game from './components/game/Game.tsx'

import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
