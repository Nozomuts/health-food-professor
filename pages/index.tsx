import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Table } from '../components/Table';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Column, Row } from '../styles/common';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    gender: string;
    age: string;
};

type ResData = {
    data: { [name: string]: string[] };
};

export default function Home() {
    const [value, set_value] = useState<ResData | null>(null);
    const [open, set_open] = useState(false);
    const [loading, set_loading] = useState(false);
    const [error, set_error] = useState('');
    const { control, reset, handleSubmit, errors } = useForm<FormData>();

    const handle_open = () => {
        set_open(true);
    };

    const handle_click = () => {
        set_value(null);
    };

    const handle_close = () => {
        set_open(false);
    };

    const handle_submit = async (data: FormData) => {
        set_error('');
        set_loading(true);
        try {
            const res = await axios.post(
                'https://nutrient-diagnosis-app-server.herokuapp.com/macdonalds',
                {
                    post_text: data,
                }
            );
            console.log(res);
            set_value(res);
            handle_close();
            reset();
        } catch (res) {
            console.log(res);
            set_error('接続に失敗しました');
        } finally {
            set_loading(false);
        }
    };
    return value ? (
        <Container>
            <h1>診断結果</h1>
            <Row>
                <Table
                    headers={['メニュー', '個数']}
                    value={Object.entries(value.data[0])}
                />
                <Table
                    headers={['栄養素', '量']}
                    value={Object.entries(value.data[1])}
                />
            </Row>
            <Button onClick={handle_click} variant="contained" color="primary">
                TOPに戻る
            </Button>
        </Container>
    ) : (
        <Center>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <h3>マックで1日に必要な栄養を取るためのメニューを診断！</h3>
                    <Button
                        onClick={handle_open}
                        variant="contained"
                        color="primary"
                    >
                        早速診断する！
                    </Button>
                    {error ? (
                        <StyledAlert variant="outlined" severity="error">
                            {error}
                        </StyledAlert>
                    ) : (
                        <Dialog open={open} onClose={handle_close}>
                            <DialogTitle>
                                性別と年齢を選択してください
                            </DialogTitle>
                            <form onSubmit={handleSubmit(handle_submit)}>
                                <DialogContent>
                                    <Column>
                                        <FormLabel component="legend">
                                            性別
                                        </FormLabel>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required:
                                                    '性別を選択してください',
                                            }}
                                            as={
                                                <RadioGroup name="gender1">
                                                    <Row>
                                                        <FormControlLabel
                                                            value="male"
                                                            control={
                                                                <Radio color="primary" />
                                                            }
                                                            label="男性"
                                                        />
                                                        <FormControlLabel
                                                            value="female"
                                                            control={<Radio />}
                                                            label="女性"
                                                        />
                                                    </Row>
                                                </RadioGroup>
                                            }
                                        />
                                        {errors.gender && (
                                            <StyledAlert
                                                variant="outlined"
                                                severity="error"
                                            >
                                                {errors.gender.message}
                                            </StyledAlert>
                                        )}
                                        <InputLabel id="demo-dialog-select-label">
                                            年齢
                                        </InputLabel>
                                        <Controller
                                            name="age"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required:
                                                    '年齢を選択してください',
                                            }}
                                            as={
                                                <StyledSelect
                                                    labelId="demo-dialog-select-label"
                                                    id="demo-dialog-select"
                                                >
                                                    <MenuItem value={10}>
                                                        10代
                                                    </MenuItem>
                                                    <MenuItem value={20}>
                                                        20代
                                                    </MenuItem>
                                                    <MenuItem value={30}>
                                                        30代
                                                    </MenuItem>
                                                </StyledSelect>
                                            }
                                        />
                                        {errors.age && (
                                            <StyledAlert
                                                variant="outlined"
                                                severity="error"
                                            >
                                                {errors.age.message}
                                            </StyledAlert>
                                        )}
                                    </Column>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handle_close}
                                        color="secondary"
                                    >
                                        キャンセル
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        disabled={loading}
                                    >
                                        OK
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    )}
                </>
            )}
        </Center>
    );
}

const Center = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
`;

const StyledSelect = styled(Select)`
    width: 100px;
`;

const StyledAlert = styled(Alert)`
    margin: 10px 0;
`;

const Container = styled.div`
    margin: 80px auto 20px auto;
    width: 80%;
    text-align: center;
`;
