import React from "react";

const DataPreviewModal = ({
    showPreview,
    setShowPreview,
    previewColumns,
    previewData,
    targetTable,
}) => {
    if (!showPreview) return null;

    return (
        <div className="modal-overlay">
            <div className="preview-modal">
                <div className="modal-header">
                    <h3>Data Preview: {targetTable}</h3>
                    <button
                        className="close-button"
                        onClick={() => setShowPreview(false)}
                    >
                        ×
                    </button>
                </div>
                <div className="modal-content">
                    {previewData.length > 0 ? (
                        <table className="preview-table">
                            <thead>
                                <tr>
                                    {previewColumns.map((column) => (
                                        <th key={column}>{column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {previewColumns.map((column) => (
                                            <td key={`${rowIndex}-${column}`}>
                                                {row[column]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data-message">
                            No data available for preview
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button
                        className="secondary-button"
                        onClick={() => setShowPreview(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataPreviewModal;
