import { compose, createStore } from 'redux';
import { Action, handleActions } from 'redux-actions';

import { cloneDeep } from 'lodash';

import { getMove } from '@src/util';

// Add the redux devtools to prod and dev just for debugging purposes
const composeSetup = typeof window === 'object' &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const reducer = handleActions({
	makeMove: (state: BoardState, { payload }: Action<{ x: number, y: number }>) => {
		const move: Move = {
			x: payload.x,
			y: payload.y,
			type: getMove(state.currentMove)
		};

		return {
			...state,
			currentMove: state.currentMove + 1,
			boardMap: {
				...state.boardMap,
				[move.y]: {
					...state.boardMap[move.y],
					[move.x]: move.type
				}
			},
			history: {
				...state.history,
				past: [move, ...state.history.past]
			}
		};
	},
	undoMove: (state: BoardState) => {
		const past = cloneDeep(state.history.past);
		const lastMove: Move = past.shift();

		// We shouldn't hit this but just in case we do return early
		if (!lastMove) { return state; }

		const boardMap = cloneDeep(state.boardMap);
		boardMap[lastMove.y][lastMove.x] = undefined;

		return {
			...state,
			boardMap,
			history: {
				...state.history,
				past,
				future: [lastMove, ...state.history.future]
			}
		};
	},
	redoMove: (state: BoardState) => {
		const future = cloneDeep(state.history.future);
		const futureMove: Move = future.shift();

		// We shouldn't hit this but just in case we do return early
		if (!futureMove) { return state; }

		const boardMap = cloneDeep(state.boardMap);
		boardMap[futureMove.y][futureMove.x] = futureMove.type;

		return {
			...state,
			boardMap,
			history: {
				...state.history,
				past: [futureMove, ...state.history.past],
				future
			}
		};
	}

}, {
	currentMove: 0,
	boardSize: 3,
	boardMap: {},
	history: {
		past: [],
		future: []
	}
});

export const store = createStore(
	reducer,
	composeSetup()
);
