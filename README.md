# SQL Formatter

Beautify and indent SQL queries by inserting newlines before clause keywords, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/developer-tools/sql-formatter

## How It Works

`KEYWORDS` (43 entries) and `CLAUSE_STARTERS` (30 entries including SELECT, FROM, WHERE, JOIN variants, GROUP BY, ORDER BY, HAVING, UNION, etc.) are defined as uppercase arrays sorted by length descending so longer keywords are matched before shorter prefixes. The formatter first uppercases all keywords in the SQL by replacing `(?<!\n)\s+(keyword)(?=\s)` patterns. Then clause-starter keywords trigger a newline before them. Non-clause continuation lines (e.g., column lists after SELECT) are indented with two spaces. The output is trimmed. Minification collapses all whitespace and newlines to single spaces.

## Features

- Newlines before all major SQL clause keywords
- 2-space indent for continuation lines
- Keyword uppercasing
- SQL minification (collapse whitespace)
- Copy output to clipboard

## Browser APIs Used

- Clipboard API (`navigator.clipboard.writeText`)

## Code Structure

| File | Description |
|------|-------------|
| `sql-formatter.js` | `KEYWORDS` (43) + `CLAUSE_STARTERS` (30) arrays sorted by length desc, newline-before-clause regex replacements, continuation-line indent, uppercase normalization |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| SQL input textarea | Raw SQL query input |
| Format button | Beautify with newlines and indentation |
| Minify button | Collapse to single line |
| Output textarea | Formatted/minified SQL |
| Copy button | Copy output to clipboard |
| Clear button | Reset both fields |

## License

MIT
