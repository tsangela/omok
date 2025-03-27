import { BOARD_SIZE, COLUMN_SIZE, ROW_SIZE, WIN_CONDITION_LENGTH } from "./constants";
import { OmokPieceType } from "./enums";
import { BoardValue } from "./types";

function getRowIndices(index: number) {
    const firstIndex = Math.floor(index / ROW_SIZE) * ROW_SIZE;
    return Array(ROW_SIZE).fill(-1).map((_, i) => firstIndex + i);
}

function getColumnIndices(index: number) {
    const firstIndex = index % ROW_SIZE;
    return Array(COLUMN_SIZE).fill(-1).map((_, i) => firstIndex + i*ROW_SIZE);
}

function getPrimaryDiagonalIndices(index: number) {
    return getDiagonalIndices(index, ROW_SIZE + 1);
}

function getSecondaryDiagonalIndices(index: number) {
    return getDiagonalIndices(index, ROW_SIZE - 1);
}

function getDiagonalIndices(index: number, difference: number) {
    const onLeftEdge = (index: number) => index % ROW_SIZE === 0;
    const onRightEdge = (index: number) => (index + 1) % ROW_SIZE === 0;

    const indices = [index];
    let currentIndex = index;
    while (currentIndex >= difference && !onLeftEdge(currentIndex)) {
        currentIndex -= difference;
        indices.push(currentIndex);
    }

    currentIndex = index;
    while (currentIndex < BOARD_SIZE - difference && !onRightEdge(currentIndex)) {
        currentIndex += difference;
        indices.push(currentIndex);
    }

    return indices.sort((a, b) => a - b);
}

function hasWin(indices: number[], values: BoardValue[], type: OmokPieceType) {
    const mappedValues = indices.map(i => values[i]);
    let count = 0;
    for (let value of mappedValues) {
        count = value === type ? count + 1 : 0;
        if (count >= WIN_CONDITION_LENGTH) {
            return true;
        }
    }
    return false;
}

export function isWinner(index: number, values: BoardValue[], type: OmokPieceType) {
    // Search horizontally
    const rowIndices = getRowIndices(index);
    if (hasWin(rowIndices, values, type)) {
        return true;
    }

    // Search vertically
    const columnIndices = getColumnIndices(index);
    if (hasWin(columnIndices, values, type)) {
        return true;
    }

    // Search diagonally
    const primaryDiagonalIndices = getPrimaryDiagonalIndices(index);
    if (hasWin(primaryDiagonalIndices, values, type)) {
        return true;
    }
    
    const secondaryDiagonalIndices = getSecondaryDiagonalIndices(index);
    if (hasWin(secondaryDiagonalIndices, values, type)) {
        return true;
    }

    return false;
}
