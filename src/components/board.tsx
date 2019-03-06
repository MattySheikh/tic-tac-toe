import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';

import { Cell, CellProps } from '@components/cell';
import { actions } from '@src/actions';
import { getMove } from '@src/util';

import '@styles/components/board.scss';

interface BoardProps {
	currentMove: number;
	boardSize: number;
	boardMap: BoardMap;
	makeMove: (x: number, y: number) => void;
	undoMove: () => void;
	redoMove: () => void;
}

export class BoardComponent extends React.Component<BoardProps> {
	public render() {
		return(<div>
			Current move: {this.props.currentMove}, ({getMove(this.props.currentMove)}'s turn)
			{this.getBoard()}
			<button onClick={this.props.undoMove}>Undo</button>
			<button onClick={this.props.redoMove}>Redo</button>
		</div>);
	}

	private getBoard = () => {
		const boardRows: JSX.Element[] = [];

		for (let y = 0; y < this.props.boardSize; y++) {
			const cells: JSX.Element[] = [];
			for (let x = 0; x < this.props.boardSize; x++) {
				const props: CellProps = {
					x,
					y,
					boardMap: this.props.boardMap,
					makeMove: () => this.props.makeMove(x, y)
				};

				cells.push(<Cell {...props} />);
			}

			boardRows.push(
				<div className="ttt-row">
					{...cells}
				</div>
			);
		}

		return boardRows;
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => {
	return {
		makeMove: (x: number, y: number) => dispatch(actions.makeMove({ x, y })),
		undoMove: () => dispatch(actions.undoMove()),
		redoMove: () => dispatch(actions.redoMove())
	};
};

const mapStateToProps = (state: BoardState) => {
	return {
		currentMove: state.currentMove,
		boardSize: state.boardSize,
		boardMap: state.boardMap
	};
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
