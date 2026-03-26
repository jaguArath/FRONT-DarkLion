import React, {
  Suspense,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

const TEXT_CONFIG = {
  x: 761,
  nameY: 309,
  numberY: 500,
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
  nameColor = "rgb(0, 0, 0)",
  nameFont = "ARBORIA",
  numberColor = "rgb(0, 0, 0)",
  numberFont = "ARBORIA",
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Fondo con el color de la espalda para que el nombre y número destaquen sobre él
  ctx.fillStyle = baseColor || "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Función auxiliar para determinar si un color es claro u oscuro
  const isLightColor = (color) => {
    if (color.includes("rgb")) {
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]);
        const g = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5;
      }
    }
    return false;
  };

  // Nombre - Centrado en la parte superior
  const nameFamily = FONT_MAP[nameFont] || FONT_MAP.ARBORIA;
  ctx.font = `bold 60px "${nameFamily}", sans-serif`;
  ctx.fillStyle = nameColor;
  ctx.lineWidth = 6;
  // Si el texto es claro, el stroke es oscuro; si es oscuro, el stroke es claro
  ctx.strokeStyle = isLightColor(nameColor)
    ? "rgb(0, 0, 0)"
    : "rgb(255, 255, 255)";
  ctx.strokeText(playerName.toUpperCase(), TEXT_CONFIG.x, TEXT_CONFIG.nameY);
  ctx.fillStyle = nameColor;
  ctx.fillText(playerName.toUpperCase(), TEXT_CONFIG.x, TEXT_CONFIG.nameY);

  // Número - Centrado en la parte inferior
  const numberFamily = FONT_MAP[numberFont] || FONT_MAP.ARBORIA;
  ctx.font = `bold 150px "${numberFamily}", sans-serif`;
  ctx.fillStyle = numberColor;
  ctx.lineWidth = 15;
  // Si el texto es claro, el stroke es oscuro; si es oscuro, el stroke es claro
  ctx.strokeStyle = isLightColor(numberColor)
    ? "rgb(0, 0, 0)"
    : "rgb(255, 255, 255)";
  ctx.strokeText(playerNumber.toString(), TEXT_CONFIG.x, TEXT_CONFIG.numberY);
  ctx.fillStyle = numberColor;
  ctx.fillText(playerNumber.toString(), TEXT_CONFIG.x, TEXT_CONFIG.numberY);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;

  console.log(`✅ Textura de jugador generada: ${playerName} #${playerNumber}`);

  return texture;
}

