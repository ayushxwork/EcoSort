import { describe, it, expect, afterEach } from 'vitest';
import * as THREE from 'three';
import { createLocomotionEngine, isTypingTarget, LocomotionEngine } from '../src/components/world/locomotion';
import { PlayerCharacter } from '../src/components/world/playerCharacter';

function makePlayer(): PlayerCharacter {
  return {
    group: new THREE.Group(),
    celebrate: vi.fn(),
    setFacingAngle: vi.fn(),
    updateAnimation: vi.fn(),
  } as unknown as PlayerCharacter;
}

let engine: LocomotionEngine | null = null;

afterEach(() => {
  engine?.dispose();
  engine = null;
  document.body.innerHTML = '';
});

describe('Typing guard (Ask Eco chat must not move Kai)', () => {
  it('detects text fields as typing targets', () => {
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const div = document.createElement('div');
    const editable = document.createElement('div');
    editable.setAttribute('contenteditable', 'true');

    expect(isTypingTarget(input)).toBe(true);
    expect(isTypingTarget(textarea)).toBe(true);
    expect(isTypingTarget(editable)).toBe(true);
    expect(isTypingTarget(div)).toBe(false);
    expect(isTypingTarget(document.body)).toBe(false);
    expect(isTypingTarget(null)).toBe(false);

    const notEditable = document.createElement('div');
    notEditable.setAttribute('contenteditable', 'false');
    expect(isTypingTarget(notEditable)).toBe(false);
  });

  it('ignores movement keys pressed while a text field has focus', () => {
    engine = createLocomotionEngine(makePlayer(), []);
    const startZ = engine.getPosition().z;

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    expect(document.activeElement).toBe(input);

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'w', bubbles: true }));
    engine.update(0.1, 0);

    expect(engine.getPosition().z).toBe(startZ);
    expect(engine.isMoving).toBe(false);
  });

  it('still walks when no field has focus', () => {
    engine = createLocomotionEngine(makePlayer(), []);
    const startZ = engine.getPosition().z;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    engine.update(0.1, 0);

    expect(engine.getPosition().z).toBeLessThan(startZ);
    expect(engine.isMoving).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' }));
  });

  it('stops mid-stride when focus moves into a text field while a key is held', () => {
    engine = createLocomotionEngine(makePlayer(), []);
    const startZ = engine.getPosition().z;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    engine.update(0.1, 0);
    expect(engine.getPosition().z).toBeLessThan(startZ);

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const zAfterFocus = engine.getPosition().z;
    engine.update(0.1, 0);
    engine.update(0.1, 0);

    expect(engine.getPosition().z).toBe(zAfterFocus);
    expect(engine.isMoving).toBe(false);
  });
});
