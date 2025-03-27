import { useState } from "react";
import { PlayerSelection } from "../setup/PlayerSelection";
import { OmokPieceType } from "../../utils/enums";
import { Board } from "../board/Board";

import styles from "./Game.module.scss";

export default function Game() {
  const [typeOne, setTypeOne] = useState<OmokPieceType | undefined>(undefined);
  const [typeTwo, setTypeTwo] = useState<OmokPieceType | undefined>(undefined);

  return (
    <div className={styles.game}>
      {typeOne && typeTwo
        ? (
          <Board players={[typeOne, typeTwo]} />
        ) : (
          <PlayerSelection
            typeOne={typeOne}
            typeTwo={typeTwo}
            setTypeOne={setTypeOne}
            setTypeTwo={setTypeTwo}
          />
        )
      }
    </div>
  )
}