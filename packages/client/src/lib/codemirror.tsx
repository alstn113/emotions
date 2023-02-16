import { markdown } from '@codemirror/lang-markdown';
import { keymap } from '@codemirror/view';
import { EditorView, minimalSetup } from 'codemirror';
import { indentWithTab } from '@codemirror/commands';
import { palette } from './styles';

// const customTheme = EditorView.theme({
//   // paper
//   '&': {
//     fontSize: '16px',
//     paddingLeft: '48px',
//     paddingRight: '48px',
//     cursor: 'text',
//   },
//   '.cm-content': {
//     fontFamily: 'Roboto, sans-serif',
//   },
//   // # [] () ** __ ~~
//   '.ͼ5': {
//     color: '#4c6ef5',
//   },
//   // headers
//   '.ͼ7': {
//     textDecoration: 'none',
//   },
//   // link
//   '.ͼc': {
//     color: '#4c6ef5',
//   },
// });

const customTheme = EditorView.theme(
  {
    '&': {
      color: 'white',
      backgroundColor: '#034',
    },
    '.cm-content': {
      caretColor: '#0e9',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#074',
    },
    '.cm-gutters': {
      backgroundColor: '#045',
      color: '#ddd',
      border: 'none',
    },
  },
  { dark: true },
);

export const codeMirrorExtensions = [
  minimalSetup,
  markdown(),
  customTheme,
  keymap.of([indentWithTab]),
  EditorView.lineWrapping,
];
