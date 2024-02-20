import seedrandom from 'seedrandom';
import { NoiseFunction3D, createNoise3D } from 'simplex-noise';
import { DiggableBlock, MapCell, VoidBlock } from '../../types/Map.types';
import { DIGGABLES } from '../../helpers/DiggablesBlocks.helper';
import { DIGGABLE_TYPES_ENUM } from '../../types/enums/Cells.enum';
import { VOID } from '../../helpers/VoidBlock.helper';


const generateCaveNoise = (rng: seedrandom.PRNG, size: number, height: number): NoiseFunction3D => {
  const noise3D = createNoise3D(rng);
  const caveDensity = 0.5;
  const caveThreshold = 0.3;

  return (x, y, z) => {
    const scaledX = x / size;
    const scaledY = y / height;
    const scaledZ = z / size;

    const value = noise3D(scaledX, scaledY, scaledZ);

    return value > caveThreshold && value < caveDensity ? 1 : 0;
  };
};

const generateGeologicPattern = (size: number, rng: seedrandom.PRNG): number[] => {
  const patternMap = [];

  let y = 0;
  let weight = 0;

  for (let x = 0; x < size; x++) {
    if (Math.floor(rng() * 10) < weight) {
      y += Math.floor(rng() * 10) / 10 < 0.5 ? 1 : -1;
      weight = 0;
    } else {
      weight += 1;
    }

    patternMap.push(y);
  }

  return patternMap;
};

const generateBaseLayers = (size: number, height: number): MapCell[][][] => {
  const matrixMap: MapCell[][][] = [];

  for (let x = 0; x < size; x++) {
    const row: MapCell[][] = [];
    for (let z = 0; z < size; z++) {
      const column: MapCell[] = [];

      for (let y = 0; y < height; y++) {
        const coordinates = { x, y, z };
        const surface: DiggableBlock = y < height - 4 ? DIGGABLES.STONE_BLOCK : y < height - 1 ? DIGGABLES.DIRT_BLOCK : DIGGABLES.GRASS_BLOCK;

        column.push({ coordinates, surface });
      }

      row.push(column);
    }
    matrixMap.push(row);
  }

  return matrixMap;
};


export const generateMap = (size: number, height: number, seed?: string): { grid: MapCell[][][], seed: string } => {
  const rng = seed ? seedrandom(seed) : seedrandom();
  const gridMatrix: MapCell[][][] = generateBaseLayers(size, height);

  const caveNoise = generateCaveNoise(rng, size, height);

  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      for (let y = 0; y < height - 3; y++) {
        if (caveNoise(x, y, z)) {
          const coordinates = { x, y, z };
          const surface: VoidBlock = VOID.AIR;
          gridMatrix[x][z][y] = {
            coordinates,
            surface,
          };
        }
      }
    }
  }

  const patternMap = generateGeologicPattern(size, rng);
  const stoneBlocks = [DIGGABLES.ANDESITE_BLOCK, DIGGABLES.DIORITE_BLOCK, DIGGABLES.GRANITE_BLOCK, DIGGABLES.STONE_BLOCK, DIGGABLES.MARBLE_BLOCK, DIGGABLES.LIMESTONE_BLOCK];

  for (let y = 0; y < height; y++) {
    const randomBlock: DiggableBlock = stoneBlocks[Math.floor(rng() * stoneBlocks.length)];
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {

        if (gridMatrix[x][z][y + patternMap[x]]) {
          if (gridMatrix[x][z][y + patternMap[x]].surface.type === DIGGABLE_TYPES_ENUM.STONE) {
            gridMatrix[x][z][y + patternMap[x]].surface = randomBlock;
          }
        }
      }
    }
  }

  const generatedSeed = seed || rng.int32().toString();

  return { grid: gridMatrix, seed: generatedSeed };
};