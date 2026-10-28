import test from 'node:test'
import assert from 'node:assert/strict'
import { project, shouldClose } from './sheet.js'

test('project grows with velocity and is zero at rest', () => {
  assert.equal(project(0), 0)
  assert.ok(project(1000) > project(500))
})

test('a slow short drag snaps back, a long drag closes', () => {
  assert.equal(shouldClose(40, 0, 600), false)
  assert.equal(shouldClose(400, 0, 600), true)
})

test('a short fast flick down closes, a flick up keeps it open', () => {
  assert.equal(shouldClose(40, 900, 600), true)
  assert.equal(shouldClose(250, -900, 600), false)
})
