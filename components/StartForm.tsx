import {
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Column, Row } from '../styles/common';

type Props = {
    control: any;
    errors: any;
    register: any;
};

/**
 * 性別、年齢、上限などを入力するフォーム
 */
export const StartForm: FC<Props> = ({ control, errors, register }) => (
    <Column>
        <FormLabel component="legend">性別</FormLabel>
        <Controller
            name="gender"
            control={control}
            defaultValue=""
            rules={{ required: '性別を選択してください' }}
            as={
                <RadioGroup>
                    <Row>
                        <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label="男性"
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="女性"
                        />
                    </Row>
                </RadioGroup>
            }
        />
        {errors.gender && (
            <StyledAlert variant="outlined" severity="error">
                {errors.gender.message}
            </StyledAlert>
        )}
        <FormControl>
            <InputLabel id="demo-dialog-select-label">年齢</InputLabel>
            <Controller
                name="old"
                control={control}
                defaultValue=""
                rules={{ required: '年齢を選択してください' }}
                as={
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                    >
                        <MenuItem value="0">3-5歳</MenuItem>
                        <MenuItem value="1">6-7歳</MenuItem>
                        <MenuItem value="2">8-9歳</MenuItem>
                        <MenuItem value="3">10-11歳</MenuItem>
                        <MenuItem value="4">12-14歳</MenuItem>
                        <MenuItem value="5">15-17歳</MenuItem>
                        <MenuItem value="6">18-29歳</MenuItem>
                        <MenuItem value="7">30-49歳</MenuItem>
                        <MenuItem value="8">50-64歳</MenuItem>
                        <MenuItem value="9">65-74歳</MenuItem>
                        <MenuItem value="10">75歳以上</MenuItem>
                    </Select>
                }
            />
        </FormControl>
        {errors.old && (
            <StyledAlert variant="outlined" severity="error">
                {errors.old.message}
            </StyledAlert>
        )}
        <TextField
            label="上限"
            type="number"
            name="up_value"
            margin="dense"
            inputRef={register}
            inputProps={{min: 0}}
        />
    </Column>
);

const StyledAlert = styled(Alert)`
    margin: 10px 0;
`;
