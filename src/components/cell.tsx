/**
 * Controls the actual tic-tac-toe cells. I decided to break it out in order for this component to be
 * purely presentational and not worry about the Redux store at all.
 */

import { noop } from 'lodash';
import * as React from 'react';

import { getMarkerIcon } from '@src/util';

import '@styles/components/cell.scss';

const CONTROLS_HEIGHT = '52px';

export interface CellProps {
	x: number;
	y: number;
	boardMap: BoardMap;
	boardSize: number;
	useAltIcons?: boolean;
	makeMove?: (x: number, y: number) => void;
}

export class Cell extends React.Component<CellProps> {
	public render() {
		const size = `${100 / this.props.boardSize}`;

		return(
			<div
				style={{
					width: `calc(${size}vw)`,
					height: `calc(${size}vh - ${CONTROLS_HEIGHT})`
				}}
				className="ttt-cell flex-center"
				onClick={this.getClickEvent()}
			>
				{this.getMarker()}
			</div>
		);
	}

	private getMarker = () => {
		const mark = this.props.boardMap[this.props.y] && this.props.boardMap[this.props.y][this.props.x];
		return mark ? getMarkerIcon(mark, this.props.useAltIcons) : '';
	}

	/**
	 * Depending on whether or not the cell can move, this will call back to the parent component or
	 * do nothing when clicked upon
	 */
	private getClickEvent = () => {
		if (this.canMakeMove()) {
			return () => this.props.makeMove(this.props.x, this.props.y);
		}

		return noop;
	}

	/**
	 * Determines whether or not the current cell can make a move based on the current board
	 */
	private canMakeMove(): boolean {
		return !this.props.boardMap[this.props.y] || !this.props.boardMap[this.props.y][this.props.x];
	}
}
