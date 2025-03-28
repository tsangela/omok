import { OmokPieceType } from "../../utils/enums";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from "./PlayerSelection.module.scss";
import { classNames } from "../../utils/classNames";

type PlayerSelectionProps = {
  readonly typeOne: OmokPieceType | undefined;
  readonly typeTwo: OmokPieceType | undefined;
  setTypeOne: (type: OmokPieceType) => void;
  setTypeTwo: (type: OmokPieceType) => void;
}

// todo: rename to Piece Selection?
export function PlayerSelection({
  typeOne,
  typeTwo,
  setTypeOne,
  setTypeTwo, 
}: PlayerSelectionProps) {
  const selectType = (type: OmokPieceType) => {
    if (!typeOne) {
      setTypeOne(type);
    } else if (!typeTwo) {
      setTypeTwo(type);
    }
  }

  return (
    <div className={styles.selectionContainer}>
      {Object.values(OmokPieceType)
       .map((type, i) => {
          const selected = type === typeOne || type === typeTwo;
          return (
            <button
              key={`selection_${i}`}
              disabled={selected}
              aria-disabled={selected}
              className={classNames(styles.button, selected && styles.selected)}
              onClick={() => selectType(type)}
            >
              <OmokPiece type={type} />
            </button>
          )
       })}
    </div>
  );
}
