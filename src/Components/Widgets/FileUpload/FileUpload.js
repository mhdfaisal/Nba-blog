import React from "react";
import FileUploader from "react-firebase-file-uploader";

const FileUpload = props => {
  return (
    <div style={{ margin: "2% 0 2% 0" }}>
      <FileUploader
        accept={props.accept}
        name={props.name}
        randomizeFilename
        storageRef={props.storageRef}
        onUploadStart={props.handleUploadStart}
        onUploadError={props.handleUploadError}
        onUploadSuccess={props.handleUploadSuccess}
        onProgress={props.handleProgress}
      />
    </div>
  );
};

export default FileUpload;
