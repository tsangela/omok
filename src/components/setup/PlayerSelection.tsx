import { useSelector } from "react-redux";
import { selectPlayerOne, selectPlayers, selectPlayerTwo, setPlayerOne, setPlayerTwo } from "../../store/gameSlice";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import Messages from "../../utils/messages";
import { Players } from "../../utils/types";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from "./PlayerSelection.module.scss";
import { arePlayersSelected } from "../../utils/validation";

type PlayerSelectionProps = {
  setShowBoard: (show: boolean) => void;
  // readonly players: Players;
  // readonly playerOne: OmokPieceType | undefined;
  // readonly playerTwo: OmokPieceType | undefined;
}

export function PlayerSelection({ setShowBoard }: PlayerSelectionProps) {
  const dispatch = useAppDispatch();
  const players = useSelector(selectPlayers);

  const selectType = (type: OmokPieceType) => {
    if (!players[0]) {
      dispatch(setPlayerOne(type));
    } else if (!players[1]) {
      dispatch(setPlayerTwo(type));
    }
  }

  const startGame = () => {
    // todo: warning message
    if (arePlayersSelected(players)) {
      setShowBoard(true);
    }
  }

  return (
    <div className={styles.selectionContainer}>
      <div className={styles.omokPiecesContainer}>
        {Object.values(OmokPieceType)
        .map((type, i) => {
            const selected = players.includes(type);
            return (
              <button
                key={`selection_${i}`}
                disabled={selected}
                aria-disabled={selected}
                className={classNames(styles.omokPieceButton, selected && styles.selected)}
                onClick={() => selectType(type)}
              >
                <OmokPiece type={type} />
              </button>
            )
        })}
      </div>
      <button
        className={styles.startButton}
        disabled={!arePlayersSelected(players)}
        aria-disabled={!arePlayersSelected(players)}
        onClick={startGame}
      >
        {Messages.start}
      </button>
    </div>
  );
}
