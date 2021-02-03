# Maximo Macchi - Rethink Technical Interview Question #2

## Packages / Tools Used

- [Create React App](https://create-react-app.dev/)
  - Used to focus on main implementation without worrying about setting up full React app
- [Material UI](https://material-ui.com/)
  - UI framework for React which provides React components with Material styling
  - Used for `Input`, `Table`, and `CircularProgress` components
- [Papa Parse](https://www.papaparse.com/)
  - Library for reading CSV data
  - Provided dummy CSV data with over one million rows

## Assumptions Made

- Data scheme follows this pattern for each row of data:

```
{
  'Country of Listing': 'US'
  'Go Short?': 'Yes
  'Limited Risk Premium': '1.00%
  'Margin Rate': '25%
  'Stock Name': 'Abbey PLC
  'Ticker': 'ABBY.L
}
```

- User won't want to view more than 100 rows simultaneously
- User knows values to type into search bar (no autocomplete functionality)

## Limitations

- Search results are delayed by 2 seconds rather than searches being instant. For some, that can be too much time (I would argue it's reasonable to wait up to 5 seconds but it's a reality to face with users)
- Cannot filter by one specific column
- Internet connection impacts how long initial data takes to load into app (my internet averages 150 Mbps)
