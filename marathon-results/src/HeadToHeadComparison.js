import React from 'react';

const formatTimeDifference = (time1, time2) => {
    const timeParts1 = time1.split(':').map(Number);
    const timeParts2 = time2.split(':').map(Number);
    const totalSeconds1 = timeParts1[0] * 3600 + timeParts1[1] * 60 + timeParts1[2];
    const totalSeconds2 = timeParts2[0] * 3600 + timeParts2[1] * 60 + timeParts2[2];
    const diffSeconds = Math.abs(totalSeconds1 - totalSeconds2);

    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    return `${hours > 0 ? hours + ':' : ''}${minutes > 0 ? minutes + ':' : ''}${seconds}`;
};

const HeadToHeadComparison = ({ athletes, selectedAthletes }) => {
    const athlete1 = athletes.find(athlete => athlete.rank === selectedAthletes[0]);
    const athlete2 = athletes.find(athlete => athlete.rank === selectedAthletes[1]);

    const rankDifference = athlete1.rank - athlete2.rank;
    const finishTimeDifference = formatTimeDifference(athlete1.finishtime, athlete2.finishtime);

    return (
        <div className="head-to-head">
            <h2>Head to Head Comparison</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>{athlete1.firstname} {athlete1.surname.toUpperCase()}</th>
                        <th>{athlete2.firstname} {athlete2.surname.toUpperCase()}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Rank</td>
                        <td style={{ color: athlete1.rank < athlete2.rank ? 'green' : 'inherit' }}>
                            {athlete1.rank} {athlete1.rank < athlete2.rank && `(${Math.abs(rankDifference)})`}
                        </td>
                        <td style={{ color: athlete2.rank < athlete1.rank ? 'green' : 'inherit' }}>
                            {athlete2.rank} {athlete2.rank < athlete1.rank && `(${Math.abs(rankDifference)})`}
                        </td>
                    </tr>
                    <tr>
                        <td>Finish Time</td>
                        <td style={{ color: athlete1.finishtime < athlete2.finishtime ? 'green' : 'inherit' }}>
                            {athlete1.finishtime} {athlete1.finishtime < athlete2.finishtime && `(${finishTimeDifference})`}
                        </td>
                        <td style={{ color: athlete2.finishtime < athlete1.finishtime ? 'green' : 'inherit' }}>
                            {athlete2.finishtime} {athlete2.finishtime < athlete1.finishtime && `(${finishTimeDifference})`}
                        </td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{athlete1.countryname}</td>
                        <td>{athlete2.countryname}</td>
                    </tr>
                    <tr>
                        <td>Team</td>
                        <td>{athlete1.teamname}</td>
                        <td>{athlete2.teamname}</td>
                    </tr>
                    <tr>
                        <td>Bib Number</td>
                        <td>{athlete1.bibnumber}</td>
                        <td>{athlete2.bibnumber}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HeadToHeadComparison;
