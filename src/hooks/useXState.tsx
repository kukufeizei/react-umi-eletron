import { useEffect, useRef, useState } from 'react';

const useXState = (initState: any) => {
  const [state, setState] = useState(initState);
  const isUpdate = useRef();
  const setXState = (target: any, cb: () => void | undefined) => {
    setState((prev: string) => {
      isUpdate.current = cb as unknown as undefined;
      return typeof state === 'function' ? target(prev) : state;
    });
  };
  useEffect(() => {
    if (isUpdate.current) {
      // @ts-ignore
      isUpdate.current();
    }
  });

  return [state, setXState];
};

export default useXState;
