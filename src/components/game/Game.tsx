import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../utils/hooks";
import { getEars, getFaces, getHairs, getSkins } from "../../api/character";
import { setEars, setEarsFetchStatus, setFaces, setFacesFetchStatus, setHairs, setHairsFetchStatus, setSkins, setSkinsFetchStatus } from "../../store/assetsSlice";
import { selectPlayers } from "../../store/gameSlice";
import { PlayerSelection } from "../player-selection/PlayerSelection";
import { Board } from "../board/Board";
import { Profile } from "../profile/Profile";

import styles from "./Game.module.scss";
import { AssetType } from "../../utils/enums";
import Messages from "../../utils/messages";
import { Link } from "react-router-dom";
import Path from "../../utils/path";

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
  const players = useSelector(selectPlayers);
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
              <div className={styles.profilesContainer}>
                {players.filter(player => !!player.piece).map((player, i) => (
                  <Profile key={`player_${i}`} index={i} player={player} winnerIndex={winnerIndex} />
                ))}
              </div>
              <Board winnerIndex={winnerIndex} setWinnerIndex={setWinnerIndex} />
            </>
          )
          : <PlayerSelection onDone={() => setShowBoard(true)} />
        }        
      </div>
    </>
  )
}
