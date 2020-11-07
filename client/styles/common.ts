import styled from 'styled-components';
import { pc } from './media';

export const Row = styled.div`
  ${pc`
      display: flex;
  `}
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
