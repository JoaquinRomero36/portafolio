import * as React from "react";
import { useState, useRef, useLayoutEffect, useCallback } from "react";

export interface TabItem {
  icon?: React.ReactNode;
  label?: string;
  color?: string;
}

export interface AnimatedTabBarProps {
  items: TabItem[];
  defaultIndex?: number;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  orientation?: 'vertical' | 'horizontal';
}

export const AnimatedTabBar: React.FC<AnimatedTabBarProps> = ({
  items,
  defaultIndex = 0,
  activeIndex: controlledIndex,
  onTabChange,
  orientation = 'vertical',
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const activeIndex = controlledIndex ?? internalIndex;
  const menuRef = useRef<HTMLMenuElement>(null);
  const menuBorderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const offsetMenuBorder = useCallback(() => {
    const menu = menuRef.current;
    const menuBorder = menuBorderRef.current;
    if (!menu || !menuBorder) return;

    const posFor = (el: HTMLElement) =>
      orientation === "horizontal"
        ? Math.floor(
            el.offsetLeft -
              menuBorder.offsetLeft +
              (el.offsetWidth - menuBorder.offsetWidth) / 2
          )
        : Math.floor(
            el.offsetTop -
              menuBorder.offsetTop +
              (el.offsetHeight - menuBorder.offsetHeight) / 2
          );

    const apply = (p: number) => {
      menuBorder.style.transform =
        orientation === "horizontal"
          ? `translate3d(${p}px, 0, 0)`
          : `translate3d(0, ${p}px, 0)`;
    };

    if (Number.isInteger(activeIndex)) {
      const activeItem = itemRefs.current[activeIndex];
      if (activeItem) {
        apply(posFor(activeItem));
        menu.style.removeProperty("--timeOut");
      }
    } else {
      const floor = Math.floor(activeIndex);
      const frac = activeIndex - floor;
      const a = itemRefs.current[floor];
      const b = itemRefs.current[Math.min(floor + 1, items.length - 1)];
      if (a && b) {
        apply(Math.floor(posFor(a) + (posFor(b) - posFor(a)) * frac));
        menu.style.setProperty("--timeOut", "none");
      }
    }
  }, [activeIndex, orientation, items.length]);

  const activeItemIndex = Number.isInteger(activeIndex) ? activeIndex : Math.floor(activeIndex);

  useLayoutEffect(() => {
    offsetMenuBorder();
    const handleResize = () => {
      if (menuRef.current) {
        const menuStyle = menuRef.current.style;
        menuStyle.setProperty("--timeOut", "none");
      }
      offsetMenuBorder();
      requestAnimationFrame(() => {
        if (menuRef.current) {
          menuRef.current.style.removeProperty("--timeOut");
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [offsetMenuBorder]);

  const handleItemClick = (index: number) => {
    if (menuRef.current) {
      const menuStyle = menuRef.current.style;
      menuStyle.removeProperty("--timeOut");
    }
    if (activeItemIndex === index) return;
    setInternalIndex(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <menu className={`tabbar${orientation === 'horizontal' ? ' tabbar--horizontal' : ''}`} ref={menuRef}>
        {items.map((item, index) => (
          <button
            key={index}
            ref={(el) => { itemRefs.current[index] = el }}
            style={{ "--bgColorItem": item.color ?? "#f59e0b" } as React.CSSProperties}
            className={`tabbar__item ${activeItemIndex === index ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
            aria-label={item.label ?? `Tab ${index + 1}`}
            aria-current={activeItemIndex === index ? "page" : undefined}
          >
            {item.icon ?? item.label}
          </button>
        ))}
        <div className="tabbar__border" ref={menuBorderRef}></div>
      </menu>
  );
};

export default AnimatedTabBar;