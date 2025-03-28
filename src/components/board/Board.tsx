import { useState } from "react";
import { OmokPieceType } from "../../utils/enums";
import { BOARD_SIZE } from "../../utils/constants";
import { BoardValue } from "../../utils/types";
import { isWinner } from "../../utils/winCalculator";
import { BoardTile, PreviewTile } from "../tile/Tile";

import styles from "./Board.module.scss";
import { Profile } from "../profile/Profile";

type BoardProps = {
  readonly players: [OmokPieceType, OmokPieceType];
};

const inBound = (index: number, array: any[]) => index >= 0 && index < array.length;

export function Board({ players }: BoardProps) {
  const [values, setValues] = useState<(BoardValue)[]>(Array(BOARD_SIZE).fill(undefined));
  const [winner, setWinner] = useState<OmokPieceType | undefined>(undefined);
  const [turn, setTurn] = useState<0 | 1>(0);
  
  // Can only place piece if the tile is empty and there is not already a winner
  const canPlacePiece = (i: number) => inBound(i, values) && !values[i] && !winner;

  function placePiece(i: number) {
    if (!canPlacePiece(i)) {
      return;
    }

    // Place omok piece at the selected tile
    const player = players[turn];
    values[i] = player;
    setValues([...values]);

    // Check is the game is finished
    if (isWinner(i, values, player)) {
      setWinner(player);
      return;
    }

    // Next player's turn
    setTurn(((turn + 1) % 2) as 0 | 1);
  }

  function renderTiles(Tile: typeof BoardTile | typeof PreviewTile) {
    return (
      <div className={styles.grid}>
        {values.map((value: BoardValue, i: number) => (
          <Tile
            key={`tile_${i}`}
            index={i}
            placePiece={placePiece}
            type={players[turn]}
            value={value}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <Profile isNext={turn === 0} type={players[0]} />
      <Profile isNext={turn === 1} type={players[1]} />

      <div className={styles.board}>
        <div className={styles.fixedBoard}>
          {renderTiles(BoardTile)}
        </div>
        {renderTiles(PreviewTile)}
      </div>
    </>
  )
}