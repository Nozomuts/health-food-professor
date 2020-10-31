import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FormDialog } from '../components/FormDialog';
import { StartForm } from '../components/StartForm';
import { Result } from '../components/Result';

type FormData = {
    gender: string;
    old: string;
    up_value: string;
};

export type ResData = {
    data: { [name: string]: string[] };
};

export default function Home() {
    const [value, set_value] = useState<ResData | null>(null);
    const [open, set_open] = useState(false);
    const [loading, set_loading] = useState(false);
    const { control, reset, handleSubmit, errors, register } = useForm<
        FormData
    >();

    // reduxに置き換える
    const on_click_open = () => {
        set_open(true);
    };

    const on_click_return = () => {
        set_value(null);
    };

    // reduxに置き換える
    const on_close = () => {
        set_open(false);
    };

    /**
     * 性別、年齢、上限のデータを渡す
     * index.pyのindexが実行される
     */
    const on_submit = async (data: FormData) => {
        set_loading(true);
        try {
            const res = await axios.post(
                'https://nutrient-diagnosis-app-server.herokuapp.com/macdonalds',
                {
                    data,
                }
            );
            console.log(res);
            set_value(res);
            on_close();
            reset();
        } catch (res) {
            console.log(res);
        } finally {
            set_loading(false);
        }
    };

    // valueがない時はTOPページ、ある時は診断結果を表示
    return value ? (
        <Result value={value} on_click={on_click_return} />
    ) : (
        <Center>
            <h3>マックで1日に必要な栄養を取るためのメニューを診断！</h3>
            <Button onClick={on_click_open} variant="contained" color="primary">
                早速診断する！
            </Button>
            <FormDialog
                open={open}
                on_close={on_close}
                on_submit={handleSubmit(on_submit)}
                actions={
                    <>
                        <Button onClick={on_close} color="secondary">
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={loading}
                        >
                            OK
                        </Button>
                    </>
                }
            >
                <StartForm
                    control={control}
                    register={register}
                    errors={errors}
                />
            </FormDialog>
        </Center>
    );
}

export const Center = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
`;
