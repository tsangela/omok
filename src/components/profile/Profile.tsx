import { useEffect, useState } from "react";
import { OmokPieces } from "../../api/items";
import { getRandomCharacterImage } from "../../api/character";
import { classNames } from "../../utils/classNames";
import { OmokPieceType } from "../../utils/enums"
import Messages from "../../utils/messages";

import styles from "./Profile.module.scss";

type ProfileProps = {
  isNext: boolean,
  type: OmokPieceType,
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

function ProfileImage({ src }: { src?: string; }) {
  return (
    <div className={styles.character}>
      {src && <img src={src} alt="character" />}
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

export function Profile({ isNext, type }: ProfileProps) {
  const [character, setCharacter] = useState<string | undefined>(undefined);

  useEffect(() => {
    getRandomCharacterImage().then(setCharacter);
  }, []);

  return (
    <div className={classNames(styles.card, isNext && styles.highlight)}>
      <ProfileImage src={character} />
      <ProfileName name={OmokPieces[type].name} />
      <ProfileStats stats={mockStats} />
      <img src={OmokPieces[type].url} alt="omok piece" className={styles.omokIcon} />
    </div>
  );
}