import React from 'react';
import FormFields from '../Widgets/FormFields/FormFields';
import {firebaseTeams} from '../../firebase';

import './Dashboard.css';

class Dashboard extends React.Component{

    state = {
        
        postError: '',
        formData:{
            postTitle:{
                element:'input',
                value:'',
                label:true,
                labelText:'Enter post title',
                config:{
                    type:"text",
                    placeholder:"Post title",
                },
                validation:{
                    required:true
                },
                valid:false,
                errorMessage:'',
                touched:false
            },

            postAuthor:{
                element:"input",
                value:'',
                label:true,
                labelText:'Enter Author Name',
                config:{
                    type:"text",
                    placeholder:"Enter Author"
                },
                validation:{
                    required:true
                },
                valid:false,
                errorMessage: '',
                touched:false
            },

            teams:{
                element:"select",
                value:'',
                label:true,
                labelText:'Select a team',
                config:{
                    name:"teams",
                    options:[]
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                errorMessage:''
            }

        }
    }

    componentDidMount(){
        this.loadTeams();
    }

    loadTeams = ()=>{
        let teamOptions  = [];
        firebaseTeams.once('value')
        .then((snapshot)=> {
            snapshot.forEach((childSnapshot)=>{
                teamOptions = [...teamOptions, {id: childSnapshot.val().teamId, name: childSnapshot.val().name}];
            })
        })
        .then(()=>{
            let newformData = {...this.state.formData};
            let newElement = {...this.state.formData['teams'], config: {...this.state.formData["teams"].config, options:teamOptions}};

            newformData = {...newformData, 'teams': newElement};
            this.setState({formData: newformData});
        })
    }

    handleFormSubmit = (e)=> {
        let valid = true;
        let dataToSubmit = {};
        for(let x in this.state.formData){
            valid = this.state.formData[x].valid && valid;
        }

        if(valid){
            for(let x in this.state.formData){
                dataToSubmit = {...dataToSubmit, [x]:this.state.formData[x].value}
            }
            console.log(dataToSubmit);
        }
        e.preventDefault();
    }

    validateElement = (element) =>{

        let error = [true,''];

        if(element.validation.required){
            error = element.value==='' ? [false,'This field is required'] : error;
        }

        return error;
    }

    updateFormData = ({event, id, blur})=> {

        let valid=false;
        let newformData = {...this.state.formData};
        let newElement = {...this.state.formData[id], value:event.target.value};

        if(blur){
            valid = this.validateElement(newElement);
        }
        if(valid){
            newElement = {...newElement, valid:valid[0], errorMessage:valid[1], touched:true}
        }
        newformData = {...newformData, [id]: newElement};
        this.setState({formData: {...this.state.formData, ...newformData}});
    }

    handleInputError = (element)=>{
        if(element.touched){
            if(element.errorMessage!==''){
                return <div className="error-msg">{element.errorMessage}</div>
            }
        }
        else{
            return null;
        }
    }

    

    render(){
        return(
            <React.Fragment>

                <h1 className="display-4">Add Posts</h1>
               
               <form>
                    <FormFields id="postTitle" formData={this.state.formData.postTitle} change={(element)=> this.updateFormData(element)}
                    blur={(element)=> this.updateFormData(element)} 
                    showError={this.handleInputError} />

                    <FormFields id="postAuthor" formData={this.state.formData.postAuthor} change = {(element)=> this.updateFormData(element)} 
                    blur={(element)=> this.updateFormData(element)}
                    showError={this.handleInputError}
                    />

                    <FormFields id="teams" 
                        formData={this.state.formData.teams} 
                        change = {(element)=> this.updateFormData(element)} 
                        blur={(element)=> this.updateFormData(element)} />

                    <button type="submit" onClick={(e)=> this.handleFormSubmit(e)}>Submit Post</button>

               </form>

            </React.Fragment>

        )
    }
}
export default Dashboard;