import { describe, it, expect, beforeAll, vi } from 'vitest';
import * as THREE from 'three';
import { createSocietyScene } from '../src/components/world/societyScene';

// Society spawn point used by WorldCanvas when a level starts
const SOCIETY_SPAWN = new THREE.Vector3(0, 0, 4);

// jsdom has no canvas 2D backend — stub it so scene textures can build
beforeAll(() => {
  const ctxStub = new Proxy(
    {},
    {
      get: (_target, prop) => (prop === 'measureText' ? () => ({ width: 0 }) : () => undefined),
      set: () => true,
    }
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
    () => ctxStub as unknown as CanvasRenderingContext2D
  );
});

describe('Society Scene spawn facing', () => {
  it('exposes a bin row centre that matches the bin triggers', () => {
    const society = createSocietyScene();

    const centers = new THREE.Vector3();
    let count = 0;
    society.binTriggers.forEach((mesh) => {
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);
      centers.add(worldPos);
      count += 1;
    });

    expect(count).toBeGreaterThan(0);
    centers.divideScalar(count);
    // Compare on the ground plane (XZ) — triggers sit above the floor
    centers.y = 0;
    expect(society.binRowCenter.clone().setY(0).distanceTo(centers)).toBeLessThan(0.5);
  });

  it('spawns facing the dustbins (toward -Z, the bin row)', () => {
    const society = createSocietyScene();

    // Locomotion angle convention: 0 = +Z, π = -Z
    const spawnFacing = Math.atan2(
      society.binRowCenter.x - SOCIETY_SPAWN.x,
      society.binRowCenter.z - SOCIETY_SPAWN.z
    );

    expect(Math.abs(spawnFacing - Math.PI)).toBeLessThan(0.3);
  });
});
