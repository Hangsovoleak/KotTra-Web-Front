import test from 'node:test';
import assert from 'node:assert/strict';
import { app, analytics } from './firebase.js';

test('firebase module exports an initialized app and analytics handle', () => {
  assert.ok(app, 'expected firebase app to be initialized');
  assert.ok(app.options, 'expected firebase app options to be available');
  assert.ok(analytics === null || analytics, 'expected analytics export to be available');
});
