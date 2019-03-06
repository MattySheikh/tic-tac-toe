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

	private getClickEvent = () => {
		if (this.canMakeMove()) {
			return () => this.props.makeMove(this.props.x, this.props.y);
		}

		return noop;
	}

	private canMakeMove() {
		return !this.props.boardMap[this.props.y] || !this.props.boardMap[this.props.y][this.props.x];
	}
}
