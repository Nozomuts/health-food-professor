import React, { FC } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";
import { sp } from "../styles/media";

type Props = {
  result: { [name: string]: string };
};

export const Table: FC<Props> = ({ result }) => {
  return (
    <TableContainer>
      <table>
        <tr>
          <th>メニュー名</th>
          <th>個数</th>
        </tr>
        {result &&
          Object.entries(result)
            .filter((el) => el[1] !== "0個")
            .map((el) => (
              <tr key={String(el)}>
                <td>{el[0]}</td>
                <td>{el[1].replace("個", "")}</td>
              </tr>
            ))}
      </table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 25rem;
  height: 25rem;
  overflow-y: auto;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  table {
    width: 100%;
    thead,
    tbody {
      display: block;
    }
    th,
    td {
      border: 0.1rem solid rgba(0, 0, 0, 0.1);
      padding: 1rem;
      text-align: center;
    }
    th {
      background: ${COLOR.BLACK};
      color: ${COLOR.WHITE};
      font-weight: bold;
      white-space: nowrap;
    }
  }
  ${sp`
    width: 18rem;
    height: auto;
    overflow: hidden;
    margin-top: 3rem;
  `}
`;
