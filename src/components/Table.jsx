import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const data = [
  {
    billDate: "2024-01-15",
    product: "Widget A",
    quantity: 100,
    quantityUnit: "Units",
    indianPorts: "Mumbai",
    supplier: "Supplier X",
    buyer: "Buyer Y",
    categorisation: "Category 1",
    foreignPort: "New York",
    buyingCountry: "USA",
  },
  {
    billDate: "2024-02-20",
    product: "Widget B",
    quantity: 200,
    quantityUnit: "Units",
    indianPorts: "Delhi",
    supplier: "Supplier Z",
    buyer: "Buyer A",
    categorisation: "Category 2",
    foreignPort: "Los Angeles",
    buyingCountry: "USA",
  },
  {
    billDate: "2024-03-10",
    product: "Widget C",
    quantity: 150,
    quantityUnit: "Units",
    indianPorts: "Kolkata",
    supplier: "Supplier Y",
    buyer: "Buyer B",
    categorisation: "Category 3",
    foreignPort: "London",
    buyingCountry: "UK",
  },
  {
    billDate: "2024-04-05",
    product: "Widget D",
    quantity: 250,
    quantityUnit: "Units",
    indianPorts: "Chennai",
    supplier: "Supplier X",
    buyer: "Buyer C",
    categorisation: "Category 4",
    foreignPort: "Sydney",
    buyingCountry: "Australia",
  },
  {
    billDate: "2024-05-25",
    product: "Widget E",
    quantity: 300,
    quantityUnit: "Units",
    indianPorts: "Hyderabad",
    supplier: "Supplier Z",
    buyer: "Buyer D",
    categorisation: "Category 5",
    foreignPort: "Toronto",
    buyingCountry: "Canada",
  },
  {
    billDate: "2024-06-15",
    product: "Widget F",
    quantity: 120,
    quantityUnit: "Units",
    indianPorts: "Ahmedabad",
    supplier: "Supplier X",
    buyer: "Buyer E",
    categorisation: "Category 6",
    foreignPort: "Paris",
    buyingCountry: "France",
  },
  {
    billDate: "2024-07-10",
    product: "Widget G",
    quantity: 180,
    quantityUnit: "Units",
    indianPorts: "Bengaluru",
    supplier: "Supplier Y",
    buyer: "Buyer F",
    categorisation: "Category 7",
    foreignPort: "Berlin",
    buyingCountry: "Germany",
  },
  {
    billDate: "2024-08-01",
    product: "Widget H",
    quantity: 220,
    quantityUnit: "Units",
    indianPorts: "Pune",
    supplier: "Supplier Z",
    buyer: "Buyer G",
    categorisation: "Category 8",
    foreignPort: "Tokyo",
    buyingCountry: "Japan",
  },
  {
    billDate: "2024-08-25",
    product: "Widget I",
    quantity: 270,
    quantityUnit: "Units",
    indianPorts: "Jaipur",
    supplier: "Supplier X",
    buyer: "Buyer H",
    categorisation: "Category 9",
    foreignPort: "Shanghai",
    buyingCountry: "China",
  },
  {
    billDate: "2024-09-15",
    product: "Widget J",
    quantity: 350,
    quantityUnit: "Units",
    indianPorts: "Surat",
    supplier: "Supplier Y",
    buyer: "Buyer I",
    categorisation: "Category 10",
    foreignPort: "Dubai",
    buyingCountry: "UAE",
  },
];

const Table = ({ apidata }) => {
  console.log("API DATA=============", apidata);
  const columns = useMemo(
    () => [
      {
        accessorKey: "dateOfShipment",
        header: "S.Bill_Date",
        size: 150,
      },
      {
        accessorKey: "HS_Code",
        header: "HS Code",
        size: 150,
      },
      {
        accessorKey: "productName",
        header: "Product",
        size: 150,
      },
      {
        accessorKey: "productDescription",
        header: "Product Description",
        size: 150,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 200,
      },
      {
        accessorKey: "quantityUnits",
        header: "Quantity_Unit",
        size: 150,
      },
      {
        accessorKey: "indianPort",
        header: "Indian_Ports",
        size: 150,
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
        size: 150,
      },
      {
        accessorKey: "buyer",
        header: "Buyer",
        size: 150,
      },
      {
        accessorKey: "currency",
        header: "Currency",
        size: 150,
      },
      {
        accessorKey: "foreignCompany",
        header: "Foreign Company",
        size: 150,
      },
      {
        accessorKey: "foreignCountry",
        header: "Foreign Country",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: apidata,
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
