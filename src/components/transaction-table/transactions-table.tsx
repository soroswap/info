import { Link, Skeleton, Tab, Tabs } from "@mui/material";
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
import {
  formatEvent,
  shortenAddress,
  shouldShortenCode,
} from "../../utils/utils";
import {
  RouterEventAPI,
  RouterEventType,
  RouterEventsAPIResponse,
} from "../../types/router-events";
import { useQueryAllEvents } from "../../hooks/events";
import { UseQueryResult } from "@tanstack/react-query";
import { UseEventTopicFilterReturnProps } from "../../hooks/use-event-topic-filter";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

interface HeadCell {
  id: keyof RouterEventAPI;
  label: string;
  numeric: boolean;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "amountA",
    numeric: true,
    label: "Token Amount",
  },
  {
    id: "amountB",
    numeric: true,
    label: "Token Amount",
  },
  {
    id: "account",
    numeric: true,
    label: "Account",
  },
  {
    id: "timestamp",
    numeric: true,
    label: "Time",
    sortable: true,
  },
];

interface TransactionsTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof RouterEventAPI
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
  setCurrentFilter: React.Dispatch<
    React.SetStateAction<"All" | RouterEventType>
  >;
  currentFilter: "All" | RouterEventType;
}

function TransactionsTableHead(props: TransactionsTableProps) {
  const { order, orderBy, onRequestSort, setCurrentFilter, currentFilter } =
    props;

  const createSortHandler =
    (property: keyof RouterEventAPI) => (event: React.MouseEvent<unknown>) => {
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
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface Props {
  rows: RouterEventsAPIResponse;
  isLoading: boolean;
  filters: UseEventTopicFilterReturnProps;
}

export default function TransactionsTable({ rows, isLoading, filters }: Props) {
  const { currentFilter, setCurrentFilter } = filters;

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
  } = useTable<RouterEventAPI>({
    rows,
    defaultOrder: "desc",
    defaultOrderBy: "timestamp",
  });

  if (isLoading) {
    return <Skeleton variant="rounded" height={300} />;
  }

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
                      <Link
                        href={`https://stellar.expert/explorer/public/tx/${row.txHash}`}
                        target="_blank"
                        underline="hover"
                      >
                        {formatEvent(
                          row.event,
                          row.tokenA?.code ?? "",
                          row.tokenB?.code ?? ""
                        )}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {row.amountA} {shouldShortenCode(row.tokenA?.code ?? "")}
                    </TableCell>
                    <TableCell align="right">
                      {row.amountB} {shouldShortenCode(row.tokenB?.code ?? "")}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href={`https://stellar.expert/explorer/public/account/${row.account}`}
                        target="_blank"
                        underline="hover"
                      >
                        {shortenAddress(row.account ?? "")}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {timeAgo.format(row.timestamp)}
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
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No transactions found
                  </TableCell>
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
