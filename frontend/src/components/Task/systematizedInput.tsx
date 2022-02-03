import { observer } from 'mobx-react-lite';

import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';
import { Label } from './label';
import { useTask } from './useTask';

const size = {
  width: 160,
  height: 100,
};

export const Input: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const {
    ref,
    translate: { x, y },
  } = useTask(task);

  return (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <mask id="path-1-inside-1_6_68" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M140 0H23.3333L0 50L23.3333 100H140C151.046 100 160 77.6142 160 50C160 22.3858 151.046 0 140 0Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M140 0H23.3333L0 50L23.3333 100H140C151.046 100 160 77.6142 160 50C160 22.3858 151.046 0 140 0Z"
        fill="#A3C6FB"
      />
      <path
        d="M23.3333 0V-2H22.0596L21.521 -0.845771L23.3333 0ZM0 50L-1.81237 49.1542L-2.20706 50L-1.81237 50.8458L0 50ZM23.3333 100L21.521 100.846L22.0596 102H23.3333V100ZM23.3333 2H140V-2H23.3333V2ZM1.81237 50.8458L25.1457 0.845771L21.521 -0.845771L-1.81237 49.1542L1.81237 50.8458ZM25.1457 99.1542L1.81237 49.1542L-1.81237 50.8458L21.521 100.846L25.1457 99.1542ZM140 98H23.3333V102H140V98ZM158 50C158 63.6178 155.788 75.8543 152.285 84.6126C150.531 88.9972 148.493 92.4113 146.332 94.6965C144.175 96.9775 142.034 98 140 98V102C143.489 102 146.61 100.224 149.238 97.445C151.862 94.6699 154.134 90.7617 155.999 86.0981C159.734 76.7599 162 63.9964 162 50H158ZM140 2C142.034 2 144.175 3.02247 146.332 5.30346C148.493 7.58869 150.531 11.0028 152.285 15.3874C155.788 24.1457 158 36.3822 158 50H162C162 36.0036 159.734 23.2401 155.999 13.9019C154.134 9.23832 151.862 5.33009 149.238 2.55503C146.61 -0.224245 143.489 -2 140 -2V2Z"
        fill="#7F9AC2"
        mask="url(#path-1-inside-1_6_68)"
      />
      <DisplayText
        task={task}
        x={25}
        width={size.width - 45}
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
