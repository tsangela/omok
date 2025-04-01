import { useState } from "react";
import { useSelector } from "react-redux";
import { incrementTurn, selectPlayers, selectTurn, setPlayerScore } from "../../store/gameSlice";
import Messages from "../../utils/messages";
import { classNames } from "../../utils/classNames";
import { BOARD_SIZE } from "../../utils/constants";
import { ScoreType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import { BoardValue, Player } from "../../utils/types";
import { inBound, nextTurn } from "../../utils/validation";
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
  const turn = useSelector(selectTurn);

  const emptyBoard = () => Array(BOARD_SIZE).fill(undefined);
  const [values, setValues] = useState<(BoardValue)[]>(emptyBoard());

  // Can only place piece if the tile is empty and there is not already a winner
  const canPlacePiece = (i: number) => inBound(i, values) && !values[i] && winnerIndex === undefined;

  function placePiece(i: number) {
    const { piece } = players[turn];
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
    const winnerScore = calculateScore(players[turn].score, ScoreType.Win);
    dispatch(setPlayerScore({ index: turn, score: winnerScore }));

    const loserIndex = nextTurn(turn);
    const loserScore = calculateScore(players[loserIndex].score, ScoreType.Loss);
    dispatch(setPlayerScore({ index: loserIndex, score: loserScore }));

    setWinnerIndex(turn);
  }

  function clearBoard() {
    setValues(emptyBoard());
    setWinnerIndex(undefined);
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
            type={players[turn].piece}
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
          <WinnerScreen clearBoard={clearBoard} winner={players[winnerIndex]} />
        )}
      </div>
    </>
  )
}

type WinnerScreenProps = {
  clearBoard: () => void;
  winner: Player;
}

function WinnerScreen({ clearBoard, winner }: WinnerScreenProps) {
  return (
    <div className={classNames(styles.fixedBoard, styles.winnerScreen)}>
      <span className={styles.winner}>{Messages.winner(winner.name)}</span>
      <button className={styles.rematchButton} onClick={clearBoard}>
        {Messages.rematch}
      </button>
    </div>
  )
}