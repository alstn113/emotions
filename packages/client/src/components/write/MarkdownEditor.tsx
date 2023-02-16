import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
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
  .cm-content,
  .cm-gutter {
    min-height: 150px;
  }
  .cm-gutters {
    margin: 1px;
  }
  .cm-scroller {
    overflow: auto;
  }
  .cm-wrap {
    border: 1px solid silver;
  }

  .cm-focused {
    outline: none !important;
  }

  .cm-line {
    padding-right: 16px;
    word-break: keep-all;
  }

  .cm-scroller {
    overflow: 'auto';
  }

  .cm-editor {
  }
`;

export default MarkdownEditor;
