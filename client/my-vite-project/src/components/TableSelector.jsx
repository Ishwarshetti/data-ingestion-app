import React from "react";

const TableSelector = ({
    tables,
    selectedTable,
    setSelectedTable,
    handleLoadColumns,
    isLoadingColumns,
}) => (
    <div className="table-selector">
        <div className="form-row">
            <div className="form-field">
                <label>Table:</label>
                <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                >
                    <option value="">Choose a table</option>
                    {tables.map((table) => (
                        <option key={table} value={table}>
                            {table}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className="action-button"
                onClick={handleLoadColumns}
                disabled={isLoadingColumns || !selectedTable}
            >
                {isLoadingColumns ? "Loading..." : "Load Columns"}
            </button>
        </div>
    </div>
);

export default TableSelector;
