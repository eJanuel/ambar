import * as THREE from "three";

export interface TextureAndColor {
  texture: THREE.Texture;
  color: THREE.Color;
}

const textureLoader = new THREE.TextureLoader()

export const groundTextures: Record<string, TextureAndColor> = {
  Grass: {
    texture: textureLoader.load("/textures/grass.png"),
    color: new THREE.Color("#53e288"),
  },
  Dirt: {
    texture: textureLoader.load("/textures/dirt.png"),
    color: new THREE.Color("#b57a4a"),
  },
  Stone: {
    texture: textureLoader.load("/textures/stone.png"),
    color: new THREE.Color("#cccccc"),
  },
  Granite: {
    texture: textureLoader.load("/textures/granite.png"),
    color: new THREE.Color("#de984e"),
  },
  Andesite: {
    texture: textureLoader.load("/textures/andesite.png"),
    color: new THREE.Color("#808080"),
  },
  Diorite: {
    texture: textureLoader.load("/textures/diorite.png"),
    color: new THREE.Color("#ffffff"),
  },
  Marble: {
    texture: textureLoader.load("/textures/marble.png"),
    color: new THREE.Color("#e6e6e6"),
  },
  Limestone: {
    texture: textureLoader.load("/textures/limestone.png"),
    color: new THREE.Color("#d8ffae"),
  },
  Coal: {
    texture: textureLoader.load("/textures/coal.png"),
    color: new THREE.Color("#cccccc"),
  },
  Iron: {
    texture: textureLoader.load("/textures/iron.png"),
    color: new THREE.Color("#cccccc"),
  },
  Copper: {
    texture: textureLoader.load("/textures/copper.png"),
    color: new THREE.Color("#cccccc"),
  },
  Gold: {
    texture: textureLoader.load("/textures/gold.png"),
    color: new THREE.Color("#cccccc"),
  },
};
