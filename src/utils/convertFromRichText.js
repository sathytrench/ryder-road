const convertBold = (string) => {
  const regexp1 = /(?<!\\)[*]{2}/g;
  const regexp2 = /(?<!\\)[_]{2}/g;

  let isOpeningTag = true;

  const replacer = () => {
    if (isOpeningTag){
      isOpeningTag = false;
    	return '<b>';
    } else {
      isOpeningTag = true;
      return '</b>';
    }
  };

  return string.replace(regexp1, replacer).replace(regexp2, replacer);
}

const convertItalic = (string) => {
  const regexp1 = /(?<!\\)(?<!\*)\*(?!\*)/g;
  const regexp2 = /(?<!\\)(?<!_)_(?!_)/g;

  let isOpeningTag = true;

  const replacer = () => {
    if (isOpeningTag){
      isOpeningTag = false;
      return '<i>';
    } else {
      isOpeningTag = true;
      return '</i>';
    }
  };

  return string.replace(regexp1, replacer).replace(regexp2, replacer);
}

const convertLineBreaks = (string) => {
  const regexp = /(\n)+/g

  return string.replace(regexp, '<br /><br />');
}

const convertFromRichText = (richTextString) => {
  if (richTextString) {
    return convertBold(convertItalic(convertLineBreaks(richTextString)));
  } else {
    return null;
  }
}

export { convertFromRichText };

// Headings: A line that starts with one to three #  characters,
// followed by one whitespace character,
// will result in a first-level to third-level heading.

// Checkbox: Starting a line with “[ ]” or “[x]” will begin a checkbox list.

// Unordered List: You can use either -or *as an unordered list marker.

// Ordered List: Starting a line with a number and a period will automatically convert to a list.

// Hyperlinks: There are two types of links, inline and reference :
// An inline link has the form of [Link text](link URL), where the URL is specified inline.
// A reference link has the form of [Link Text][Label Name], where the label references a link definition.
// A link definition is a line with the form [Label name]: URL. It can be placed anywhere in the text
// and will be removed when converted to rich text cell value.

// Blockquotes: A blockquote is a line that starts with > and then followed by the quote content.
// This is not supported in the base description.

// Inline Code: Text surrounded by a ` pair will be formatted as inline code (with monospace typeface).

// Code Blocks: A code block is one or more lines of code surrounded by code fences.
// A code fence is a line that is a sequence of at least 3 consecutive backticks (`) or tildes (~).
// The closing code fence must be the same type as the opening code fence (backticks or tildes),
// and with at least as many characters as the opening fence sequence.
// The line with the opening code fence may optionally contain some text following the code fence.
// This is called the info string. Some Markdown implementations use this string for code block syntax highlighting.
// Airtable currently does not utilize the info string and it will be discarded when converting Markdown text to rich text cell value.

// Escaping Markdown formatting: You can use backslash ( \) before any Markdown syntax character to escape the formatting.

// Multiple Line Breaks: We support using the <br>HTML tag while sending emails that require multiple line breaks.
// implicitly done!