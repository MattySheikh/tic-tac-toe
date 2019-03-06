import { createAction } from 'redux-actions';

const makeMove = createAction<{x: number, y: number }>('makeMove');
const undoMove = createAction('undoMove');
const redoMove = createAction('redoMove');
export const actions = {
	makeMove,
	undoMove,
	redoMove
};
