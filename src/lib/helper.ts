import type { ITile, OpenGraphType, Tiles } from '@/types';

export const insertFreeTile = (arr: Tiles, index: number, freeTile: ITile) => [
  ...arr.slice(0, index),
  freeTile,
  ...arr.slice(index),
];

export const shuffleTiles = (arr: Tiles): Tiles => {
  let totalTiles = arr.length,
    randomIndex,
    tempTile;

  while (totalTiles) {
    randomIndex = Math.floor(Math.random() * totalTiles);

    totalTiles--;

    tempTile = arr[totalTiles];
    arr[totalTiles] = arr[randomIndex];
    arr[randomIndex] = tempTile;
  }

  return arr.map((el) => {
    el.isChecked = false;
    el.isPreviousWin = false;
    return el;
  });
};

export const updatePreviousWinsAndSelectedTiles = (
  previousWins: Array<number[]>,
  updatedTile: ITile,
  playerSelectedTiles: number[]
) => {
  let updatePreviousWins = [];
  let updatedPlayerSelectedTiles = [...playerSelectedTiles];
  updatePreviousWins = previousWins
    .map((win) => {
      if (win.includes(updatedTile.id)) {
        updatedPlayerSelectedTiles = Array.from(
          new Set([...updatedPlayerSelectedTiles, ...win])
        );
        return [];
      }
      return win;
    })
    .filter((el) => el && el.length);

  if (updatedPlayerSelectedTiles.indexOf(updatedTile.id) > -1) {
    updatedPlayerSelectedTiles.splice(
      updatedPlayerSelectedTiles.indexOf(updatedTile.id),
      1
    );
  }

  return { updatePreviousWins, updatedPlayerSelectedTiles };
};

export const generatePossibleWinningCombinations = (
  arr: Tiles
): Array<number[]> => {
  let allCombinations: Array<number[]> = [];

  const [firstRow, secondRow, thirdRow, fourthRow, fifthRow] = arr.reduce(
    (all: Array<number[]>, one, i) => {
      const ch = Math.floor(i / 5);
      const tempArr: number[] = [];
      all[ch] = tempArr.concat(all[ch] || [], one.id);
      return all;
    },
    []
  );

  for (let index = 0; index <= 4; index++) {
    const columnsValidRows = [
      firstRow[index],
      secondRow[index],
      thirdRow[index],
      fourthRow[index],
      fifthRow[index],
    ];
    allCombinations = [...allCombinations, columnsValidRows];
  }

  const diagonalValidRows: number[] = [
    firstRow[0],
    secondRow[1],
    thirdRow[2],
    fourthRow[3],
    fifthRow[4],
  ];
  const reverseDiagonalValidRows: number[] = [
    firstRow[4],
    secondRow[3],
    thirdRow[2],
    fourthRow[1],
    fifthRow[0],
  ];

  allCombinations = [
    ...allCombinations,
    diagonalValidRows,
    reverseDiagonalValidRows,
    firstRow,
    secondRow,
    thirdRow,
    fourthRow,
    fifthRow,
  ];
  return allCombinations;
};

export function openGraph({
  siteName,
  templateTitle,
  description,
  logo = 'https://work-from-home.rrazvan.dev/favicon/ms-icon-310x310.png',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://og.thcl.dev/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}
