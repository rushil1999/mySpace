import React, { useState, useEffect }from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import BoxSkeleton from '../components/BoxSkeleton';
import BoxDialog from '../components/BoxDialog';
import Button from '@material-ui/core/Button';
import  { firestore } from '../services/firebaseConfig'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);


export default function BoxGrid() {
	console.log('Firebase oBject', firestore);
	const [spacing, setSpacing] = useState<GridSpacing>(4);
	const [openModalState, setOpenModalState] = useState<Boolean>(false);
	const [boxes, setBoxes] = useState<Array<Record<string, string>>>([]);
	const classes = useStyles();

	const handleModal = () => {
		setOpenModalState(!openModalState);
	};

	const childProps: any = {
		id: 'string',
		handlerFunction: handleModal,
	};

	useEffect(() => {
		firestore
			.collection('box')
			.get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => doc.data());
				console.log(data);
			});
	}, []);

	return (
		<>
			<>
				<div style={{ marginTop: '1em', marginBottom: '1em' }}>
					<Button variant="outlined" color="primary" onClick={handleModal}>
						ADD BOX
					</Button>
				</div>
				<Grid container className={classes.root} spacing={4}>
					<Grid item xs={12}>
						<Grid container justify="center" spacing={spacing}>
							{[0, 1, 2, 3].map(value => {
								return (
									<Grid key={'string'} item>
										<BoxSkeleton id={'string'} handlerFunction={handleModal} />
									</Grid>
								);
							})}
						</Grid>
					</Grid>
				</Grid>
			</>
			<>{openModalState ? <BoxDialog handlerFunction={handleModal}></BoxDialog> : null}</>
		</>
	);
}
