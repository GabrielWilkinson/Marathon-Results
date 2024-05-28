import React, { useState, useEffect } from 'react';
import ResultsTable from './ResultsTable';
import marathonResults from './MarathonResults.json';
import countryCodes from './CountryCodes.json';
import HeadToHeadComparison from './HeadToHeadComparison';
import './App.css';
import logo from './girraphic-with-words.png';

const App = () => {
    const [athletes, setAthletes] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAthletes, setSelectedAthletes] = useState([]);

    useEffect(() => {
        const updatedAthletes = marathonResults.results.athletes.map(athlete => {
            const countryCode = Object.keys(countryCodes).find(code => countryCodes[code].toLowerCase() === athlete.countryname.toLowerCase());
            return {
                ...athlete,
                countryCode: countryCode || athlete.flag.toLowerCase(),
                favorite: false
            };
        });
        setAthletes(updatedAthletes);
    }, []);

    const toggleFavorite = (rank) => {
        const updatedAthletes = athletes.map(athlete => {
            if (athlete.rank === rank) {
                return { ...athlete, favorite: !athlete.favorite };
            }
            return athlete;
        });
        setAthletes(updatedAthletes);
    };

    const sortAthletes = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedAthletes = [...athletes].sort((a, b) => {
            if (a.favorite !== b.favorite) {
                return a.favorite ? -1 : 1;
            }
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setAthletes(sortedAthletes);
        setSortConfig({ key, direction });
    };

    const exportToCSV = () => {
        const csvData = athletes.map(athlete => {
            return `${athlete.rank},${athlete.firstname} ${athlete.surname.toUpperCase()},${athlete.finishtime},${athlete.flag}`;
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleSelectAthlete = (rank) => {
        let updatedSelection;
        if (selectedAthletes.includes(rank)) {
            updatedSelection = selectedAthletes.filter(r => r !== rank);
        } else {
            if (selectedAthletes.length < 2) {
                updatedSelection = [...selectedAthletes, rank];
            } else {
                updatedSelection = [selectedAthletes[1], rank];
            }
        }
        setSelectedAthletes(updatedSelection);
    };

    const filteredAthletes = athletes.filter(athlete =>
        athlete.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.countryname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.teamname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const gender = marathonResults.results.gender;
    let formattedGender = null;
    if (gender === 'male'){
      formattedGender = 'Mens';
    } else if (gender === 'female'){
      formattedGender = 'Womens';
    }

    return (
        <div className="container">
            <img src={logo} alt="Top Center Logo" className="logo-top-center" />
            <h1 className="title">{marathonResults.results.racename} - {formattedGender} Results</h1>
            <input
                type="text"
                placeholder="Search by name, country, or team"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="table-wrapper">
                <div className="table-background"></div>
                <div className="table-container">
                    <button className="export-button" onClick={exportToCSV}>Export to CSV</button>
                    <ResultsTable
                        athletes={filteredAthletes}
                        sortConfig={sortConfig}
                        sortAthletes={sortAthletes}
                        toggleFavorite={toggleFavorite}
                        toggleSelectAthlete={toggleSelectAthlete}
                        selectedAthletes={selectedAthletes}
                    />
                </div>
            </div>
            {selectedAthletes.length === 2 && <HeadToHeadComparison athletes={athletes} selectedAthletes={selectedAthletes} />}
        </div>
    );
};

export default App;
