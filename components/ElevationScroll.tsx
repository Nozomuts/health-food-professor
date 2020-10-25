import React from 'react';
import { useScrollTrigger } from '@material-ui/core';

type Props = {
    window?: () => Window;
    children: React.ReactElement;
};

export const ElevationScroll = ({ children, window }: Props) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};
