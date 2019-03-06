import { createAction } from 'redux-actions';

const makeMove = createAction<{x: number, y: number }>('makeMove');
const undoRedoMove = createAction<boolean>('undoRedoMove');
const reset = createAction('reset');
const toggleAltIcons = createAction('toggleAltIcons');
const changeBoardSize = createAction('changeBoardSize');

export const actions = {
	makeMove,
	undoRedoMove,
	reset,
	toggleAltIcons,
	changeBoardSize
};
