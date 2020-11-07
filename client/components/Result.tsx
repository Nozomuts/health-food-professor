import { Button } from '@material-ui/core';
import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { ResData } from '../pages';
import { Row } from '../styles/common';
import { Table } from './Table';
import { Center } from '../pages/index';

type ErrorData = {
    data: string;
};

type Props = {
    value: ResData;
    on_click: () => void;
};

/**
 * 診断結果表示
 */
export const Result: FC<Props> = ({ value, on_click }) => {
    return (
        <>
            {String(value.data) === 'error' ? (
                <Center>
                    <h1>そんな都合の良いメニューはありません！！！</h1>
                    <Button
                        onClick={on_click}
                        variant="contained"
                        color="primary"
                    >
                        TOPに戻る
                    </Button>
                </Center>
            ) : (
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
                    <Button
                        onClick={on_click}
                        variant="contained"
                        color="primary"
                    >
                        TOPに戻る
                    </Button>
                </Container>
            )}
        </>
    );
};

const Container = styled.div`
    margin: 80px auto 20px auto;
    width: 80%;
    text-align: center;
`;
