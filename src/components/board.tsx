import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { BoardControls } from '@components/board-controls';
import { Cell, CellProps } from '@components/cell';
import { actions } from '@src/actions';
import { getMarkerIcon } from '@src/util';

import '@styles/components/board.scss';

interface BoardProps {
	altIcons: boolean;
	boardMap: BoardMap;
	boardSize: number;
	currentMove: number;
	winner: MoveType;
	makeMove: (x: number, y: number) => void;
}

class BoardComponent extends React.Component<BoardProps> {
	public render() {
		return(<div>
			<BoardControls />
			{<div className="flex-center winner-container">{this.getWinner()}</div>}
			{this.getBoard()}
		</div>);
	}

	private getWinner = () => {
		if (this.props.winner) {
			return(
				<React.Fragment>
					{getMarkerIcon(this.props.winner, this.props.altIcons)}
					<span style={{ padding: '0 8px' }}>won!</span>
				</React.Fragment>
			);
		}

		if (this.props.currentMove === Math.pow(this.props.boardSize, 2)) {
			return(<React.Fragment>Cat's game!</React.Fragment>);
		}
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
					boardSize: this.props.boardSize,
					makeMove: () => this.props.makeMove(x, y),
					useAltIcons: this.props.altIcons,
				};

				cells.push(<Cell {...props} />);
			}

			boardRows.push(
				<div className="ttt-row">
					{...cells}
				</div>
			);
		}

		return(
			<div className="board">
				{...boardRows}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	makeMove: (x: number, y: number) => dispatch(actions.makeMove({ x, y })),
});

const mapStateToProps = (state: BoardState) => ({
	currentMove: state.currentMove,
	boardSize: state.boardSize,
	boardMap: state.boardMap,
	winner: state.winner,
	altIcons: state.altIcons
});

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
