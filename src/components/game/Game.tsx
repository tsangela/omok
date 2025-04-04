import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getEars, getFaces, getHairs, getSkins } from "../../api/character";
import { setEars, setEarsFetchStatus, setFaces, setFacesFetchStatus, setHairs, setHairsFetchStatus, setSkins, setSkinsFetchStatus } from "../../store/assetsSlice";
import { selectPlayers, setPlayerInfo } from "../../store/gameSlice";

import { AssetType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import { loadPlayerProgress } from "../../utils/localStorage";
import Messages from "../../utils/messages";
import Path from "../../utils/path";

import { Board } from "../board/Board";
import { PlayerSelection } from "../player-selection/PlayerSelection";
import { Profile } from "../profile/Profile";

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

  const startGame = useCallback(() => {
    players.forEach(p => {
      const playerData = loadPlayerProgress(p.name);
      if (playerData) {
        dispatch(setPlayerInfo({ index: p.index, overrides: playerData }));
      }
    });
    setShowBoard(true);
  }, [players]);

  return (
    <>
      <style>{`body{background:#e8f5ff;}`}</style>
      <div className={styles.container}>
        <Link to={Path.Root} className={styles.header} /*onClick={() => dispatch(clearGame())}*/>
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
          : <PlayerSelection onDone={startGame} />
        }        
      </div>
    </>
  )
}
