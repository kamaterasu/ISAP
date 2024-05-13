import React, { useState, useEffect } from "react";
import "./Donut.css";
const Donut = () => {
  const [asciiFrame, setAsciiFrame] = useState(""); // State to store ASCII frame

  // Angles, Radius, and Constants
  let A = 1;
  let B = 1;
  const R1 = 1;
  const R2 = 2;
  const K1 = 150;
  const K2 = 5;

  // Function to render ASCII frame
  const renderAsciiFrame = () => {
    const b = []; // Array to stay ASCII chars
    const z = []; // Array to store depth values

    const width = 280; // Width of frame
    const height = 160; // Height of frame

    A += 0.07; // Increment angle a
    B += 0.03; // Increment angle b
    // Sin and Cosine of angles
    const cA = Math.cos(A),
      sA = Math.sin(A),
      cB = Math.cos(B),
      sB = Math.sin(B);

    // Initialize arrays with default angles
    for (let k = 0; k < width * height; k++) {
      // Set default ASCII char
      b[k] = k % width === width - 1 ? "\n" : " ";
      // Set default depth
      z[k] = 0;
    }

    // Generate the ASCII frame
    for (let j = 0; j < 6.28; j += 0.07) {
      const ct = Math.cos(j); // Cosine of j
      const st = Math.sin(j); // Sin of j

      for (let i = 0; i < 6.28; i += 0.02) {
        const sp = Math.sin(i); // Sin of i
        const cp = Math.cos(i), // Cosine of i
          h = ct + 2, // Height calculation
          // Distance calculation
          D = 1 / (sp * h * sA + st * cA + 5),
          // Temporary variable
          t = sp * h * cA - st * sA;

        // Calculate coordinates of ASCII char
        const x = Math.floor(
          width / 2 + (width / 4) * D * (cp * h * cB - t * sB)
        );
        const y = Math.floor(
          height / 2 + (height / 4) * D * (cp * h * sB + t * cB)
        );

        // Calculate the index in the array
        const o = x + width * y;
        // Calculate the ASCII char index
        const N = Math.floor(
          8 *
            ((st * sA - sp * ct * cA) * cB -
              sp * ct * sA -
              st * cA -
              cp * ct * sB)
        );

        // Update ASCII char and depth if conditions are met
        if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
          z[o] = D;
          // Update ASCII char based on the index
          b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
        }
      }
    }

    // Update state with the new ASCII frame
    setAsciiFrame(b.join(""));
  };

  // Start the animation when the component mounts
  useEffect(() => {
    const asciiIntervalId = setInterval(renderAsciiFrame, 50);
    // Clean up interval on unmount
    return () => clearInterval(asciiIntervalId);
  }, []);

  // Re-render the ASCII frame when the window is resized
  useEffect(() => {
    window.addEventListener("resize", renderAsciiFrame);
    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", renderAsciiFrame);
  }, []);

  return <pre id="donut">{asciiFrame}</pre>;
};

export default Donut;
