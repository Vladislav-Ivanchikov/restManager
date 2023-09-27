import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const Menu = ({ menu }) => {
  // const onClickRemove = () => {};

  return (
    <TableContainer component={Paper}>
      {menu.map((item) => (
        <Table key={item._id} sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{item.category}</TableCell>
              <TableCell align="right">Кол-во</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Ингридиенты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={item.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.value}</TableCell>
              <TableCell align="right">10p</TableCell>
              <TableCell align="right">{item.ingredients.join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </TableContainer>
  );
};
