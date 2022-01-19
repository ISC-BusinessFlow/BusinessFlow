import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useRegisterNode } from '@/diagrams';
import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';

const size = {
  width: 160,
  height: 100,
};

export const Input: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const taskRef = useRef<SVGRectElement>(null);
  useRegisterNode(taskRef, task.id);
  const trans = `translate(${task.x}, ${task.y})`;
  return (
    <g ref={taskRef} transform={trans}>
      <mask id="path-1-inside-1_6_68" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M142.222 0H23.7037L0 50L23.7037 100H142.222C152.041 100 160 77.6142 160 50C160 22.3858 152.041 0 142.222 0Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M142.222 0H23.7037L0 50L23.7037 100H142.222C152.041 100 160 77.6142 160 50C160 22.3858 152.041 0 142.222 0Z"
        fill="#A3C6FB"
      />
      <path
        d="M23.7037 0V-2H22.4385L21.8965 -0.856748L23.7037 0ZM0 50L-1.8072 49.1433L-2.21337 50L-1.8072 50.8567L0 50ZM23.7037 100L21.8965 100.857L22.4385 102H23.7037V100ZM23.7037 2H142.222V-2H23.7037V2ZM1.8072 50.8567L25.5109 0.856748L21.8965 -0.856748L-1.8072 49.1433L1.8072 50.8567ZM25.5109 99.1433L1.8072 49.1433L-1.8072 50.8567L21.8965 100.857L25.5109 99.1433ZM142.222 98H23.7037V102H142.222V98ZM158 50C158 63.6407 156.031 75.9037 152.909 84.6853C151.344 89.085 149.528 92.5035 147.611 94.7838C145.686 97.0741 143.856 98 142.222 98V102C145.498 102 148.345 100.128 150.673 97.3577C153.01 94.5777 155.025 90.6739 156.677 86.0254C159.989 76.7105 162 63.9735 162 50H158ZM142.222 2C143.856 2 145.686 2.92592 147.611 5.2162C149.528 7.49646 151.344 10.915 152.909 15.3147C156.031 24.0963 158 36.3593 158 50H162C162 36.0265 159.989 23.2895 156.677 13.9746C155.025 9.32606 153.01 5.42231 150.673 2.6423C148.345 -0.1277 145.498 -2 142.222 -2V2Z"
        fill="#7F9AC2"
        mask="url(#path-1-inside-1_6_68)"
      />
      <DisplayText task={task} width={size.width} height={size.height} />
    </g>
  );
});
