/**
 * This component handles the controls at the top of the screen and propagates the changes to the Redux store
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '@src/actions';
import { getMarkerIcon, getMove } from '@src/util';

import '@styles/components/board-controls.scss';

interface BoardControlProps {
	altIcons: boolean;
	boardSize: number;
	currentMove: number;
	history: MoveHistory;
	changeBoardSize: (size: number) => void;
	reset: () => void;
	toggleAltIcons: () => void;
	undoRedoMove: (redo?: boolean) => void;
}

class BoardControlsComponent extends React.Component<BoardControlProps> {
	public render() {
		const icon = getMarkerIcon(getMove(this.props.currentMove), this.props.altIcons);
		return(
			<div className="controls-container flex-center">
				<div>{icon}'s turn</div>
				<div><button disabled={this.props.history.future.length === 0} onClick={() => this.props.undoRedoMove()}>Undo</button></div>
				<div><button disabled={this.props.history.past.length === 0} onClick={() => this.props.undoRedoMove(true)}>Redo</button></div>
				<div><button onClick={this.props.reset}>Reset</button></div>
				<div>
					<label>
						<input type="checkbox" checked={this.props.altIcons} onChange={this.props.toggleAltIcons} />
						<span>Make it weird</span>
					</label>
				</div>
				<div className="flex-center">
					Board Size:
					<input type="number" min={3} max={10} value={this.props.boardSize} onChange={this.changeBoardSize} />
				</div>
			</div>
		);
	}

	private changeBoardSize = (e: React.FormEvent<HTMLInputElement>) => {
		this.props.changeBoardSize(+e.currentTarget.value);
	}

}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	undoRedoMove: (redo = false) => dispatch(actions.undoRedoMove(redo)),
	reset: () => dispatch(actions.reset()),
	toggleAltIcons: () => dispatch(actions.toggleAltIcons()),
	changeBoardSize: (size: number) => dispatch(actions.changeBoardSize(size))
});

const mapStateToProps = (state: BoardState) => ({
	altIcons: state.altIcons,
	boardSize: state.boardSize,
	currentMove: state.currentMove,
	history: state.history
});

export const BoardControls = connect(mapStateToProps, mapDispatchToProps)(BoardControlsComponent);
