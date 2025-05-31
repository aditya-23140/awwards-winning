"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const lastScrollY = useRef(0);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY.current) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY.current) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    lastScrollY.current = currentScrollY;
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Image
              src="/img/logo.png"
              alt="logo"
              className="w-10"
              width={100}
              height={100}
            />
            <Button
              id="product-button"
              title="Products"
              rightIcon={TiLocationArrow}
              containerClass="bg-blue-50 flex items-center justify-center gap-1"
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                  key={item}
                >
                  {item}
                </Link>
              ))}
            </div>
            <button
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  } `}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
