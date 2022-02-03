import { observer } from 'mobx-react-lite';

import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';
import { Label } from './label';
import { useTask } from './useTask';

const size = {
  width: 100,
  height: 100,
};

export const DataStore: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const {
    ref,
    translate: { x, y },
  } = useTask(task);

  return (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <mask id="path-1-inside-1_7_22" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100 10H0V90C0 95.5229 22.3858 100 50 100C77.6142 100 100 95.5229 100 90V10Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 10H0V90C0 95.5229 22.3858 100 50 100C77.6142 100 100 95.5229 100 90V10Z"
        fill="#73A74B"
      />
      <path
        d="M0 10V8H-2V10H0ZM100 10H102V8H100V10ZM0 12H100V8H0V12ZM2 90V10H-2V90H2ZM50 98C36.2835 98 23.9211 96.8867 15.0369 95.1099C10.5783 94.2182 7.09982 93.1793 4.78419 92.0844C3.6213 91.5345 2.85834 91.0196 2.41376 90.585C2.19805 90.3742 2.09124 90.2151 2.04142 90.1169C2.01746 90.0697 2.00772 90.0388 2.00376 90.0232C2.00001 90.0084 2 90.0018 2 90H-2C-2 91.4177 -1.27297 92.575 -0.382119 93.4457C0.505394 94.3131 1.70706 95.054 3.0743 95.7005C5.81895 96.9983 9.66279 98.1143 14.2524 99.0322C23.4647 100.875 36.1023 102 50 102V98ZM98 90C98 90.0018 98 90.0084 97.9962 90.0232C97.9923 90.0388 97.9825 90.0697 97.9586 90.1169C97.9088 90.2151 97.8019 90.3742 97.5862 90.585C97.1417 91.0196 96.3787 91.5345 95.2158 92.0844C92.9002 93.1793 89.4217 94.2182 84.9631 95.1099C76.0789 96.8867 63.7165 98 50 98V102C63.8977 102 76.5353 100.875 85.7476 99.0322C90.3372 98.1143 94.1811 96.9983 96.9257 95.7005C98.2929 95.054 99.4946 94.3131 100.382 93.4457C101.273 92.575 102 91.4177 102 90H98ZM98 10V90H102V10H98Z"
        fill="#5C9133"
        mask="url(#path-1-inside-1_7_22)"
      />
      <path
        d="M99 10C99 10.3267 98.8389 10.7591 98.2852 11.3002C97.7299 11.8429 96.8573 12.4144 95.6433 12.9884C93.2204 14.1341 89.6506 15.1922 85.1592 16.0905C76.193 17.8837 63.7618 19 50 19C36.2382 19 23.807 17.8837 14.8408 16.0905C10.3494 15.1922 6.7796 14.1341 4.35672 12.9884C3.14274 12.4144 2.2701 11.8429 1.71479 11.3002C1.16115 10.7591 1 10.3267 1 10C1 9.67331 1.16115 9.24092 1.71479 8.6998C2.2701 8.15705 3.14274 7.58561 4.35672 7.01158C6.7796 5.86591 10.3494 4.80778 14.8408 3.90951C23.807 2.11627 36.2382 1 50 1C63.7618 1 76.193 2.11627 85.1592 3.90951C89.6506 4.80778 93.2204 5.86591 95.6433 7.01158C96.8573 7.58561 97.7299 8.15705 98.2852 8.6998C98.8389 9.24092 99 9.67331 99 10Z"
        fill="#97CC6E"
        stroke="#5C9133"
        strokeWidth="2"
      />
      <DisplayText
        task={task}
        x={0}
        y={20}
        width={size.width}
        height={size.height - 30}
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
