import type { ComputedRef, InjectionKey } from "vue";
import type { ButtonProps } from "~~/src/types/button";

export type CardClickMode = 'none' | 'card' | 'button';

export interface CardGroupContext {
  clampLines: ComputedRef<number>;
  clickMode: ComputedRef<CardClickMode>;
  buttonText: ComputedRef<string>;
  buttonProps: ComputedRef<Partial<ButtonProps> | undefined>;
}

export const CARD_GROUP_KEY: InjectionKey<CardGroupContext> = Symbol('NuedCardGroup') as any;