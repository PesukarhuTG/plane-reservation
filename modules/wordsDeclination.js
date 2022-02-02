const declination = (num) => {
  if (num === 1) return 'место';
  if (num > 1 && num < 5) return 'места';
  if (num > 4 && num < 7) return 'мест';
}

export default declination;