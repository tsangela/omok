import { OmokPieces } from "../../api/items";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";

import styles from './OmokPiece.module.scss';

enum PieceSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface OmokPieceProps {
  preview?: boolean,
  size?: PieceSize,
  type: OmokPieceType,
}

export function OmokPiece({ preview, type, size = PieceSize.Medium }: OmokPieceProps) {
  const piece = OmokPieces[type];
  const className = classNames(
    preview && styles.preview,
    styles[size],
    styles.omokIcon,
  )
  return (
    <img src={piece.url} alt={piece.name} className={className} />
  );
}
