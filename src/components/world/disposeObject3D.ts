import * as THREE from 'three';
import { isCachedItemTexture } from './items/textures/proceduralTextures';

/**
 * Frees every geometry, material, and non-shared texture below `root`.
 * Cached procedural textures (see proceduralTextures.ts) are skipped so they
 * stay valid for the next scene that reuses them.
 *
 * Safe to call twice — `dispose()` is idempotent.
 */
export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((child) => {
    if (
      !(child instanceof THREE.Mesh) &&
      !(child instanceof THREE.Points) &&
      !(child instanceof THREE.Line)
    ) {
      return;
    }
    child.geometry?.dispose();
    const materials = Array.isArray(child.material)
      ? child.material
      : child.material
        ? [child.material]
        : [];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture && !isCachedItemTexture(value)) {
          value.dispose();
        }
      }
      material.dispose();
    }
  });
}
