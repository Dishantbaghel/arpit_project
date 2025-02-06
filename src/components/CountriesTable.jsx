"use client";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import CountriesList from "@/constants/countries";

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("Country_Code_2", {
    header: "Country Code 2",
    size: 150,
  }),
  columnHelper.accessor("Country_Code_3", {
    header: "Country Code 3",
    size: 150,
  }),
  columnHelper.accessor("Country_Name", {
    header: "Country Name",
    size: 150,
  }),
  columnHelper.accessor("Country_Name_Full", {
    header: "Country Name Full",
    size: 150,
  }),
  columnHelper.accessor("Continent_Code_2", {
    header: "Continent Code 2",
    size: 150,
  }),
  columnHelper.accessor("Continent_Name", {
    header: "Continent Name",
    size: 150,
  }),
  columnHelper.accessor("Dial_Code", {
    header: "Dial Code",
    size: 150,
  }),
  columnHelper.accessor("Currency_Name", {
    header: "Currency Name",
    size: 150,
  }),
  columnHelper.accessor("Capital", {
    header: "Capital",
    size: 150,
  }),
];

const CountriesTable = () => {
  const table = useMaterialReactTable({
    columns,
    data: CountriesList || [],
    enableRowSelection: false,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#1E3A8A",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        "&:hover td": {
          color: "blue", // Change text color on hover
        },
      },
    }),
  });

  return <MaterialReactTable table={table} />;
};

export default CountriesTable;
