import React from "react";

const ClickHouseForm = ({ connection, setConnection, handleConnect }) => {
    return (
        <div className="connection-form">
            <div className="form-row">
                <div className="form-field">
                    <label>Host:</label>
                    <input
                        value={connection.host}
                        onChange={(e) =>
                            setConnection({ ...connection, host: e.target.value })
                        }
                    />
                </div>
                <div className="form-field">
                    <label>Port:</label>
                    <input
                        value={connection.port}
                        onChange={(e) =>
                            setConnection({ ...connection, port: e.target.value })
                        }
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-field">
                    <label>Database:</label>
                    <input
                        value={connection.database}
                        onChange={(e) =>
                            setConnection({ ...connection, database: e.target.value })
                        }
                    />
                </div>
                <div className="form-field">
                    <label>User:</label>
                    <input
                        value={connection.user}
                        onChange={(e) =>
                            setConnection({ ...connection, user: e.target.value })
                        }
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={connection.jwtToken}
                        onChange={(e) =>
                            setConnection({ ...connection, jwtToken: e.target.value })
                        }
                    />
                </div>
            </div>
            <button className="action-button" onClick={handleConnect}>
                Connect
            </button>
        </div>
    );
};

export default ClickHouseForm;
