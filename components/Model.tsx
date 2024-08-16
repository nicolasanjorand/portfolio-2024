import React, { useRef, useEffect } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { a, useSpring } from '@react-spring/three';


export default function Model() {
    const { nodes } = useGLTF("/torrus.glb");
    const { viewport } = useThree()
    const torus = useRef(null);
    const group = useRef(null);

    const materialProps = useControls({
        thickness: { value: 0.1, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1.2, min: 1, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
    });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const mouseX = (event.clientX /  window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            if (torus.current) {
                torus.current.rotation.x = mouseY * 0.1; // Ajuster la sensibilité selon vos besoins
                torus.current.rotation.y = mouseX * 0.1; // Ajuster la sensibilité selon vos besoins
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useFrame(() => {
        if (torus.current) {
            torus.current.rotation.z += 0.01; // Maintenir la rotation continue autour de l'axe Z
        }
    });



    return (
        <group scale={viewport.width / 3.75} >
            <Text font={'/fonts/GeneralSans-Medium.ttf'} position={[0, 0.2, -1]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                NICOLAS
            </Text>
            <Text font={'/fonts/GeneralSans-Medium.ttf'} position={[0, -0.2, -1]} fontSize={0.5} color="#5F5953" anchorX="center" anchorY="middle">
                ANJORAND
            </Text>
            <mesh ref={torus} geometry={nodes.Torus002.geometry}>
                <MeshTransmissionMaterial transmission={1} color="white" {...materialProps}/>
            </mesh>
        </group>
    )
}
