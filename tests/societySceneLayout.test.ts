import { describe, it, expect, beforeAll, vi } from 'vitest';
import * as THREE from 'three';
import { createSocietyScene } from '../src/components/world/societyScene';
import { createLitterScatter } from '../src/components/world/litterScatter';
import { GAME_ITEMS } from '../src/data/items';

// jsdom has no canvas 2D backend — stub it so scene sign textures can build.
// Gradient/pattern factories must return something with addColorStop().
beforeAll(() => {
  const ctxStub = new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === 'measureText') return () => ({ width: 0 });
        if (typeof prop === 'string' && prop.startsWith('create')) {
          return () => ({ addColorStop: () => undefined });
        }
        return () => undefined;
      },
      set: () => true,
    }
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
    () => ctxStub as unknown as CanvasRenderingContext2D
  );
});

// Player movement bounds for the society scene (WorldCanvas)
const BOUNDS = { minX: -11, maxX: 11, minZ: -9, maxZ: 7 };

function distToRow(x: number, z: number, row: THREE.Vector3) {
  return Math.hypot(x - row.x, z - row.z);
}

describe('Bench placement', () => {
  it('stays on the right side of the park, near the tree, facing the open centre', () => {
    const society = createSocietyScene();
    const bench = society.obstacles.find((o) => o.id === 'bench');
    expect(bench).toBeDefined();

    // Right side of the compound (tree stands at x = 8.5, z = -1)
    const cx = (bench!.minX + bench!.maxX) / 2;
    expect(cx).toBeGreaterThan(5);
    expect(cx).toBeLessThan(9);

    // Rotated: the long axis now runs along Z, so the seat faces -X (the centre)
    const widthX = bench!.maxX - bench!.minX;
    const depthZ = bench!.maxZ - bench!.minZ;
    expect(widthX).toBeLessThan(1.2);
    expect(depthZ).toBeGreaterThan(1.8);
  });

  it('keeps the bench clear of the hidden spots behind and beside it', () => {
    const society = createSocietyScene();
    const bench = society.obstacles.find((o) => o.id === 'bench')!;
    const touches = (p: THREE.Vector3) =>
      p.x > bench.minX && p.x < bench.maxX && p.z > bench.minZ && p.z < bench.maxZ;

    society.hiddenSpawnPoints.forEach((p) => expect(touches(p)).toBe(false));
    society.pinnedLitterSpots.forEach((s) => expect(touches(s.position)).toBe(false));
  });
});

describe('Information board placement', () => {
  it('sits beside the waste station, not in front of the bins', () => {
    const society = createSocietyScene();
    const board = society.obstacles.find((o) => o.id === 'info_board');
    expect(board).toBeDefined();

    const cx = (board!.minX + board!.maxX) / 2;
    const cz = (board!.minZ + board!.maxZ) / 2;
    const row = society.binRowCenter;

    // Beside: beyond the bin row / platform span (±5), not blocking the bins
    expect(Math.abs(cx)).toBeGreaterThan(5);
    // At the station's depth, not out in front of it
    expect(Math.abs(cz - row.z)).toBeLessThan(1);
    // Thin front-to-back footprint
    expect(board!.maxZ - board!.minZ).toBeLessThan(1);
    // Never overlaps the bins themselves
    const binObstacles = society.obstacles.filter((o) => o.id.startsWith('bin_'));
    expect(binObstacles.length).toBeGreaterThan(0);
    binObstacles.forEach((bin) => {
      const overlaps =
        board!.maxX > bin.minX && board!.minX < bin.maxX &&
        board!.maxZ > bin.minZ && board!.minZ < bin.maxZ;
      expect(overlaps).toBe(false);
    });
  });

  it('turns the readable sign toward the entrance (+Z)', () => {
    const society = createSocietyScene();
    const signs: THREE.Mesh[] = [];
    society.societyGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry.type === 'PlaneGeometry') {
        const { width, height } = (child.geometry as THREE.PlaneGeometry).parameters;
        if (Math.abs(width - 1.6) < 0.01 && Math.abs(height - 1.0) < 0.01) signs.push(child);
      }
    });

    expect(signs).toHaveLength(1);
    const normal = new THREE.Vector3(0, 0, 1)
      .applyQuaternion(signs[0].getWorldQuaternion(new THREE.Quaternion()));
    expect(normal.z).toBeGreaterThan(0.9);
  });
});

