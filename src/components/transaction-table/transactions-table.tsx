import * as React from "react";
import { formatNumberToMoney } from "../../utils/utils";
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
import useTable from "../../hooks/use-table";
import { ActionName, TransactionsData } from "./data";

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

interface HeadCell {
  id: keyof TransactionsData;
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
    property: keyof TransactionsData
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function TransactionsTableHead(props: TransactionsTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TransactionsData) =>
    (event: React.MouseEvent<unknown>) => {
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
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", bgcolor: "white" }}>
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
