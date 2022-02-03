import { observer } from 'mobx-react-lite';

import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';
import { Label } from './label';
import { useTask } from './useTask';

const size = {
  width: 160,
  height: 100,
};

export const SystematizedOutput: React.VFC<{ task: TaskType }> = observer(
  ({ task }) => {
    const {
      ref,
      translate: { x, y },
    } = useTask(task);

    return (
      <g ref={ref} transform={`translate(${x}, ${y})`}>
        <mask id="path-1-inside-1_6_89" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 0H140C151.046 0 160 19.0279 160 42.5C160 65.9721 151.046 85 140 85H76.0667L21 99L37.6301 85H20C8.9543 85 0 65.9721 0 42.5C0 19.0279 8.9543 0 20 0Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 0H140C151.046 0 160 19.0279 160 42.5C160 65.9721 151.046 85 140 85H76.0667L21 99L37.6301 85H20C8.9543 85 0 65.9721 0 42.5C0 19.0279 8.9543 0 20 0Z"
          fill="#A3C6FB"
        />
        <path
          d="M76.0667 85V83H75.8164L75.5739 83.0617L76.0667 85ZM21 99L19.712 97.47L21.4928 100.938L21 99ZM37.6301 85L38.9181 86.53L43.1113 83H37.6301V85ZM140 -2H20V2H140V-2ZM162 42.5C162 30.537 159.722 19.6087 155.952 11.5964C152.255 3.7409 146.753 -2 140 -2V2C144.293 2 148.791 5.77305 152.333 13.2996C155.801 20.6692 158 30.9909 158 42.5H162ZM140 87C146.753 87 152.255 81.2591 155.952 73.4036C159.722 65.3913 162 54.463 162 42.5H158C158 54.0091 155.801 64.3308 152.333 71.7004C148.791 79.227 144.293 83 140 83V87ZM76.0667 87H140V83H76.0667V87ZM75.5739 83.0617L20.5072 97.0617L21.4928 100.938L76.5595 86.9383L75.5739 83.0617ZM22.288 100.53L38.9181 86.53L36.342 83.47L19.712 97.47L22.288 100.53ZM20 87H37.6301V83H20V87ZM-2 42.5C-2 54.463 0.27773 65.3913 4.04823 73.4036C7.74492 81.2591 13.2474 87 20 87V83C15.7069 83 11.2094 79.227 7.6675 71.7004C4.19942 64.3308 2 54.0091 2 42.5H-2ZM20 -2C13.2474 -2 7.74492 3.7409 4.04823 11.5964C0.27773 19.6087 -2 30.537 -2 42.5H2C2 30.9909 4.19942 20.6692 7.6675 13.2996C11.2094 5.77305 15.7069 2 20 2V-2Z"
          fill="#7F9AC2"
          mask="url(#path-1-inside-1_6_89)"
        />
        <DisplayText
          task={task}
          x={10}
          width={size.width - 20}
          height={size.height - 15}
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
  }
);
