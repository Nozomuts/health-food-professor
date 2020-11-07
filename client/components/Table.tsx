import React from 'react';
import {
    Paper,
    Table as MaterialTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';
import { COLOR } from '../styles/colors';

type Props = {
    value?: string[][];
    headers: string[];
};

/**
 * 受け取ったvalueを基にテーブルで表示
 */
export const Table: FC<Props> = ({ value, headers }) => {
    return (
        <StyledTableContainer component={Paper}>
            <MaterialTable>
                <StyledTableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell align="center" key={String(header)}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {value &&
                        value
                            .filter((el) => el[1] !== '0個')
                            .map((el) => (
                                <TableRow key={String(el)}>
                                    <TableCell align="center">
                                        {el[0]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {el[1]}
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </MaterialTable>
        </StyledTableContainer>
    );
};

const StyledTableContainer = styled(TableContainer)<any>`
    margin-bottom: 30px;
`;

const StyledTableHead = styled(TableHead)`
    background-color: ${COLOR.SMOKE};
`;
