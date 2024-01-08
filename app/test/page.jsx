"use client"

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { getData } from '../server-actions/get-data'; // Adjust the import path as needed
import Navbar from '../navbar'; // Adjust the path as needed

// Define initial columns for the table
const INITIAL_COLUMNS = ["Title", "Date", "Region", "Predicted_Categories"];

const App = () => {

  // Define state variables for data, loading status, and page number
  const [data, setData] = useState({ columns: [], rows: [], totalRows: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  // Use effect hook to fetch data when the page number changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Define parameters for the getData function
        const tableName = 'test';
        const filters = []; // No filters for now
        const sortColumn = 'Date';
        const sortDirection = 'dsc';

        // Call the getData function and set the data state variable with the result
        const result = await getData(tableName, filters, page, itemsPerPage, sortColumn, sortDirection);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      } finally {
        setLoading(false);  // Stop the loading spinner
      }
    };
    // Call the fetchData function
    fetchData();
  }, [page]);

  // Calculate the total number of pages
  const pages = Math.ceil(data.totalRows / itemsPerPage);

  return (
    <div>
      {/* Nav Bar component */}
      <Navbar />

      {/* Render a loading spinner while the data is being fetched */}
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* NextUI Table */}
      <main className="mt-16 p-4 md:p-10 mx-auto max-w-7xl">
        <Table
          aria-label="Investor dashboard table"
          isHeaderSticky
        >
          {/* Render the table headers */}
          <TableHeader>
            {INITIAL_COLUMNS.map(column => (
              <TableColumn key={column}>{column}</TableColumn>
            ))}
          </TableHeader>

          {/* Render the table rows */}
          <TableBody>
            {data.rows.map((row, index) => (
              <TableRow key={row.link || `row-${index}`}>
                {INITIAL_COLUMNS.map(column => (
                  <TableCell key={`${row.link || `row-${index}`}-${column}`}>
                    {row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Render the pagination controls */}
        <div className="py-2 px-2 flex justify-center items-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
