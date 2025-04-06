import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiArrowRight } from "react-icons/fi";

import { getCharacterData, getRandomCharacterImage } from "../../api/character";
import { selectEars, selectFaceIds, selectHairIds, selectSkins } from "../../store/assetsSlice";
import { selectTurnIndex, setPlayerOverrides } from "../../store/gameSlice";
import { classNames } from "../../utils/classNames";
import { ScoreType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import Messages from "../../utils/messages";
import { Player, Score } from "../../utils/types";
import { isNexonHostedImageUrl } from "../../utils/validation";

import { OmokPiece } from "../omok-piece/OmokPiece";
import { Spinner } from "../spinner/Spinner";

import styles from "./Profile.module.scss";

type ProfileProps = {
  index: number;
  player: Player;
  winnerIndex: number | undefined ;
}

export function Profile({ index, player, winnerIndex }: ProfileProps) {
  const dispatch = useAppDispatch();
  const turnIndex = useSelector(selectTurnIndex);
  const ears = useSelector(selectEars);
  const faces = useSelector(selectFaceIds);
  const hairs = useSelector(selectHairIds);
  const skins = useSelector(selectSkins);
  
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isNexonHostedImageUrl(player.imageUrl)) {
      setLoading(true);
      getCharacterData(player.name)
        .then(data => {
          dispatch(setPlayerOverrides({
            index: player.index,
            overrides: { name: data.characterName, imageUrl: data.characterImgURL, score },
            save: true,
          }));
        })
        .catch(() => 
          getRandomCharacterImage(ears, faces, hairs, skins)
            .then(url => {
              dispatch(setPlayerOverrides({
                index: player.index, 
                overrides: { imageUrl: url },
              }));
            }))
        .finally(() => setLoading(false));
    }
  }, []);

  const { name, imageUrl, score } = player;
  const isWinner = index === winnerIndex;
  const isLoser = winnerIndex !== undefined && !isWinner;

  return (
    <div className={classNames(
      styles.card,
      index === turnIndex && styles.highlight,
      isWinner && styles.winner,
    )}>
      <ProfileImage
        src={imageUrl}
        loading={loading}
        isLoser={isLoser}
        index={index}
        name={name}
      />
      <ProfileName name={name} />
      <ProfileStats score={score} />
      {player.piece && (
        <OmokPiece className={styles.omokIcon} type={player.piece} size="small" />
      )}
    </div>
  );
}

function ProfileImage({
  src,
  loading,
  isLoser,
  index,
  name,
}: {
  src?: string,
  loading: boolean,
  isLoser: boolean,
  index: number,
  name: string,
}) {
  return (
    <div className={styles.character}>
      {loading 
        ? <Spinner />
        : src && <img src={src} alt={`Character image for ${name}`} className={index === 0 ? styles.flipped : ''} />}
      {isLoser && <LoseStatus />}
    </div>
  )
}

function ProfileName({ name }: { name: string }) {
  return (
    <span className={styles.name}>{name}</span>
  )
}

function ProfileStats({ score } : { score: Score }) {
  const { [ScoreType.Point]: points, win, loss, tie } = score;

  return (
    <div className={styles.stats}>
      <div className={styles.statsRow}>
        <Stat id={ScoreType.Point} value={points} />
      </div>
      <div className={styles.statsRow}>
        <span id="total" className={styles.label}>
          {Messages.total}
          <FiArrowRight />
        </span>
        <Stat id={ScoreType.Win} value={win} />
        <Stat id={ScoreType.Loss} value={loss} />
        <Stat id={ScoreType.Tie} value={tie} />
      </div>
    </div>
  )
}

function Stat({ id, value } : { id: string; value: number; }) {
  const label = statLabels[id] ?? '';
  return (
    <>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </>
  )
}

const statLabels: { [id: string]: string } = {
  [ScoreType.Point]: Messages.points,
  [ScoreType.Win]: Messages.won,
  [ScoreType.Loss]: Messages.lost,
  [ScoreType.Tie]: Messages.tied,
};

function LoseStatus() {
  return (
    <div className={styles.status}>
      <span data-text={Messages.lose}>
        {Messages.lose}
        <span data-text={Messages.lose}/>
      </span>
    </div>
  )
}