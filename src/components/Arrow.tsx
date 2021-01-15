import React from 'react';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import styled, { css } from 'styled-components';
import { IArrow } from '../interfaces'

interface IProps {
  direction: string;
}

const SArrowWrapper = styled.div<IProps>`
  display: flex;
  position: absolute;
  top: 50%;
  ${props => props.direction === 'right' ? css`right: 25px` : css`left: 25px`};
  height: 50px;
  width: 50px;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;

  &:hover {
    transform: scale(1.1);
  }

  img {
    transform: translateX(${props => (props.direction === 'left' ? '-2px' : '2px')});
    &:focus {
      outline: 0;
    }
  }
`;

const Arrow = ({ direction, handleClick, disabled }: IArrow) => {
  if (disabled) {
    return null;
  }
  
  return (
    <SArrowWrapper direction={direction} onClick={handleClick}>
      {direction === 'right' ? <img src={rightArrow} /> : <img src={leftArrow} />}
    </SArrowWrapper>
  )
}

export default Arrow;
