"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"

function Book({ position, rotation, color }: any) {
  const meshRef = useRef<any>()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2
      meshRef.current.rotation.y = rotation[1] + Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
        <mesh position={[0, 0, 0.051]}>
          <boxGeometry args={[0.75, 1.15, 0.02]} />
          <meshStandardMaterial color="white" roughness={0.4} />
        </mesh>
      </mesh>
    </group>
  )
}

function Particles() {
  const count = 100
  const positions = useMemo(() => {
    const positions = []
    for (let i = 0; i < count; i++) {
      positions.push([(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20])
    }
    return positions
  }, [])

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos as any}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#4F46E5" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Books() {
  const colors = [
    "#4F46E5", // Indigo
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#2563EB", // Blue
    "#4338CA", // Indigo
  ]

  const bookPositions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const radius = 4
      const angle = (i / 12) * Math.PI * 2
      return [Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius]
    })
  }, [])

  return (
    <group>
      {bookPositions.map((position, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Book
            position={position}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            color={colors[i % colors.length]}
          />
        </Float>
      ))}
    </group>
  )
}

export default function BookAnimation() {
  const mouseRef = useRef<[number, number]>([0, 0])

  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = -(event.clientY / window.innerHeight) * 2 + 1
    mouseRef.current = [x, y]
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove]) // Added handleMouseMove to dependencies

  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-950 z-10" />
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]} shadows>
        <fog attach="fog" args={["#ffffff", 5, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow shadow-mapSize={1024} />
        <group>
          <Books />
          <Particles />
        </group>
      </Canvas>
    </div>
  )
}
