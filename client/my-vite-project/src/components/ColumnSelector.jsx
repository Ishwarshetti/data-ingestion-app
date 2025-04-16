import React from "react";

const ColumnSelector = ({
    columns,
    selectedColumns,
    toggleColumn,
    handleSelectAll,
}) => (
    <section className="column-section">
        <h2>Columns</h2>
        <div className="column-header">
            <button className="select-all-button" onClick={handleSelectAll}>
                {selectedColumns.length === columns.length
                    ? "Deselect All"
                    : "Select All"}
            </button>
            <div className="selected-count">
                {selectedColumns.length} of {columns.length} selected
            </div>
        </div>

        <div className="column-list">
            {columns.map((column) => (
                <div key={column.name} className="column-item">
                    <label className="column-label">
                        <input
                            type="checkbox"
                            checked={selectedColumns.includes(column.name)}
                            onChange={() => toggleColumn(column)}
                        />
                        <span className="column-name">{column.name}</span>
                        <span className="column-type">{column.type}</span>
                    </label>
                </div>
            ))}
        </div>
    </section>
);

export default ColumnSelector;
