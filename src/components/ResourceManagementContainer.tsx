import React from 'react';
import Header from './Header';
import UploadBox from './UploadBox';
import BoxContainer from './BoxContainer';

function ResourceManagementContainer() {
	return (
		<div className="App">
			<Header />
			<UploadBox />
			<BoxContainer />
		</div>
	);
}

export default ResourceManagementContainer;
