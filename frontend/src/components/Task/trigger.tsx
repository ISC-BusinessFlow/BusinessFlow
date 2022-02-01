import { observer } from 'mobx-react-lite';

import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';
import { Label } from './label';
import { useTask } from './useTask';

const size = {
  width: 125,
  height: 50,
};

export const Trigger: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const {
    ref,
    translate: { x, y },
  } = useTask(task);

  return (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <mask id="path-1-inside-1_6_60" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M113 0H12C5.37258 0 0 11.1929 0 25C0 38.8071 5.37258 50 12 50H113C119.627 50 125 38.8071 125 25C125 11.1929 119.627 0 113 0Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M113 0H12C5.37258 0 0 11.1929 0 25C0 38.8071 5.37258 50 12 50H113C119.627 50 125 38.8071 125 25C125 11.1929 119.627 0 113 0Z"
        fill="#598CD8"
      />
      <path
        d="M12 2H113V-2H12V2ZM2 25C2 18.3286 3.30217 12.387 5.31776 8.18779C7.40253 3.84454 9.89504 2 12 2V-2C7.47754 -2 3.97006 1.7519 1.71167 6.45687C-0.615875 11.3059 -2 17.8643 -2 25H2ZM12 48C9.89504 48 7.40253 46.1555 5.31776 41.8122C3.30217 37.613 2 31.6714 2 25H-2C-2 32.1357 -0.615875 38.6941 1.71167 43.5431C3.97006 48.2481 7.47754 52 12 52V48ZM113 48H12V52H113V48ZM123 25C123 31.6714 121.698 37.613 119.682 41.8122C117.597 46.1555 115.105 48 113 48V52C117.522 52 121.03 48.2481 123.288 43.5431C125.616 38.6941 127 32.1357 127 25H123ZM113 2C115.105 2 117.597 3.84454 119.682 8.18779C121.698 12.387 123 18.3286 123 25H127C127 17.8643 125.616 11.3059 123.288 6.45687C121.03 1.7519 117.522 -2 113 -2V2Z"
        fill="#40669E"
        mask="url(#path-1-inside-1_6_60)"
      />
      <DisplayText
        task={task}
        x={12}
        width={size.width - 24}
        height={size.height}
      />
      {task.label && (
        <Label
          task={task}
          width={size.width}
          height={size.height}
          color="#FFE589"
        />
      )}
    </g>
  );
});
