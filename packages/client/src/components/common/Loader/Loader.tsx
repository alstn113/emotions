import { NormalColorType } from '~/lib/styles';
import * as S from './Loader.styles';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: NormalColorType;
}

const Loader = ({ size = 'md', color = 'primary' }: LoaderProps) => {
  return (
    <S.Container size={size}>
      {[0, 0.1, 0.2, 0.3, 0.4].map((number) => (
        <S.Bar key={number} color={color} delay={number} />
      ))}
    </S.Container>
  );
};

export default Loader;
