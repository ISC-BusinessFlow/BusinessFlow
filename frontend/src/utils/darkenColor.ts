export const darkenColor = (color: string, diff: number): string => {
  const colorCode = color.slice(1, 7).match(/.{2}/g);
  if (colorCode === null) {
    return '#000000';
  }
  const borderColorCode = colorCode.map((c) => {
    if (parseInt(c, 16) < diff) {
      return '00';
    } else {
      return (parseInt(c, 16) - diff).toString(16).padStart(2, '0');
    }
  });
  return '#' + borderColorCode.join('');
};
