import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

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
        accessorKey: "indainPort",
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
    data: apidata?.data,
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
