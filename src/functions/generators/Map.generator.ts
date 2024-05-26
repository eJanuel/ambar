import seedrandom from 'seedrandom';

import OctreeMap from '../classes/OctreeMap.class';
import { DIGGABLES } from '../../helpers/game/DiggablesBlocks.helper';
import { DiggableBlock, MapCell } from '../../types/Map.types';
import { DIGGABLE_TYPES_ENUM } from '../../types/enums/Cells.enum';

export const generateMap = (size: number, height: number, seed?: string): { map: OctreeMap, generatedSeed: string } => {
  const rng = seed ? seedrandom(seed) : seedrandom();
  const map = new OctreeMap(height, size);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const coordinates = { x, y, z };
        const surface: DiggableBlock = y < height - 4 ? DIGGABLES.STONE_BLOCK : y < height - 1 ? DIGGABLES.DIRT_BLOCK : DIGGABLES.GRASS_BLOCK;
        const cell: MapCell = { coordinates, surface };

        map.add(cell, cell.coordinates);
      }
    }
  }

  const stoneBlocks = [DIGGABLES.ANDESITE_BLOCK, DIGGABLES.DIORITE_BLOCK, DIGGABLES.GRANITE_BLOCK, DIGGABLES.STONE_BLOCK, DIGGABLES.MARBLE_BLOCK, DIGGABLES.LIMESTONE_BLOCK];

  for (let y = 1; y <= height; y++) {
    const randomBlock: DiggableBlock = stoneBlocks[Math.floor(rng() * stoneBlocks.length)];
    for (let x = 1; x <= size; x++) {
      for (let z = 1; z <= size; z++) {
        const coordinates = { x, y, z };
        const cells = map.get(coordinates);
        if (cells) {
          for (const cell of cells) {
            if (cell.surface.type === DIGGABLE_TYPES_ENUM.STONE) {
              cell.surface = randomBlock;
            }
          }
        }
      }
    }
  }

  const generatedSeed = seed || rng.int32().toString();

  return { map, generatedSeed };
};