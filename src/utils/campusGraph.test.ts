import test from 'node:test';
import assert from 'node:assert/strict';
import { findShortestCampusPath } from './campusGraph';

test('finds shortest walking route from Main Gate to Innovation Lab', () => {
  const result = findShortestCampusPath('main-gate', 'innovation-lab');
  assert.equal(result.found, true);
  // main-gate -> green-garden (140) -> knowledge-tower (110) -> central-library (85) -> innovation-lab (75) = 410
  // vs main-gate -> knowledge-tower (220) -> innovation-lab (130) = 350
  assert.equal(result.totalDistanceMeters, 350);
  assert.deepEqual(result.pathIds, ['main-gate', 'knowledge-tower', 'innovation-lab']);
  assert.equal(result.estimatedMinutes, 5);
  assert.equal(result.hops.length, 2);
});

test('returns zero distance when source equals destination', () => {
  const result = findShortestCampusPath('central-library', 'central-library');
  assert.equal(result.found, true);
  assert.equal(result.totalDistanceMeters, 0);
  assert.equal(result.estimatedMinutes, 0);
  assert.deepEqual(result.pathIds, ['central-library']);
});

test('returns found=false for unknown location IDs', () => {
  const result = findShortestCampusPath('main-gate', 'unknown-building');
  assert.equal(result.found, false);
  assert.equal(result.pathIds.length, 0);
});
