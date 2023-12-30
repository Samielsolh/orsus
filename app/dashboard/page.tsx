import React from 'react'
import '../globals.css'
import { DollarSignIcon, HomeIcon, PlusIcon, RainbowIcon, DatabaseIcon} from '../icons';
import Link from "next/link"
import { Nav } from '../nav';
import { Card, Title, Text } from '@tremor/react';



export default function Dashboard() {
    return (
      <div>
        <Nav />
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <Title>Users</Title>
          <Text>A list of users retrieved from a Postgres database.</Text>
          <Card className="mt-6">
            Hello
          </Card>
        </main>
      </div>
      );
    }