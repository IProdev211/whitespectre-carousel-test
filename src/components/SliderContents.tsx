import React from 'react';
import styled from 'styled-components';
import { ISliderContent } from '../interfaces';
import Slide from './Slide';

interface IProps {
  translate: number;
  transition: number;
  width: number;
}

const SSliderContent = styled.div<IProps>`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
  display: flex;
`;

const SliderContent = (props: ISliderContent) => (
  <SSliderContent
    transition={props.transition}
    translate={props.translate}
    width={props.width}
    className='SliderContent'
  >
    {props.children}
  </SSliderContent>
)

export default SliderContent;
