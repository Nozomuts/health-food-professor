import React, { FC } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";
import { Text } from "../styles/common";
import { sp } from "../styles/media";

type Props = {
  register: any;
};

export const GenderRadio: FC<Props> = ({ register }) => {
  return (
    <RadioContainer>
      <ul>
        <ListItem>
          <label>
            <OptionInput type="radio" name="gender" ref={register} value="0" />
            <Text>男性</Text>
          </label>
        </ListItem>
        <ListItem>
          <label>
            <OptionInput type="radio" name="gender" ref={register} value="1" />
            <Text>女性</Text>
          </label>
        </ListItem>
      </ul>
    </RadioContainer>
  );
};

const RadioContainer = styled.div`
  text-align: left;
  > ul {
    padding: 1rem;
    list-style: none;
    border: .1rem solid #cccccc;
    border-radius: .5rem;
    height: 12rem;
  }
  label {
    line-height: 135%;
    position: relative;
    margin: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  ${sp`
    > ul {
      height: 4rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    label {
      line-height: 30%;
      margin: 0 .6rem;
    }
  `}
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
  padding: 0;
  :hover {
    opacity: 0.3;
  }
  ${sp`
    margin: 0;
  `}
`;

const OptionInput = styled.input`
  position: relative;
  margin: 0 1rem 0 0;
  cursor: pointer;
  ::before,
  ::after {
    position: absolute;
    z-index: 1;
    top: -0.125rem;
    left: -0.125rem;
    width: 1rem;
    height: 1rem;
    content: "";
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 50%;
    background: #ffffff;
  }
  ::after {
    z-index: 0;
    top: -0.25rem;
    left: -0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    background: ${COLOR.BLACK};
  }
  :checked:before {
    -webkit-transform: scale(0, 0);
    transform: scale(0, 0);
    border-width: 0.625rem;
    border-color: ${COLOR.BLACK};
  }
`;
