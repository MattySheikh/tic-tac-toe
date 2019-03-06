type MoveType = 'X' | 'O';

interface BoardState {
	currentMove: number;
	boardSize: number;
	boardMap: BoardMap;
	history: {
		past: Move[];
		future: Move[];
	},
	points: Points;
	winner?: MoveType;
	altIcons?: boolean;
}

interface Move {
	x: number;
	y: number;
	type: MoveType;
}

interface Points {
	forwardDiagonal: number;
	backwardDiagonal: number;
	rows: {
		[row: number]: number
	};
	columns: {
		[column: number]: number;
	}
}

interface BoardMap {
	[row: number]: {
		[cell: number]: MoveType;
	}
}

declare module 'lodash';