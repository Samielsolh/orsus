import React from 'react'
import '../globals.css'
import { Nav } from '../nav';
import FundingTable from '../components/ui/table'

export default function Dashboard() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <Nav />
      </div>
      <main className="mt-16 p-4 md:p-10 mx-auto max-w-7xl">
        {/* Add top padding equal to the height of the Nav */}
        <h1>Users</h1>
        <h1>A list of users retrieved from a Postgres database.</h1>
        <br />
        <FundingTable />
      </main>
    </div>
  );
}