"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Sparkles, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import { Book } from "./3DBook"

export function BookScene() {
  return (
    <Canvas shadows camera={{ position: [5, 2, 5], fov: 45 }} className="w-full h-full">
      <color attach="background" args={["transparent"]} />

      {/* Lighting */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment */}
      <Environment preset="studio" background={false} />

      {/* Shadows */}
      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />

      {/* Sparkles effect */}
      <Sparkles count={50} scale={8} size={2} speed={0.4} opacity={0.1} />

      <Suspense fallback={null}>
        {/* 3D Book */}
        <Book />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

