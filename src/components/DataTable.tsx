/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Column {
  id: string;
  label: string;
}

interface DataTableProps<T> {
  columns: Column[];
  rows: T[];
  rowKey: keyof T;
  detailPath?: string;
  onSelectionChange?: (selected: T[]) => void;
}

function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  rowKey,
  detailPath,
  onSelectionChange,
}: DataTableProps<T>) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const handleSelect = (key: string) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedKeys(newSelected);

    if (onSelectionChange) {
      const selectedRows = rows.filter((row) =>
        newSelected.has(String(row[rowKey]))
      );
      onSelectionChange(selectedRows);
    }
  };

  const isSelected = (key: string) => selectedKeys.has(key);

  const handleRowClick = (id: string) => {
    if (detailPath) {
      navigate(`${detailPath}/${id}`);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "4px",
        overflowX: { xs: "auto", sm: "hidden" },
        width: "100%",
      }}
    >
      <Table sx={{ minWidth: 596 }}>
        <TableHead sx={{ bgcolor: "#a4a7b715" }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                sx={{
                  color: "#C4C4C4",
                  "&.Mui-checked": {
                    color: "#C4C4C4",
                  },
                  transform: "scale(1.1)",
                }}
                size="small"
                indeterminate={
                  selectedKeys.size > 0 && selectedKeys.size < rows.length
                }
                checked={rows.length > 0 && selectedKeys.size === rows.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    const allKeys = new Set(rows.map((r) => String(r[rowKey])));
                    setSelectedKeys(allKeys);
                    if (onSelectionChange) {
                      onSelectionChange(rows);
                    }
                  } else {
                    setSelectedKeys(new Set());
                    if (onSelectionChange) {
                      onSelectionChange([]);
                    }
                  }
                }}
              />
            </TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{
                  color: "#A4A7B7",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const key = String(row[rowKey]);
            return (
              <TableRow
                key={key}
                hover
                selected={isSelected(key)}
                onClick={() => handleRowClick(key)}
                sx={{
                  "&:last-child td": { borderBottom: 0 },
                  cursor: detailPath ? "pointer" : "default",
                }}
              >
                <TableCell
                  padding="checkbox"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    sx={{
                      color: "#C4C4C4",
                      "&.Mui-checked": {
                        color: "#C4C4C4",
                      },
                      transform: "scale(1.1)",
                    }}
                    size="small"
                    checked={isSelected(key)}
                    onChange={() => handleSelect(key)}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    sx={{
                      borderTop: "1px solid #E5E5E5",
                      borderBottom: "1px solid #E5E5E5",
                      maxWidth: "259px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
