import axios from 'axios';
import React,{Component} from 'react';

class ImgUpload extends Component {

	state = {
        // Initially, no file is selected
        selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
        
        // Update the state
        this.setState({ selectedFile: event.target.files[0] }); 
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
        
        // Create an object of formData
        const formData = new FormData();
        
        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        
        // Details of the uploaded file
        console.log(this.state.selectedFile);
        
        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	    if (this.state.selectedFile) {
		
		return (
            <div>
                <h2>File Details:</h2>
                
                <p>File Name: {this.state.selectedFile.name}</p>

                <p>File Type: {this.state.selectedFile.type}</p>
            </div>
		);
        } else {
            return (
            <div>
            </div>
            );
        }
	};
	
	render() {
	
	return (
		<div>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
                <br></br>
                <div></div>
			</div>
		{this.fileData()}
		</div>
	);
	}
}

export default ImgUpload;
