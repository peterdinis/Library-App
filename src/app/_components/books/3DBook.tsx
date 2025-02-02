"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text3D, useTexture } from "@react-three/drei"
import type * as THREE from "three"

export function Book() {
  const bookRef = useRef<THREE.Group>(null)

  // Load textures
  const textures = useTexture({
    leather: "https://assets.vercel.com/image/upload/v1709489350/leather-normal.jpg",
    paper: "https://assets.vercel.com/image/upload/v1709489350/paper-normal.jpg",
  })

  // Animate book opening
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={bookRef} position={[0, 0, 0]}>
        {/* Book cover */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 4, 0.3]} />
          <meshStandardMaterial
            color="#7C3AED"
            roughness={0.3}
            metalness={0.4}
            normalMap={textures.leather}
            normalScale={[0.3, 0.3]}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Spine details */}
        <mesh position={[-1.4, 0, 0]} rotation={[0, Math.PI * 0.5, 0]}>
          <boxGeometry args={[0.3, 4, 0.1]} />
          <meshStandardMaterial color="#6D28D9" roughness={0.2} metalness={0.5} normalMap={textures.leather} />
        </mesh>

        {/* Pages */}
        <group position={[0.1, 0, 0]}>
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[0, 0, 0.15 - i * 0.01]} castShadow>
              <boxGeometry args={[2.9, 3.9, 0.02]} />
              <meshStandardMaterial
                color="#F5F5F4"
                roughness={0.6}
                normalMap={textures.paper}
                normalScale={[0.2, 0.2]}
              />
            </mesh>
          ))}
        </group>

        {/* Golden decoration on cover */}
        <mesh position={[0, 0, 0.16]} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Title text */}
        <group position={[-0.7, 0.5, 0.16]}>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.3}
            height={0.1}
            curveSegments={32}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.01}
            bevelSegments={5}
          >
            LIBRARY
            <meshStandardMaterial color="#F59E0B" roughness={0.1} metalness={0.9} />
          </Text3D>
        </group>
      </group>
    </Float>
  )
}
