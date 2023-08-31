'use client';

import { useEffect } from "react";

function invertColor(hex: string): string {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    // invert color components
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
    const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
    const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
  }
  
  function padZero(str: string, len: number = 2): string {
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

export default function ColorLoader() {

    useEffect(() => {
        let randomColor: string = Math.floor(Math.random()*16777215).toString(16);
        let oppositeRandomColor = invertColor(randomColor);
        document.documentElement.style.setProperty('--random-color', `#${randomColor}`);
        document.documentElement.style.setProperty('--opposite-random-color', `${oppositeRandomColor}`);
      }, []);

    return (
        <></>
    );
}