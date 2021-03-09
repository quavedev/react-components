import React, { useCallback } from 'react';
import MuiTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { IconButton, SvgIcon } from '@material-ui/core';

export const QTable = ({
  rowId,
  columns = [],
  data = [],
  onRowClick: onRowClickProps,
  actions,
  containerComponent,
}) => {
  const onRowClick = useCallback(rowData => () => {
    if (onRowClickProps) {
      onRowClickProps(rowData);
    }
  });
  return (
    <TableContainer component={containerComponent}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map(({ title, field, align }) => (
              <TableCell key={field} align={align}>
                {title}
              </TableCell>
            ))}
            {actions && <TableCell align="right">Ações</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(rowData => (
            <TableRow
              key={rowId(rowData)}
              onClick={onRowClick(rowData)}
              style={{ cursor: onRowClickProps && 'pointer' }}
            >
              {columns.map(({ field, render, align, onClick }) => (
                <TableCell
                  key={field}
                  onClick={onClick}
                  style={{ cursor: onClick && 'pointer' }}
                  align={align}
                >
                  {render ? render(rowData) : rowData[field]}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="right">
                  {actions.map(({ icon: Icon, onClick }) => (
                    <IconButton
                      key={`action_${Math.random()}`}
                      onClick={() => {
                        if (onClick) {
                          onClick(rowData);
                        }
                      }}
                    >
                      <SvgIcon fontSize="small">
                        <Icon />
                      </SvgIcon>
                    </IconButton>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
