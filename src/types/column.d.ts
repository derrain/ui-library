export type ColumnSize = '1/5' | '1/4' | '1/3' | '1/2' | '1' | 'onefifth' | 'onefourth' | 'onethird' | 'half' | 'full';

export interface ColumnProps {
  colSize?: ColumnSize;
}