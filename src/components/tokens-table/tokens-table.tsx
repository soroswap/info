import * as React from "react";
import { formatNumberToMoney } from "../../utils/utils";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PercentageChanged from "../percentage-changed";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import useTable from "../../hooks/use-table";
import { TokensData } from "./data";
import Token from "../token";
import { useRouter } from "next/router";
import { Card } from "@mui/material";

interface HeadCell {
  id: keyof TokensData;
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
    property: keyof TokensData
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function TokensTableHead(props: TokensTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TokensData) => (event: React.MouseEvent<unknown>) => {
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

export default function TokensTable({
  rows,
  emptyMessage = "No tokens found",
}: {
  rows: TokensData[];
  emptyMessage?: string;
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
  } = useTable<TokensData>({
    rows,
    defaultOrder: "desc",
    defaultOrderBy: "change",
  });

  const router = useRouter();

  const onClickRow = (token: string) => {
    router.push(`/tokens/${token}`);
  };

  if (rows.length === 0) {
    return <Card sx={{ p: 2, bgcolor: "white" }}>{emptyMessage}</Card>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", bgcolor: "white" }}>
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
                  <TableRow
                    key={index}
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                        bgcolor: "#f5f5f5",
                      },
                    }}
                    onClick={() => onClickRow(row.id)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                      }}
                    >
                      <Token token="ETH" />
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
