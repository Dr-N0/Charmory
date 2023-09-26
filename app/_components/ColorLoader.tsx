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
        let randomColor: string = Math.random().toString(16).slice(2, 8);
        let randomSection = Math.floor(Math.random() * 5) + 1;
        let oppositeRandomColor = invertColor(randomColor);
        switch (randomSection){
            case 1:
                randomColor = '00' + randomColor.slice(2);
                randomColor = randomColor.slice(0, -2) + "ff";
                break;
            case 2:
                randomColor = '00ff' + randomColor.slice(4);
                break;
            case 3:
                randomColor = randomColor.slice(0, -4) + "00ff";
                break;
            case 4:
                randomColor = "ff00" + randomColor.slice(4);
                break;
            case 5:
                randomColor = 'ff' + randomColor.slice(2);
                randomColor = randomColor.slice(0, -2) + "00";
                break;
        }
        document.documentElement.style.setProperty('--random-color', `#${randomColor}`);
        document.documentElement.style.setProperty('--opposite-random-color', `${oppositeRandomColor}`);
    }, []);

    return (
        <></>
    );
}