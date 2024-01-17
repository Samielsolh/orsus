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
  Chip
} from "@nextui-org/react";
import { getData } from '../server-actions/get-data'; // Adjust the import path as needed
import Navbar from '../navbar'; // Adjust the path as needed

const INITIAL_COLUMNS = ["startup_name", "company_description", "region", "raise", "raised_digits", "raise_date", "Predicted_Categories","date"];

// Hash function to generate a unique number for a string
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

// Function to get custom styles based on the category
const getChipStyles = (category) => {
  const hue = Math.abs(hashString(category) % 360); // Generate a hue value for the shade of blue
  const baseStyle = `bg-blue-${hue} text-white`; // Adjust the text color as needed
  const contentStyle = "drop-shadow shadow-black";
"drop-shadow shadow-black text-white"
  return { base:  "bg-blue border-small border-blue/50 shadow-blue-500/30", content: contentStyle };
};

const App = () => {
  const [data, setData] = useState({ columns: [], rows: [], totalRows: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tableName = 'raises';
        const filters = [];
        const sortColumn = 'date';
        const sortDirection = 'dsc';
        const result = await getData(tableName, filters, page, itemsPerPage, sortColumn, sortDirection);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const pages = Math.ceil(data.totalRows / itemsPerPage);

  return (
    <div>
      <Navbar />
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <main className="mt-14 p-4 md:p-10 mx-auto max-w-7xl">
        <Table aria-label="Investor dashboard table" isHeaderSticky>
            <TableHeader>
              {INITIAL_COLUMNS.map(column => (
                <TableColumn key={column}>{column}</TableColumn>
              ))}
            </TableHeader>

            <TableBody>
            {data.rows.map((row, index) => (
              <TableRow key={row.link || `row-${index}`}>
                {INITIAL_COLUMNS.map(column => (
                  <TableCell key={`${row.link || `row-${index}`}-${column}`}>
                    {column === 'Predicted_Categories' ? (
                      row[column].map(category => (
                        <Chip
                          key={category}
                          classNames={getChipStyles(category)}
                          size="sm"
                          variant="shadow"
                        >
                          {category}
                        </Chip>
                      ))
                    ) : column === 'raise' ? (
                      <Chip
                        classNames={{base:  "bg-green border-small border-green/50 shadow-green-500/30", content: "drop-shadow shadow-black" }}
                        size="sm"
                        variant="shadow"
                      >
                        {row[column]}
                      </Chip>
                    ) : row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
