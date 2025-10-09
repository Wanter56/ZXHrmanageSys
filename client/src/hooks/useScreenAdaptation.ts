import { useEffect } from "react";

export const useScreenAdaptation = () => {
  const resizeHandler = () => {
    const scale = Math.min(
      window.innerWidth / 1920, // 设计稿宽度
      window.innerHeight / 1080 // 设计稿高度
    );
    document.documentElement.style.transform = `scale(${scale})`;
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
};
