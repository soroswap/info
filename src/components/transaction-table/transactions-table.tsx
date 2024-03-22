import { Link, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import * as React from "react";
import useTable from "../../hooks/use-table";
import { formatNumberToMoney, shortenAddress } from "../../utils/utils";
import { ActionName, TransactionsData } from "./data";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const formatName = (name: ActionName, symbol0: string, symbol1: string) => {
  if (name === "Swap") {
    return `Swap ${symbol0} for ${symbol1}`;
  }
  return `${name} ${symbol0} and ${symbol1}`;
};

interface HeadCell {
  id: keyof TransactionsData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "value",
    numeric: true,
    label: "Value",
  },
  {
    id: "amount0",
    numeric: true,
    label: "Token Amount",
  },
  {
    id: "amount1",
    numeric: true,
    label: "Token Amount",
  },
  {
    id: "account",
    numeric: true,
    label: "Account",
  },
  {
    id: "time",
    numeric: true,
    label: "Time",
  },
];

interface TransactionsTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TransactionsData
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<"All" | ActionName>>;
  currentFilter: "All" | ActionName;
}

function TransactionsTableHead(props: TransactionsTableProps) {
  const { order, orderBy, onRequestSort, setCurrentFilter, currentFilter } =
    props;
  const createSortHandler =
    (property: keyof TransactionsData) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Tabs value={currentFilter} onChange={(e, v) => setCurrentFilter(v)}>
            <Tab
              label="All"
              value="All"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
            <Tab
              label="Swaps"
              value="Swap"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
            <Tab
              label="Adds"
              value="Add"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
            <Tab
              label="Removes"
              value="Remove"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
          </Tabs>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TransactionsTable({
  rows,
}: {
  rows: TransactionsData[];
}) {
  const {
    order,
    orderBy,
    handleRequestSort,
    visibleRows,
    emptyRows,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTable<TransactionsData>({
    rows,
    defaultOrder: "desc",
    defaultOrderBy: "time",
  });

  const [currentFilter, setCurrentFilter] = React.useState<"All" | ActionName>(
    "All"
  );

  const filteredRows = React.useMemo(() => {
    if (currentFilter === "All") {
      return visibleRows;
    }
    return visibleRows.filter((row) => row.name === currentFilter);
  }, [currentFilter, visibleRows]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", bgcolor: "white" }}>
        <TableContainer sx={{ minHeight: 610 }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TransactionsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              setCurrentFilter={setCurrentFilter}
              currentFilter={currentFilter}
            />
            <TableBody>
              {filteredRows.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                        bgcolor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell align="left">
                      <Link
                        href={`https://stellar.expert/explorer/testnet/tx/sometxhash`}
                        target="_blank"
                        underline="hover"
                      >
                        {formatName(row.name, row.symbol0, row.symbol1)}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.value)}
                    </TableCell>
                    <TableCell align="right">
                      {row.amount0} {row.symbol0}
                    </TableCell>
                    <TableCell align="right">
                      {row.amount1} {row.symbol1}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href={`https://stellar.expert/explorer/public/account/${row.account}`}
                        target="_blank"
                        underline="hover"
                      >
                        {shortenAddress(row.account)}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {timeAgo.format(row.time * 1000)}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Paper>
    </Box>
  );
}
