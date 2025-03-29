import { useSelector } from "react-redux";
import { clearBoard, selectPlayers, setPlayerPiece } from "../../store/gameSlice";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import Messages from "../../utils/messages";
import { arePiecesSelected } from "../../utils/validation";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from "./PlayerSelection.module.scss";

type PlayerSelectionProps = {
  setShowBoard: (show: boolean) => void;
  showBoard: boolean;
}

export function PlayerSelection({ setShowBoard, showBoard }: PlayerSelectionProps) {
  const dispatch = useAppDispatch();
  const players = useSelector(selectPlayers);
  const doneSelection = arePiecesSelected(players);

  const selectType = (type: OmokPieceType) => {
    if (!players[0].piece) {
      dispatch(setPlayerPiece({ index: 0, piece: type}));
    } else if (!players[1].piece) {
      dispatch(setPlayerPiece({ index: 1, piece: type}));
    }
  }

  const startGame = () => {
    // todo: warning message
    if (doneSelection) {
      setShowBoard(true);
    }
  }

  // todo: rename to rematch
  const restartGame = () => {
    dispatch(clearBoard());
    setShowBoard(false);
  }

  const buttonProps: ButtonProps = showBoard
    ? { children: Messages.restart, onClick: restartGame }
    : { children: Messages.start, disabled: !doneSelection, onClick: startGame };

  return (
    <div className={styles.selectionContainer}>
      <div className={styles.omokPiecesContainer}>
        {Object.values(OmokPieceType)
        .map((type, i) => {
            const selected = players.some(p => p.piece === type);
            const disabled = selected || doneSelection;
            return (
              <button
                key={`selection_${i}`}
                disabled={disabled}
                aria-disabled={disabled}
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
