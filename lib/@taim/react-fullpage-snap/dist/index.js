"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FullPageProvider: () => FullPageProvider,
  FullPageWrapper: () => FullPageWrapper,
  Section: () => Section,
  useFullPage: () => useFullPage,
});
module.exports = __toCommonJS(index_exports);

// src/FullPageProvider.tsx
var import_react2 = require("react");

// src/FullPageContext.tsx
var import_react = require("react");
var FullPageContext = (0, import_react.createContext)(null);
function useFullPage() {
  const context = (0, import_react.useContext)(FullPageContext);
  if (!context) {
    throw new Error("useFullPage must be used within FullPageProvider");
  }
  return context;
}
var FullPageContext_default = FullPageContext;

// src/utils/easing.ts
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// src/utils/scrollTo.ts
var currentAnimationFrame = null;
function scrollToPosition(options) {
  const { targetY, duration, onComplete, easing = easeInOutCubic } = options;
  if (currentAnimationFrame !== null) {
    cancelAnimationFrame(currentAnimationFrame);
    currentAnimationFrame = null;
  }
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();
  if (Math.abs(distance) < 1) {
    if (onComplete) onComplete();
    return;
  }
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const currentY = startY + distance * easedProgress;
    window.scrollTo(0, currentY);
    if (progress < 1) {
      currentAnimationFrame = requestAnimationFrame(animate);
    } else {
      currentAnimationFrame = null;
      if (onComplete) onComplete();
    }
  }
  currentAnimationFrame = requestAnimationFrame(animate);
}

