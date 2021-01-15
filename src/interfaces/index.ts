export interface IArrow {
    direction: string;
    disabled: boolean;
    handleClick: () => void;
};

export type TImage = {
  title: string;
  images: string[];
};

export interface IDot {
  slideCount: number;
  activeSlide: number;
};

export interface ISlide {
  content: TImage;
  width: number;
};

export interface ISliderContent {
  translate: number;
  transition: number;
  width: number;
  children: JSX.Element[];
};

export interface ISlider {
  slides: TImage[];
  autoPlay?: number;
}