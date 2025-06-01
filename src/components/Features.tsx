"use client";
import React, { ReactNode, useRef } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";

type CardProps = {
  src: string;
  title: ReactNode;
  description: string;
  isComingSoon: boolean;
};

type TiltProps = {
  children: ReactNode;
  className: string;
};

const BentoTilt = ({ children, className = "" }: TiltProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 15;
    const tiltY = (relativeX - 0.5) * -15;

    gsap.to(itemRef.current, {
      duration: 0.5,
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 0.95,
      transformPrespective: 500,
      ease: "power1",
    });
  };

  const handleMouseLeave = () => {
    const element = itemRef.current;

    gsap.to(element, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transformPrespective: 0,
      ease: "power1",
    });
  };

  return (
    <div
      className={`${className}`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description, isComingSoon }: CardProps) => {
  const hoverSound = useRef<HTMLAudioElement | null>(null);

  const playHoverSound = () => {
    if (!hoverSound.current) return;
    else {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };
  return (
    <div onMouseEnter={playHoverSound} className="relative size-full">
      <audio ref={hoverSound} src="audio/bento.wav" preload="auto" />
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-center object-cover"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base hover:floating-nav border-none transition-all duration-700 ease-in-out cursor-default px-2 py-1">
              {description}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {isComingSoon && (
            <Button
              id="bento-btn"
              title="coming soon"
              leftIcon={TiLocationArrow}
              containerClass="!bg-black flex justify-center items-center !text-[#dfdff266] border border-[#dfdff266] !py-2 !px-4"
            />
          )}
          {!isComingSoon && (
            <Button
              id="bento-btn"
              title="Launch Site"
              leftIcon={TiLocationArrow}
              containerClass="!bg-black flex justify-center items-center !text-[#edff66] border border-[#edff66] !py-2 !px-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in rich and ever-expanding universe where a vibrant
            array of products converge into an interconnected overlay experience
            on your world.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radi<b className="special-font-bold">a</b>nt
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
            isComingSoon={true}
          />
        </BentoTilt>
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  Zig<b className="special-font-bold">m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
              isComingSoon
            />
          </BentoTilt>
          {/* ms-32 push a bit to right */}
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  n<b className="special-font-bold">e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
              isComingSoon={false}
            />
          </BentoTilt>
          {/* me-14 margin at end */}
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  az<b className="special-font-bold">u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
              isComingSoon
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title max-w-64 text-black">
                M<b className="special-font-bold">o</b>re Co
                <b className="special-font-bold">m</b>ing S
                <b className="special-font-bold">o</b>on
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              loop
              autoPlay
              muted
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
