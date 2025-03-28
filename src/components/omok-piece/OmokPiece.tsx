import { OmokPieces } from "../../api/items";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";

import styles from './OmokPiece.module.scss';

interface OmokPieceProps {
  preview?: boolean,
  size?: "small" | "medium" | "large" | "xlarge",
  type: OmokPieceType,
}

export function OmokPiece({ preview, type, size = "medium" }: OmokPieceProps) {
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
