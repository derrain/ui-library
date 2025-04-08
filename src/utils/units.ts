export function generateMarginStyles({ margin }: { margin?: string }): Record<string, string> {
  const styles: Record<string, string> = {};

  if (!margin || typeof margin !== 'string') {
    return styles;
  }

  const parts = margin.trim().split(/\s+/).filter(part => part !== '');
  const numericParts = parts.map(part => parseFloat(part));

  if (numericParts.some(isNaN) || numericParts.length === 0 || numericParts.length > 4) {
    if (numericParts.length > 0) {
      console.warn(`Invalid margin value provided: "${margin}". Ensure values are numeric and between 1 and 4 values are given.`);
    }

    return styles;
  }

  const values = numericParts.map(num => `${num}rem`);

  switch (values.length) {
    case 1:
      styles['margin'] = values[0];
      break;
    case 2:
      styles['marginTop'] = values[0];
      styles['marginRight'] = values[1];
      styles['marginBottom'] = values[0];
      styles['marginLeft'] = values[1];
      break;
    case 3:
      styles['marginTop'] = values[0];
      styles['marginRight'] = values[1];
      styles['marginBottom'] = values[2];
      styles['marginLeft'] = values[1];
      break;
    case 4:
      styles['marginTop'] = values[0];
      styles['marginRight'] = values[1];
      styles['marginBottom'] = values[2];
      styles['marginLeft'] = values[3];
      break;
  }

  return styles;
}