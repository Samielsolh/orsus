// CompanyInfo.tsx

import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { getCompanyTitles } from '../../server-actions/get-titles'; // Update the import path
import { useAuth } from '@/contexts/AuthContext';

interface Company {
  startup_name: any;
  _id: any;
}

const CompanyInfo: React.FC = () => {
  const { selectedRaise, setSelectedRaise, companies } = useAuth();

  return (
    <div className="company-info-container bg-white shadow-lg rounded-lg p-4">
      <Autocomplete
        label="Select a Company"
        placeholder="Search for a company"
        className="max-w-xs"
        selectedKey={selectedRaise}
        onSelectionChange={(value) => {
          setSelectedRaise(value);
        }}
      >
        {companies?.map((company: any) => (
          <AutocompleteItem key={company._id} value={company._id}>
            {company.startup_name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      {/* Additional elements like company description and competitive edge can be added here */}
    </div>
  );
};

export default CompanyInfo;
