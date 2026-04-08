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

const UV_REGIONS = {
  frente: { x: 0.0000, y: 0.1172, w: 0.50, h: 0.6527 },
  espalda: { x: 0.50, y: 0.1172, w: 0.45, h: 0.7227 },
  manga_izquierda: { x: 0.50, y: 0.8008, w: 0.40, h: 0.1592 },
  manga_derecha: { x: 0.000, y: 0.8008, w: 0.550, h: 0.15 },
};

const NECK_REGIONS = {
  neck_front: { x: 0.100, y: 0.0586, w: 0.5044, h: 0.0195 },
  neck_back: { x: 0.6250, y: 0.0586, w: 0.2344, h: 0.0195 },
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
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  console.log(`✅ Textura de jugador generada: ${playerName} #${playerNumber}`);

  return texture;
}

// Función para componer diseño con nombre y número del jugador
function composePlayerNameOnDesign(
  playerName,
  playerNumber,
  designImageUrl,
  shirtColor = "#FFFFFF",
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
      // 1. Pintar el fondo con el color de la espalda
      ctx.fillStyle = shirtColor || "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Dibujar diseño con multiply para teñirlo por el color de fondo
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over"; // Restaurar modo normal

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

      // 3. Dibujar nombre y número
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
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;

      console.log(
        `✅ Textura de jugador + diseño generada: ${playerName} #${playerNumber}`,
      );

      resolve(texture);
    };

    image.onerror = () => reject(new Error("Error cargando imagen"));
    image.src = designImageUrl;
  });
}

// Función maestra para generar la textura COMPLETA por UVs
async function generateComposedTexture(
  colors = {},
  designs = {},
  visiblePlayer = null,
  nameColor = "rgb(255, 255, 255)",
  nameFont = "ARBORIA",
  numberColor = "rgb(255, 255, 255)",
  numberFont = "ARBORIA",
  textureLoader = null
) {
  const canvas = document.createElement("canvas");
  canvas.width = 2048; // Alta resolución para UVs complejos
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");

  // 1. Fondo base neutro (gris oscuro por si algo falla)
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Función para pintar una región UV con color y diseño
  const processRegion = async (id, region, color, designUrl) => {
    const rx = region.x * canvas.width;
    const ry = region.y * canvas.height;
    const rw = region.w * canvas.width;
    const rh = region.h * canvas.height;

    // Pintar color base del área
    ctx.fillStyle = color || "#FFFFFF";
    ctx.fillRect(rx, ry, rw, rh);

    // Pintar diseño si existe
    if (designUrl) {
      try {
        const img = await new Promise((res, rej) => {
          const i = new Image();
          i.crossOrigin = "anonymous";
          i.onload = () => res(i);
          i.onerror = rej;
          i.src = designUrl;
        });

        ctx.save();
        ctx.beginPath();
        ctx.rect(rx, ry, rw, rh);
        ctx.clip();

        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(img, rx, ry, rw, rh);
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
      } catch (err) {
        console.warn(`⚠️ No se pudo cargar el diseño para la región ${id}:`, err);
      }
    }
  };

  // Dibujar todas las regiones principales
  const REGION_KEYS = {
    frente: "torso",
    espalda: "back",
    manga_izquierda: "manga_izquierda",
    manga_derecha: "manga_derecha",
  };

  for (const [uvKey, configKey] of Object.entries(REGION_KEYS)) {
    await processRegion(
      uvKey,
      UV_REGIONS[uvKey],
      colors[configKey],
      designs[configKey]
    );
  }

  // Dibujar regiones del cuello (usando el color 'collar')
  const neckParts = Object.keys(NECK_REGIONS);
  for (const neckPart of neckParts) {
    await processRegion(neckPart, NECK_REGIONS[neckPart], colors.collar, designs.collar);
  }

  // 2. Jugador (Nombre y Número en la espalda)
  if (visiblePlayer && visiblePlayer.name) {
    const backRegion = UV_REGIONS.espalda;
    const bx = backRegion.x * canvas.width;
    const by = backRegion.y * canvas.height;
    const bw = backRegion.w * canvas.width;
    const bh = backRegion.h * canvas.height;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const isLightColor = (color) => {
      if (!color || !color.includes("rgb")) return false;
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]);
        const g = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return l > 0.5;
      }
      return false;
    };

    // Nombre
    const nameFamily = FONT_MAP[nameFont] || FONT_MAP.ARBORIA;
    ctx.font = `bold ${Math.floor(bh * 0.07)}px "${nameFamily}", sans-serif`;
    ctx.fillStyle = nameColor;
    ctx.lineWidth = Math.floor(bh * 0.008);
    ctx.strokeStyle = isLightColor(nameColor) ? "black" : "white";

    // Coordenadas locales dentro de la región 'espalda'
    // El TEXT_CONFIG original usaba 761 (x) y 309 (y) sobre 1024.
    // Adaptamos esas proporciones al centro de la región 'espalda'.
    const cx = bx + bw / 2;
    const nameY = by + bh * 0.22;
    const numberY = by + bh * 0.35;

    // ctx.strokeText(visiblePlayer.name.toUpperCase(), cx, nameY);
    // ctx.fillText(visiblePlayer.name.toUpperCase(), cx, nameY);
    ctx.strokeText(visiblePlayer.name.toUpperCase(), cx, nameY);
    ctx.fillStyle = nameColor;
    ctx.fillText(visiblePlayer.name.toUpperCase(), cx, nameY);

    // Número
    const numberFamily = FONT_MAP[numberFont] || FONT_MAP.ARBORIA;
    ctx.font = `bold ${Math.floor(bh * 0.18)}px "${numberFamily}", sans-serif`;
    ctx.lineWidth = Math.floor(bh * 0.015);
    ctx.strokeStyle = isLightColor(numberColor) ? "black" : "white";
    ctx.strokeText(visiblePlayer.number.toString(), cx, numberY);
    ctx.fillStyle = numberColor;
    ctx.fillText(visiblePlayer.number.toString(), cx, numberY);

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  console.log("🎨 Textura COMPUESTA basada en UVs generada exitosamente");
  return texture;
}