// Función para componer diseño con nombre y número del jugador
function composePlayerNameOnDesign(
  playerName,
  playerNumber,
  designImageUrl,
  nameColor = "rgb(255, 255, 255)",
  nameFont = "ARBORIA",
  numberColor = "rgb(255, 255, 255)",
  numberFont = "ARBORIA",
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

      // Función auxiliar para determinar si un color es claro u oscuro
      const isLightColor = (color) => {
        if (color.includes("rgb")) {
          const matches = color.match(/\d+/g);
          if (matches && matches.length >= 3) {
            const r = parseInt(matches[0]);
            const g = parseInt(matches[1]);
            const b = parseInt(matches[2]);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance > 0.5;
          }
        }
        return false;
      };

      // Nombre
      const nameFamily = FONT_MAP[nameFont] || FONT_MAP.ARBORIA;
      ctx.font = `bold 60px "${nameFamily}", sans-serif`;
      ctx.fillStyle = nameColor;
      ctx.lineWidth = 6;
      ctx.strokeStyle = isLightColor(nameColor)
        ? "rgb(0, 0, 0)"
        : "rgb(255, 255, 255)";
      ctx.strokeText(
        playerName.toUpperCase(),
        TEXT_CONFIG.x,
        TEXT_CONFIG.nameY,
      );
      ctx.fillStyle = nameColor;
      ctx.fillText(playerName.toUpperCase(), TEXT_CONFIG.x, TEXT_CONFIG.nameY);

      // Número
      const numberFamily = FONT_MAP[numberFont] || FONT_MAP.ARBORIA;
      ctx.font = `bold 150px "${numberFamily}", sans-serif`;
      ctx.fillStyle = numberColor;
      ctx.lineWidth = 15;
      ctx.strokeStyle = isLightColor(numberColor)
        ? "rgb(0, 0, 0)"
        : "rgb(255, 255, 255)";
      ctx.strokeText(
        playerNumber.toString(),
        TEXT_CONFIG.x,
        TEXT_CONFIG.numberY,
      );
      ctx.fillStyle = numberColor;
      ctx.fillText(playerNumber.toString(), TEXT_CONFIG.x, TEXT_CONFIG.numberY);

      const texture = new THREE.CanvasTexture(canvas);
      texture.flipY = false;

      console.log(
        `✅ Textura de jugador + diseño generada: ${playerName} #${playerNumber}`,
      );

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
  nameColor = "rgb(255, 255, 255)",
  nameFont = "ARBORIA",
  numberColor = "rgb(255, 255, 255)",
  numberFont = "ARBORIA",
}) {
  const { scene } = useGLTF("/camisa3D/camiseta.glb");
  const groupRef = useRef(null);
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const [playerTexturesCache, setPlayerTexturesCache] = useState({});

  useEffect(() => {
    if (!scene) return;

    console.log("🎬 useEffect ejecutándose...");
    console.log("visiblePlayer:", visiblePlayer);
    console.log("designs:", designs);
    console.log("colors:", colors);

    // ⚠️ LOG DIAGNÓSTICO: Mostrar estructura del modelo
    console.group("📦 ESTRUCTURA DEL MODELO 3D");
    const meshes = [];
    scene.traverse((node) => {
      if (node.isMesh) {
        meshes.push(node.name);
        console.log(`  ✓ Mesh: "${node.name}"`);
      }
    });
    console.groupEnd();
    console.log("Copia esta lista de meshes para compartir con soporte ↑");

    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        try {
          // ⚠️ IGNORAR contenedores o meshes innecesarios
          if (node.name === "cloth_parent" || node.name === "root") {
            console.warn(`⏭️ Ignorando mesh contenedor: "${node.name}"`);
            return;
          }

          // Clonar material para evitar compartirlo
          const material = node.material.clone();

          // Determinar qué parte es (por nombre exacto)
          const nodeName = node.name;
          const nodeNameLower = nodeName.toLowerCase();
          let partType = null;

          // Mapeo más preciso según los nombres reales del modelo
          if (nodeNameLower === "frente") {
            partType = "torso";
          } else if (nodeNameLower === "espalda") {
            partType = "back";
          } else if (nodeNameLower === "manga_derecha") {
            partType = "manga_derecha";
          } else if (nodeNameLower === "manga_izquierda") {
            partType = "manga_izquierda";
          } else if (
            nodeNameLower.includes("back") ||
            nodeNameLower.includes("espalda") ||
            nodeNameLower.includes("atrás") ||
            nodeNameLower.includes("atras")
          ) {
            partType = "back";
          } else if (
            nodeNameLower.includes("manga_derecha") ||
            nodeNameLower.includes("right sleeve") ||
            nodeNameLower.includes("sleeve_right")
          ) {
            partType = "manga_derecha";
          } else if (
            nodeNameLower.includes("manga_izquierda") ||
            nodeNameLower.includes("left sleeve") ||
            nodeNameLower.includes("sleeve_left")
          ) {
            partType = "manga_izquierda";
          } else if (
            nodeNameLower.includes("sleeve") ||
            nodeNameLower.includes("manga") ||
            nodeNameLower.includes("arm")
          ) {
            partType = "sleeves";
          } else if (
            nodeNameLower.includes("collar") ||
            nodeNameLower.includes("cuello") ||
            nodeNameLower.includes("neck")
          ) {
            partType = "collar";
          }

          // Si no se reconoce la parte, saltarla
          if (partType === null) {
            console.warn(`⚠️ Mesh desconocido (saltado): "${nodeName}"`);
            return;
          }

          console.log(
            `%c"${nodeName}" → ${partType}: ${colors[partType] || "sin color"}`,
            `color: ${colors[partType] || "#ccc"}; font-weight: bold;`,
          );

          // Verificar la condición de jugador visible
          console.log(
            `Checking partType="${partType}", visiblePlayer=${visiblePlayer ? visiblePlayer.name : "null"}, visiblePlayer.name=${visiblePlayer?.name}`,
          );

          // 🧹 LIMPIAR TODO PRIMERO
          material.map = null;
          material.normalMap = null;
          material.roughnessMap = null;
          material.metalnessMap = null;
          material.aoMap = null;
          material.emissiveMap = null;
          material.lightMap = null;
          material.needsUpdate = true;

          let hasAsyncTexture = false;

          // Lógica mejorada: Jugador + Diseño se componen, no se reemplazan
          if (partType === "back" && visiblePlayer && visiblePlayer.name) {
            console.log("✓ Se va a aplicar textura de jugador");
            // Si es la espalda y hay un jugador visible
            if (designs[partType]) {
              console.log("  - Con diseño");
              // Si hay diseño, componer nombre sobre diseño
              const cacheKey = `${designs[partType]}.${visiblePlayer.name}.${visiblePlayer.number}.${nameColor}.${numberColor}.${nameFont}.${numberFont}`;

              if (playerTexturesCache[cacheKey]) {
                // Usar textura en caché
                console.log("  - Usando caché");
                material.map = playerTexturesCache[cacheKey];
                // Preservar el color de fondo o usar gris neutro para mejor tonalidad
                material.color.set(colors[partType] || 0xe8e8e8);
                material.roughness = 0.92;
                material.metalness = 0;
              } else {
                // Crear nuevo composición de diseño + nombre
                console.log("  - Creando nueva textura");
                hasAsyncTexture = true;
                composePlayerNameOnDesign(
                  visiblePlayer.name,
                  visiblePlayer.number,
                  designs[partType],
                  nameColor,
                  nameFont,
                  numberColor,
                  numberFont,
                )
                  .then((texture) => {
                    console.log("✓ Textura de jugador + diseño aplicada");
                    material.map = texture;
                    // Preservar el color de fondo o usar gris neutro para mejor tonalidad
                    material.color.set(colors[partType] || 0xe8e8e8);
                    material.roughness = 0.92;
                    material.metalness = 0;
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
                      nameColor,
                      nameFont,
                      numberColor,
                      numberFont,
                    );
                    material.map = playerTexture;
                    // Preservar el color de fondo o usar gris neutro para mejor tonalidad
                    material.color.set(colors[partType] || 0xe8e8e8);
                    material.roughness = 0.92;
                    material.metalness = 0;
                    material.needsUpdate = true;
                    node.material = material;
                  });
              }
            } else {
              console.log("  - Sin diseño, solo nombre");
              // Sin diseño, solo mostrar nombre y número con color de fondo
              const playerTexture = generatePlayerNameTexture(
                visiblePlayer.name,
                visiblePlayer.number,
                colors[partType] || "#FFFFFF",
                nameColor,
                nameFont,
                numberColor,
                numberFont,
              );
              material.map = playerTexture;
              // Preservar el color de fondo o usar gris neutro para mejor tonalidad
              material.color.set(colors[partType] || 0xe8e8e8);
              material.roughness = 0.92;
              material.metalness = 0;
              material.needsUpdate = true;
            }
          } else if (designs[partType]) {
            console.log("✓ Se va a aplicar diseño (sin jugador)");
            // Si hay diseño para esta parte (sin jugador visible), aplicarlo
            textureLoaderRef.current.load(designs[partType], (texture) => {
              texture.flipY = false;
              material.map = texture;
              // Preservar el color de fondo o usar gris neutro para mejor tonalidad
              material.color.set(colors[partType] || 0xe8e8e8);
              material.roughness = 0.92;
              material.metalness = 0;
              material.needsUpdate = true;
              node.material = material;
            });
            hasAsyncTexture = true;
          } else {
            console.log("✓ Solo color sólido");
            // 🎨 SOLO COLOR: sin diseño ni jugador
            if (colors[partType]) {
              material.color.set(colors[partType]);
            } else {
              material.color.set("#FFFFFF"); // Color blanco por defecto
            }
            // Asegurar que NO hay textura
            material.map = null;
            material.roughness = 0.92;
            material.metalness = 0;
          }

          // Limpiar mapas finales para que no haya ruido
          material.normalMap = null;
          material.roughnessMap = null;
          material.metalnessMap = null;
          material.aoMap = null;
          material.emissiveMap = null;
          material.lightMap = null;

          // Propiedades de material para un look limpio
          material.metalness = 0;
          material.needsUpdate = true;

          // Solo asignar material si no hay texturas asincrónicas pendientes
          if (!hasAsyncTexture) {
            console.log("Asignando material al nodo (síncrono)");
            node.material = material;
          }
        } catch (error) {
          console.error("Error aplicando color/textura:", error);
        }
      }
    });
  }, [
    colors,
    designs,
    visiblePlayer,
    scene,
    playerTexturesCache,
    nameColor,
    nameFont,
    numberColor,
    numberFont,
  ]);

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
  (
    {
      colors = {},
      design = "",
      designs = {},
      visiblePlayer = null,
      nameColor = "rgb(0, 0, 0)",
      nameFont = "ARBORIA",
      numberColor = "rgb(0, 0, 0)",
      numberFont = "ARBORIA",
    },
    ref,
  ) => {
    const canvasContainerRef = useRef(null);
    const [rotationY, setRotationY] = useState(0);
    const [isCapturing, setIsCapturing] = useState(false);
    const [tempHidePlayerText, setTempHidePlayerText] = useState(false);
    const orbitControlsRef = useRef(null);

    // Convertir design string a objeto designs o usar designs con nueva estructura
    const designsObject = useMemo(() => {
      if (design) {
        return {
          torso: design,
          back: design,
          sleeves: design,
          manga_izquierda: design,
          manga_derecha: design,
          collar: design,
        };
      }

      return Object.keys(designs).reduce((acc, key) => {
        // Si designs[key] es un objeto con {design, visible}, usar solo el design si visible es true
        if (typeof designs[key] === "object" && "design" in designs[key]) {
          acc[key] = designs[key].visible ? designs[key].design : "";
        } else {
          // Mantener compatibilidad si designs[key] es un string directo
          acc[key] = designs[key] || "";
        }
        return acc;
      }, {});
    }, [design, designs]);

    useImperativeHandle(ref, () => ({
      captureImage: async (hidePlayerText = false) => {
        // Captura solo la vista frontal
        if (hidePlayerText) {
          setTempHidePlayerText(true);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const canvas = canvasContainerRef.current?.querySelector("canvas");
        if (!canvas) {
          console.warn("Canvas no encontrado");
          if (hidePlayerText) setTempHidePlayerText(false);
          return null;
        }
        try {
          const result = canvas.toDataURL("image/png", 1.0);
          if (hidePlayerText) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setTempHidePlayerText(false);
          }
          return result;
        } catch (err) {
          console.error("Error capturando imagen:", err);
          if (hidePlayerText) setTempHidePlayerText(false);
          return null;
        }
      },
      captureImageBothSides: async (hidePlayerText = false) => {
        // Captura 4 vistas: frente, atrás, manga izquierda y manga derecha
        // Primero reseteamos la posición a frontal
        return new Promise((resolve) => {
          // Si necesita ocultar texto de jugador, establecer el estado
          if (hidePlayerText) {
            setTempHidePlayerText(true);
          }

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

                    // Restaurar visibilidad de texto si fue ocultado
                    if (hidePlayerText) {
                      setTempHidePlayerText(false);
                    }

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
                  if (hidePlayerText) {
                    setTempHidePlayerText(false);
                  }
                }
              }
            }, 150);
          };

          // Esperar a que se renderice la posición inicial (con más tiempo si ocultamos texto)
          const initialDelay = hidePlayerText ? 150 : 100;
          setTimeout(() => {
            // Capturar frente (0°)
            captureAtRotation(0, "frente");

            // Capturar manga izquierda (90°, lado izquierdo)
            setTimeout(() => {
              captureAtRotation(Math.PI / 2, "mangaIzquierda");
            }, 300);

            // Capturar atrás (180°)
            setTimeout(() => {
              captureAtRotation(Math.PI, "atras");
            }, 600);

            // Capturar manga derecha (-90°, lado derecho)
            setTimeout(() => {
              captureAtRotation(-Math.PI / 2, "mangaDerecha");
            }, 900);
          }, initialDelay);
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
          <ambientLight intensity={0.9} />

          <hemisphereLight
            skyColor={"#ffffff"}
            groundColor={"#e0e0e0"}
            intensity={0.6}
          />

          <directionalLight position={[5, 5, 5]} intensity={0.4} />

          <directionalLight position={[15, 5, 5]} intensity={0.3} />

          {/* Entorno HDR */}
          <Environment preset="warehouse" intensity={0.5} />

          <Suspense fallback={null}>
            <ShirtModel
              colors={colors}
              designs={designsObject}
              visiblePlayer={tempHidePlayerText ? null : visiblePlayer}
              rotationY={rotationY}
              nameColor={nameColor}
              nameFont={nameFont}
              numberColor={numberColor}
              numberFont={numberFont}
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
