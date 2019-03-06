import { Main } from '@components/main';
import { store } from '@src/reducer';
import * as React from 'react'; // Required in order to load Main
import * as ReactDOM from 'react-dom';

import '@styles/index.scss';

ReactDOM.render(
	<Main {...{ store }} />,
	document.getElementById('main')
);
