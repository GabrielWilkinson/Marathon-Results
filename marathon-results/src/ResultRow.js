import React from 'react';

const ResultRow = ({ athlete, toggleFavorite, toggleSelectAthlete, isSelected }) => {
    const { rank, firstname, surname, finishtime, flag, bibnumber, countryCode, favorite } = athlete;
    const flagUrl = `https://flagcdn.com/16x12/${countryCode}.png`;
    const completed = finishtime !== "" ? "✔" : "";

    return (
        <tr onClick={() => toggleSelectAthlete(rank)} style={{ backgroundColor: isSelected ? '#333' : 'transparent' }}>
            <td>{rank}</td>
            <td>
                <span onClick={(e) => { e.stopPropagation(); toggleFavorite(rank); }} style={{ cursor: 'pointer', color: favorite ? 'yellow' : 'grey' }}>
                    ★
                </span>
                {firstname} {surname.toUpperCase()}
            </td>
            <td>{finishtime}</td>
            <td>
                <img src={flagUrl} alt={`${flag} flag`} /> {flag}
            </td>
            <td>{bibnumber}</td>
            <td className="completed-tick">{completed}</td>
        </tr>
    );
};

export default ResultRow;
