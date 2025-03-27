import { useState } from "react";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from './Tile.module.scss';

interface TileProps {
  key?: string;
}

interface BoardTileProps extends TileProps {
  value?: OmokPieceType;
}

export function BoardTile({ value }: BoardTileProps) {
  return (
    <div className={classNames(styles.tile, styles.guideline)}>
      {value && <OmokPiece type={value} />}
    </div>
  );
}

interface PreviewTileProps extends TileProps {
  index: number;
  placePiece: (i: number) => void;
  type: OmokPieceType;
}

export function PreviewTile({ index, placePiece, type }: PreviewTileProps) {
  const [show, setShow] = useState<boolean>(false);

  const onMouseOver = () => setShow(true);
  const onMouseLeave = () => setShow(false);

  return (
    <button
      className={styles.tile}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseLeave={onMouseLeave}
      onBlur={onMouseLeave}
      onClick={() => placePiece(index)}
    >
      {show ? <OmokPiece preview type={type} /> : null}
    </button>
  );
}
