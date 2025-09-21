import { useEffect, useState } from "react";

/**
 * @see  https://pusha.tistory.com/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-Breakpoint-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%9B%85cusom-hook
 */
export function useBreakPoint() {
  // 렌더링 시점에 초기값을 넣어 초기 렌더링 타이밍 과 브레이크포인트 감지
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

  const [isMobile, setIsMobile] = useState(screenWidth < 768);
  const [isTablet, setIsTablet] = useState(
    screenWidth >= 768 && screenWidth < 1200
  );
  const [isDesktop, setIsDesktop] = useState(screenWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
      setIsTablet(screenWidth >= 768 && screenWidth < 1200);
      setIsDesktop(screenWidth >= 1200);
    };

    handleResize();

    // 창 크기 가 조절될때
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
