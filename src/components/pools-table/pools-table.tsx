import * as React from "react";
import { Card, Skeleton, Typography } from "@mui/material";
import { formatNumberToMoney, roundNumber } from "../../utils/utils";
import { Pool } from "../../types/pools";
import { PoolsData } from "./data";
import { useRouter } from "next/router";
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
import Token from "../token";
import useTable from "../../hooks/use-table";

interface HeadCell {
  id: keyof PoolsData;
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
  {
    id: "fees24",
    numeric: true,
    label: "Fees 24H",
  },
  {
    id: "feesYearly",
    numeric: true,
    label: "Fees Yearly",
  },
];

interface PoolsTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PoolsData
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function PoolsTableHead(props: PoolsTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof PoolsData) => (event: React.MouseEvent<unknown>) => {
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

export default function PoolsTable({
  rows,
  emptyMessage = "No pools found",
  isLoading = false,
}: {
  rows: Pool[];
  emptyMessage?: string;
  isLoading?: boolean;
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
  } = useTable<Pool>({
    rows,
    defaultOrder: "desc",
    defaultOrderBy: "tvl",
  });

  const router = useRouter();

  const onClickRow = (pool: string) => {
    router.push(`/pools/${pool}`);
  };

  if (isLoading) {
    return <Skeleton variant="rounded" height={300} />;
  }

  if (rows.length === 0) {
    return <Card sx={{ p: 2, bgcolor: "white" }}>{emptyMessage}</Card>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", bgcolor: "white" }}>
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
                  <TableRow
                    onClick={() => onClickRow(row.pool)}
                    key={index}
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                        bgcolor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        height: 70,
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <Token token="ETH" width={20} height={20} />
                        <Token token="SOL" width={20} height={20} />
                      </Box>
                      ETH/SOL
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.tvl)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.volume24h)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.volume7d)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberToMoney(row.fees24h)}
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="brown" fontSize={14}>
                        {roundNumber(row.feesYearly, 2)}%
                      </Typography>
                      <Box display="flex" justifyContent="flex-end">
                        <Box
                          bgcolor="lightgray"
                          borderRadius={1}
                          px={1}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap="4px"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="black"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.916 5.353l1.27 1.396 1.26-1.387.554.605-1.814 1.995-1.27-1.396-2.002 2.201-1.075-1.18L2.553 9 2 8.395l1.84-2.022 1.074 1.181 2.002-2.2z"
                              fill="black"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.916 3l1.27 1.396 1.26-1.387.554.605-1.814 1.995-1.27-1.396-2.002 2.201-1.075-1.18-1.286 1.413L2 6.042 3.84 4.02 4.913 5.2 6.916 3z"
                              fill="black"
                            ></path>
                          </svg>
                          <Typography fontSize={10}>6.33 - 10.33%</Typography>
                        </Box>
                      </Box>
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
