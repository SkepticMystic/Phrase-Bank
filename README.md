# Phrase-Bank

## Format

Phrase Bank supports two file formats, each with a specific syntax.

### Markdown

Each heading (level 2) represents a section, which can have its own description, keywords, and phrases.
Format it like so:

```md
## Group

> Description 

- Keywords in a, comma separated, list
- Or in more bullet points

One phrase per line

Another phrase
```

### JSON

This is open to change, but we currently use the following format in the `phrasebank.json` file:

```js
{ "section": string, "keywords": string[] "phrases": string[] }[]
```
