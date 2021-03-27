import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../services/firebase';

const useStorage = ({ name, description }) => {
	//const [url, setUrl] = useState(null);

	useEffect(() => {
		// references
		const storageRef = projectStorage.ref(name, description);
		const collectionRef = projectFirestore.collection('box');

		storageRef.put(name, description).on(
			'state_changed',
			snap => {},
			err => {},
			async () => {
				const createdAt = timestamp();
				await collectionRef.add({ name, description });
			}
		);
	}, [name, description]);

	return { name, description };
};

export default useStorage;
