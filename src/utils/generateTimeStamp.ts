const generateTimeStamp = (time: number): string => {
  // TODO: handle more than minute timer
  const minute = Math.floor(time / 60)
  const second = Math.floor(time - minute * 60)
  return `${minute > 9 ? minute : `0${minute}`}:${
    second > 9 ? second : `0${second}`
  }`
}

export default generateTimeStamp
