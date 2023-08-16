import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { EditorView } from 'codemirror';

import { codeMirrorExtensions } from '~/lib/codemirror';

interface Props {
  onChangeText(text: string): void;
  defaultValue?: string;
}

const MarkdownEditor = ({ onChangeText, defaultValue }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onChangeTextRef = useRef(onChangeText);

  useEffect(() => {
    onChangeTextRef.current = onChangeText;
  }, [onChangeText]);

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      extensions: [
        ...codeMirrorExtensions,
        EditorView.updateListener.of((update) => {
          onChangeTextRef.current(update.state.doc.toString());
        }),
      ],
      parent: editorRef.current,
      doc: defaultValue,
    });

    return () => {
      view.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorWrapper ref={wrapperRef}>
      <div ref={editorRef} />
    </EditorWrapper>
  );
};

// editor css not preview
const EditorWrapper = styled.div`
  height: 100%;

  .cm-focused {
    outline: none !important;
  }

  .cm-line {
    padding-right: 16px;
    word-break: keep-all;
  }

  .cm-scroller {
    overflow: auto;
  }
`;

export default MarkdownEditor;
