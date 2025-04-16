import React from "react";

const StatusMessage = ({ status }) => {
    return (
        status && (
            <div className="status-message">
                <span>{status}</span>
            </div>
        )
    );
};

export default StatusMessage;
