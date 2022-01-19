import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useRegisterNode } from '@/diagrams';
import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';

const size = {
  width: 160,
  height: 100,
};

export const SystematizedOutput: React.VFC<{ task: TaskType }> = observer(
  ({ task }) => {
    const taskRef = useRef<SVGRectElement>(null);
    useRegisterNode(taskRef, task.id);
    const trans = `translate(${task.x}, ${task.y})`;

    return (
      <g ref={taskRef} transform={trans}>
        <mask id="path-1-inside-1_6_89" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.3333 84.983C21.1365 84.9943 20.9389 85 20.7407 85C9.28595 85 0 65.9721 0 42.5C0 19.0279 9.28595 0 20.7407 0C20.9389 0 21.1365 0.0056963 21.3333 0.0170134V0H139.259H139.852V0.0170132C151.033 0.659775 160 19.434 160 42.5C160 65.566 151.033 84.3402 139.852 84.983V85H139.259H80L21 100L38.8179 85H21.3333V84.983Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.3333 84.983C21.1365 84.9943 20.9389 85 20.7407 85C9.28595 85 0 65.9721 0 42.5C0 19.0279 9.28595 0 20.7407 0C20.9389 0 21.1365 0.0056963 21.3333 0.0170134V0H139.259H139.852V0.0170132C151.033 0.659775 160 19.434 160 42.5C160 65.566 151.033 84.3402 139.852 84.983V85H139.259H80L21 100L38.8179 85H21.3333V84.983Z"
          fill="#A3C6FB"
        />
        <path
          d="M21.3333 84.983H23.3333V82.8647L21.2186 82.9863L21.3333 84.983ZM21.3333 0.0170134L21.2185 2.01372L23.3333 2.13529V0.0170134H21.3333ZM21.3333 0V-2H19.3333V0H21.3333ZM139.852 0H141.852V-2H139.852V0ZM139.852 0.0170132H137.852V1.90534L139.737 2.01372L139.852 0.0170132ZM139.852 84.983L139.737 82.9863L137.852 83.0947V84.983H139.852ZM139.852 85V87H141.852V85H139.852ZM80 85V83H79.7497L79.5072 83.0617L80 85ZM21 100L19.712 98.47L21.4928 101.938L21 100ZM38.8179 85L40.106 86.53L44.2991 83H38.8179V85ZM21.3333 85H19.3333V87H21.3333V85ZM20.7407 87C20.9773 87 21.2131 86.9932 21.4481 86.9797L21.2186 82.9863C21.0598 82.9954 20.9006 83 20.7407 83V87ZM-2 42.5C-2 54.4726 0.36406 65.4103 4.27744 73.4292C8.12548 81.3142 13.8221 87 20.7407 87V83C16.2046 83 11.5308 79.1718 7.87221 71.6749C4.27891 64.3118 2 53.9995 2 42.5H-2ZM20.7407 -2C13.8221 -2 8.12548 3.68575 4.27744 11.5708C0.36406 19.5897 -2 30.5274 -2 42.5H2C2 31.0005 4.27891 20.6882 7.87221 13.3251C11.5308 5.8282 16.2046 2 20.7407 2V-2ZM21.4481 -1.97969C21.2131 -1.9932 20.9773 -2 20.7407 -2V2C20.9006 2 21.0599 2.00459 21.2185 2.01372L21.4481 -1.97969ZM19.3333 0V0.0170134H23.3333V0H19.3333ZM139.259 -2H21.3333V2H139.259V-2ZM139.852 -2H139.259V2H139.852V-2ZM141.852 0.0170132V0H137.852V0.0170132H141.852ZM162 42.5C162 30.7331 159.717 19.9684 155.925 11.9912C152.195 4.14371 146.689 -1.59324 139.967 -1.97969L139.737 2.01372C144.196 2.27002 148.763 6.24158 152.312 13.7084C155.8 21.0455 158 31.2009 158 42.5H162ZM139.967 86.9797C146.689 86.5932 152.195 80.8563 155.925 73.0088C159.717 65.0316 162 54.2669 162 42.5H158C158 53.7991 155.8 63.9545 152.312 71.2916C148.763 78.7584 144.196 82.73 139.737 82.9863L139.967 86.9797ZM141.852 85V84.983H137.852V85H141.852ZM139.259 87H139.852V83H139.259V87ZM80 87H139.259V83H80V87ZM79.5072 83.0617L20.5072 98.0617L21.4928 101.938L80.4928 86.9383L79.5072 83.0617ZM22.288 101.53L40.106 86.53L37.5299 83.47L19.712 98.47L22.288 101.53ZM21.3333 87H38.8179V83H21.3333V87ZM19.3333 84.983V85H23.3333V84.983H19.3333Z"
          fill="#7F9AC2"
          mask="url(#path-1-inside-1_6_89)"
        />
        <DisplayText task={task} width={size.width} height={size.height} />
      </g>
    );
  }
);
