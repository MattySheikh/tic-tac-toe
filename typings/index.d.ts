type MoveType = 'X' | 'O';

interface BoardState {
	currentMove: number;
	boardSize: number;
	boardMap: BoardMap;
	history: {
		past: Move[];
		future: Move[];
	}
}

interface Move {
	x: number;
	y: number;
	type: MoveType;
}

interface BoardMap {
	[row: number]: {
		[cell: number]: MoveType;
	}
}

declare module 'lodash';