import * as React from "react";
import { formatNumberToMoney } from "../utils/utils";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import en from "javascript-time-ago/locale/en";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TimeAgo from "javascript-time-ago";
import useTable from "../hooks/use-table";

type ActionName = "Swap" | "Add" | "Remove";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatName = (name: ActionName, symbol0: string, symbol1: string) => {
  if (name === "Swap") {
    return `Swap ${symbol0} for ${symbol1}`;
  }
  return `${name} ${symbol0} and ${symbol1}`;
};

interface Data {
  name: ActionName;
  value: number;
  amount0: number;
  symbol0: string;
  amount1: number;
  symbol1: string;
  account: string;
  time: number;
}

function createData(
  name: ActionName,
  value: number,
  amount0: number,
  symbol0: string,
  amount1: number,
  symbol1: string,
  account: string,
  time: number
): Data {
  return {
    name,
    value,
    amount0,
    symbol0,
    amount1,
    symbol1,
    account,
    time,
  };
}

const rows: Data[] = [
  createData(
    "Remove",
    28695,
    41,
    "LTC",
    770,
    "BNB",
    "0x5DE39C7FE4D81F06D8F2BC05F8E098F04617E83C",
    1704985943
  ),
  createData(
    "Add",
    40255,
    754,
    "USDT",
    23,
    "SOL",
    "0xDE9DBF3FCABA35625DD1E7B8287E41720CC914DE",
    1704985943
  ),
  createData(
    "Remove",
    44258,
    976,
    "XRP",
    806,
    "BNB",
    "0x478E9CF9FF0E021C99CF52BCEDBC012863A292C7",
    1704985943
  ),
  createData(
    "Remove",
    40942,
    194,
    "LTC",
    233,
    "BTC",
    "0xB02569E7AE6D1C2412BD1BD72098EFFB2ED4EC18",
    1704985943
  ),
  createData(
    "Remove",
    37082,
    915,
    "XRP",
    749,
    "BTC",
    "0x0AA3BBE63B3CC453D34661DEFE3FB3EBB84BB921",
    1704985943
  ),
  createData(
    "Remove",
    11969,
    655,
    "BTC",
    749,
    "DOT",
    "0x66F5B988552E148365EF439F9028C7AA8CF3E39B",
    1704985943
  ),
  createData(
    "Swap",
    8190,
    663,
    "ETH",
    576,
    "USDT",
    "0x33F8B6AEF0BC25A6CA9CA3FF95AA77BEE967EDB6",
    1704985943
  ),
  createData(
    "Remove",
    8982,
    867,
    "BNB",
    480,
    "ETH",
    "0xD8ECD44764D797DD744DA6980114C4AAF7FE8721",
    1704985943
  ),
  createData(
    "Swap",
    14169,
    971,
    "SOL",
    561,
    "ETH",
    "0x665B8DED49B8F9C125FBC4E50098E117F8D3558D",
    1704985943
  ),
  createData(
    "Remove",
    47587,
    645,
    "XRP",
    237,
    "LTC",
    "0xFD190924FD8A92DD56AA3ECE1323302F087AD6A6",
    1704985943
  ),
  createData(
    "Add",
    9238,
    668,
    "DOT",
    23,
    "LTC",
    "0x5EC202EEA6A4D48620CE97DFBD909C9156EF5BF1",
    1704985943
  ),
];

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Type",
  },
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
    property: keyof Data
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function TransactionsTableHead(props: TransactionsTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
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

export default function TransactionsTable() {
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
  } = useTable<Data>({
    rows,
    defaultOrder: "desc",
    defaultOrderBy: "time",
  });
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, bgcolor: "white" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TransactionsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">
                      {formatName(row.name, row.symbol0, row.symbol1)}
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
                      {shortenAddress(row.account)}
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
