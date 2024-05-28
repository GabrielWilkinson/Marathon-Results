import React from 'react';

const ControlButtons = ({ sortAthletes, exportToCSV }) => {
    return (
        <div className="controls">
            <button onClick={exportToCSV}>Export to CSV</button>
        </div>
    );
};

export default ControlButtons;
