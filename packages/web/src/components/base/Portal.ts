import { createPortal } from 'react-dom';

import usePortal from '~/hooks/usePortal';

interface PortalProps {
  children: React.ReactNode;
  id: string;
}

const Portal = ({ children, id }: PortalProps) => {
  const targetElement = usePortal(id);

  if (!targetElement) return null;

  return createPortal(children, targetElement);
};

export default Portal;