describe('Waste object placement', () => {
  it('authors a banana peel on the path, a bottle by the bench, a box far from the bins', () => {
    const society = createSocietyScene();
    const pinned = society.pinnedLitterSpots;
    expect(pinned.map((s) => s.itemId).sort()).toEqual(
      ['banana_peel', 'plastic_bottle_water', 'soiled_cardboard'].sort()
    );

    // Every pinned id must exist in the item database (so the pool can resolve it)
    pinned.forEach((s) => expect(GAME_ITEMS.some((i) => i.id === s.itemId)).toBe(true));

    // Banana peel: on the central path near the gate
    const banana = pinned.find((s) => s.itemId === 'banana_peel')!;
    expect(banana.position.z).toBeGreaterThan(4);
    expect(Math.abs(banana.position.x)).toBeLessThan(3);

    // Bottle: close to the bench footprint
    const bench = society.obstacles.find((o) => o.id === 'bench')!;
    const bottle = pinned.find((s) => s.itemId === 'plastic_bottle_water')!;
    const dx = Math.max(bench.minX - bottle.position.x, 0, bottle.position.x - bench.maxX);
    const dz = Math.max(bench.minZ - bottle.position.z, 0, bottle.position.z - bench.maxZ);
    expect(Math.hypot(dx, dz)).toBeLessThan(2);

    // Cardboard box: far from the bin row
    const box = pinned.find((s) => s.itemId === 'soiled_cardboard')!;
    expect(distToRow(box.position.x, box.position.z, society.binRowCenter)).toBeGreaterThan(7);
  });

  it('spreads litter in groups: some by the bins, some far out in the park', () => {
    const society = createSocietyScene();
    const row = society.binRowCenter;

    expect(society.litterSpawnPoints).toHaveLength(6);
    expect(society.hiddenSpawnPoints).toHaveLength(3);
    expect(society.pinnedLitterSpots).toHaveLength(3);

    const all = [
      ...society.litterSpawnPoints,
      ...society.hiddenSpawnPoints,
      ...society.pinnedLitterSpots.map((s) => s.position),
    ];
    // Matches the level 1 target count
    expect(all).toHaveLength(12);

    // Every spot must be reachable inside the player movement bounds
    all.forEach((p) => {
      expect(p.x).toBeGreaterThanOrEqual(BOUNDS.minX);
      expect(p.x).toBeLessThanOrEqual(BOUNDS.maxX);
      expect(p.z).toBeGreaterThanOrEqual(BOUNDS.minZ);
      expect(p.z).toBeLessThanOrEqual(BOUNDS.maxZ);
    });

    // Close enough to the bins to collect and sort without a trek
    const nearBins = all.filter((p) => distToRow(p.x, p.z, row) < 3.5);
    expect(nearBins.length).toBeGreaterThanOrEqual(2);

    // ...and a real scatter across the open park
    const farFromBins = all.filter((p) => distToRow(p.x, p.z, row) > 7);
    expect(farFromBins.length).toBeGreaterThanOrEqual(3);
  });
});

describe('createLitterScatter pinned spots', () => {
  it('places pinned item types at their authored positions', () => {
    const parent = new THREE.Group();
    const pool = GAME_ITEMS.filter((i) =>
      ['wet', 'dry', 'hazardous', 'residual'].includes(i.bin)
    );
    const pinned = [
      { position: new THREE.Vector3(4, 0.05, 4), itemId: 'banana_peel' },
      { position: new THREE.Vector3(5, 0.05, 5), itemId: 'plastic_bottle_water' },
    ];

    const system = createLitterScatter(
      pool,
      [new THREE.Vector3(1, 0.05, 1), new THREE.Vector3(2, 0.05, 2)],
      [new THREE.Vector3(3, 0.05, 3)],
      parent,
      5,
      pinned
    );

    expect(system.items).toHaveLength(5);

    const banana = system.items.find((i) => i.itemData.id === 'banana_peel');
    expect(banana).toBeDefined();
    expect(banana!.position.equals(pinned[0].position)).toBe(true);
    expect(banana!.isHidden).toBe(false);

    const bottle = system.items.find((i) => i.itemData.id === 'plastic_bottle_water');
    expect(bottle).toBeDefined();
    expect(bottle!.position.equals(pinned[1].position)).toBe(true);

    // Hidden count still honoured: 1 hidden point → 1 hidden item
    expect(system.items.filter((i) => i.isHidden)).toHaveLength(1);

    system.dispose();
    expect(parent.children).toHaveLength(0);
  });

  it('skips unknown pinned ids instead of throwing', () => {
    const parent = new THREE.Group();
    const pool = GAME_ITEMS.filter((i) =>
      ['wet', 'dry', 'hazardous', 'residual'].includes(i.bin)
    );

    const system = createLitterScatter(
      pool,
      [new THREE.Vector3(1, 0.05, 1), new THREE.Vector3(2, 0.05, 2)],
      [new THREE.Vector3(3, 0.05, 3)],
      parent,
      3,
      [{ position: new THREE.Vector3(4, 0.05, 4), itemId: 'not_a_real_item' }]
    );

    expect(system.items).toHaveLength(3);
    expect(system.items.every((i) => i.itemData.id !== 'not_a_real_item')).toBe(true);
    system.dispose();
  });
});
