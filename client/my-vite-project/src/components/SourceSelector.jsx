import React from "react";

const SourceSelector = ({ source, setSource }) => (
    <div className="source-selector">
        <label>Source Type:</label>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
    <option value="">Select a source</option>
    <option value="ClickHouse">ClickHouse</option>
    <option value="Flat File">Flat File</option>
</select>

    </div>
);

export default SourceSelector;
