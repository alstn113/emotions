import { markdown } from '@codemirror/lang-markdown';
import { keymap } from '@codemirror/view';
import { EditorView, minimalSetup } from 'codemirror';
import { indentWithTab } from '@codemirror/commands';

const customTheme = EditorView.theme({
  // paper
  '&': {
    fontSize: '16px',
    paddingLeft: '48px',
    paddingRight: '48px',
    cursor: 'text',
  },
  // cursor
  '&.cm-focused .cm-cursor': {
    border: '1.5px solid #4c6ef5',
  },
  // selection
  '.cm-content': {
    fontFamily: 'Roboto, sans-serif',
  },
  // # [] () ** __ ~~
  '.ͼ5': {
    color: '#4c6ef5',
  },
  // headers
  '.ͼ7': {
    textDecoration: 'none',
  },
  // link
  '.ͼc': {
    color: '#4c6ef5',
  },
});

export const codeMirrorExtensions = [
  minimalSetup,
  markdown(),
  customTheme,
  keymap.of([indentWithTab]),
  EditorView.lineWrapping,
];