function ShirtModel({
  shirtType = "cuello-redondo",
  colors = {},
  designs = {},
  visiblePlayer = null,
  rotationY = 0,
  nameColor = "rgb(255, 255, 255)",
  nameFont = "ARBORIA",
  numberColor = "rgb(255, 255, 255)",
  numberFont = "ARBORIA",
}) {
  const { modelPath, modelScale } = useMemo(() => {
    const map = {
      "cuello-redondo": { path: "/camisa3D/CamisaCuelloRedondo.glb", scale: 2 },
      "cuello-v": { path: "/camisa3D/camiseta.glb", scale: 5 },
      "cuello-camisola": { path: "/camisa3D/camiseta1.glb", scale: 20 },
      "cuello-tank-top": { path: "/camisa3D/CamisaCuelloRedondo.glb", scale: 2 },
    };
    const selected = map[shirtType] || map["cuello-redondo"];
    return { modelPath: selected.path, modelScale: selected.scale };
  }, [shirtType]);
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef(null);
  const textureLoaderRef = useRef(new THREE.TextureLoader());

  useEffect(() => {
    if (!scene) return;

    console.log("🎬 useEffect ejecutándose (Estrategia UV)...");

    // Generar la textura compuesta de forma asíncrona
    generateComposedTexture(
      colors,
      designs,
      visiblePlayer,
      nameColor,
      nameFont,
      numberColor,
      numberFont
    ).then((composedTexture) => {
      scene.traverse((node) => {
        if (node.isMesh && node.material) {
          // Ignorar piezas interiores si se desea, o aplicarles un color básico
          if (node.name.toLowerCase().includes("interior")) {
            const innerMat = node.material.clone();
            innerMat.color.setHex(0xffffff); // Blanco puro para el interior
            innerMat.map = null;
            node.material = innerMat;
            return;
          }

          // Aplicar la textura compuesta a la malla exterior
          const material = node.material.clone();
          material.map = composedTexture;
          material.color.set("#FFFFFF"); // El color ya está en la textura
          material.roughness = 0.95;
          material.metalness = 0;
          material.needsUpdate = true;
          node.material = material;

          console.log(`✅ Textura UV aplicada a: ${node.name}`);
        }
      });
    }).catch(err => {
      console.error("❌ Error generando la textura compuesta:", err);
    });
  }, [
    colors,
    designs,
    visiblePlayer,
    scene,
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
    // mover la camisa 3d un poco hacia arriba para centrarla mejor en la vista
    <group ref={groupRef} position={[0, 0, 0]}>
      <Center>
        <primitive object={scene} scale={modelScale} />
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
      shirtType,
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

            // Capturar manga izquierda (-90°, lado izquierdo)
            setTimeout(() => {
              captureAtRotation(-Math.PI / 2, "mangaIzquierda");
            }, 300);

            // Capturar atrás (180°)
            setTimeout(() => {
              captureAtRotation(Math.PI, "atras");
            }, 600);

            // Capturar manga derecha (90°, lado derecho)
            setTimeout(() => {
              captureAtRotation(Math.PI / 2, "mangaDerecha");
            }, 900);
          }, initialDelay);
        });
      },
    }));

    return (
      <div className="w-full h-full relative" ref={canvasContainerRef}>
        <Canvas
          camera={{ position: [0, 0, 20], fov: 11 }}
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
              shirtType={shirtType}
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