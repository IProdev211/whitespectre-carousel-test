import React from 'react';
import Slider from '../../components/Slider';
import images from '../../images';
import { SContainer } from './Main.styles';

const Main: React.FC = () => {
  return (
    <SContainer>
      <Slider slides={images} />
    </SContainer>
  );
}

export default Main;