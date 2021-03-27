import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { projectFirestore } from '../services/firebase';
import BoxService from '../services/BoxService';
import { useList } from 'react-firebase-hooks/database';

const BoxContainer = () => {
	const { allBox, loading, error } = useList(BoxService.getAll());
	console.log('allBoxes' + allBox);
	return (
		<div>
			<h2>ALL BOOXXEESSS</h2>
			<ul>{allBox && allBox.map(item => <li>{item}</li>)}</ul>
		</div>
	);
};
export default BoxContainer;