// src/FullPageProvider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function FullPageProvider({
  children,
  scrollingSpeed = 1e3,
  anchors = [],
  menu,
  lockAnchors = false,
  onSectionChange,
  beforeScroll,
  afterScroll,
  keyboardScrolling = true,
  touchScrolling = true,
  wheelScrolling = true,
  scrollThreshold = 30,
  touchThreshold = 30,
}) {
  const [activeIndex, setActiveIndex] = (0, import_react2.useState)(0);
  const [isScrolling, setIsScrolling] = (0, import_react2.useState)(false);
  const [scrollDirection, setScrollDirection] = (0, import_react2.useState)(null);
  const [sections, setSections] = (0, import_react2.useState)([]);
  const [allowScrolling, setAllowScrolling] = (0, import_react2.useState)(true);
  const touchStartY = (0, import_react2.useRef)(0);
  const lastWheelTime = (0, import_react2.useRef)(0);
  const wheelDelta = (0, import_react2.useRef)(0);
  const lastScrollTime = (0, import_react2.useRef)(0);
  const isProcessingTouch = (0, import_react2.useRef)(false);
  const isTouching = (0, import_react2.useRef)(false);
  (0, import_react2.useEffect)(() => {
    document.body.classList.add("fullpage-active");
    document.documentElement.classList.add("fullpage-active");
    return () => {
      document.body.classList.remove("fullpage-active");
      document.documentElement.classList.remove("fullpage-active");
    };
  }, []);
  const registerSection = (0, import_react2.useCallback)((element) => {
    setSections((prev) => {
      if (prev.includes(element)) return prev;
      return [...prev, element].sort((a, b) => {
        return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      });
    });
    return () => {
      setSections((prev) => prev.filter((el) => el !== element));
    };
  }, []);
  const moveTo = (0, import_react2.useCallback)(
    (target, duration) => {
      if (isScrolling || !allowScrolling) return;
      let targetIndex;
      if (typeof target === "string") {
        targetIndex = anchors.indexOf(target);
        if (targetIndex === -1) return;
      } else {
        targetIndex = target;
      }
      if (targetIndex < 0 || targetIndex >= sections.length) return;
      if (targetIndex === activeIndex) return;
      setIsScrolling(true);
      const origin = {
        index: activeIndex,
        anchor: anchors[activeIndex] || null,
        element: sections[activeIndex] || null,
      };
      const destination = {
        index: targetIndex,
        anchor: anchors[targetIndex] || null,
        element: sections[targetIndex] || null,
      };
      if (beforeScroll) {
        beforeScroll(origin, destination);
      }
      setScrollDirection(targetIndex > activeIndex ? "down" : "up");
      const targetElement = sections[targetIndex];
      const targetY = targetElement?.offsetTop || 0;
      scrollToPosition({
        targetY,
        duration: duration || scrollingSpeed,
        onComplete: () => {
          window.scrollTo(0, targetY);
          setActiveIndex(targetIndex);
          setIsScrolling(false);
          setScrollDirection(null);
          if (anchors[targetIndex] && !lockAnchors) {
            window.history.pushState(null, "", `#${anchors[targetIndex]}`);
          }
          if (menu) {
            updateMenuHighlight(menu, targetIndex);
          }
          if (afterScroll) {
            afterScroll(origin, destination);
          }
          if (onSectionChange) {
            onSectionChange(activeIndex, targetIndex);
          }
        },
      });
    },
    [
      isScrolling,
      allowScrolling,
      activeIndex,
      sections,
      anchors,
      scrollingSpeed,
      lockAnchors,
      menu,
      beforeScroll,
      afterScroll,
      onSectionChange,
    ]
  );
  const moveNext = (0, import_react2.useCallback)(() => {
    if (activeIndex < sections.length - 1) {
      moveTo(activeIndex + 1);
    }
  }, [activeIndex, sections.length, moveTo]);
  const movePrevious = (0, import_react2.useCallback)(() => {
    if (activeIndex > 0) {
      moveTo(activeIndex - 1);
    }
  }, [activeIndex, moveTo]);
  const getActiveSection = (0, import_react2.useCallback)(() => {
    return {
      index: activeIndex,
      anchor: anchors[activeIndex] || null,
      element: sections[activeIndex] || null,
    };
  }, [activeIndex, anchors, sections]);
  (0, import_react2.useEffect)(() => {
    if (!wheelScrolling) return;
    const GESTURE_GAP = 300;
    let gestureFired = false;
    let gestureTimeout = null;
    const resetGesture = () => {
      gestureFired = false;
      wheelDelta.current = 0;
    };
    const handleWheel = (e) => {
      e.preventDefault();
      if (!allowScrolling || isScrolling) {
        return;
      }
      if (gestureTimeout) clearTimeout(gestureTimeout);
      gestureTimeout = setTimeout(resetGesture, GESTURE_GAP);
      if (gestureFired) {
        return;
      }
      const now = Date.now();
      const timeDiff = now - lastWheelTime.current;
      if (timeDiff > 200) {
        wheelDelta.current = e.deltaY;
      } else {
        wheelDelta.current += e.deltaY;
      }
      lastWheelTime.current = now;
      if (Math.abs(wheelDelta.current) < scrollThreshold) {
        return;
      }
      gestureFired = true;
      const direction = wheelDelta.current > 0 ? 1 : -1;
      const targetIndex = activeIndex + direction;
      if (targetIndex >= 0 && targetIndex < sections.length && targetIndex !== activeIndex) {
        moveTo(targetIndex);
      }
      wheelDelta.current = 0;
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (gestureTimeout) clearTimeout(gestureTimeout);
    };
  }, [
    wheelScrolling,
    allowScrolling,
    isScrolling,
    scrollThreshold,
    activeIndex,
    sections.length,
    moveTo,
  ]);
  (0, import_react2.useEffect)(() => {
    if (!keyboardScrolling) return;
    const handleKeyDown = (e) => {
      if (!allowScrolling || isScrolling) return;
      switch (e.key) {
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (activeIndex > 0) {
            moveTo(activeIndex - 1);
          }
          break;
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (activeIndex < sections.length - 1) {
            moveTo(activeIndex + 1);
          }
          break;
        case " ":
          e.preventDefault();
          if (e.shiftKey) {
            if (activeIndex > 0) {
              moveTo(activeIndex - 1);
            }
          } else {
            if (activeIndex < sections.length - 1) {
              moveTo(activeIndex + 1);
            }
          }
          break;
        case "Home":
          e.preventDefault();
          moveTo(0);
          break;
        case "End":
          e.preventDefault();
          moveTo(sections.length - 1);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardScrolling, allowScrolling, isScrolling, activeIndex, sections.length, moveTo]);
  (0, import_react2.useEffect)(() => {
    if (!touchScrolling) return;
    let hasMoved = false;
    const handleTouchStart = (e) => {
      isTouching.current = true;
      if (isProcessingTouch.current || isScrolling) {
        return;
      }
      touchStartY.current = e.touches[0].clientY;
      hasMoved = false;
    };
    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const diff = Math.abs(touchStartY.current - currentY);
      if (diff > touchThreshold) {
        hasMoved = true;
        e.preventDefault();
      }
    };
    const handleTouchEnd = (e) => {
      isTouching.current = false;
      const now = Date.now();
      if (now - lastScrollTime.current < scrollingSpeed) {
        return;
      }
      if (isProcessingTouch.current || !allowScrolling || isScrolling) {
        return;
      }
      if (!hasMoved) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      if (Math.abs(diff) < touchThreshold) return;
      isProcessingTouch.current = true;
      lastScrollTime.current = now;
      let targetIndex = activeIndex;
      if (diff > 0 && activeIndex < sections.length - 1) {
        targetIndex = activeIndex + 1;
      } else if (diff < 0 && activeIndex > 0) {
        targetIndex = activeIndex - 1;
      }
      if (targetIndex !== activeIndex) {
        moveTo(targetIndex);
      }
      setTimeout(() => {
        isProcessingTouch.current = false;
      }, scrollingSpeed + 100);
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    touchScrolling,
    allowScrolling,
    isScrolling,
    touchThreshold,
    activeIndex,
    sections.length,
    moveTo,
    scrollingSpeed,
  ]);
  (0, import_react2.useEffect)(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && anchors.includes(hash)) {
        const index = anchors.indexOf(hash);
        if (index !== activeIndex) {
          moveTo(index);
        }
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [anchors, activeIndex, moveTo]);
  (0, import_react2.useEffect)(() => {
    if (menu) {
      updateMenuHighlight(menu, activeIndex);
    }
  }, [menu, activeIndex]);
  const contextValue = {
    activeIndex,
    isScrolling,
    scrollDirection,
    totalSections: sections.length,
    anchors,
    moveTo,
    moveNext,
    movePrevious,
    getActiveSection,
    setAllowScrolling,
    registerSection,
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullPageContext_default.Provider, {
    value: contextValue,
    children,
  });
}
function updateMenuHighlight(menuSelector, activeIndex) {
  const menuEl = document.querySelector(menuSelector);
  if (!menuEl) return;
  const items = menuEl.querySelectorAll("[data-menuanchor]");
  items.forEach((item, index) => {
    if (index === activeIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// src/FullPageWrapper.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function FullPageWrapper({ children, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
    className: `fullpage-wrapper ${className}`,
    children,
  });
}

// src/Section.tsx
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function Section({ children, className = "" }) {
  const sectionRef = (0, import_react3.useRef)(null);
  const { registerSection } = useFullPage();
  (0, import_react3.useEffect)(() => {
    if (sectionRef.current) {
      return registerSection(sectionRef.current);
    }
  }, [registerSection]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
    ref: sectionRef,
    className: `section ${className}`,
    children,
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    FullPageProvider,
    FullPageWrapper,
    Section,
    useFullPage,
  });
