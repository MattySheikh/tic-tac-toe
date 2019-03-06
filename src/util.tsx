import * as React from 'react';

export enum MoveMarker {
	X = 'X',
	O = 'O'
}

export const MARKER_POINTS = {
	[MoveMarker.X]: 1,
	[MoveMarker.O]: -1,
};

/**
 * Gets the marker of whose turn it is
 *
 * @param {number} moveNumber
 *
 * @returns {MoveMarker}
 */
export const getMove = (moveNumber: number): MoveMarker => {
	return moveNumber % 2 === 0 ? MoveMarker.X : MoveMarker.O;
};

/**
 * Gets the marker icon given what type of move it is
 *
 * @param {MoveType} mark
 * @param {boolean} useAltIcons
 *
 * @returns {JSX.Element | string}
 */
export const getMarkerIcon = (mark: MoveType, useAltIcons = false): JSX.Element | string => {
	if (useAltIcons) {
		return MoveMarker[mark] === MoveMarker.X ?
		<div className="square" /> :
		<img className="sean" src={'./assets/images/sean.png'} />;
	}

	return MoveMarker[mark];
};
