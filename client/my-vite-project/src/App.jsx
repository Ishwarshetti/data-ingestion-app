import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Components
import Header from "./components/Header";
import SourceSelector from "./components/SourceSelector";
import ClickHouseForm from "./components/ClickHouseForm";
import FileUpload from "./components/FileUpload";
import TableSelector from "./components/TableSelector";
import ColumnSelector from "./components/ColumnSelector";
import TargetTableConfig from "./components/TargetTableConfig";
import StatusMessage from "./components/StatusMessage";
import DataPreviewModal from "./components/DataPreviewModal";


function App() {
    const [source, setSource] = useState("");
    const [connection, setConnection] = useState({
        host: "localhost",
        port: "8123",
        database: "default",
        user: "default",
        jwtToken: "",
    });
    const [file, setFile] = useState(null);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [targetTable, setTargetTable] = useState("");
    const [filePath, setFilePath] = useState("");
    const [status, setStatus] = useState("");
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [previewColumns, setPreviewColumns] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoadingColumns, setIsLoadingColumns] = useState(false);

    useEffect(() => {
        setColumns([]);
        setSelectedColumns([]);
        setTargetTable("");
        setShowDownloadButton(false);
    }, [source, selectedTable]);

    useEffect(() => {
        if (source !== "Flat File") {
            setFile(null);
        }
    }, [source]);

    const handleConnect = async () => {
        setStatus("Connecting...");
        setIsLoadingColumns(true);
        try {
            const response = await axios.post("http://localhost:8000/connect", {
                source,
                ...connection,
            });
            if (response.data.success) {
                setTables(response.data.tables || []);
                setStatus("Connected");
                setIsConnected(true);
            } else {
                setStatus(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Connection error:", error);
            setStatus(`Connection failed: ${error.response?.data?.error || error.message}`);
        } finally {
            setIsLoadingColumns(false);
        }
    };

    const handleLoadColumns = async () => {
        setStatus("Fetching columns...");
        setIsLoadingColumns(true);
        const formData = new FormData();
        formData.append("source", source);
        formData.append("table", selectedTable);

        if (source === "ClickHouse") {
            formData.append("host", connection.host);
            formData.append("port", connection.port);
            formData.append("database", connection.database);
            formData.append("user", connection.user);
            formData.append("jwtToken", connection.jwtToken);
        } else if (file) {
            formData.append("file", file);
        }

        try {
            const response = await axios.post("http://localhost:8000/columns", formData);
            if (response.data.success) {
                setColumns(response.data.columns);
                if (response.data.filePath) {
                    setFilePath(response.data.filePath);
                }
                setStatus("Columns loaded");
            } else {
                setStatus(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Error loading columns:", error);
            setStatus(`Failed to load columns: ${error.response?.data?.error || error.message}`);
        } finally {
            setIsLoadingColumns(false);
        }
    };

    const toggleColumn = (column) => {
        setSelectedColumns((prev) =>
            prev.includes(column.name)
                ? prev.filter((c) => c !== column.name)
                : [...prev, column.name]
        );
    };

    const handleSelectAll = () => {
        if (selectedColumns.length === columns.length) {
            setSelectedColumns([]);
        } else {
            setSelectedColumns(columns.map((column) => column.name));
        }
    };

    const handleIngestData = async () => {
        if (selectedColumns.length === 0) {
            setStatus("Please select at least one column for ingestion");
            return;
        }

        if (!targetTable) {
            setStatus("Please enter a target table name");
            return;
        }

        setStatus("Ingesting data...");
        try {
            const formData = new FormData();
            formData.append("source", source);

            if (source === "ClickHouse") {
                formData.append("table", selectedTable);
            } else if (source === "Flat File") {
                if (file) {
                    formData.append("file", file);
                } else if (filePath) {
                    formData.append("filePath", filePath);
                }
            }

            formData.append("columns", JSON.stringify(selectedColumns));
            formData.append("targetTable", targetTable);
            formData.append("host", connection.host);
            formData.append("port", connection.port);
            formData.append("database", connection.database);
            formData.append("user", connection.user);
            formData.append("jwtToken", connection.jwtToken);

            const response = await axios.post("http://localhost:8000/ingest", formData);

            if (response.data.success) {
                setStatus(`Success: ${response.data.message}`);
                setShowDownloadButton(true);
            } else {
                setStatus(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Error during ingestion:", error);
            setStatus(`Ingestion failed: ${error.response?.data?.error || error.message}`);
        }
    };

    const handleDownloadCSV = async () => {
        try {
            setStatus("Downloading data...");
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/download",
                data: {
                    tableName: targetTable,
                    host: connection.host,
                    port: connection.port,
                    database: connection.database,
                    user: connection.user,
                    jwtToken: connection.jwtToken,
                },
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${targetTable}.csv`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            setStatus("Download complete");
        } catch (error) {
            console.error("Error downloading data:", error);
            setStatus(`Download failed: ${error.message}`);
        }
    };

    const handlePreviewData = async () => {
        try {
            setStatus("Fetching preview data...");
            const response = await axios.post("http://localhost:8000/preview", {
                tableName: targetTable,
                host: connection.host,
                port: connection.port,
                database: connection.database,
                user: connection.user,
                jwtToken: connection.jwtToken,
                limit: 10,
            });

            if (response.data.success) {
                setPreviewColumns(response.data.columns);
                setPreviewData(response.data.data);
                setShowPreview(true);
                setStatus("Data preview loaded");
            } else {
                setStatus(`Preview error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Error previewing data:", error);
            setStatus(`Preview failed: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="app-container">
            <Header />

            <main>
                <section className="data-source-section">
                    <h2>Data Source</h2>

                    <SourceSelector source={source} setSource={setSource} />

                    {source === "ClickHouse" ? (
                        <ClickHouseForm
                            connection={connection}
                            setConnection={setConnection}
                            handleConnect={handleConnect}
                        />
                    ) : (
                        <FileUpload
                            file={file}
                            setFile={setFile}
                            handleLoadColumns={handleLoadColumns}
                        />
                    )}

                    {source === "ClickHouse" && isConnected && (
                        <TableSelector
                            tables={tables}
                            selectedTable={selectedTable}
                            setSelectedTable={setSelectedTable}
                            handleLoadColumns={handleLoadColumns}
                            isLoadingColumns={isLoadingColumns}
                        />
                    )}

                    {columns.length > 0 && (
                        <>
                            <ColumnSelector
                                columns={columns}
                                selectedColumns={selectedColumns}
                                toggleColumn={toggleColumn}
                                handleSelectAll={handleSelectAll}
                            />
                            <TargetTableConfig
                                targetTable={targetTable}
                                setTargetTable={setTargetTable}
                                selectedColumns={selectedColumns}
                                handleIngestData={handleIngestData}
                                showDownloadButton={showDownloadButton}
                                handlePreviewData={handlePreviewData}
                                handleDownloadCSV={handleDownloadCSV}
                            />
                        </>
                    )}

                    <StatusMessage status={status} />
                </section>
            </main>

            <DataPreviewModal
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                previewColumns={previewColumns}
                previewData={previewData}
                targetTable={targetTable}
            />
        </div>
    );
}

export default App;
