"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Import Port List", flex: 1 },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const rows = [
  { id: 1, type: "Major Port", name: "Mumbai Port" },
  { id: 2, type: "Major Port", name: "Jawaharlal Nehru Port (Nhava Sheva)" },
  { id: 3, type: "Major Port", name: "Kolkata Port (Including Haldia)" },
  { id: 4, type: "Major Port", name: "Chennai Port" },
  { id: 5, type: "Major Port", name: "Visakhapatnam Port" },
  { id: 6, type: "Major Port", name: "Kochi Port" },
  { id: 7, type: "Major Port", name: "Mangalore Port" },
  {
    id: 8,
    type: "Major Port",
    name: "Tuticorin Port (V.O. Chidambaranar Port)",
  },
  { id: 9, type: "Major Port", name: "Jawaharlal Nehru Port (JNPT)" },
  { id: 10, type: "Major Port", name: "Marmagao Port" },
  { id: 11, type: "Major Port", name: "Port Blair Port" },
  { id: 12, type: "Major Port", name: "Kandla Port (Deendayal Port)" },
  { id: 13, type: "Major Port", name: "Paradip Port" },
  { id: 14, type: "Major Port", name: "Port of Goa" },
  {
    id: 15,
    type: "Airport",
    name: "Indira Gandhi International Airport (Delhi)",
  },
  {
    id: 16,
    type: "Airport",
    name: "Chhatrapati Shivaji Maharaj International Airport (Mumbai)",
  },
  {
    id: 17,
    type: "Airport",
    name: "Kempegowda International Airport (Bengaluru)",
  },
  {
    id: 18,
    type: "Airport",
    name: "Netaji Subhas Chandra Bose International Airport (Kolkata)",
  },
  { id: 19, type: "Airport", name: "Chennai International Airport (Chennai)" },
  {
    id: 20,
    type: "Airport",
    name: "Rajiv Gandhi International Airport (Hyderabad)",
  },
  {
    id: 21,
    type: "Airport",
    name: "Sardar Vallabhbhai Patel International Airport (Ahmedabad)",
  },
  { id: 22, type: "Airport", name: "Pune International Airport (Pune)" },
  {
    id: 23,
    type: "Airport",
    name: "Coimbatore International Airport (Coimbatore)",
  },
  { id: 24, type: "Airport", name: "Cochin International Airport (Kochi)" },
  { id: 25, type: "Airport", name: "Jaipur International Airport (Jaipur)" },
  { id: 26, type: "Airport", name: "Goa International Airport (Goa)" },
  {
    id: 27,
    type: "Airport",
    name: "Trivandrum International Airport (Thiruvananthapuram)",
  },
  {
    id: 28,
    type: "ICD",
    name: "Inland Container Depot (ICD), Tughlakabad (Delhi)",
  },
  { id: 29, type: "ICD", name: "ICD, Kanpur" },
  { id: 30, type: "ICD", name: "ICD, Jaipur" },
  { id: 31, type: "ICD", name: "ICD, Ludhiana" },
  { id: 32, type: "ICD", name: "ICD, Chennai" },
  { id: 33, type: "ICD", name: "ICD, Bangalore" },
  { id: 34, type: "ICD", name: "ICD, Ahmedabad" },
  { id: 35, type: "ICD", name: "ICD, Hyderabad" },
  { id: 36, type: "ICD", name: "ICD, Surat" },
  { id: 37, type: "ICD", name: "ICD, Patparganj (Delhi)" },
  { id: 38, type: "ICD", name: "ICD, Dadri (Uttar Pradesh)" },
  { id: 39, type: "CFS", name: "CFS, Nhava Sheva (Mumbai)" },
  { id: 40, type: "CFS", name: "CFS, Chennai" },
  { id: 41, type: "CFS", name: "CFS, Kolkata" },
  { id: 42, type: "CFS", name: "CFS, Bangalore" },
  { id: 43, type: "CFS", name: "CFS, Pune" },
  { id: 44, type: "CFS", name: "CFS, Cochin" },
  { id: 45, type: "CFS", name: "CFS, Ahmedabad" },
  { id: 46, type: "CFS", name: "CFS, Delhi" },
  { id: 47, type: "CFS", name: "CFS, Mundra Port (Kutch)" },
  { id: 48, type: "CFS", name: "CFS, Vishakhapatnam" },
  { id: 49, type: "CFS", name: "CFS, Hyderabad" },
  { id: 50, type: "CFS", name: "CFS, Ludhiana" },
  { id: 51, type: "CFS", name: "CFS, Delhi Air Cargo Complex" },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function IndianPortTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "red !important",
            // color: "white",
          },
        }}
      />
    </Paper>
  );
}
