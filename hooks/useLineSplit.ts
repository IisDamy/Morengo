export const splitIntoLines = (text:String, maxChars = 30) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    // If adding this word would exceed line length, start new line
    if ((currentLine + ' ' + word).length > maxChars) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      // Add word to current line (with space if not first word)
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  });

  // Add the last line
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};


// Now lines will be:
// ["i am going to the", "store today"] 
// Instead of broken words