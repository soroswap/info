import {
  Skeleton,
  Box,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TableContainer,
} from "soroswap-ui";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import useTable from "../../hooks/use-table";
import { formatNumberToMoney } from "../../utils/utils";
import { StyledCard } from "components/styled/card";
import { StyledTableCell } from "components/styled/table-cell";
import { useTheme } from "soroswap-ui";
import { LiquidityProvider, LiquidityProviderTableProps } from "../../types/liquidity-providers";

interface HeadCell {
  id: keyof LiquidityProvider;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "address",
    numeric: false,
    label: "Account",
  },
  {
    id: "tvl",
    numeric: true,
    label: "TVL",
  },
  {
    id: "poolShare",
    numeric: true,
    label: "Pool Share",
  },
];

interface TableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof LiquidityProvider
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function LiquidityProvidersTableHead(props: TableHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof LiquidityProvider) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ bgcolor: "#1b1b1b" }}>
        <StyledTableCell>#</StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
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
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function LiquidityProvidersTable({
  rows,
  emptyMessage = "No liquidity providers found",
  isLoading = false,
  itemsPerPage = 10,
}: LiquidityProviderTableProps) {
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
  } = useTable<LiquidityProvider>({
    rows,
    defaultOrder: "desc",
    defaultOrderBy: "tvl",
    itemsPerPage,
  });

  const theme = useTheme();

  if (isLoading) {
    return <Skeleton variant="rounded" height={300} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <StyledCard sx={{ width: "100%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <LiquidityProvidersTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  key={row.address}
                  sx={{
                    "&:nth-of-type(2n)": {
                      bgcolor: "#1b1b1b",
                    },
                    "&:hover": {
                      cursor: "pointer",
                      bgcolor: theme.palette.background.paper,
                      borderTop: `1px solid ${theme.palette.customBackground.accentAction}`,
                      borderBottom: `1px solid ${theme.palette.customBackground.accentAction}`,
                    },
                    bgcolor: "transparent",
                  }}
                  component="a"
                  href={`https://stellar.expert/explorer/public/account/${row.address}`}
                  target="_blank"
                >
                  <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                  <StyledTableCell>{row.address}</StyledTableCell>
                  <StyledTableCell align="right">
                    {formatNumberToMoney(row.tvl)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.poolShare.toFixed(2)}%
                  </StyledTableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={4} />
                </TableRow>
              )}
              {visibleRows.length === 0 && (
                <TableRow>
                  <StyledTableCell colSpan={4} align="center">
                    {emptyMessage}
                  </StyledTableCell>
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
      </StyledCard>
    </Box>
  );
}
