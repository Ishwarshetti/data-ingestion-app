import React from "react";

const TargetTableConfig = ({
    targetTable,
    setTargetTable,
    selectedColumns,
    handleIngestData,
    showDownloadButton,
    handlePreviewData,
    handleDownloadCSV,
}) => {
    return (
        <div className="target-table-section">
            <h3>Target Configuration</h3>
            <div className="form-row">
                <div className="form-field">
                    <label>Target Table Name:</label>
                    <input
                        value={targetTable}
                        onChange={(e) => setTargetTable(e.target.value)}
                        placeholder="Enter target table name"
                    />
                </div>
            </div>
            <div className="action-buttons">
                <button
                    className="primary-button"
                    onClick={handleIngestData}
                    disabled={!targetTable || selectedColumns.length === 0}
                >
                    Ingest Data
                </button>

                {showDownloadButton && (
                    <>
                        <button
                            className="secondary-button"
                            onClick={handlePreviewData}
                        >
                            Preview Data
                        </button>
                        <button
                            className="secondary-button"
                            onClick={handleDownloadCSV}
                        >
                            Download CSV
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TargetTableConfig;
