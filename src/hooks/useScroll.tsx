/* eslint-disable react-hooks/exhaustive-deps */

/**
 * 通用hooks
 * 获取元素滚动的 x y
 * @param { scrollRef } 要监听的元素的引用
 */

import { useState, useEffect } from 'react';

const useScroll = (scrollRef: any) => {
  const [pos, setPos] = useState([0, 0]);

  useEffect(() => {
    function handleScroll() {
      setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop]);
    }
    scrollRef.current.addEventListener('scroll', handleScroll, false);
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  return pos;
};

export default useScroll;
