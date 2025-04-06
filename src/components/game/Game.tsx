import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getEars, getFaces, getHairs, getSkins } from "../../api/character";
import { setEars, setEarsFetchStatus, setFaces, setFacesFetchStatus, setHairs, setHairsFetchStatus, setSkins, setSkinsFetchStatus } from "../../store/assetsSlice";
import { AssetType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import Messages from "../../utils/messages";
import Path from "../../utils/path";

import { Board } from "../board/Board";
import { CharacterProfiles } from "../profile/CharacterProfiles";
import { PlayerSelection } from "../player-selection/PlayerSelection";

import styles from "./Game.module.scss";

const assetOperations = {
  [AssetType.Ear]: {
    get: getEars,
    set: setEars,
    setStatus: setEarsFetchStatus,
  },
  [AssetType.Face]: {
    get: getFaces,
    set: setFaces,
    setStatus: setFacesFetchStatus,
  },
  [AssetType.Hair]: {
    get: getHairs,
    set: setHairs,
    setStatus: setHairsFetchStatus,
  },
  [AssetType.Skin]: {
    get: getSkins,
    set: setSkins,
    setStatus: setSkinsFetchStatus,
  },
}

export default function Game() {
  const dispatch = useAppDispatch();

  const [showBoard, setShowBoard] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | undefined>(undefined);

  async function fetchAsset(type: AssetType) {
    const { get, set, setStatus } = assetOperations[type];
    dispatch(setStatus({ isError: false, isFetching: true, isSuccess: false }));
    get()
      .then((data: any) => dispatch(set(data)))
      .catch(() => dispatch(setStatus({ isError: true, isFetching: false, isSuccess: false })));
  };

  useEffect(() => {
    [AssetType.Ear, AssetType.Face, AssetType.Hair, AssetType.Skin].forEach(type => fetchAsset(type));
  }, []);

  return (
    <>
      <style>{`body{background:#e8f5ff;}`}</style>
      <div className={styles.container}>
        <Link to={Path.Root} className={styles.header}>
          <h1>{Messages.omokTitle}</h1>
        </Link>
        {showBoard
          ? (
            <>
              <CharacterProfiles winnerIndex={winnerIndex} />
              <Board winnerIndex={winnerIndex} setWinnerIndex={setWinnerIndex} />
            </>
          )
          : <PlayerSelection onDone={() => setShowBoard(true)} />
        }        
      </div>
    </>
  )
}
