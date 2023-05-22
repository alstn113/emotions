import * as S from './ProgressBar.styles';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percent?: number;
  progressStatus: 'playing' | 'completed' | 'pending' | 'unset';
  duration?: `${number}s`;
}

const ProgressBar = ({
  percent = 0,
  progressStatus = 'unset',
  duration = '0s',
  ...props
}: ProgressBarProps) => {
  return (
    <S.Container
      {...props}
      progressStatus={progressStatus}
      progressPercent={percent}
      progressDuration={progressStatus === 'playing' ? duration : ''}
    >
      <div className="percent" />
    </S.Container>
  );
};

export default ProgressBar;
