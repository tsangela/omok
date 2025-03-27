import { useEffect, useState } from "react";
import { OmokPieces, fetchImage } from "../../api/items";
import { OmokPieceType } from "../../utils/enums";
import { Spinner } from "../spinner/Spinner";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from "./PlayerSelection.module.scss";
import { classNames } from "../../utils/classNames";

type PlayerSelectionProps = {
  readonly typeOne: OmokPieceType | undefined;
  readonly typeTwo: OmokPieceType | undefined;
  setTypeOne: (type: OmokPieceType) => void;
  setTypeTwo: (type: OmokPieceType) => void;
  // setPlayers: (p1: OmokPieceType, p2: OmokPieceType) => void;
}

export function PlayerSelection({
  typeOne,
  typeTwo,
  setTypeOne,
  setTypeTwo, 
}: PlayerSelectionProps) {
  const [loading, setLoading] = useState(true);

  async function fetchOmokPieces() {
    setLoading(true);
    return Promise.all(Object.values(OmokPieces).map(({ id }) => fetchImage(id)))
      .then(urls => urls.forEach((url, i) => Object.values(OmokPieces)[i].url = url))
      // .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchOmokPieces().then(() => setLoading(false));
  }, []);

  const selectType = (type: OmokPieceType) => {
    if (!typeOne) {
      setTypeOne(type);
    } else if (!typeTwo) {
      setTypeTwo(type);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.selectionContainer}>
      {Object.values(OmokPieceType)
       .map((type, i) => (
        <button
          key={`selection_${i}`}
          className={classNames(styles.button, (type === typeOne || type === typeTwo) && styles.selected)}
          onClick={() => selectType(type)}
        >
          <OmokPiece type={type} />
        </button>
      ))}
    </div>
  );
}
