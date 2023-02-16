import { EditorView } from 'codemirror';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import { codeMirrorExtensions } from '~/lib/codemirror';
import { css } from '@emotion/react';

interface Props {
  onChangeText(text: string): void;
  defaultValue?: string;
}

const MarkdownEditor = ({ onChangeText, defaultValue }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onChangeTextRef = useRef(onChangeText);

  useEffect(() => {
    onChangeTextRef.current = onChangeText;
  }, [onChangeText]);

  useEffect(() => {
    if (editorRef.current) {
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

      setReady(true);

      setHeight(wrapperRef.current?.clientHeight || 0);
      const onResize = () => {
        setHeight(wrapperRef.current?.clientHeight || 0);
      };

      window.addEventListener('resize', onResize);

      return () => {
        setReady(false);
        view.destroy();
        window.removeEventListener('resize', onResize);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorWrapper ref={wrapperRef} isVisible={ready} $height={height}>
      <div ref={editorRef} />
    </EditorWrapper>
  );
};

const EditorWrapper = styled.div<{
  isVisible: boolean;
  $height: number;
}>`
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  outline: none;
  min-height: 150px;
  ${(props) =>
    props.isVisible
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}

  .cm-content, .cm-gutter {
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
    height: ${(props) => props.$height}px;
    ${mediaQuery.mobile} {
      height: auto;
      max-height: calc(100vh - 374px);
    }
  }
`;

export default MarkdownEditor;
