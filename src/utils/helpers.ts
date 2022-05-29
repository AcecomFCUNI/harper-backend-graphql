const toTitleCase = (str: string) =>
  str
    .split(' ')
    .map(s => `${s[0].toLocaleUpperCase()}${s.slice(1)}`)
    .join(' ')

export { toTitleCase }
