import {
  styled,
  TableCell,
  TableContainer,
  TableRow,
  createTheme,
} from "@sistent/sistent";

export const StyledTableContainer = styled(TableContainer)(() => ({
  width: "100%",
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: 0,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-child(odd)": {
    backgroundColor: theme.palette.background.default,
    borderRadius: 0,
  },
  "&:nth-child(even)": {
    backgroundColor: theme.palette.background.secondary,
    borderRadius: 0,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.975rem",
  padding: "0.75rem",
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  fontFamily: "\"Qanelas Soft\", \"Open Sans\", sans-serif",
}));

export const StyledHeaderCell = styled(StyledTableCell)(() => ({
  fontWeight: 600,
  backgroundColor: "transparent",
  fontFamily: "\"Qanelas Soft\", \"Open Sans\", sans-serif",
}));

// Custom theme with Qanelas Soft font family for legal tables
export const legalTableTheme = createTheme({
  typography: {
    fontFamily: "\"Qanelas Soft\", \"Open Sans\", sans-serif",
  },
});
