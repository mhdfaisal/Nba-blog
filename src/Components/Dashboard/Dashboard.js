import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import uuidv1 from 'uuid/v1';
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import FormFields from "../Widgets/FormFields/FormFields";
import FileUpload from "../Widgets/FileUpload/FileUpload";
import { firebaseTeams, firebase, firebaseArticles } from "../../firebase";

import "./Dashboard.css";

class Dashboard extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: "",
    renderSubmit:false,
    formData: {
      title: {
        element: "input",
        value: "",
        label: true,
        labelText: "Enter post title",
        config: {
          type: "text",
          placeholder: "Post title"
        },
        validation: {
          required: true
        },
        valid: false,
        errorMessage: "",
        touched: false
      },

      body: {
        name: "body",
        value: "",
        valid: true
      },

      image: {
        isUploading: false,
        imageUrl: "",
        progress: 0,
        value: "",
        valid: true
      },

      author: {
        element: "input",
        value: "",
        label: true,
        labelText: "Enter Author Name",
        config: {
          type: "text",
          placeholder: "Enter Author"
        },
        validation: {
          required: true
        },
        valid: false,
        errorMessage: "",
        touched: false
      },

      team: {
        element: "select",
        value: "0",
        label: true,
        labelText: "Select a team",
        config: {
          name: "team",
          options: []
        },
        validation: {
          required: true
        },
        valid: true,
        touched: false,
        errorMessage: ""
      },
      tags: {
        element: "input",
        label: true,
        labelText: "Tags",
        value: "",
        config: {
          type: "text",
          placeholder: "Comma separated tags",
          name: "tags"
        },
        valid: false,
        validation: {
          required: true
        },
        touched: false,
        errorMessage: "This field is required"
      }
    }
  };

  componentDidMount() {
    this.loadTeams();
  }

  loadTeams = () => {
    let teamOptions = [];
    firebaseTeams
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          teamOptions = [
            ...teamOptions,
            { id: childSnapshot.val().teamId, name: childSnapshot.val().name }
          ];
        });
      })
      .then(() => {
        let newformData = { ...this.state.formData };
        let newElement = {
          ...this.state.formData["team"],
          config: {
            ...this.state.formData["team"].config,
            options: teamOptions
          }
        };

        newformData = { ...newformData, team: newElement };
        this.setState({ formData: newformData });
      });
  };

  onEditorStateChange = editorState => {
    let contentState = editorState.getCurrentContent();
    let htmlValue = stateToHTML(contentState);

    let newElement = { ...this.state.formData["body"], value: htmlValue };

    this.setState({
      editorState,
      formData: { ...this.state.formData, body: newElement }
    });
  };

  handleFormSubmit = e => {
    let valid = true;
    let dataToSubmit = {};
    for (let x in this.state.formData) {
      valid = this.state.formData[x].valid && valid;
    }

    if (valid) {
      
      if(this.state.postError!==""){
        this.setState({postError:""});
      }

      for (let x in this.state.formData) {
        if (x === "tags") {
          let tags = this.state.formData[x].value.trim().split(",");
          dataToSubmit = { ...dataToSubmit, [x]: tags };
        } else {
          dataToSubmit = { ...dataToSubmit, [x]: this.state.formData[x].value };
        }
        let date = firebase.database.ServerValue.TIMESTAMP;
        let id = uuidv1();

        dataToSubmit = {...dataToSubmit, date, id};
      }
      firebaseArticles.push(dataToSubmit)
      .then(()=> this.props.history.push("/"))
      .catch(err=> console.log(err))
    }
    else{
      //ERROR Message required !!!!!
      this.setState({postError: "All fields are required !!"})
      console.log("maasmsms")
    }
    e.preventDefault();
  };

  validateElement = element => {
    let error = [true, ""];

    if (element.validation.required) {
      error = element.value === "" ? [false, "This field is required"] : error;
    }

    return error;
  };

  updateFormData = ({ event, id, blur }) => {
    let valid = false;
    let newformData = { ...this.state.formData };
    let newElement = { ...this.state.formData[id], value: event.target.value };

    if (blur) {
      valid = this.validateElement(newElement);
    }
    if (valid) {
      newElement = {
        ...newElement,
        valid: valid[0],
        errorMessage: valid[1],
        touched: true
      };
    }
    newformData = { ...newformData, [id]: newElement };
    this.setState({ formData: { ...this.state.formData, ...newformData } });
  };

  handleInputError = element => {
    if (element.touched) {
      if (element.errorMessage !== "") {
        return <div className="error-msg">{element.errorMessage}</div>;
      }
    } else {
      return null;
    }
  };

  renderSubmitBtn = ()=>{
    return this.state.renderSubmit ? 
    <button type="submit" style={{ margin: "5% 0 5% 0" }}>
    Submit Post</button> : ''
  }

  handleUploadStart = () => {
    this.setState({
      renderSubmit: false,
      formData: {
        ...this.state.formData,
        image: {
          ...this.state.formData["image"],
          isUploading: true,
          progress: 0
        }
      }
    });
  };

  handleUploadError = error => {
    this.setState({
      renderSubmit:false,
      formData: {
        ...this.state.formData,
        image: {
          ...this.state.formData["image"],
          isUploading: false
        }
      }
    });
    console.log(error);
  };

  handleUploadSuccess = filename => {
    this.setState({
      renderSubmit : true,
      formData: {
        ...this.state.formData,
        image: {
          ...this.state.formData["image"],
          isUploading: false,
          progress: 100
        }
      }
    });

    firebase
      .storage()
      .ref("articles")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({
          formData: {
            ...this.state.formData,
            image: {
              ...this.state.formData["image"],
              imageUrl: url,
              value: filename
            }
          }
        })
      );
  };

  handleProgress = progress => {
    this.setState({
      formData: {
        ...this.state.formData,
        image: { ...this.state.formData["image"], progress }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="display-4">Add Posts</h1>

        <form
          className="dashboard-form"
          onSubmit={e => this.handleFormSubmit(e)}
        >
          <FileUpload
            accept="images/*"
            name="article"
            storageRef={firebase.storage().ref("articles")}
            handleUploadStart={() => this.handleUploadStart()}
            handleUploadError={error => this.handleUploadError(error)}
            handleUploadSuccess={filename => this.handleUploadSuccess(filename)}
            handleProgress={progress => {
              this.handleProgress(progress);
            }}
          />
          {this.state.formData.image.isUploading && (
            <p>Progress : {this.state.formData.image.progress} %</p>
          )}

          {this.state.formData.image.imageUrl!==''? 
            <img src={`${this.state.formData.image.imageUrl}`} style={{maxWidth:"100%", height:"auto"}} alt="preview" />
          : ''}

          <FormFields
            id="title"
            formData={this.state.formData.title}
            change={element => this.updateFormData(element)}
            blur={element => this.updateFormData(element)}
            showError={this.handleInputError}
          />

          <FormFields
            id="author"
            formData={this.state.formData.author}
            change={element => this.updateFormData(element)}
            blur={element => this.updateFormData(element)}
            showError={this.handleInputError}
          />

          <FormFields
            id="team"
            formData={this.state.formData.team}
            change={element => this.updateFormData(element)}
            blur={element => this.updateFormData(element)}
          />

          <FormFields
            id="tags"
            formData={this.state.formData.tags}
            change={element => this.updateFormData(element)}
            blur={element => this.updateFormData(element)}
            showError={this.handleInputError}
          />

          <div>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="editor-wrapper"
              editorClassName="editor-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
            {this.renderSubmitBtn()}
        </form>
      </React.Fragment>
    );
  }
}
export default Dashboard;
