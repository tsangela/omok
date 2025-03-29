import { useEffect, useState } from "react";
import { OmokPieces } from "../../api/omok";
import { getCharacterImage, getRandomCharacterImage } from "../../api/character";
import { classNames } from "../../utils/classNames";
import Messages from "../../utils/messages";

import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import { selectTurn } from "../../store/gameSlice";
import { Spinner } from "../spinner/Spinner";
import { Player, Score } from "../../utils/types";
import { ScoreType } from "../../utils/enums";
import { selectEars, selectFaceIds, selectHairIds, selectSkins } from "../../store/assetsSlice";

type ProfileProps = {
  index: number,
  player: Player,
}

export function Profile({ index, player }: ProfileProps) {
  const turn = useSelector(selectTurn);
  const ears = useSelector(selectEars);
  const faces = useSelector(selectFaceIds);
  const hairs = useSelector(selectHairIds);
  const skins = useSelector(selectSkins);

  const [characterImageUrl, setCharacterImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { name, score } = player;

  useEffect(() => {
    setLoading(true);
    // getCharacterImage('tiginis')
    //   .then(setCharacterImageUrl)
    //   .finally(() => setLoading(false));
    getRandomCharacterImage(ears, faces, hairs, skins)
      .then(setCharacterImageUrl)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={classNames(styles.card, turn === index && styles.highlight)}>
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
