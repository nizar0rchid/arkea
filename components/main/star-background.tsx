"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = (props: PointsInstancesProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float32Array(5000), { radius: 1.2 });
    // Filter out NaN values that can occur at sphere center/edge
    const filteredPositions = new Float32Array(positions.length);
    let validIndex = 0;
    
    for (let i = 0; i < positions.length; i += 3) {
      if (!isNaN(positions[i]) && !isNaN(positions[i + 1]) && !isNaN(positions[i + 2])) {
        filteredPositions[validIndex] = positions[i];
        filteredPositions[validIndex + 1] = positions[i + 1];
        filteredPositions[validIndex + 2] = positions[i + 2];
        validIndex += 3;
      }
    }
    
    return filteredPositions.slice(0, validIndex);
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);
