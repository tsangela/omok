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

export default function Game() {
  const dispatch = useAppDispatch();
  const players = useSelector(selectPlayers);
  const [showBoard, setShowBoard] = useState(false);

  async function fetchAsset(type: AssetType) {
    const { get, set, setStatus } = assetOperations[type];
    dispatch(setStatus({ isError: false, isFetching: true, isSuccess: false }));
    get()
      .then((data: any) => dispatch(set(data)))
      .catch(() => dispatch(setStatus({ isError: true, isFetching: false, isSuccess: false })));
  };

  useEffect(() => {
    Object.values(AssetType).forEach(type => fetchAsset(type as AssetType));
  }, []);

  return (
    <div className={styles.game}>
      {/* todo: uncomment? */}
      {/* {!showBoard && <PlayerSelection showBoard={showBoard} setShowBoard={setShowBoard} />} */}
      <PlayerSelection setShowBoard={setShowBoard} showBoard={showBoard} />
      <div className={styles.profilesContainer}>
        {players.filter(player => !!player.piece).map((player, i) => (
          <Profile key={`player_${i}`} index={i} player={player} />
        ))}
      </div>
      {showBoard && <Board />}
    </div>
  )
}

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
