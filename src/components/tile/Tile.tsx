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
      <span />
    </div>
  );
}

interface PreviewTileProps extends TileProps {
  index: number;
  canPreview: boolean;
  placePiece: (i: number) => void;
  type?: OmokPieceType;
}

export function PreviewTile({ index, canPreview, placePiece, type }: PreviewTileProps) {
  const [show, setShow] = useState<boolean>(false);

  const onMouseOver = () => setShow(canPreview);
  const onMouseLeave = () => setShow(false);
  const onClick = () => {
    placePiece(index);
    setShow(false);
  }

  return (
    <button
      className={styles.tile}
      disabled={!canPreview}
      aria-disabled={!canPreview}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseLeave={onMouseLeave}
      onBlur={onMouseLeave}
      onClick={onClick}
    >
      {show && type ? <OmokPiece preview type={type} /> : null}
    </button>
  );
}
