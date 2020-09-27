import React from 'react';

import { Input } from "baseui/input";
import { Button } from "baseui/button";


export const UrlHTML = () => {
	return (
		<React.Fragment>
			<Input placeholder="URL" type="url" />
			<Button>Parse</Button>
		</React.Fragment>
	);
}