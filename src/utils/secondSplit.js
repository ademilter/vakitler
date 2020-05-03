export const secondSplit = (second) => {
  let pad = (x) => {
    return x < 10 ? '0' + x : x
  }
  return [
    pad(Math.floor(second / 3600)),
    pad(Math.floor((second % 3600) / 60)),
    pad(Math.floor(second % 60))
  ]
}
