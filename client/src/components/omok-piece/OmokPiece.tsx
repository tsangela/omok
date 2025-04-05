import { OmokPieces } from "../../api/omok";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";

import styles from './OmokPiece.module.scss';

interface OmokPieceProps {
  className?: string,
  preview?: boolean,
  size?: "small" | "medium" | "large" | "xlarge",
  type: OmokPieceType,
}

export function OmokPiece({ className, preview, type, size = "medium" }: OmokPieceProps) {
  const piece = OmokPieces[type];
  return (
    <img
      src={piece.url}
      alt={piece.name}
      className={classNames(
        preview && styles.preview,
        styles[size],
        styles.omokIcon,
        className,
      )}
    />
  );
}
