import React, { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Accordion.module.scss";
import { ReactComponent as PlusIcon } from "./Plus.svg";

interface AccordionProps {
  id: number;
  selectedId?: number | null;
  handleSelectedId?: (id: number) => void;
  titleFirst?: string;
  titleSecond?: string;
  titleThird?: string;
  titleFourth?: string;
  textFirst?: string;
  textSecond?: string;
  textThird?: string;
  textFourth?: string;
  color?: string;
  isRoot?: boolean;
  hasChildren?: boolean;
}

const Accordion: FC<AccordionProps> = ({
  id,
  selectedId,
  handleSelectedId,
  titleFirst,
  titleSecond,
  titleThird,
  titleFourth,
  textFirst,
  textSecond,
  textThird,
  textFourth,
  color,
  isRoot,
  hasChildren,
}) => {
  const refItem = useRef(null);
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  // height of the animation plate
  const [heightTitle, setHeightTitle] = useState(103);

  // content height for opening animation
  const [heightContent, setHeightContent] = useState(103);

  // content height after opening for closing animation
  const [heightInitRootContent, setHeightInitRootContent] = useState(103);

  // Protection against doubleclick and flickering opening/closing animation
  const [stopClick, setStopClick] = useState(false);

  // Height recalculation on resize
  const [media, setMedia] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const widthWindow = document?.documentElement?.clientWidth;
      setMedia(Number(widthWindow));
    });
  });

  // Open only one block
  useEffect(() => {
    if (selectedId === id) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedId, textFirst, textSecond]);

  useEffect(() => {
    if (refItem?.current) {
      setHeightTitle(refItem.current.clientHeight);
    } else {
      setHeightTitle(103);
    }
  }, [refItem, media]);

  useEffect(() => {
    // Stop the multi-click before the animation completes
    setStopClick(true);

    // Calculate the height of the plate, taking into account the text wrapping
    const buttonHeight = heightTitle < 103 ? 103 : heightTitle;

    // If the block is opened, it calculates the height of the content for animation. After 300ms, set the height to auto.
    // "auto" is needed for nested opening of a nested accordion and recalculation of the root
    if (ref?.current && open) {
      ref.current.style.display = "block";
      const content = ref.current.clientHeight + buttonHeight;
      setHeightContent(content);
      setHeightInitRootContent(content);

      const timeout = setTimeout(() => {
        // setHeightContent('auto');
        setStopClick(false);
        clearTimeout(timeout);
      }, 300);
    } else if (ref?.current && !open) {
      setHeightContent(103);
      const timeout = setTimeout(() => {
        setStopClick(false);
        clearTimeout(timeout);
      }, 100);

      const hiddenTimeout = setTimeout(() => {
        ref.current.style.display = "none";
        clearTimeout(hiddenTimeout);
      }, 200);
    } else {
      setHeightContent(103);
      const timeout = setTimeout(() => {
        setStopClick(false);
        clearTimeout(timeout);
      }, 100);
    }
  }, [ref, open, media, heightTitle]);

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor:
          (color && !isRoot) || (color && isRoot && open) ? color : "#F5F5F5",
        height: open ? heightContent : heightTitle,
      }}
    >
      <div
        ref={refItem}
        className={clsx(styles.item, open && hasChildren && styles.root)}
        onClick={() => {
          if (stopClick) {
            return;
          }
          setHeightContent(heightInitRootContent);
          if (open) {
            const timeout = setTimeout(() => {
              handleSelectedId(null);
              clearTimeout(timeout);
            }, 100);
          } else {
            handleSelectedId(id);
          }
        }}
      >
        <div className={styles.title}>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: titleFirst }}
          />
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: titleSecond }}
          />
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: titleThird }}
          />
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: titleFourth }}
          />
        </div>

        <div className={clsx(styles.icon, open && styles.iconDeg)}>
          <PlusIcon className={styles.icon} />
        </div>
      </div>

      <div
        className={clsx(styles.content, hasChildren && styles.contentRoot)}
        ref={ref}
      >
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: textFirst }}
        />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: textSecond }}
        />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: textThird }}
        />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: textFourth }}
        />
      </div>
    </div>
  );
};

export default Accordion;
