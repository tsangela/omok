import { useSelector } from "react-redux";
import { selectPlayers } from "../../store/gameSlice";
import { PlayerSelection } from "../setup/PlayerSelection";
import { Board } from "../board/Board";

import styles from "./Game.module.scss";
import { useState } from "react";
import { Profile } from "../profile/Profile";

export default function Game() {
  const players = useSelector(selectPlayers);
  const [showBoard, setShowBoard] = useState(false);

  return (
    <div className={styles.game}>
      {/* {!showBoard && <PlayerSelection setShowBoard={setShowBoard} />} */}
      <PlayerSelection setShowBoard={setShowBoard} />
      <div className={styles.profilesContainer}>
        {players.filter(player => !!player).map((player, i) => (
          <Profile key={`player_${i}`} order={i} type={player} />
        ))}
      </div>
      {showBoard && <Board />}
    </div>
  )
}