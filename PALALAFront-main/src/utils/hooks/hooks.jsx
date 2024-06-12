import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export function useOnClickOutside(ref, handler, exceptions = []) {
  useEffect(() => {
    const listener = (event) => {
      if (exceptions.some((exception) => exception.current.contains(event.target))) {
        return;
      }
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

export function useGenerateRandomPastelColour() {
  const [colour, setColour] = useState("");
  const generatePastelColour = () => {
    const randomR = Math.floor(Math.random() * 128) + 128; // R entre 128 y 255
    const randomG = Math.floor(Math.random() * 128) + 128; // G entre 128 y 255
    const randomB = Math.floor(Math.random() * 128) + 128; // B entre 128 y 255
    const pastelColour = `rgb(${randomR}, ${randomG}, ${randomB})`;
    setColour(pastelColour);
  };

  return { colour, generatePastelColour };
}

export function useGetAuthPayload() {
  const auth = useSelector((appState) => appState.authToken);
  if (auth === null) {
    return null;
  }
  try {
    const [header, payload, signature] = auth.split(".");
    const decodePayload = JSON.parse(atob(payload));
    return decodePayload;
    //.userType;
  } catch (error) {
    return null;
  }
}

export const useSticky = () => {
  const stickyRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!stickyRef.current) {
      return;
    }
    setOffset(stickyRef.current.offsetTop);
  }, [stickyRef, setOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return;
      }

      setSticky(window.scrollY > offset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setSticky, stickyRef, offset]);
  return { stickyRef, sticky };
};


/*In React, useRef is a hook that provides a way to directly interact with DOM elements or to persist values 
across renders without causing re-renders. It returns a mutable object called a "ref object," which has a current property. 
The value of current can be set to hold a reference to a DOM element or any other value, and it persists across renders. 
*/
