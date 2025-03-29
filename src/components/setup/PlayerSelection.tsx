import { useSelector } from "react-redux";
import { clearBoard, selectPlayers, setPlayerOne, setPlayerTwo } from "../../store/gameSlice";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import Messages from "../../utils/messages";
import { arePlayersSelected as arePiecesSelected } from "../../utils/validation";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from "./PlayerSelection.module.scss";

type PlayerSelectionProps = {
  setShowBoard: (show: boolean) => void;
  showBoard: boolean;
}

export function PlayerSelection({ setShowBoard, showBoard }: PlayerSelectionProps) {
  const dispatch = useAppDispatch();
  const players = useSelector(selectPlayers);

  const selectType = (type: OmokPieceType) => {
    if (!players[0].piece) {
      dispatch(setPlayerOne(type));
    } else if (!players[1].piece) {
      dispatch(setPlayerTwo(type));
    }
  }

  const startGame = () => {
    // todo: warning message
    if (arePiecesSelected(players)) {
      setShowBoard(true);
    }
  }

  const restartGame = () => {
    dispatch(clearBoard());
    setShowBoard(false);
  }

  const buttonProps: ButtonProps = showBoard
    ? { children: Messages.restart, onClick: restartGame }
    : { children: Messages.start, disabled: !arePiecesSelected(players), onClick: startGame };

  return (
    <div className={styles.selectionContainer}>
      <div className={styles.omokPiecesContainer}>
        {Object.values(OmokPieceType)
        .map((type, i) => {
            const selected = players.some(p => p.piece === type);
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
      <Button {...buttonProps} />
    </div>
  );
}

type ButtonProps = {
  children: string | React.ReactElement;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ children, disabled, onClick } : ButtonProps) {
  return (
    <button
      className={styles.startButton}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
