import React from 'react';

import { FileUploader } from "baseui/file-uploader";


export const UploadHTML = () => {
	const [errorMessage, setErrorMessage] = React.useState("");

	return (
		<React.Fragment>
			<FileUploader errorMessage={errorMessage} />
		</React.Fragment>
	);
}