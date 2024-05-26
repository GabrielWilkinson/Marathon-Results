import React from 'react';
import ResultRow from './ResultRow';

const ResultsTable = ({ athletes, sortedField }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Full Name</th>
                    <th>Finish Time</th>
                    <th>Country Code</th>
                </tr>
            </thead>
            <tbody>
                {athletes.map(athlete => (
                    <ResultRow key={athlete.athleteid} athlete={athlete} />
                ))}
            </tbody>
        </table>
    );
};

export default ResultsTable;
