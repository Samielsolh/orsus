"use client"
import '../globals.css'
import Navbar from '../navbar';
import FundingTable from '../components/ui/table'
import React, { useState, useEffect } from 'react';
import { getCompanyTitles } from '../server-actions/get-titles';

interface Title {
  label: any;
  value: any;
}

const TitlesPage: React.FC = () => {
  const [titles, setTitles] = useState<Title[]>([]);

  useEffect(() => {
    const fetchTitles = async () => {
      const fetchedTitles = await getCompanyTitles();
      setTitles(fetchedTitles);
    };

    fetchTitles();
  }, []);

  return (
    <div>
      <Navbar user={undefined} />
      <div className="titles-page-container p-4">
        <h1>Company Titles</h1>
        <pre>{JSON.stringify(titles, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TitlesPage;