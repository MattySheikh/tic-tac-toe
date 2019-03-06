import { compose, createStore } from 'redux';
import { Action, handleActions } from 'redux-actions';

import { cloneDeep } from 'lodash';

import { getMove, MARKER_POINTS } from '@src/util';

// Add the redux devtools to prod and dev just for debugging purposes
const composeSetup = typeof window === 'object' &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

/**
 * In order to identify if there has been a winner, we are keeping track of the points scored. This
 * allows us to find a winner in O(n) time and not much additional space
 *
 * @param {Points} points - a cumulative score for diagonals + rows + columns
 * @param {Move} move - the most recent move
 * @param {number} boardSize
 * @param {boolean} revert - whether or not to remove points (done in an undo)
 *
 * @returns {Points}
 */
const getPoints = (points: Points, move: Move, boardSize: number, revert = false): Points => {
	const { x, y, type } = move;

	const newPoints: Points = cloneDeep(points);
	const value = revert ? -MARKER_POINTS[type] : MARKER_POINTS[type];

	if (x === y) {
		newPoints.forwardDiagonal += value;
	}

	if (x + y === boardSize - 1) {
		newPoints.backwardDiagonal += value;
	}

	if (!newPoints.rows[y]) {
		newPoints.rows[y] = 0;
	}

	if (!newPoints.columns[x]) {
		newPoints.columns[x] = 0;
	}

	newPoints.rows[y] += value;
	newPoints.columns[x] += value;

	return newPoints;
};

/**
 * Identifies a winner based on the current move and the size of the board as well as the points
 *
 * @param {Points} points - a cumulative score for diagonals + rows + columns
 * @param {Move} move - the most recent move
 * @param {number} currentMove
 * @param {number} boardSize
 *
 * @returns {undefined | MoveMarker}
 */
const getWinner = (points: Points, move: Move, currentMove: number, boardSize: number) => {
	const maxValue = Math.max(
		Math.abs(points.rows[move.y]),
		Math.abs(points.columns[move.x]),
		Math.abs(points.forwardDiagonal),
		Math.abs(points.backwardDiagonal)
	);

	return maxValue === boardSize ? getMove(currentMove) : undefined;
};

const DEFAULT_STATE: BoardState = {
	altIcons: false,
	currentMove: 0,
	boardSize: 3,
	boardMap: {},
	history: {
		past: [],
		future: []
	},
	points: {
		forwardDiagonal: 0,
		backwardDiagonal: 0,
		rows: {},
		columns: {}
	}
};

export const reducer = handleActions({
	reset: (state: BoardState): BoardState => ({
		...DEFAULT_STATE,
		altIcons: state.altIcons,
		boardSize: state.boardSize
	}),
	makeMove: (state: BoardState, { payload }: Action<{ x: number, y: number }>): BoardState => {
		if (state.winner) { return state; }

		const move: Move = {
			x: payload.x,
			y: payload.y,
			type: getMove(state.currentMove)
		};

		const points = getPoints(state.points, move, state.boardSize);
		const winner = getWinner(points, move, state.currentMove, state.boardSize);

		return {
			...state,
			points,
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
			},
			winner
		};
	},
	undoRedoMove: (state: BoardState, { payload }: Action<any>): BoardState => {
		const shouldRedo = payload;

		const stack = cloneDeep(shouldRedo ? state.history.future : state.history.past);
		const move: Move = stack.shift();

		// We shouldn't hit this but just in case we do return early
		if (!move) { return state; }

		const boardMap = cloneDeep(state.boardMap);

		const history = {
			past: shouldRedo ? [move, ...state.history.past] : stack,
			future: shouldRedo ? stack : [move, ...state.history.future]
		};

		boardMap[move.y][move.x] = shouldRedo ? move.type : undefined;

		const points = getPoints(state.points, move, state.boardSize, !shouldRedo);
		const winner = getWinner(points, move, state.currentMove, state.boardSize);

		return {
			...state,
			currentMove: state.currentMove + (shouldRedo ? 1 : -1),
			boardMap,
			winner,
			points,
			history
		};
	},
	toggleAltIcons: (state: BoardState): BoardState => {
		return {
			...state,
			altIcons: !state.altIcons
		};
	},
	changeBoardSize: (state: BoardState, { payload }: Action<any>): BoardState => {
		return {
			...DEFAULT_STATE,
			boardSize: payload
		};
	}
}, DEFAULT_STATE);

export const store = createStore(
	reducer,
	composeSetup()
);
