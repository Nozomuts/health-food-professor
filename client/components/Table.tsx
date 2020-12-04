import React, { FC } from "react";
import styled from "styled-components";
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
              <tr>
                <td>{el[0]}</td>
                <td>{el[1].replace("個", "")}</td>
              </tr>
            ))}
      </table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 43rem;
  height: 30rem;
  margin-left: 10rem;
  overflow-y: auto;
  border-radius: .5rem;
  table {
    width: 100%;
    th,
    td {
      border: .1rem solid rgba(0, 0, 0, 0.1);
      padding: 1rem;
      text-align: center;
    }
    th {
      background: #000;
      color: #fff;
      font-weight: bold;
    }
  }
  ${sp`
    width: 30rem;
    height: auto;
    overflow: hidden;
    margin-top: 5rem;
  `}
`;
