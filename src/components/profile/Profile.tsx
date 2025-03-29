import { useEffect, useState } from "react";
import { OmokPieces } from "../../api/omok";
import { getCharacterImage } from "../../api/character";
import { classNames } from "../../utils/classNames";
import Messages from "../../utils/messages";

import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import { selectTurn } from "../../store/gameSlice";
import { Spinner } from "../spinner/Spinner";
import { Player } from "../../utils/types";

type ProfileProps = {
  order: number,
  player: Player,
}

type Stats = {
  points: number,
  won: number,
  loss: number,
  tied: number,
}

const mockStats: Stats = {
  points: 1234,
  won: 16,
  loss: 27,
  tied: 4,
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

function ProfileStats({ stats } : { stats: Stats }) {
  const { points, ...rest } = stats;

  return (
    <div className={styles.stats}>
      <Stat id="points" value={points} />
      <div className={styles.total}>
        <span className={styles.label}>{Messages.total}</span>
        <div>
          {Object.entries(rest).map((([k, v]) => <Stat key={k} id={k} value={v} />))}
        </div>
      </div>
    </div>
  )
}

function Stat({ id, value } : { id: string; value: number; }) {
  /* @ts-ignore: key is guaranteed to be in Messages */
  const label = id in Messages ? Messages[id] : '';
  return (
    <div className={styles.spacedSection}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export function Profile({ order, player }: ProfileProps) {
  const turn = useSelector(selectTurn);
  const [characterImageUrl, setCharacterImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getCharacterImage('tiginis')
      .then(setCharacterImageUrl)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={classNames(styles.card, turn === order && styles.highlight)}>
      <ProfileImage src={characterImageUrl} loading={loading} />
      <ProfileName name={player.name} />
      <ProfileStats stats={mockStats} />
      {player.piece && <img src={OmokPieces[player.piece].url} alt="omok piece" className={styles.omokIcon} />}
    </div>
  );
}