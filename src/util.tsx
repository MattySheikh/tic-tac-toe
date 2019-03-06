import * as React from 'react';

export enum MoveMarker {
	X = 'X',
	O = 'O'
}

export const MARKER_POINTS = {
	[MoveMarker.X]: 1,
	[MoveMarker.O]: -1,
};

export const getMove = (moveNumber: number) => {
	return moveNumber % 2 === 0 ? MoveMarker.X : MoveMarker.O;
};

export const getMarkerIcon = (mark: MoveType, useAltIcons = false): JSX.Element | string => {
	if (useAltIcons) {
		return MoveMarker[mark] === MoveMarker.X ?
		<div className="square" /> :
		<img className="sean" src={'./assets/images/sean.png'} />;
	}

	return MoveMarker[mark];
};
