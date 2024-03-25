import { Link, Skeleton, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import * as React from "react";
import { useQuerySoroswapRouterEvents } from "../../hooks/soroswap";
import { RouterEventType } from "../../types/router-events";
import { TokenType } from "../../types/tokens";
import {
  adjustAmountByDecimals,
  shortenAddress,
  shouldShortenCode,
  toCamelCase,
} from "../../utils/utils";
import { TransactionsData } from "../transaction-table/data";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const formatEvent = (
  event: RouterEventType,
  symbol0: string,
  symbol1: string
) => {
  if (event === "init") return toCamelCase(event);
  return `${toCamelCase(event)} ${shouldShortenCode(symbol0)} ${
    event === "swap" ? "for" : "and"
  } ${shouldShortenCode(symbol1)}`;
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

interface RouterEventsTableProps {
  setTopic: React.Dispatch<React.SetStateAction<undefined | RouterEventType>>;
  topic?: RouterEventType;
}

function RouterEventsTableHead(props: RouterEventsTableProps) {
  const { setTopic, topic } = props;
  // const createSortHandler =
  //   (property: keyof TransactionsData) =>
  //   (event: React.MouseEvent<unknown>) => {
  //     onRequestSort(event, property);
  //   };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Tabs
            value={topic ?? "all"}
            onChange={(e, v) => setTopic(v === "all" ? null : v)}
          >
            <Tab
              label="All"
              value="all"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
            <Tab
              label="Swaps"
              value="swap"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
            <Tab
              label="Adds"
              value="add"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
            <Tab
              label="Removes"
              value="remove"
              sx={{ fontSize: 14, p: 0.5, minWidth: 30 }}
            />
          </Tabs>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
            // active={orderBy === headCell.id}
            // direction={orderBy === headCell.id ? order : "asc"}
            // onClick={createSortHandler(headCell.id)}
            >
              {/* {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function RouterEventsTable() {
  const [topic, setTopic] = React.useState<RouterEventType>();
  const { data: routerEvents, isLoading } = useQuerySoroswapRouterEvents(
    topic,
    150,
    undefined
  );

  // const {
  //   order,
  //   orderBy,
  //   handleRequestSort,
  //   visibleRows,
  //   emptyRows,
  //   rowsPerPage,
  //   page,
  //   handleChangePage,
  //   handleChangeRowsPerPage,
  // } = useTable<TransactionsData>({
  //   routerEvents,
  //   defaultOrder: "desc",
  //   defaultOrderBy: "time",
  // });

  if (isLoading) {
    return <Skeleton variant="rounded" height={300} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", bgcolor: "white" }}>
        <TableContainer sx={{ minHeight: 610 }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <RouterEventsTableHead setTopic={setTopic} topic={topic} />
            <TableBody>
              {routerEvents?.edges.map((edge, index) => {
                let token_a: TokenType | undefined;
                let token_b: TokenType | undefined;
                let token_a_amount = "0";
                let token_b_amount = "0";

                switch (edge.node.topic2) {
                  case "swap":
                    if (edge.node.data.path) {
                      token_a = edge.node.data.path[0];
                      token_b =
                        edge.node.data.path[edge.node.data.path.length - 1];
                    }
                    if (edge.node.data.amounts) {
                      token_a_amount = adjustAmountByDecimals(
                        edge.node.data.amounts[0],
                        token_a?.decimals
                      );
                      token_b_amount = adjustAmountByDecimals(
                        edge.node.data.amounts[
                          edge.node.data.amounts.length - 1
                        ],
                        token_b?.decimals
                      );
                    }
                    break;
                  case "add":
                  case "remove":
                    token_a = edge.node.data.token_a;
                    token_b = edge.node.data.token_b;
                    token_a_amount = adjustAmountByDecimals(
                      edge.node.data.amount_a ?? 0,
                      token_a?.decimals
                    );
                    token_b_amount = adjustAmountByDecimals(
                      edge.node.data.amount_b ?? 0,
                      token_b?.decimals
                    );
                    break;
                }

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
                        href={`https://stellar.expert/explorer/public/tx/${edge.node.txInfoByTx.txHash}`}
                        target="_blank"
                        underline="hover"
                      >
                        {formatEvent(
                          edge.node?.topic2,
                          token_a?.code ?? "",
                          token_b?.code ?? ""
                        )}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {token_a_amount} {shouldShortenCode(token_a?.code ?? "")}
                    </TableCell>
                    <TableCell align="right">
                      {token_b_amount} {shouldShortenCode(token_b?.code ?? "")}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href={`https://stellar.expert/explorer/public/account/${"DD"}`}
                        target="_blank"
                        underline="hover"
                      >
                        {shortenAddress(edge.node.data.to ?? "")}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {timeAgo.format(
                        edge.node.txInfoByTx.ledgerByLedger.closeTime * 1000
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          component="div"
          count={routerEvents?.totalCount!}
          rowsPerPage={10}
          page={1}
          onPageChange={() => console.log("handleChangePage")}
          onRowsPerPageChange={() => console.log("handleChangeRowsPerPage")}
          rowsPerPageOptions={[]}
        /> */}
      </Paper>
    </Box>
  );
}
