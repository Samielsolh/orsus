// CompanyInfo.tsx

import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { getCompanyTitles } from '../../server-actions/get-titles'; // Update the import path

const CompanyInfo: React.FC = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const fetchedCompanies = await getCompanyTitles();
      setCompanies(fetchedCompanies);
    };

    fetchCompanies();
  }, []);

  return (
    <div className="company-info-container bg-white shadow-lg rounded-lg p-4">
      <Autocomplete
        label="Select a Company"
        placeholder="Search for a company"
        className="max-w-xs"
        onChange={(value) => console.log(value)} // Replace with your handle change logic
      >
        {companies.map((company) => (
          <AutocompleteItem key={company.value}>{company.label}</AutocompleteItem>
        ))}
      </Autocomplete>
      {/* Additional elements like company description and competitive edge can be added here */}
    </div>
  );
};

export default CompanyInfo;
