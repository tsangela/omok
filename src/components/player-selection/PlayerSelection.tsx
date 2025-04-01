import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clearGame, selectPlayers, setPlayerInfo } from "../../store/gameSlice";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import Messages from "../../utils/messages";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from "./PlayerSelection.module.scss";
import { loadPlayerProgress } from "../../utils/localStorage";
import { OmokPieces } from "../../api/omok";
import { InfoTooltip } from "../info-icon/InfoTooltip";

type PlayerSelectionProps = {
  onDone: () => void;
}

export function PlayerSelection({ onDone }: PlayerSelectionProps) {
  const dispatch = useAppDispatch();

  const [nickname, setNickname] = useState<string>(''); // todo: debounce
  const [piece, setPiece] = useState<OmokPieceType>();
  const [playerIndex, setPlayerIndex] = useState(0);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    dispatch(clearGame());
  }, []);

  const players = useSelector(selectPlayers);
  const selectedPieces = players.map(p => p.piece).filter(p => !!p);

  const isNicknameTaken = () => players.some(p => p.name.toLowerCase() === nickname.toLowerCase());
  const n = playerIndex + 1;
  const nthPlayer = Messages.player(n);

  const validateInputs = () => {
    if (!piece) {
      setWarning(Messages.missingPlayerPiece);
      return false;
    }

    if (!nickname) {
      setWarning(Messages.missingPlayerNickname);
      return false;
    }

    if (isNicknameTaken()) {
      setWarning(Messages.duplicatePlayerNickname(nickname));
      return false;
    }

    return true;
  }

  const next = () => {
    if (!validateInputs()) {
      return;
    }

    const playerData = loadPlayerProgress(nickname) ?? {};
    dispatch(setPlayerInfo({
      index: playerIndex,
      overrides: {
        ...playerData,
        name: nickname,
        piece: piece,
      },
    }));

    if (n === players.length) {
      onDone();
      return;
    }
  
    setPlayerIndex(playerIndex + 1);
    setPiece(undefined);
    setNickname('');
    setWarning('');
  }

  return (
    <div className={styles.selectionContainer}>
      <h1 className={styles.title}>{nthPlayer}</h1>
      <OmokPieceSelection piece={piece} setPiece={setPiece} selectedPieces={selectedPieces} />
      <div className={styles.inputRow}>
        <NicknameInput nickname={nickname} setNickname={setNickname} placeholder={nthPlayer} warning={warning} />
        <IconButton onClick={next} title={Messages.next}>
          &#11166;
        </IconButton>
      </div>
    </div>
  );
}

type OmokPieceSelectionProps = {
  piece: OmokPieceType | undefined;
  setPiece: (type?: OmokPieceType) => void;
  selectedPieces: OmokPieceType[];
};

function OmokPieceSelection({ piece, setPiece, selectedPieces }: OmokPieceSelectionProps) {
  return (
    <div className={styles.omokPiecesContainer}>
      {Object.values(OmokPieceType)
        .map((type, i) => {
            const selected = type === piece;
            const disabled = type !== piece && selectedPieces.includes(type);
            return (
              <button
                key={`omok-piece_${i}`}
                disabled={disabled}
                aria-disabled={disabled}
                aria-label={OmokPieces[type].name}
                title={OmokPieces[type].name}
                className={classNames(styles.omokPieceButton, selected && styles.selected)}
                onClick={() => setPiece(type === piece ? undefined : type)}
              >
                <OmokPiece type={type} />
              </button>
            )
          }
        )
      }
    </div>
  )
}

type NicknameInputProps = {
  nickname: string;
  setNickname: (nickname: string) => void;
  placeholder: string;
  warning: string;
}

function NicknameInput({ nickname, setNickname, placeholder, warning }: NicknameInputProps) {
  const tooltipId = "nicknameinfo";
  const inputName = "Nickname";
  return (
    <>
      <InfoTooltip id={tooltipId} message={Messages.playerNicknameHelp} subject={inputName} />
      <div className={styles.inputGroup}>
        <input
          name={inputName}
          aria-describedby={tooltipId}
          onChange={e => setNickname(e.target.value)}
          placeholder={placeholder}
          value={nickname}
        />
        <div className={classNames(warning && styles.inputWarning)}>
          <span>{warning}</span>
        </div>
      </div>
    </>
  )
}

function IconButton({ children, disabled, onClick, title }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={styles.iconButton}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={title}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
