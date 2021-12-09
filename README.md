# Phrase-Bank

## Format

PhraseBank requires a specifc syntax to be used, so that it can parse and display the results.

Each heading (level 3) represents a phrase type, which can have its own description, keywords, groups, and phrases.
Formatted like so:

```md
### Phrase Type

! Group1, Group2

> Description 

- Keywords in a, comma separated, list
- Or in more bullet points

One phrase per line

Another phrase
```

A `group` is a higher-level _grouping_ of different phrase types. It is like a folder for different phrase types, which are themselves subfolders for various phrases.

This approaching to grouping is bottom-up, meaning each phrase type can belong to multiple groups.
