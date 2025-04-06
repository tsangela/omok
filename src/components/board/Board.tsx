import { useState } from "react";
import { useSelector } from "react-redux";

import { incrementTurn, selectPlayers, selectTurnIndex, setPlayerScore, setTurnIndex } from "../../store/gameSlice";
import Messages from "../../utils/messages";
import { BOARD_SIZE } from "../../utils/constants";
import { ScoreType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import { BoardValue, Player } from "../../utils/types";
import { inBound, nextTurnIndex } from "../../utils/validation";
import { calculateScore, isWinner } from "../../utils/winCalculator";

import { BoardTile, PreviewTile } from "../tile/Tile";

import styles from "./Board.module.scss";

type BoardProps = {
  winnerIndex: number | undefined;
  setWinnerIndex: (index: number | undefined) => void;
}

export function Board({ winnerIndex, setWinnerIndex }: BoardProps) {
  const dispatch = useAppDispatch();
  const players = useSelector(selectPlayers);
  const turnIndex = useSelector(selectTurnIndex);

  const emptyBoard = () => Array(BOARD_SIZE).fill(undefined);
  const [values, setValues] = useState<(BoardValue)[]>(emptyBoard());

  // Can only place piece if the tile is empty and there is not already a winner
  const canPlacePiece = (i: number) => inBound(i, values) && !values[i] && winnerIndex === undefined;

  function placePiece(i: number) {
    const { piece } = players[turnIndex];
    if (!piece || !canPlacePiece(i)) {
      return;
    }

    // Place omok piece at the selected tile
    values[i] = piece;
    setValues([...values]);

    // Next player's turn
    if (!isWinner(i, values, piece)) {
      dispatch(incrementTurn());
      return;
    }

    // Someone won
    const winnerScore = calculateScore(players[turnIndex].score, ScoreType.Win);
    dispatch(setPlayerScore({ index: turnIndex, score: winnerScore }));

    const loserIndex = nextTurnIndex(turnIndex);
    const loserScore = calculateScore(players[loserIndex].score, ScoreType.Loss);
    dispatch(setPlayerScore({ index: loserIndex, score: loserScore }));

    setWinnerIndex(turnIndex);
  }

  function rematch() {
    setValues(emptyBoard());
    setWinnerIndex(undefined);
    dispatch(setTurnIndex(0)); // todo: alternate turns?
  }

  function renderTiles(Tile: typeof BoardTile | typeof PreviewTile) {
    return (
      <div className={styles.grid}>
        {values.map((value: BoardValue, i: number) => (
          <Tile
            key={`tile_${i}`}
            index={i}
            canPreview={canPlacePiece(i)}
            placePiece={placePiece}
            type={players[turnIndex].piece}
            value={value}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className={styles.board}>
        <div className={styles.fixedBoard}>
          {renderTiles(BoardTile)}
        </div>
        {renderTiles(PreviewTile)}
        {typeof winnerIndex === "number" && (
          <WinnerScreen rematch={rematch} winner={players[winnerIndex]} />
        )}
      </div>
    </>
  )
}

type WinnerScreenProps = {
  rematch: () => void;
  winner: Player;
}

function WinnerScreen({ rematch, winner }: WinnerScreenProps) {
  return (
    <div className={styles.winnerScreen}>
      <div className={styles.resultCard}>
        <span className={styles.name}>{winner.name}</span>
        <span className={styles.wins}>{Messages.wins}</span>
      </div>
      <button className={styles.rematchButton} onClick={rematch}>
        {Messages.rematch}
      </button>
    </div>
  )
}