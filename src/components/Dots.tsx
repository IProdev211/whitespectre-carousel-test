import React, { memo } from 'react';
import styled from 'styled-components';
import { IDot } from '../interfaces';

interface IProps {
    active: boolean;
}

const SDot = styled.span<IProps>`
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${props => props.active ? 'black' : 'white'};
`

const SDotWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dots = ({ slideCount, activeSlide }: IDot) => {
  return (
    <SDotWrapper>
      {new Array(slideCount).fill('').map((slide: string, i: number) => (
        <SDot key={i} active={activeSlide === i} />
      ))}
    </SDotWrapper>
  )
}

export default Dots;
