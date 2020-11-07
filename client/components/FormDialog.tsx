import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { ReactNode } from 'react';
import { FC } from 'react';

type Props = {
    open: boolean;
    on_close: () => void;
    on_submit?: () => void;
    actions?: ReactNode;
};

/**
 * @param actions フッターのボタンなど
 * @param onsubmit データを送信する際に渡す
 * ダイアログの中に入れて返す
 */
export const FormDialog: FC<Props> = ({
    open,
    on_close,
    on_submit,
    children,
    actions,
}) => {
    return (
        <Dialog open={open} onClose={on_close}>
            <DialogTitle>項目を選択してください</DialogTitle>
            <form onSubmit={on_submit}>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                  {actions}
                </DialogActions>
            </form>
        </Dialog>
    );
};
