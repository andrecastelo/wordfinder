import classNames from 'classnames';

type WordProps = {
  value: string,
  found: boolean,
}

export const Word: React.FC<WordProps> = ({ value, found = false }) => (
  <span
    className={classNames(
      'tw-px-4 tw-py-2 tw-font-bold tw-text-lg tw-inline-block tw-rounded',
      { 'tw-bg-blue-300': found, 'tw-bg-gray-200': !found },
    )}
  >
    {value}
  </span>
);