import React, {
  Suspense,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

const TEXT_CONFIG = {
  x: 780,
  nameY: 290,
  numberY: 410
};

// Mapeo de fuentes
const FONT_MAP = {
  ARBORIA: "Arboria",
  CHAKRA: "Chakra",
  MONTSERRAT: "Montserrat1",
};

// Función para generar textura de nombre y número con diseño de base
function generatePlayerNameTexture(
  playerName,
  playerNumber,
  baseColor = "#FFFFFF",
  textColor = "rgb(0, 0, 0)",
  fontType = "ARBORIA",
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Fondo
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const fontFamily = FONT_MAP[fontType] || FONT_MAP.ARBORIA;

  // Nombre
  ctx.font = `bold 50px "${fontFamily}", sans-serif`;
  ctx.fillStyle = textColor;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.strokeText(playerName.toUpperCase(), 780, 290);
  ctx.fillStyle = textColor;
  ctx.fillText(playerName.toUpperCase(), 780, 290);

  // Número
  ctx.font = `bold 100px "${fontFamily}", sans-serif`;
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.strokeText(playerNumber.toString(), 770, 410);
  ctx.fillStyle = textColor;
  ctx.fillText(playerNumber.toString(), 770, 410);

  const texture = new THREE.CanvasTexture(canvas);

  // ✅ FIX IMPORTANTE
  texture.flipY = false;

  return texture;
}

// Función para componer diseño con nombre y número del jugador
function composePlayerNameOnDesign(
  playerName,
  playerNumber,
  designImageUrl,
  textColor = "rgb(255, 255, 255)",
  fontType = "ARBORIA",
) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      // Dibujar diseño base
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const fontFamily = FONT_MAP[fontType] || FONT_MAP.ARBORIA;

      // Nombre
      ctx.font = `bold 50px "${fontFamily}", sans-serif`;
      ctx.fillStyle = textColor;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.strokeText(playerName.toUpperCase(), TEXT_CONFIG.x, TEXT_CONFIG.nameY);
      ctx.fillStyle = textColor;
      ctx.fillText(playerName.toUpperCase(), TEXT_CONFIG.x, TEXT_CONFIG.nameY);

      // Número
      ctx.font = `bold 100px "${fontFamily}", sans-serif`;
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.strokeText(playerNumber.toString(), TEXT_CONFIG.x, TEXT_CONFIG.numberY);
      ctx.fillStyle = textColor;
      ctx.fillText(playerNumber.toString(), TEXT_CONFIG.x, TEXT_CONFIG.numberY);

      const texture = new THREE.CanvasTexture(canvas);

      // ✅ FIX CLAVE
      texture.flipY = false;

      resolve(texture);
    };

    image.onerror = () => reject(new Error("Error cargando imagen"));
    image.src = designImageUrl;
  });
}

function ShirtModel({
  colors = {},
  designs = {},
  visiblePlayer = null,
  rotationY = 0,
  textColor = "rgb(255, 255, 255)",
  fontType = "ARBORIA",
}) {
  const { scene } = useGLTF("/camisa3D/camiseta.glb");
  const groupRef = useRef(null);
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const [playerTexturesCache, setPlayerTexturesCache] = useState({});

  useEffect(() => {
    if (!scene) return;

    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        try {
          // Clonar material para evitar compartirlo
          const material = node.material.clone();

          // Determinar qué parte es (por nombre o por orden)
          const nodeName = node.name.toLowerCase();
          let partType = "torso"; // por defecto

          if (nodeName.includes("back") || nodeName.includes("espalda")) {
            partType = "back";
          } else if (
            nodeName.includes("sleeve") ||
            nodeName.includes("manga")
          ) {
            partType = "sleeves";
          } else if (
            nodeName.includes("collar") ||
            nodeName.includes("cuello")
          ) {
            partType = "collar";
          }

          // Lógica mejorada: Jugador + Diseño se componen, no se reemplazan
          if (partType === "torso" && visiblePlayer && visiblePlayer.name) {
            // Si es el torso y hay un jugador visible
            if (designs[partType]) {
              // Si hay diseño, componer nombre sobre diseño
              const cacheKey = `${designs[partType]}.${visiblePlayer.name}.${visiblePlayer.number}`;

              if (playerTexturesCache[cacheKey]) {
                // Usar textura en caché
                material.map = playerTexturesCache[cacheKey];
              } else {
                // Crear nuevo composición de diseño + nombre
                composePlayerNameOnDesign(
                  visiblePlayer.name,
                  visiblePlayer.number,
                  designs[partType],
                  textColor,
                  fontType,
                )
                  .then((texture) => {
                    material.map = texture;
                    material.needsUpdate = true;
                    setPlayerTexturesCache((prev) => ({
                      ...prev,
                      [cacheKey]: texture,
                    }));
                    node.material = material;
                  })
                  .catch((error) => {
                    console.error(
                      "Error componiendo diseño con nombre:",
                      error,
                    );
                    // Fallback: mostrar solo nombre sin diseño
                    const playerTexture = generatePlayerNameTexture(
                      visiblePlayer.name,
                      visiblePlayer.number,
                      colors[partType] || "#FFFFFF",
                      textColor,
                      fontType,
                    );
                    material.map = playerTexture;
                    material.needsUpdate = true;
                    node.material = material;
                  });
              }
            } else {
              // Sin diseño, solo mostrar nombre y número con color de fondo
              const playerTexture = generatePlayerNameTexture(
                visiblePlayer.name,
                visiblePlayer.number,
                colors[partType] || "#FFFFFF",
                textColor,
                fontType,
              );
              material.map = playerTexture;
            }
          } else if (designs[partType]) {
            // Si hay diseño para esta parte (sin jugador visible), aplicarlo
            textureLoaderRef.current.load(designs[partType], (texture) => {
              texture.flipY = false; // ✅ importante
              texture.needsUpdate = true;
              material.map = texture;
              material.needsUpdate = true;
            });
          } else {
            // Si no hay diseño ni jugador, aplicar solo color
            if (colors[partType]) {
              material.color.set(colors[partType]);
            }
            material.map = null;
          }

          // Eliminar otras texturas
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
          console.error("Error aplicando color/textura:", error);
        }
      }
    });
  }, [colors, designs, visiblePlayer, scene, playerTexturesCache, textColor, fontType]);

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
  return null;
}

const ShirtViewer3D = forwardRef(
  ({ colors = {}, design = "", designs = {}, visiblePlayer = null, textColor = "rgb(255, 255, 255)", fontType = "ARBORIA" }, ref) => {
    const canvasContainerRef = useRef(null);
    const [rotationY, setRotationY] = useState(0);
    const [isCapturing, setIsCapturing] = useState(false);
    const orbitControlsRef = useRef(null);

    // Convertir design string a objeto designs
    const designsObject = design ? { torso: design, back: design } : designs;

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
              const canvas =
                canvasContainerRef.current?.querySelector("canvas");
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
                      mangaDerecha: images.mangaDerecha,
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
      },
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

          <directionalLight position={[5, 5, 5]} intensity={1} />

          <directionalLight position={[15, 5, 5]} intensity={1.5} />

          {/* Entorno HDR */}
          <Environment preset="studio" />

          <Suspense fallback={null}>
            <ShirtModel
              colors={colors}
              designs={designsObject}
              visiblePlayer={visiblePlayer}
              rotationY={rotationY}
              textColor={textColor}
              fontType={fontType}
            />
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
      </div>
    );
  },
);

ShirtViewer3D.displayName = "ShirtViewer3D";

export default ShirtViewer3D;
