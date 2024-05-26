import React from 'react';

const ResultRow = ({ athlete }) => {
    return (
        <tr>
            <td>{athlete.rank}</td>
            <td>{athlete.firstname} {athlete.surname}</td>
            <td>{athlete.finishtime}</td>
            <td>{athlete.flag}</td>
        </tr>
    );
};

export default ResultRow;
