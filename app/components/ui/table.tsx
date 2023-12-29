import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => <table className="min-w-full">{children}</table>;

const TableHead: React.FC<TableProps> = ({ children }) => <thead>{children}</thead>;

const TableBody: React.FC<TableProps> = ({ children }) => <tbody>{children}</tbody>;

const TableRow: React.FC<TableProps> = ({ children }) => <tr>{children}</tr>;

interface TableCellProps extends TableProps {
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, className }) => (
  <td className={className}>{children}</td>
);

interface TableHeaderProps extends TableProps {
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => (
  <th className={className}>{children}</th>
);

export { Table, TableHead, TableRow, TableHeader, TableCell, TableBody };
