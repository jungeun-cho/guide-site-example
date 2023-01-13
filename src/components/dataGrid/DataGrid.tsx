import React from 'react';
import 'react-data-grid/lib/styles.css';
import ReactDataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

export default function DataGrid ({columns, rows}) {
  return <ReactDataGrid columns={columns} rows={rows} mergeCells={[{ row: 0, col: 0, rowspan: 2 }]}
  />;
}