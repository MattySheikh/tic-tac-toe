export enum MoveMarker {
	X = 'X',
	O = 'O'
}

export const getMove = (moveNumber: number) => {
	return moveNumber % 2 === 0 ? MoveMarker.X : MoveMarker.O;
};
