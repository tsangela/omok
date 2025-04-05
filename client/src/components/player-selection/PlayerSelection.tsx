import { ButtonHTMLAttributes, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FiAlertTriangle, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { clearGame, selectPlayers, setPlayerInfo } from "../../store/gameSlice";
import { classNames } from "../../utils/classNames";
import { MAX_NICKNAME_CHAR_LENGTH } from "../../utils/constants";
import { OmokPieceType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import Messages from "../../utils/messages";
import { OmokPieces } from "../../api/omok";
import { InfoTooltip } from "../info-icon/InfoTooltip";
import { OmokPiece } from "../omok-piece/OmokPiece";

import styles from "./PlayerSelection.module.scss";

type PlayerSelectionProps = {
  onDone: () => void;
}

export function PlayerSelection({ onDone }: PlayerSelectionProps) {
  const dispatch = useAppDispatch();
  const players = useSelector(selectPlayers);

  // Current form values
  const [nickname, setNickname] = useState<string>(''); // todo: debounce
  const [piece, setPiece] = useState<OmokPieceType>();
  const [playerIndex, setPlayerIndex] = useState(0);
  const [warning, setWarning] = useState('');

  // Always start with an empty player selection 
  useEffect(() => {
    dispatch(clearGame());
  }, []);

  const nthPlayer = useMemo(() => {
    const n = playerIndex + 1;
    return Messages.player(n);
  }, [playerIndex]);

  // todo: useMemo uses old players state
  const otherPlayerPieces = players.filter(p => p.index !== playerIndex).map(p => p.piece).filter(p => !!p);

  const isNicknameTaken = () => players
    .filter((_, i) => i !== playerIndex)
    .some(p => p.name.toLowerCase() === nickname.toLowerCase());

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

  // Save player selection to redux store
  const savePlayerSelections = () => {
    dispatch(setPlayerInfo({
      index: playerIndex,
      overrides: {
        name: nickname,
        piece: piece,
      },
    }));
  };

  // Load player selection from redux store
  const populateFields = (index: number) => {
    const player = players[index];
    setPlayerIndex(index);
    setPiece(player.piece);
    setNickname(player.name);
    setWarning('');
  }
  
  const back = () => {
    // Button is only rendered when player index > 0
    if (playerIndex === 0) {
      return;
    }

    // Save selections
    savePlayerSelections();

    // Previous player
    populateFields(playerIndex - 1);
  }

  const next = () => {
    if (!validateInputs()) {
      return;
    }

    // Save selections
    savePlayerSelections();

    if (playerIndex < players.length - 1) {
      // Go to next player
      populateFields(playerIndex + 1);
    } else {
      onDone();
    }
  }

  return (
    <div className={styles.selectionContainer}>
      <h1 className={styles.title}>{nthPlayer}</h1>
      <OmokPieceSelection piece={piece} setPiece={setPiece} otherPlayerPieces={otherPlayerPieces} />
      <div className={styles.row}>
        {playerIndex > 0 && (
          <IconButton onClick={back} title={Messages.back}>
            <FiArrowLeft />
          </IconButton>
        )}
        <NicknameInput nickname={nickname} setNickname={setNickname} placeholder={nthPlayer} warning={warning} />
        <IconButton onClick={next} title={Messages.next}>
          <FiArrowRight />
        </IconButton>
      </div>
    </div>
  );
}

type OmokPieceSelectionProps = {
  otherPlayerPieces: OmokPieceType[];
  piece: OmokPieceType | undefined;
  setPiece: (type?: OmokPieceType) => void;
};

function OmokPieceSelection({ otherPlayerPieces, piece, setPiece }: OmokPieceSelectionProps) {
  return (
    <div className={styles.omokPiecesContainer}>
      {Object.values(OmokPieceType)
        .map((type, i) => {
            const selected = type === piece;
            const disabled = !selected && otherPlayerPieces.includes(type);
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
      <div className={styles.inputGroup}>
        <input
          name={inputName}
          aria-describedby={tooltipId}
          onChange={e => setNickname(e.target.value)}
          placeholder={placeholder}
          value={nickname}
          maxLength={MAX_NICKNAME_CHAR_LENGTH}
        />
        <div className={classNames(styles.inputWarning, warning && styles.show)}>
          <FiAlertTriangle />
          <span>{warning}</span>
        </div>
        <InfoTooltip id={tooltipId} className={styles.inputInfo} message={Messages.playerNicknameHelp} subject={inputName} />
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
