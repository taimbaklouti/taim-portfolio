"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

export default function TopProgressbar() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const cssInjected = useRef(false);

  useEffect(() => {
    // Inject nprogress CSS asynchronously — don't block render
    if (!cssInjected.current) {
      const style = document.createElement("style");
      style.textContent =
        "#nprogress{pointer-events:none}#nprogress .bar{background:rgb(185,28,28);position:fixed;z-index:1031;top:0;left:0;width:100%;height:5px}.dark #nprogress .bar{background:rgb(239,68,68)}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px rgb(239,68,68),0 0 5px rgb(239,68,68);opacity:1;transform:rotate(3deg) translate(0,-4px)}#nprogress .spinner{display:none}";
      document.head.appendChild(style);
      cssInjected.current = true;
    }

    NProgress.configure({ showSpinner: false });
    return () => {
      NProgress.done();
    };
  }, []);

  // Show nprogress on route changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      NProgress.start();
      const timer = setTimeout(() => {
        NProgress.done();
        prevPathname.current = pathname;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
