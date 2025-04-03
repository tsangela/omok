import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../utils/hooks";
import { selectTurn, setPlayerImageUrl } from "../../store/gameSlice";
import { selectEars, selectFaceIds, selectHairIds, selectSkins } from "../../store/assetsSlice";
import { classNames } from "../../utils/classNames";
import { ScoreType } from "../../utils/enums";
import Messages from "../../utils/messages";
import { Player, Score } from "../../utils/types";
import { getCharacterImage, getRandomCharacterImage } from "../../api/character";
import { Spinner } from "../spinner/Spinner";

import styles from "./Profile.module.scss";
import { isNexonHostedImageUrl } from "../../utils/validation";
import { OmokPiece } from "../omok-piece/OmokPiece";

type ProfileProps = {
  index: number;
  player: Player;
  winnerIndex: number | undefined ;
}

export function Profile({ index, player, winnerIndex }: ProfileProps) {
  const dispatch = useAppDispatch();
  const turn = useSelector(selectTurn);
  const ears = useSelector(selectEars);
  const faces = useSelector(selectFaceIds);
  const hairs = useSelector(selectHairIds);
  const skins = useSelector(selectSkins);

  const [characterImageUrl, setCharacterImageUrl] = useState<string>(player.imageUrl);
  const [loading, setLoading] = useState<boolean>(false);

  const { name, score } = player;

  useEffect(() => {
    if (!isNexonHostedImageUrl(player.imageUrl)) {
      setLoading(true);
      getCharacterImage(player.name)
        .then(setCharacterImageUrl)
        .catch(() => 
          getRandomCharacterImage(ears, faces, hairs, skins)
            .then(url => {
              dispatch(setPlayerImageUrl({ index, imageUrl: url }));
              setCharacterImageUrl(url);
            }))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className={classNames(
      styles.card,
      turn === index && styles.highlight,
      turn === winnerIndex && styles.winner,
    )}>
      <ProfileImage src={characterImageUrl} loading={loading} />
      <ProfileName name={name} />
      <ProfileStats score={score} />
      {player.piece && (
        <OmokPiece className={styles.omokIcon} type={player.piece} size="small" />
      )}
    </div>
  );
}

function ProfileImage({ src, loading }: { src?: string; loading: boolean; }) {
  return (
    <div className={styles.character}>
      {loading 
        ? <Spinner />
        : src && <img src={src} alt="character" />}
    </div>
  )
}

function ProfileName({ name }: { name: string; }) {
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
        <span id="total" className={styles.label}>{Messages.total}</span>
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
