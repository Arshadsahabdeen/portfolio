// Apple's momentum projection (Designing Fluid Interfaces): where a flick would come to rest.
export function project(velocity, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

// Close when the drag, carried forward by its momentum, lands past half the sheet.
export function shouldClose(offset, velocity, height) {
  return offset + project(velocity) > height / 2
}
