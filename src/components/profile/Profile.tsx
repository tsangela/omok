import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../utils/hooks";
import { selectTurn, setPlayerImageUrl } from "../../store/gameSlice";
import { selectEars, selectFaceIds, selectHairIds, selectSkins } from "../../store/assetsSlice";
import { classNames } from "../../utils/classNames";
import { ScoreType } from "../../utils/enums";
import Messages from "../../utils/messages";
import { Player, Score } from "../../utils/types";
import { getCharacterImage, getRandomCharacterImage } from "../../api/character";
import { OmokPieces } from "../../api/omok";
import { Spinner } from "../spinner/Spinner";

import styles from "./Profile.module.scss";
import { isNexonHostedImageUrl } from "../../utils/validation";

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
      // getCharacterImage('tiginis')
      //   .then(setCharacterImageUrl)
      //   .finally(() => setLoading(false));
      getRandomCharacterImage(ears, faces, hairs, skins)
        .then(url => {
          dispatch(setPlayerImageUrl({ index, imageUrl: url }));
          setCharacterImageUrl(url);
        })
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
      {player.piece && <img src={OmokPieces[player.piece].url} alt="omok piece" className={styles.omokIcon} />}
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
  const { [ScoreType.Point]: points, ...rest } = score;

  return (
    <div className={styles.stats}>
      <Stat id={ScoreType.Point} value={points} />
      <div className={styles.total}>
        <span className={styles.label}>{Messages.total}</span>
        <div>
          {Object.entries(rest).map(([key, value]) => <Stat key={key} id={key} value={value} />)}
        </div>
      </div>
    </div>
  )
}

function Stat({ id, value } : { id: string; value: number; }) {
  const label = statLabels[id] ?? '';
  return (
    <div className={styles.spacedSection}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

const statLabels: { [id: string]: string } = {
  [ScoreType.Point]: Messages.points,
  [ScoreType.Win]: Messages.won,
  [ScoreType.Loss]: Messages.lost,
  [ScoreType.Tie]: Messages.tied,
};
