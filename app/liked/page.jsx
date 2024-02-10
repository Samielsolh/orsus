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
import NoteModal from '../components/ui/NoteModal';

const INITIAL_COLUMNS = ["startup_name","region","raise","Predicted_Categories", "note","actions"];

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
  const { currentUser, userData, setUserData, setSelectedRaise } = useAuth();
  const [data, setData] = useState({ columns: [], rows: [], totalRows: 0 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const [searchText, setSearchText] = useState('');

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
        console.log('kh data', data)
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
    getRaises();
  }, [page]);

  const pages = Math.ceil(data.totalRows / itemsPerPage);
  
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

            <TableBody emptyContent={"No items found"}>            
            {userData.liked.map((row, index) => (
              <TableRow key={row.raise.link || `row-${index}`}>
                  <TableCell>
                    {row.raise.startup_name}
                  </TableCell>
                  <TableCell>
                    {row.raise.region}
                  </TableCell>
                  <TableCell>
                  <Chip
                    classNames={{base:  "bg-green border-small border-green/50 shadow-green-500/30", content: "drop-shadow shadow-black" }}
                    size="sm"
                    variant="shadow"
                  >
                    {row.raise.raise}
                  </Chip>
                  </TableCell>
                  <TableCell>
                    {row.raise.Predicted_Categories.map(category => (
                      <Chip
                        key={category}
                        classNames={getChipStyles(category)}
                        size="sm"
                        variant="shadow"
                      >
                        {category}
                      </Chip>
                    ))}
                  </TableCell>
                  <TableCell>
                    {row.note}
                  </TableCell>
                  <TableCell>
                  <div className="flex gap-2">                            
                        <HeartIcon
                        id={row.raise._id}
                          className={`w-5 ${isLiked(row.raise._id) ? 'text-red-500' : 'text-slate-400'} cursor-pointer`}
                        onClick={()=>handleLike(row.raise._id)}
                        />
                    <PencilIcon className="w-5 text-slate-400 cursor-pointer"
                      onClick={() => {
                          setOpen(true);
                        setNoteId(row.raise._id);
                        setNote(row.note);
                      }}
                    />
                    <EnvelopeIcon className="w-5 text-slate-400 cursor-pointer"
                      onClick={()=>handleMessageIcon(row.raise._id)}
                    />
                  </div>
                  </TableCell>
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
