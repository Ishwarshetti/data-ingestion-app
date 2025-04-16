import React from "react";

const FileUpload = ({ file, setFile, handleLoadColumns }) => (
    <div className="file-upload">
        <label className="file-upload-label">
            {file ? file.name : "Select a CSV or TXT file"}
            <input
                type="file"
                accept=".csv,.txt"
                onChange={(e) => setFile(e.target.files[0])}
            />
        </label>
        <button
            className="action-button"
            onClick={handleLoadColumns}
            disabled={!file}
        >
            Upload File
        </button>
    </div>
);

export default FileUpload;
