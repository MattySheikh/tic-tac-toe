import { noop } from 'lodash';
import * as React from 'react';

import { MoveMarker } from '@src/util';

export interface CellProps {
	x: number;
	y: number;
	boardMap: BoardMap;
	makeMove?: (x: number, y: number) => void;
}

export class Cell extends React.Component<CellProps> {
	public render() {
		return(
			<div className="ttt-cell" onClick={this.getClickEvent()}>{this.getMarker()}</div>
		);
	}

	private getMarker = () => {
		const mark = this.props.boardMap[this.props.y] && this.props.boardMap[this.props.y][this.props.x];
		return mark ? MoveMarker[mark] : '';
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
