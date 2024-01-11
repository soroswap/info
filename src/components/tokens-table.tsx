import * as React from "react";
import { formatNumberToMoney } from "../utils/utils";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PercentageChanged from "./percentage-changed";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import useTable from "../hooks/use-table";

interface Data {
  name: string;
  symbol: string;
  price: number;
  change: number;
  v24: number;
  tvl: number;
}

function createData(
  name: string,
  symbol: string,
  price: number,
  change: number,
  v24: number,
  tvl: number
): Data {
  return {
    name,
    symbol,
    price,
    change,
    v24,
    tvl,
  };
}

const rows: Data[] = [
  createData("Tether USD", "USDT", 1690.71, 0.29, 14091979, 6184693),
  createData("Bitcoin", "BTC", 2066.84, 1.22, 11397903, 29538868),
  createData("Ethereum", "ETH", 981.2, -0.18, 1627262, 24308785),
  createData("Ripple", "XRP", 4137.69, 2.35, 5502269, 19869732),
  createData("Litecoin", "LTC", 1540.67, 2.96, 7745698, 28193539),
  createData("Cardano", "ADA", 3408.92, -1.99, 6635886, 18750693),
  createData("Polkadot", "DOT", 4303.12, 2.85, 5045217, 9525834),
  createData("Chainlink", "LINK", 560.5, -2.32, 19535310, 10092550),
  createData("Binance Coin", "BNB", 4370.79, -1.23, 19036235, 14006176),
  createData("Solana", "SOL", 1782.48, -0.94, 2045126, 10102621),
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
    label: "Name",
  },
  {
    id: "price",
    numeric: true,
    label: "Price",
  },
  {
    id: "change",
    numeric: true,
    label: "Price Change",
  },
  {
    id: "v24",
    numeric: true,
    label: "Volume 24H",
  },
  {
    id: "tvl",
    numeric: true,
    label: "TVL",
  },
];

interface TokensTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function TokensTableHead(props: TokensTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
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

export default function TokensTable() {
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
    defaultOrderBy: "change",
  });
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, bgcolor: "white" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TokensTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      {row.name} ({row.symbol})
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.price)}
                    </TableCell>
                    <TableCell align="right">
                      <PercentageChanged percentage={row.change} />
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.v24)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.tvl)}
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
