import React, { useState, useEffect } from 'react';
import ResultsTable from './ResultsTable';
import ControlButtons from './ControlButtons';
import './App.css';

const App = () => {
    const [athletes, setAthletes] = useState([]);
    const [sortedField, setSortedField] = useState(null);

    useEffect(() => {
        fetch('/public/MarathonResults.json')
            .then(response => response.json())
            .then(data => setAthletes(data.results.athletes));
    }, []);

    const sortAthletes = (field) => {
        const sortedAthletes = [...athletes].sort((a, b) => {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
            return 0;
        });
        setAthletes(sortedAthletes);
        setSortedField(field);
    };

    const exportToCSV = () => {
        const csvData = athletes.map(athlete => {
            return `${athlete.rank},${athlete.firstname} ${athlete.surname},${athlete.finishtime},${athlete.flag}`;
        });
        const csvContent = "data:text/csv;charset=utf-8,"
                            + "Rank,Full Name,Finish Time,Country Code\n"
                            + csvData.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'race_results.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <h1>2023 Bexford Marathon Results</h1>
            <ControlButtons sortAthletes={sortAthletes} exportToCSV={exportToCSV} />
            <ResultsTable athletes={athletes} sortedField={sortedField} />
        </div>
    );
};

export default App;
