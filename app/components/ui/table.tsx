"use client"

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "Emily Carter",
    role: "Marketing Director",
    status: "Active",
  },
  {
    key: "6",
    name: "Raj Patel",
    role: "Product Manager",
    status: "Remote",
  },
  {
    key: "7",
    name: "Luisa Ochoa",
    role: "HR Specialist",
    status: "Active",
  },
  {
    key: "8",
    name: "Aaron Burke",
    role: "Frontend Developer",
    status: "Active",
  },
  {
    key: "9",
    name: "Sofia Gibson",
    role: "UI/UX Designer",
    status: "Maternity Leave",
  },
  {
    key: "10",
    name: "Ethan Lee",
    role: "Data Analyst",
    status: "Active",
  },
  {
    key: "11",
    name: "Nora Roberts",
    role: "Accountant",
    status: "Paused",
  },
  {
    key: "12",
    name: "Samuel Green",
    role: "Backend Developer",
    status: "Active",
  },
  {
    key: "13",
    name: "Monica Hall",
    role: "Customer Support",
    status: "Training",
  },
  {
    key: "14",
    name: "Lisa Turner",
    role: "Graphic Designer",
    status: "Active",
  },
  {
    key: "15",
    name: "Derek Wells",
    role: "Software Engineer",
    status: "Remote",
  },
  {
    key: "16",
    name: "Anita Jenkins",
    role: "Quality Assurance",
    status: "Active",
  },
  {
    key: "17",
    name: "Carlos Espinoza",
    role: "DevOps Engineer",
    status: "On Leave",
  },
  {
    key: "18",
    name: "Mina Chang",
    role: "Business Analyst",
    status: "Active",
  },
  {
    key: "19",
    name: "Timothy Adams",
    role: "Project Manager",
    status: "Paused",
  },
  {
    key: "20",
    name: "Julia Sánchez",
    role: "Content Writer",
    status: "Active",
  },
  {
    key: "21",
    name: "Victor Stone",
    role: "Cybersecurity Specialist",
    status: "Remote",
  },
  {
    key: "22",
    name: "Amelia Brown",
    role: "HR Coordinator",
    status: "Training",
  },
  {
    key: "23",
    name: "Oliver Martinez",
    role: "Sales Associate",
    status: "Active",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "date",
    label: "DATE",
  },
];

export default function FundingTable() {
  return (
    <Table isStriped aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={"add raises from dashboard to this page"}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
