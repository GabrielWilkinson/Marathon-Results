import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultsTable from './ResultsTable';

const mockAthletes = [
  {
    rank: 1,
    firstname: 'John',
    surname: 'Doe',
    finishtime: '2:30:45',
    flag: 'USA',
    countryname: 'United States',
    bibnumber: '123',
    favorite: false,
    completed: true,
  },
  {
    rank: 2,
    firstname: 'Jane',
    surname: 'Smith',
    finishtime: '2:35:30',
    flag: 'CAN',
    countryname: 'Canada',
    bibnumber: '124',
    favorite: false,
    completed: true,
  },
];

test('renders the results table with athlete names', () => {
  render(
    <ResultsTable
      athletes={mockAthletes}
      sortConfig={{ key: 'rank', direction: 'ascending' }}
      sortAthletes={() => {}}
      toggleFavorite={() => {}}
      toggleSelectAthlete={() => {}}
      selectedAthletes={[]}
    />
  );

  const athlete1 = screen.getByText(/John Doe/i);
  const athlete2 = screen.getByText(/Jane Smith/i);

  expect(athlete1).toBeInTheDocument();
  expect(athlete2).toBeInTheDocument();
});
