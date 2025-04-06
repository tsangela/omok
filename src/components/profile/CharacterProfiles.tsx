import { useSelector } from "react-redux";
import { selectPlayers } from "../../store/gameSlice";
import { Profile } from "./Profile";

import styles from "./CharacterProfiles.module.scss"

export function CharacterProfiles({ winnerIndex }: { winnerIndex: number | undefined }) {
  const players = useSelector(selectPlayers);

  return (
    <div className={styles.profilesContainer}>
      {players.filter(player => !!player.piece).map((player, i) => (
        <Profile key={`player_${i}`} index={i} player={player} winnerIndex={winnerIndex} />
      ))}
    </div>
  )
}