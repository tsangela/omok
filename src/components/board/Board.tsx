import { useState } from "react";
import { useSelector } from "react-redux";
import { incrementTurn, selectPlayers, selectTurn } from "../../store/gameSlice";
import { BOARD_SIZE } from "../../utils/constants";
import { OmokPieceType } from "../../utils/enums";
import { useAppDispatch } from "../../utils/hooks";
import { BoardValue, Players } from "../../utils/types";
import { inBound, arePlayersSelected } from "../../utils/validation";
import { isWinner } from "../../utils/winCalculator";
import { BoardTile, PreviewTile } from "../tile/Tile";
import { Profile } from "../profile/Profile";

import styles from "./Board.module.scss";

type BoardProps = {
  readonly players: [OmokPieceType, OmokPieceType];
};

export function Board() {
  const dispatch = useAppDispatch();
  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);

  const [values, setValues] = useState<(BoardValue)[]>(Array(BOARD_SIZE).fill(undefined));
  const [winner, setWinner] = useState<OmokPieceType | undefined>(undefined);
  
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
    dispatch(incrementTurn());
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
            type={players[turn]}
            value={value}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.board}>
      <div className={styles.fixedBoard}>
        {renderTiles(BoardTile)}
      </div>
      {renderTiles(PreviewTile)}
    </div>
  )
}
