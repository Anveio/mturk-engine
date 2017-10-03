import { EDIT_BONUS } from '../constants';

export interface EditBonus {
  readonly type: EDIT_BONUS;
  readonly id: string;
  readonly bonus: number;
}

export const editBonus = (id: string, bonus: number): EditBonus => ({
  type: EDIT_BONUS,
  id,
  bonus
});
