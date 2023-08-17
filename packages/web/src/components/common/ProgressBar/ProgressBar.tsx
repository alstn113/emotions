import * as S from './ProgressBar.styles';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percent?: number;
  animation: 'play' | 'done' | 'pending' | 'unset';
  duration?: `${number}s`;
}

const ProgressBar = ({
  percent = 0,
  animation = 'unset',
  duration = '0s',
  ...props
}: ProgressBarProps) => {
  return (
    <S.Container {...props} status={animation}>
      <S.Percent
        style={{
          width: `${percent}%`,
          animationDuration: animation === 'play' ? duration : '',
        }}
      />
    </S.Container>
  );
};

export default ProgressBar;
