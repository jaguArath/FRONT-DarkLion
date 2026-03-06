import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function ShirtModel() {
  const { scene } = useGLTF("/camisa3D/camiseta.glb");
  return <primitive object={scene} scale={1.5} />;
}

export default function ShirtViewer3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <ShirtModel />
        </Suspense>
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={4}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
}
