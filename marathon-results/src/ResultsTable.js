import React from 'react';
import ResultRow from './ResultRow';

const ResultsTable = ({ athletes, sortConfig, sortAthletes, toggleFavorite, toggleSelectAthlete, selectedAthletes }) => {
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => sortAthletes('rank')} className={getClassNamesFor('rank')}>Rank</th>
                    <th onClick={() => sortAthletes('surname')} className={getClassNamesFor('firstname')}>Full Name</th>
                    <th onClick={() => sortAthletes('finishtime')} className={getClassNamesFor('finishtime')}>Finish Time</th>
                    <th onClick={() => sortAthletes('flag')} className={getClassNamesFor('flag')}>Country</th>
                    <th onClick={() => sortAthletes('bibnumber')} className={getClassNamesFor('bibnumber')}>Bib Number</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {athletes.map(athlete => (
                    <ResultRow
                        key={athlete.rank}
                        athlete={athlete}
                        toggleFavorite={toggleFavorite}
                        toggleSelectAthlete={toggleSelectAthlete}
                        isSelected={selectedAthletes.includes(athlete.rank)}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ResultsTable;
