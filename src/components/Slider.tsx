import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';
import SliderContent from './SliderContents';
import { ISlider, TImage } from '../interfaces';
import { SLIDE_IMAGE_COUNT } from '../contants';

const getWidth: () => number = () => window.innerWidth

const SSliderWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`;

const Slider = (props: ISlider) => {
  const { slides } = props;

  const slidesGroup = Math.ceil(slides.length / SLIDE_IMAGE_COUNT)
  const firstSlide = slides.slice(0, SLIDE_IMAGE_COUNT);
  const secondSlide = slides.slice(SLIDE_IMAGE_COUNT, 2 * SLIDE_IMAGE_COUNT);
  const lastSlide = slides.slice(slides.length - SLIDE_IMAGE_COUNT, slides.length);

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    prevDisable: true,
    nextDisable: false,
    _slides: [...lastSlide, ...firstSlide, ...secondSlide]
  });

  const { activeSlide, translate, _slides, transition, prevDisable, nextDisable } = state;

  const autoPlayRef = useRef<() => void>();
  const transitionRef = useRef<() => void>();
  const resizeRef = useRef<() => void>();
  const sliderRef = useRef<HTMLDivElement>();

  useEffect(() => {
    autoPlayRef.current = nextSlide
    transitionRef.current = smoothTransition
    resizeRef.current = handleResize
  });

  useEffect(() => {
    const slider = sliderRef.current;

    const play = () => {
      autoPlayRef.current!()
    };

    const smooth = e => {
      if (e.target.className.includes('SliderContent')) {
        transitionRef.current!()
      }
    };

    const resize = () => {
      resizeRef.current!()
    };

    slider?.addEventListener('transitionend', smooth);
    window.addEventListener('resize', resize);

    let interval;

    if (props.autoPlay) {
      interval = setInterval(play, props.autoPlay * 1000)
    }

    return () => {
      slider?.removeEventListener('transitionend', smooth);
      window.removeEventListener('resize', resize);

      if (props.autoPlay) {
        clearInterval(interval)
      }
    }
  }, [])

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 })
  }, [transition])

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 })
  }

  const smoothTransition: () => void = () => {
    let _slides: TImage[] = []

    if (activeSlide === slidesGroup - 1)
      _slides = [...slides.slice((slidesGroup - 2) * SLIDE_IMAGE_COUNT, (slidesGroup - 1) * SLIDE_IMAGE_COUNT), ...lastSlide, ...firstSlide]
    else if (activeSlide === 0) _slides = [...lastSlide, ...firstSlide, ...secondSlide]
    else _slides = slides.slice((activeSlide - 1) * SLIDE_IMAGE_COUNT, (activeSlide + 2) * SLIDE_IMAGE_COUNT)

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth()
    })
  }

  const nextSlide: () => void = () => {
    const updateActiveSlide = activeSlide === slidesGroup - 1 ? 0 : activeSlide + 1;
    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: updateActiveSlide,
      prevDisable: updateActiveSlide === 0,
      nextDisable: updateActiveSlide === slidesGroup - 1,
    })
  }

  const prevSlide: () => void = () => {
    const updateActiveSlide = activeSlide === 0 ? slidesGroup - 1 : activeSlide - 1;
    setState({
      ...state,
      translate: 0,
      activeSlide: updateActiveSlide,
      prevDisable: updateActiveSlide === 0,
      nextDisable: updateActiveSlide === slidesGroup - 1,
    })
  }

  return (
    <SSliderWrapper ref={sliderRef}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * Math.ceil(_slides.length / 4)}
      >
        {_slides.map((_slide, i) => (
          <Slide width={getWidth() / SLIDE_IMAGE_COUNT} key={i} content={_slide} />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} disabled={prevDisable}/>
      <Arrow direction="right" handleClick={nextSlide} disabled={nextDisable}/>

      <Dots slideCount={slidesGroup} activeSlide={activeSlide} />
    </SSliderWrapper>
  )
}

export default Slider;
