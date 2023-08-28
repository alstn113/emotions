import { useEffect, useState } from 'react';

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
};

const isBrowser = Boolean(
  typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement,
);

const usePortal = (selectId: string): HTMLElement | null => {
  const id = `${selectId}`;

  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(
    isBrowser ? createElement(id) : null,
  );

  useEffect(() => {
    const parentElement = document.body;
    const hasElement = parentElement?.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement ?? createElement(id);

    if (!hasElement) {
      parentElement.appendChild(el);
    }

    setElSnapshot(el);

    return () => {
      if (el.parentElement) {
        el.parentElement.removeChild(el);
      }
    };
    // Id가 변경될 일이 없으므로 빈 배열을 넣어준다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return elSnapshot;
};

export default usePortal;
