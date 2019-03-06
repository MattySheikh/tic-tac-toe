import { Board } from '@components/board';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import '@styles/components/main.scss';

interface MainProps {
	store: Store<object>;
}

export class Main extends React.Component<MainProps> {
	public render() {
		return(
			<Provider store={this.props.store}>
				<Board />
			</Provider>
		);
	}
}
