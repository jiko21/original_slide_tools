import clsx from "clsx";
import type React from "react";

export const Slide: React.FC<{
  isActive: boolean;
  item: string;
}> = ({
  isActive,
  item,
}) => {
    const parentClass = clsx("w-screen h-screen p-6 box-border print:block print:visible print:p-0", isActive ? 'block' : 'hidden');
    return (
      <div className={parentClass}>
        <div className='bg-white max-h-full max-w-full aspect-video h-auto w-auto print:h-full print:w-full' dangerouslySetInnerHTML={{ __html: item }} />
      </div>
    )
  };
