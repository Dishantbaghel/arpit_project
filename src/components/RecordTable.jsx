"use client";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("dateOfShipment", {
    header: "S.Bill_Date",
    size: 150,
  }),
  columnHelper.accessor("HS_Code", {
    header: "HS Code",
    size: 150,
  }),
  columnHelper.accessor("productName", {
    header: "Product",
    size: 150,
  }),
  columnHelper.accessor("productDescription", {
    header: "Product Description",
    size: 150,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    size: 200,
  }),
  columnHelper.accessor("quantityUnits", {
    header: "Quantity Unit",
    size: 150,
  }),
  columnHelper.accessor("indianPort", {
    header: "Indian Ports",
    size: 150,
  }),
  columnHelper.accessor("currency", {
    header: "Currency",
    size: 150,
  }),
  columnHelper.accessor("indianCompany", {
    header: "Indian Company",
    size: 150,
  }),
  columnHelper.accessor("foreignCompany", {
    header: "Foreign Company",
    size: 150,
  }),
  columnHelper.accessor("foreignCountry", {
    header: "Foreign Country",
    size: 150,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const RecordTable = ({ data }) => {
  // console.log("TABLE=======", data);
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    // positionPagination: "both",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default RecordTable;
