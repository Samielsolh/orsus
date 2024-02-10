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
import { EnvelopeIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/16/solid';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import NoteModal from '../components/ui/NoteModal'
import CustomSelect from '@/components/common/CustomSelect'

const INITIAL_COLUMNS = ["startup_name", "company_description", "region", "raise", "raised_digits", "raise_date", "Predicted_Categories","date","actions"];

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
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [note, setNote] = useState('');  
  const { currentUser, userData, setUserData,setSelectedRaise } = useAuth();
  const [data, setData] = useState({ columns: [], rows: [], totalRows: 0 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "startup_name",
    direction: "ascending",
  });

  if (!currentUser) {
    router.push(`/login`);
  }

  const getRaises = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/raises?page=${page}&itemsPerPage=${itemsPerPage}`, {
        cache: 'no-store',
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();        
        setData(data);
        setRows(data.rows);
        setLoading(false);
      } else {
        console.error('Error fetching Raises');
        setLoading(false);
      }
    } catch (e) {
      console.log('Error', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   setLoading(true);
    //   try {
    //     const tableName = 'raises';
    //     const filters = [];
    //     const sortColumn = 'date';
    //     const sortDirection = 'dsc';
    //     const result = await getData(tableName, filters, page, itemsPerPage, sortColumn, sortDirection);
    //     if (result) {
    //       setData(result);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    getRaises();
  }, [page]);

  const pages = Math.ceil(data.totalRows / itemsPerPage);

  console.log("data", data)

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    if (searchValue === '') {
      getRaises();
    }
  }
  const handleRegionFilter = async(v) => {
    setSelectedRegion(v);
    if (v === 'ALL') {
      getRaises();
    } else {
      setSelectedCategory('ALL');
      setLoading(true);
    try {
      const response = await fetch(`/api/raises/region?page=${page}&itemsPerPage=${itemsPerPage}&searchtext=${v}`, {
        cache: 'no-store',
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();        
        console.log("data", data)
        setData(data);
        setRows(data.rows);
        setLoading(false);
      } else {
        console.error('Error fetching Raises');
        setLoading(false);
      }
    } catch (e) {
      console.log('Error', e);
      setLoading(false);
    }
    }
  }
  const handleCategoryFilter = async(v) => {
    setSelectedCategory(v);
    if (v === 'ALL') {
      getRaises();
    } else {
      setSelectedRegion('ALL');
      setLoading(true);
    try {
      const response = await fetch(`/api/raises/category?page=${page}&itemsPerPage=${itemsPerPage}&searchtext=${v}`, {
        cache: 'no-store',
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();        
        console.log("data", data)
        setData(data);
        setRows(data.rows);
        setLoading(false);
      } else {
        console.error('Error fetching Raises');
        setLoading(false);
      }
    } catch (e) {
      console.log('Error', e);
      setLoading(false);
    }
    }
  }

  let sortedItems = React.useMemo(() => {
    return [...data.rows].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, data.rows, userData]);  

  const renderCell = React.useCallback((row,column) => {    
    switch (column) {
      case 'Predicted_Categories':
        return row[column].map(category => (
          <Chip
            key={category}
            classNames={getChipStyles(category)}
            size="sm"
            variant="shadow"
          >
            {category}
          </Chip>
        ))
      case "raise":
        return (
          <Chip
            classNames={{base:  "bg-green border-small border-green/50 shadow-green-500/30", content: "drop-shadow shadow-black" }}
            size="sm"
            variant="shadow"
          >
            {row[column]}
          </Chip>
        );      
      case "actions":
        return (
          <div className="flex gap-2">                            
            <HeartIcon
            id={row._id}
              className={`w-5 ${isLiked(row._id) ? 'text-red-500' : 'text-slate-400'} cursor-pointer`}
            onClick={()=>handleLike(row._id)}
            />
            <PencilIcon className="w-5 text-slate-400 cursor-pointer"
              onClick={() => {
                setOpen(true);
                setNoteId(row._id);
                if (isLiked(row._id)) {
                  setNote(userData.likedOriginal.filter((item)=>item.raise===row._id)[0].note);
                }
            }}
            />
            <EnvelopeIcon className="w-5 text-slate-400 cursor-pointer"
            onClick={()=>handleMessageIcon(row._id)}
            />
      </div>
    );
      default:
        return row[column];
    }
  }, []);
  
  const isLiked = (raiseId) => {
    return userData?.likedOriginal.filter((item)=>item.raise===raiseId).length
  }

  const handleLike = async (raiseId) => { 
    setLoading(true)
    const myElement = document.getElementById(raiseId);    
    let newArray = [];
    if (isLiked(raiseId)) {
      newArray=userData.likedOriginal.filter((item)=>item.raise!==raiseId)
    } else {
      newArray=[...userData.likedOriginal, {
        raise: raiseId,
        note: ''
      }]
    }
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          liked: newArray,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);  
        setLoading(false)
        if (isLiked(raiseId)) {
          myElement.classList.remove('text-red-500');
          myElement.classList.add('text-slate-400');
        } else {
          myElement.classList.remove('text-slate-400');
          myElement.classList.add('text-red-500');
        }
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false)
    }
  };
  const handleCreateNote = async () => { 
    setLoading(true)
    const myElement = document.getElementById(noteId);    
    let newArray = [];
    if (isLiked(noteId)) {
      newArray = userData.likedOriginal.map((item) => {
        if (item.raise === noteId) {
          return {
            ...item,
            note: note
          }
        } else {
          return item;
        }
      })  
    } else {
      newArray=[...userData.likedOriginal, {
        raise: noteId,
        note: note
      }]
    }      
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          liked: newArray,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);  
        setLoading(false)        
        myElement.classList.remove('text-slate-400');
        myElement.classList.add('text-red-500');
        setOpen(false)
        setNoteId(null)
        setNote('')
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false)
    }
  };

  const handleClose = () => {
    setOpen(false)
    setNoteId(null)
    setNote('')
  }

  const handleMessageIcon = (id) => {
    setSelectedRaise(id)
    router.push('/outreach');
  }

  const searchSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/raises/search?page=${page}&itemsPerPage=${itemsPerPage}&searchtext=${searchText}`, {
        cache: 'no-store',
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();        
        console.log("data", data)
        setData(data);
        setRows(data.rows);
        setLoading(false);
      } else {
        console.error('Error fetching Raises');
        setLoading(false);
      }
    } catch (e) {
      console.log('Error', e);
      setLoading(false);
    }
  }

  console.log("userData", userData)

  return (
    <div>
      <Navbar />
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <main className="mt-14 p-4 md:p-10 mx-auto max-w-7xl">
        {/* Search */}
        <div className="grid grid-cols-3 gap-4 items-end mb-5">
        <div>      
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <form onSubmit={searchSubmit}>
                <input
                  type="text"
                    name="searchText"
                    value={searchText}
                  onChange={(e)=>handleSearch(e.target.value)}  
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </form>
          </div>
          </div>
          <div>
            <CustomSelect
              label="Filter by region"
              options={['ALL','USA', 'UK','GERMANY', 'FRANCE', 'CANADA', 'INDIA', 'ITALY','ISRAEL','AUSTRALIA','CHINA','BRAZIL','MEXICO','COLOMBIA']}
              selected={selectedRegion}
              setSelected={handleRegionFilter}
            />
          </div>
          <div>
            <CustomSelect
              label="Filter by category"
              options={['ALL','FinTech', 'Software','Blockchain', 'E-Commerce', 'Marketplace', 'Biotechnology', 'Health Care','Medical','Artificial Intelligence','SaaS','Financial Services','Advertising','Solar','Enterprise Software','Travel','Pet','Transportation','CRM','Event Management','Analytics','Real Estate','Property Management','Automotive','Insurance','InsurTech','EdTech','Compliance','Cyber Security','Cryptocurrency','Semiconductor','Augmented Reality','Gaming']}
              selected={selectedCategory}
              setSelected={handleCategoryFilter}
            />
          </div>
        </div>
        <Table aria-label="Investor dashboard table" isHeaderSticky
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
            <TableHeader>
              {INITIAL_COLUMNS.map(column => (
                <TableColumn key={column}
                align={column === "actions" ? "center" : "start"}
                allowsSorting={true}
                >{column}</TableColumn>
              ))}            
            </TableHeader>

            <TableBody emptyContent={"No items found"} items={sortedItems}>
            {/* {data.rows.map((row, index) => (
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
            ))} */}
            {
            (row, index) => (
              <TableRow key={row.link || `row-${index}`}>
                {INITIAL_COLUMNS.map(column => (
                  <TableCell key={`${row.link || `row-${index}`}-${column}`}>
                    {/* {column === 'Predicted_Categories' ? (
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
                    ) :column === 'actions' ? (
                          <div className="flex gap-2">                            
                            <HeartIcon className={`w-5 ${isLiked(row._id)?'text-red-500':'text-slate-400'} cursor-pointer`}
                            onClick={()=>handleLike(row._id)}
                            />
                        <PencilIcon className="w-5 text-slate-400 cursor-pointer"/>
                        <EnvelopeIcon className="w-5 text-slate-400 cursor-pointer"/>
                      </div>
                    ) : row[column]} */}
                    {renderCell(row,column)}
                  </TableCell>
                ))}                
              </TableRow>
            )
            }            
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
      <NoteModal
        open={open}
        handleClose={handleClose}
        note={note}
        setNote={setNote}
        onSubmit={handleCreateNote}
      />
    </div>
  );
};

export default App;
