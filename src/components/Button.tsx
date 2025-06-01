"use client";
import { useRef } from "react";
import { IconType } from "react-icons";

type MyComponentProps = {
  id: string;
  title: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  containerClass: string;
};

const Button = ({
  id,
  title,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  containerClass,
}: MyComponentProps) => {
  const hoverSound = useRef<HTMLAudioElement | null>(null);

  const playHoverSound = () => {
    if (!hoverSound.current) return;
    else {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };

  return (
    <div className="group clip-path-btn ">
      <audio ref={hoverSound} src="audio/mouse.wav" preload="auto" />
      <button
        onMouseEnter={playHoverSound}
        id={id}
        className={`relative z-10 w-fit cursor-pointer overflow-hidden border-btn bg-violet-50 px-5 py-2 text-black ${containerClass}`}
      >
        <span className="relative inline-block overflow-hidden text-xs uppercase">
          {/* Top text (initial) */}
          <span className="flex items-center gap-2 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
            {LeftIcon && <LeftIcon className="text-sm" />}
            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
              {title}
            </span>
            {RightIcon && <RightIcon className="text-sm" />}
          </span>

          {/* Bottom text (roll-in) */}
          <span className="absolute top-full left-0 flex items-center gap-2 transition-transform duration-300 ease-in-out group-hover:translate-y-[-100%]">
            {LeftIcon && <LeftIcon className="text-sm" />}
            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
              {title}
            </span>
            {RightIcon && <RightIcon className="text-sm" />}
          </span>
        </span>
      </button>
    </div>
  );
};

export default Button;
