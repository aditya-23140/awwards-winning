"use client";
import React, { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import RoundedCorners from "./RoundedCorners";
import gsap from "gsap";
import Image from "next/image";
import Button from "./Button";

const Story = () => {
  const frameRef = useRef<HTMLImageElement | null>(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;
    else {
      const rect = element.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(element, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 500,
        ease: "power1",
      });
    }
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50 overflow-hidden">
      <div className="relative flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general tex-sm uppercase md:text-[10px]">
          The Multiversal IP World
        </p>
        <div className="relative size-full overflow-hidden">
          <AnimatedTitle
            title="The st<b>o</b>ry of <br /> hidden real<b>m</b>"
            sectionId="#story"
            containerClass="text-blue-50 mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          <div className="story-img-container">
            <div className="story-img-mask clip-polygon">
              <div className="story-img-content">
                <Image
                  width={3200}
                  height={2000}
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-contain"
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>
        <div className="md:-mt-90 lg:-mt-98 -mt-64 flex w-full justify-center md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start text-sm">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button id="realm-button" title="Discover Prologue" containerClass="mt-5 !px-4 !py-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
