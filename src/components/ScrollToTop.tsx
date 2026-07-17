import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the top of the page on every route change. Without this, a
 * single-page app keeps the previous scroll position — so clicking a link from
 * mid-page lands the visitor partway down the next page. Mount once inside the router.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
