import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { projectFirestore } from '../services/firebase';
import BoxService from '../services/BoxService';
import { useList } from 'react-firebase-hooks/database';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
		justifyContent: 'center',
		display: 'flex',
	},
}));

const UploadBox = () => {
	const [state, setState] = useState({
		name: '',
		description: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [box, setBox] = useState(['']);
	const classes = useStyles();
	const handleChange = evt => {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value,
		});
	};

	const onBoxSubmit = () => {
		var data = {
			name: state.name,
			description: state.description,
		};
		BoxService.create(data)
			.then(() => {
				setSubmitted(true);
			})
			.catch(e => {
				console.log(e);
			});
	};

	// useEffect(() => {

	// });

	return (
		<div className={classes.root}>
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						id="standard-basic"
						value={state.name}
						name="name"
						label="Name"
						onChange={handleChange}
						required
					/>

					<TextField
						id="standard-basic"
						value={state.description}
						name="description"
						label="Description"
						onChange={handleChange}
						required
					/>
					<br />
					<Button variant="contained" onClick={onBoxSubmit}>
						Add
					</Button>
				</div>
			</form>
		</div>
	);
};

export default UploadBox;
