/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 01 2021
 * @ Time: 11:53
 */

export interface ITile {
  message: string;
  id: number;
  isChecked?: boolean;
  isPreviousWin?: boolean;
}

export type Tiles = ITile[];

export type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
