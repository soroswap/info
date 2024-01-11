import * as React from "react";
import { formatNumberToMoney } from "../utils/utils";
import { visuallyHidden } from "@mui/utils";
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
import useTable from "../hooks/use-table";

interface Data {
  pool: string;
  tvl: number;
  v24: number;
  v7: number;
}

function createData(pool: string, tvl: number, v24: number, v7: number): Data {
  return {
    pool,
    tvl,
    v24,
    v7,
  };
}

const rows: Data[] = [
  createData("ETH/USDT", 6139289, 6971544, 4791297),
  createData("BTC/USDC", 12994939, 19421059, 19843850),
  createData("ADA/ETH", 4369673, 18270992, 16446706),
  createData("XRP/BTC", 2658405, 10138442, 19187029),
  createData("LTC/ETH", 19059460, 14313574, 15025412),
  createData("DOT/USDT", 9855014, 15094769, 15756642),
  createData("LINK/USDC", 16310947, 8405003, 1859308),
  createData("UNI/BTC", 3733989, 6717321, 12314030),
  createData("AAVE/ETH", 3829729, 9031448, 10213830),
  createData("SOL/USDT", 16515659, 12376324, 7672210),
];

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "pool",
    numeric: false,
    label: "Pool",
  },
  {
    id: "tvl",
    numeric: true,
    label: "TVL",
  },
  {
    id: "v24",
    numeric: true,
    label: "Volume 24H",
  },
  {
    id: "v7",
    numeric: true,
    label: "Volume 7D",
  },
];

interface PoolsTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function PoolsTableHead(props: PoolsTableProps) {
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

export default function PoolsTable() {
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
    defaultOrderBy: "tvl",
  });
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, bgcolor: "white" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <PoolsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">{row.pool}</TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.tvl)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.v24)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.v7)}
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
