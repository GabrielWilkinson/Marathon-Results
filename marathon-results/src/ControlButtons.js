import React from 'react';

const ControlButtons = ({ sortAthletes, exportToCSV }) => {
    return (
        <div className="controls">
            <button onClick={() => sortAthletes('rank')}>Sort by Rank</button>
            <button onClick={() => sortAthletes('bibnumber')}>Sort by Bib Number</button>
            <button onClick={exportToCSV}>Export to CSV</button>
        </div>
    );
};

export default ControlButtons;
