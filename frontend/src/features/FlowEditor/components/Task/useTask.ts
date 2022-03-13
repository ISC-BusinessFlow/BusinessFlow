import { useRegisterNode } from '@Diagrams';
import { taskState } from '@FlowEditor/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { BaseTaskProps } from '.';

export const useTask = (
  id: number
): BaseTaskProps & { ref: React.RefCallback<SVGGElement> } => {
  const task = useRecoilValue(taskState(id));
  const ref = useRef<SVGGElement | null>(null);
  const [debounceElement, setDebounceElement] = useState<SVGGElement | null>(
    null
  );
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useRegisterNode(ref, task?.id);

  const callbackRef: React.RefCallback<SVGGElement> = useCallback((el) => {
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    setSize({
      width,
      height,
    });

    setDebounceElement(el);
  }, []);

  useEffect(() => {
    if (!debounceElement) return;
    // NOTE: translateが更新されてからregisterNodeを実行させたいため処理を意図的に遅らせる
    ref.current = debounceElement;
  }, [debounceElement]);

  const translate = useMemo(() => {
    if (!task) return undefined;

    return {
      x: task.x - size.width / 2,
      y: task.y - size.height / 2,
    };
  }, [task, size]);

  return {
    ref: callbackRef,
    task,
    translate,
  };
};
