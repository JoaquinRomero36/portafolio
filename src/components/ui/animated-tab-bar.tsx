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
}

export const AnimatedTabBar: React.FC<AnimatedTabBarProps> = ({
  items,
  defaultIndex = 0,
  activeIndex: controlledIndex,
  onTabChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const activeIndex = controlledIndex ?? internalIndex;
  const menuRef = useRef<HTMLMenuElement>(null);
  const menuBorderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const offsetMenuBorder = useCallback(() => {
    const activeItem = itemRefs.current[activeIndex];
    const menu = menuRef.current;
    const menuBorder = menuBorderRef.current;

    if (activeItem && menu && menuBorder) {
      const top = Math.floor(
        activeItem.offsetTop -
          menuBorder.offsetTop +
          (activeItem.offsetHeight - menuBorder.offsetHeight) / 2
      );
      menuBorder.style.transform = `translate3d(0, ${top}px, 0)`;
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    offsetMenuBorder();
    const handleResize = () => {
      if (menuRef.current) {
        const menuStyle = menuRef.current.style;
        menuStyle.setProperty("--timeOut", "none");
      }
      offsetMenuBorder();
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
    if (activeIndex === index) return;
    setInternalIndex(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <menu className="tabbar" ref={menuRef}>
        {items.map((item, index) => (
          <button
            key={index}
            ref={(el) => { itemRefs.current[index] = el }}
            style={{ "--bgColorItem": item.color ?? "#f59e0b" } as React.CSSProperties}
            className={`tabbar__item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
            aria-label={item.label ?? `Tab ${index + 1}`}
            aria-current={activeIndex === index ? "page" : undefined}
          >
            {item.icon ?? item.label}
          </button>
        ))}
        <div className="tabbar__border" ref={menuBorderRef}></div>
      </menu>
  );
};

export default AnimatedTabBar;