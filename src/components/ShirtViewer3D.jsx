
import React, {
  Suspense,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment, Text } from "@react-three/drei";

function ShirtModel({ colors = {}, rotationY = 0 }) {
  const { scene } = useGLTF("/camisa3D/camiseta.glb");
  const groupRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        try {
          // Clonar material para evitar compartirlo
          const material = node.material.clone();

          // Aplicar color si existe
          if (colors.torso) {
            material.color.set(colors.torso);
          }

          // Eliminar texturas
          material.map = null;
          material.normalMap = null;
          material.roughnessMap = null;
          material.metalnessMap = null;
          material.aoMap = null;

          // Propiedades de material
          material.roughness = 0.8;
          material.metalness = 0;

          material.needsUpdate = true;

          node.material = material;
        } catch (error) {
          console.error("Error aplicando color:", error);
        }
      }
    });
  }, [colors, scene]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
    }
  }, [rotationY]);

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={2} />
      </Center>
    </group>
  );
}

function PlayerText({ visiblePlayer, rotationY = 0 }) {
  if (!visiblePlayer) return null;

  // Calcular tamaño de fuente dinámico basado en la longitud del nombre
  // Nombres cortos más grandes, nombres largos más pequeños
  const nameLength = visiblePlayer.name.length;
  const nameFontSize = Math.max(0.6, Math.min(1.2, 1.5 - nameLength * 0.1));
  
  // Escala dinámica para mantener todo centrado
  const maxWidth = 3.5;

  // Ajustar rotación del texto basado en la rotación del modelo
  const textRotation = Math.PI - rotationY;

  return (
    <>
      {/* Nombre del jugador */}
      <Text
        position={[0, 1.6, -1.6]}
        rotation={[0, textRotation, 0]}
        fontSize={nameFontSize}
        maxWidth={maxWidth}
        color="white"
        textAlign="center"
        strokeWidth={0.05}
        stroke="black"
        anchorX="center"
        anchorY="middle"
      >
        {visiblePlayer.name.toUpperCase()}
      </Text>
      {/* Número del jugador */}
      <Text
        position={[0, -0.4, -1.6]}
        rotation={[0, textRotation, 0]}
        fontSize={3}
        color="white"
        fontWeight="bold"
        textAlign="center"
        strokeWidth={0.1}
        stroke="black"
        anchorX="center"
        anchorY="middle"
      >
        {visiblePlayer.number}
      </Text>

    </>
  );
}

const ShirtViewer3D = forwardRef(({ colors = {}, design = "", visiblePlayer = null }, ref) => {
  const canvasContainerRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const orbitControlsRef = useRef(null);

  useImperativeHandle(ref, () => ({
    captureImage: async () => {
      // Captura solo la vista frontal
      const canvas = canvasContainerRef.current?.querySelector("canvas");
      if (!canvas) {
        console.warn("Canvas no encontrado");
        return null;
      }
      try {
        return canvas.toDataURL("image/png", 1.0);
      } catch (err) {
        console.error("Error capturando imagen:", err);
        return null;
      }
    },
    captureImageBothSides: async () => {
      // Captura 4 vistas: frente, atrás, manga izquierda y manga derecha
      // Primero reseteamos la posición a frontal
      return new Promise((resolve) => {
        setIsCapturing(true);
        
        // Desactivar controles
        if (orbitControlsRef.current) {
          orbitControlsRef.current.enabled = false;
          // Resetear también la rotación de los controles
          orbitControlsRef.current.reset();
        }

        // Resetear a posición inicial (frente)
        setRotationY(0);

        const images = {};
        let capturedCount = 0;

        const captureAtRotation = (angle, side) => {
          setRotationY(angle);
          // Esperar a que el render se actualice
          setTimeout(() => {
            const canvas = canvasContainerRef.current?.querySelector("canvas");
            if (canvas) {
              try {
                images[side] = canvas.toDataURL("image/png", 1.0);
                capturedCount++;
                
                if (capturedCount === 4) {
                  // Volver a la posición frontal y reactivar controles
                  setRotationY(0);
                  if (orbitControlsRef.current) {
                    orbitControlsRef.current.enabled = true;
                  }
                  setIsCapturing(false);
                  resolve({
                    frente: images.frente,
                    atras: images.atras,
                    mangaIzquierda: images.mangaIzquierda,
                    mangaDerecha: images.mangaDerecha
                  });
                }
              } catch (err) {
                console.error(`Error capturando ${side}:`, err);
                setIsCapturing(false);
                if (orbitControlsRef.current) {
                  orbitControlsRef.current.enabled = true;
                }
              }
            }
          }, 150);
        };

        // Esperar a que se renderice la posición inicial
        setTimeout(() => {
          // Capturar frente (0°)
          captureAtRotation(0, "frente");
          
          // Capturar manga derecha (90°, lado derecho)
          setTimeout(() => {
            captureAtRotation(Math.PI / 2, "mangaDerecha");
          }, 300);

          // Capturar atrás (180°)
          setTimeout(() => {
            captureAtRotation(Math.PI, "atras");
          }, 600);

          // Capturar manga izquierda (-90°, lado izquierdo)
          setTimeout(() => {
            captureAtRotation(-Math.PI / 2, "mangaIzquierda");
          }, 900);
        }, 100);
      });
    }
  }));

  return (
    <div className="w-full h-full relative" ref={canvasContainerRef}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }} 
        style={{ background: "#f5f5f5" }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.5} />

        <hemisphereLight
          skyColor={"#000000"}
          groundColor={"#444444"}
          intensity={1}
        />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
        />

        <directionalLight
          position={[15, 5, 5]}
          intensity={1.5}
        />

        {/* Entorno HDR */}
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <ShirtModel colors={colors} rotationY={rotationY} />
          <PlayerText visiblePlayer={visiblePlayer} rotationY={rotationY} />
        </Suspense>

        {/* Controles */}
        <OrbitControls
          ref={orbitControlsRef}
          enableZoom
          enablePan={false}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>

      {/* Diseño overlay - mostrado encima de la camisa */}
      {design && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <img
            src={design}
            alt="Diseño seleccionado"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.6,
              mixBlendMode: "screen"
            }}
          />
        </div>
      )}
    </div>
  );
});

ShirtViewer3D.displayName = "ShirtViewer3D";

export default ShirtViewer3D;





