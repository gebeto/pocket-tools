import * as React from 'react';
import ReactDOM from 'react-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, DarkTheme, BaseProvider, styled } from 'baseui';
import { StatefulInput } from 'baseui/input';
import { Display2 } from 'baseui/typography';
import { StyledLink } from "baseui/link";
import { Select } from "baseui/select";

import { HashRouter, Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';

import { Navigation } from './Navigation';
import { AuthProvider, useAuth } from './Auth';

import { UploadHTML } from './UploadHTML';
import { UrlHTML } from './UrlHTML';


const engine = new Styletron();

const Centered = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
});

const Body = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '500px',
	width: '100%',
	marginTop: '3em',
});


export const App = () => {
	const auth = useAuth();

	return (
		<React.Fragment>
			<Navigation />
			<Centered>
				<Body>
					{auth.data && <Switch>
						<Route path="/upload-html" component={UploadHTML} />
						<Route path="/url-html" component={UrlHTML} />
					</Switch>}
				</Body>
			</Centered>		
		</React.Fragment>
	);
}


ReactDOM.render((
	<AuthProvider>
		<StyletronProvider value={engine}>
			<BaseProvider theme={LightTheme}>
				<HashRouter>
					<App />
				</HashRouter>
			</BaseProvider>
		</StyletronProvider>
	</AuthProvider>
), document.querySelector("#root"));
