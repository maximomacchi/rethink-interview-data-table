import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Input, CircularProgress } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import './App.css';

// Format that DataGrid component refers to when rendering columns
const cols = [
  { field: 'Country of Listing', headerName: 'Country', width: 130 },
  { field: 'Go Short?', headerName: 'Go Short?', width: 150 },
  {
    field: 'Limited Risk Premium',
    headerName: 'Limited Risk Premium',
    width: 100,
  },
  { field: 'Margin Rate', headerName: 'Margin', width: 100 },
  { field: 'Stock Name', headerName: 'Stock', width: 150 },
  { field: 'Ticker', headerName: 'Ticker', width: 100 },
];
const SEARCH_DELAY = 2000; // Milliseconds between search delay
let searchTimeout = null;

function App() {
  const [rows, setRows] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update value of search input. Use two second delay between search box
  // updates to remove unnecessary searching and lag
  const handleChange = (e) => {
    setLoading(true);
    setSearchTerms(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(
      () => updateFilteredRows(e.target.value),
      SEARCH_DELAY
    );
  };

  // Search through each row and if search terms match anything in a row,
  // include row in the list of filtered rows
  const updateFilteredRows = (terms) => {
    // Search terms assumed to not need case sensitivity
    let lowerCaseTerms = terms.toString().toLowerCase();
    setFilteredRows(
      rows.filter((row, i, rows) => {
        // Checks to see if column in a row has a value before running
        // .includes() checks since not every column in every row has a value
        return (
          (row['Country of Listing'] &&
            row['Country of Listing'].toLowerCase().includes(lowerCaseTerms)) ||
          (row['Go Short?'] &&
            row['Go Short?'].toLowerCase().includes(lowerCaseTerms)) ||
          (row['Limited Risk Premium'] &&
            row['Limited Risk Premium']
              .toLowerCase()
              .includes(lowerCaseTerms)) ||
          (row['Margin Rate'] &&
            row['Margin Rate'].toLowerCase().includes(lowerCaseTerms)) ||
          (row['Stock Name'] &&
            row['Stock Name'].toLowerCase().includes(lowerCaseTerms)) ||
          (row['Ticker'] &&
            row['Ticker'].toLowerCase().includes(lowerCaseTerms))
        );
      })
    );
    setLoading(false);
  };

  // Fetch CSV data from Papaparse service. Only runs when component is mounted
  useEffect(() => {
    setLoading(true);
    Papa.parse('https://www.papaparse.com/resources/files/big.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setRows(
          results.data.map((row, index) => {
            let newRow = row;
            newRow.id = index;
            return newRow;
          })
        );
        setLoading(false);
      },
    });
  }, []);

  // When rows are fetched from Papaparse service, update table with all rows
  useEffect(() => setFilteredRows(rows), [rows]);

  return (
    <div className="App">
      <h1>Maximo Macchi - Rethink Technical Interview Question #2</h1>
      <div>{loading ? <CircularProgress /> : ''}</div>
      <Input
        autoFocus={true}
        type="text"
        value={searchTerms}
        onChange={handleChange}
        placeholder="Search"
        className="search"
      />
      <DataGrid
        columns={cols}
        rows={filteredRows}
        autoHeight={true}
        pageSize={25}
        disableColumnMenu={true}
        disableColumnFilter={true}
        disableColumnReorder={true}
        disableColumnSelector={true}
      />
    </div>
  );
}

export default App;
