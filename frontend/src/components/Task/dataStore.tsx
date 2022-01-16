import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useRegisterNode } from '@/diagrams';
import { Task as TaskType } from '@/lib/Task';

import { DisplayText } from './displaytext';

const size = {
  width: 100,
  height: 100,
};

export const DataStore: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const taskRef = useRef<SVGRectElement>(null);
  useRegisterNode(taskRef, task.id);
  const trans = `translate(${task.x}, ${task.y})`;

  return (
    <>
      <g transform={trans}>
        <mask id="path-1-inside-1_7_22" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M100 13H0V90.2902V90.6786H0.0392683C1.08907 95.8611 23.0556 100 50 100C76.9444 100 98.9109 95.8611 99.9607 90.6786H100V90.2902V13Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100 13H0V90.2902V90.6786H0.0392683C1.08907 95.8611 23.0556 100 50 100C76.9444 100 98.9109 95.8611 99.9607 90.6786H100V90.2902V13Z"
          fill="#73A74B"
        />
        <path
          d="M0 13V11H-2V13H0ZM100 13H102V11H100V13ZM0 90.6786H-2V92.6786H0V90.6786ZM0.0392683 90.6786L1.99946 90.2815L1.67476 88.6786H0.0392683V90.6786ZM99.9607 90.6786V88.6786H98.3252L98.0005 90.2815L99.9607 90.6786ZM100 90.6786V92.6786H102V90.6786H100ZM0 15H100V11H0V15ZM2 90.2902V13H-2V90.2902H2ZM2 90.6786V90.2902H-2V90.6786H2ZM0.0392683 88.6786H0V92.6786H0.0392683V88.6786ZM50 98C36.6149 98 24.5155 96.9709 15.677 95.3169C11.2456 94.4876 7.71914 93.5166 5.28169 92.4807C4.05959 91.9614 3.19467 91.4603 2.63941 91.0115C2.06516 90.5474 2.00048 90.2866 1.99946 90.2815L-1.92092 91.0756C-1.65949 92.3662 -0.808075 93.3684 0.125152 94.1226C1.07738 94.8921 2.31133 95.5646 3.71723 96.1621C6.53577 97.3599 10.3818 98.3954 14.9413 99.2486C24.0846 100.96 36.4407 102 50 102V98ZM98.0005 90.2815C97.9995 90.2866 97.9348 90.5474 97.3606 91.0115C96.8053 91.4603 95.9404 91.9614 94.7183 92.4807C92.2809 93.5166 88.7544 94.4876 84.323 95.3169C75.4845 96.9709 63.3851 98 50 98V102C63.5593 102 75.9154 100.96 85.0587 99.2486C89.6182 98.3954 93.4642 97.3599 96.2828 96.1621C97.6887 95.5646 98.9226 94.8921 99.8748 94.1226C100.808 93.3684 101.659 92.3662 101.921 91.0756L98.0005 90.2815ZM100 88.6786H99.9607V92.6786H100V88.6786ZM98 90.2902V90.6786H102V90.2902H98ZM98 13V90.2902H102V13H98Z"
          fill="#5C9133"
          mask="url(#path-1-inside-1_7_22)"
        />
        <path
          d="M99 12.5C99 13.6541 98.0403 15.0398 95.5619 16.5047C93.1505 17.93 89.5946 19.2483 85.1128 20.3687C76.1647 22.6057 63.75 24 50 24C36.25 24 23.8353 22.6057 14.8872 20.3687C10.4054 19.2483 6.8495 17.93 4.43808 16.5047C1.95971 15.0398 1 13.6541 1 12.5C1 11.3459 1.95971 9.96018 4.43808 8.4953C6.8495 7.06999 10.4054 5.75175 14.8872 4.63131C23.8353 2.39428 36.25 1 50 1C63.75 1 76.1647 2.39428 85.1128 4.63131C89.5946 5.75175 93.1505 7.06999 95.5619 8.4953C98.0403 9.96018 99 11.3459 99 12.5Z"
          fill="#97CC6E"
          stroke="#5C9133"
          strokeWidth="2"
        />
      </g>
      <DisplayText task={task} width={size.width} height={size.height} />
    </>
  );
});
