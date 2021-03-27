import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {BoxInterface} from '../helpers/interfaces';
import {firestore} from '../services/firebaseConfig';
import { getDatabaseDocuments } from '../services/firestore';

export default function BoxDialog(props: any) {
  const { handlerFunction } = props;
	const [formState, setFormState] = useState<BoxInterface| any>({
			name: '',
			description: '',
	});

	const handleChange = (event: any) => {
		const value = event.target.value;
		setFormState({
			...formState,
			[event.target.name]: value,
		});
	};
	// TODO: Handle Service
	async function onBoxFormSubmit(){

		var formData = {
			name: formState.name,
			description: formState.description,
		};
		const boxArray: any = [];
		firestore
			.collection('box')
			.get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => doc.data());
				const ids = querySnapshot.docs.map(doc => doc.id);
				data.map((element) => {
						const strictBox: BoxInterface = {
							id: '',
							name: element.name,
							description: element.description,
						}
						boxArray.push(strictBox);
				})
				
				ids.map((element, index) => {
					boxArray[index]["id"] = element;
				})
				console.log(boxArray);
				if(boxArray.length){
					firestore
					.collection('box')
					.doc()
					.set(formData)
					.then(function () {
						//TODO: Popup
						console.log('Box successfully written!');
					})
					.catch(function (error) {
						//TODO: Pop up Error dialog
						console.error('Error writing Box: ', error);
					});
				}
    });
		
	};
	// function onBoxFormSubmit() {
	// 	var data = {
	// 		name: formState.name,
	// 		description: formState.description,
	// 	};

	// 	const dbArray = firestore.collection("box").get().then(function(querySnapshot) {      
	// 		console.log(querySnapshot.size); 
	// 		return querySnapshot.size;
	// 	});
	// 	if(dbArray){
	// 		console.log('Hello');
	// 		firestore
	// 		.collection('box')
	// 		.doc('doc-' + (dbArray+1).toString())
	// 		.set(data)
	// 		.then(function () {
	// 			//TODO: Popup
	// 			console.log('Box successfully written!');
	// 		})
	// 		.catch(function (error) {
	// 			//TODO: Pop up Error dialog
	// 			console.error('Error writing Box: ', error);
	// 		});
	// 	}
	// }	



  return (
    <div>
      <Dialog open={true} onClose={handlerFunction} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Box Details</DialogTitle>
        <DialogContent>
            <form>
							<TextField
							autoFocus
            	margin="dense"
							fullWidth
							value={formState.name}
							name="name"
							label="Name"
							id="name"
							onChange={handleChange}
							required
						/>

						<TextField
							autoFocus
            	margin="dense"
							fullWidth
							value={formState.description}
							name="description"
							label="Description"
							id="description"
							onChange={handleChange}
							required
						/>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerFunction} color="primary">
            Cancel
          </Button>
          <Button onClick={onBoxFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
