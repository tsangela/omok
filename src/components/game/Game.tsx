import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../store/gameSlice";
import { PlayerSelection } from "../setup/PlayerSelection";
import { clearProgress } from "../../utils/localStorage";
import { Board } from "../board/Board";
import { Profile } from "../profile/Profile";

import styles from "./Game.module.scss";

export default function Game() {
  const players = useSelector(selectPlayers);
  const [showBoard, setShowBoard] = useState(false);

  useEffect(() => () => clearProgress());

  return (
    <div className={styles.game}>
      {/* todo: uncomment? */}
      {/* {!showBoard && <PlayerSelection showBoard={showBoard} setShowBoard={setShowBoard} />} */}
      <PlayerSelection setShowBoard={setShowBoard} showBoard={showBoard} />
      <div className={styles.profilesContainer}>
        {players.filter(player => !!player.piece).map((player, i) => (
          <Profile key={`player_${i}`} index={i} player={player} />
        ))}
      </div>
      {showBoard && <Board />}
    </div>
  )
}