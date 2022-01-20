import { useCallback, useEffect, useRef, useState } from 'react';

import { useRegisterNode } from '@/diagrams';
import { Task } from '@/lib/models/Task';

export const useTask = (task: Task) => {
  const ref = useRef<SVGGElement | null>(null);
  const [debounceElement, setDebounceElement] = useState<SVGGElement | null>(
    null
  );
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useRegisterNode(ref, task.id);

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
    // translateが更新されてからregisterNodeを実行させたいため処理を意図的に遅らせる
    ref.current = debounceElement;
  }, [debounceElement]);

  return {
    ref: callbackRef,
    translate: {
      x: task.x - size.width / 2,
      y: task.y - size.height / 2,
    },
  };
};
