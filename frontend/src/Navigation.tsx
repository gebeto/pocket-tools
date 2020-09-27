import React from "react";
import {
	HeaderNavigation,
	ALIGN,
	StyledNavigationList,
	StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button, SIZE } from "baseui/button";

import { Link, useHistory } from 'react-router-dom';

import { useAuth } from './Auth';


export const Navigation = () => {
	const history = useHistory();
	const auth = useAuth();

	return (
		<HeaderNavigation>
			<StyledNavigationList $align={ALIGN.left}>
				<StyledNavigationItem>Pocket Tools</StyledNavigationItem>
			</StyledNavigationList>
			<StyledNavigationList $align={ALIGN.center} />
			<StyledNavigationList $align={ALIGN.right}>
				<StyledNavigationItem>
					<Link component={StyledLink} to="/upload-html">
						Upload HTML
					</Link>
				</StyledNavigationItem>
				<StyledNavigationItem>
					<Link component={StyledLink} to="/url-html">
						Parse HTML
					</Link>
				</StyledNavigationItem>
			</StyledNavigationList>
			<StyledNavigationList $align={ALIGN.right}>
				<StyledNavigationItem>
					{auth.data ? 
						<Button size={SIZE.compact} onClick={auth.logout}>Logout</Button>
						:
						<Button size={SIZE.compact} onClick={auth.login}>Login</Button>
					}
				</StyledNavigationItem>
			</StyledNavigationList>
		</HeaderNavigation>
	);
}