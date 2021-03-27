import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ state, setState }) => {
	const { url } = useStorage(state);

	useEffect(() => {
		if (url) {
			setState(null);
		}
	}, [url, setState]);

	return <div></div>;
};

export default ProgressBar;
