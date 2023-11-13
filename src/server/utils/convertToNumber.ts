export const convertKStringToNumber = (str: string) => {
  // Check if the last character of the string is 'k'
  if (str.toLowerCase().endsWith('k')) {
    // Remove the 'k' and parse the remaining part of the string as a number
    const numberWithoutK = parseFloat(str.slice(0, -1))
    // Multiply by 1000 since 'k' stands for kilo (thousand)
    return numberWithoutK * 1000
  } else {
    // If there's no 'k', parse the string as a regular number
    return parseFloat(str)
  }
}
