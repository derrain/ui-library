export interface CardProps {
  title?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageMode?: 'square' | 'landscape';
  clampLines?: number;
  isClickable?: boolean;
  clickEvent?: (...args: any[]) => void;
  isLink?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  rel?: string;
  contentPadding?: string;
}