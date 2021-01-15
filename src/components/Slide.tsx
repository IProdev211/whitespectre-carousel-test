import React from 'react';
import { ISlide } from '../interfaces';
import styled from 'styled-components';

interface IProps {
  height: number;
  src: string;
}

const getHeight: () => number = () => window.innerHeight;

const SSlide = styled.div<ISlide>`
  height: 100%;
  width: ${props => props.width - 20}px;
  padding: 0 10px;
  position: relative;
`;

const SImage = styled.div<IProps>`
  width: 100%;
  height: ${props => props.height}px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const STitle = styled.div`
  position: absolute;
  font-size: 32px;
  color: white;
  top: calc(5% - 10px);
  left: 5%;
`;

const Slide = ({ content, width }: ISlide) => {
  return (
    <SSlide content={content} width={width}>
      {
        content.images.map((image, i) => {
          const imgHeight = getHeight() / content.images.length;
          return (
            <SImage height={imgHeight} src={image} key={i} />
          )
        })
      }
      <STitle>{content.title}</STitle>
    </SSlide>
  )
}

export default Slide;
