"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import axios from "axios";
interface BonesRef {
  head?: THREE.Object3D;
  spine?: THREE.Object3D;
  lips?: THREE.Object3D;
  spineOne?: THREE.Object3D;
  spineTwo?: THREE.Object3D;
  hips?: THREE.Object3D;
  leftUpLeg?: THREE.Object3D;
  rightUpLeg?: THREE.Object3D;
  leftLeg?: THREE.Object3D;
  rightLeg?: THREE.Object3D;
  leftFoot?: THREE.Object3D;
  rightFoot?: THREE.Object3D;
  leftArm?: THREE.Object3D;
  rightArm?: THREE.Object3D;
  leftForeArm?: THREE.Object3D;
  rightForeArm?: THREE.Object3D;
  leftHand?: THREE.Object3D;
  rightHand?: THREE.Object3D;
}

interface EyesRef {
  leftEye?: THREE.Object3D | null;
  rightEye?: THREE.Object3D | null;
}

const gesturePatterns = {
  idle: {
    // وضع الأذرع مضمومة عند البطن
    rightArm: {
      rotation: { x: Math.PI / 4, y: 0, z: -Math.PI / 6 },
      movement: { x: 0, y: 0, z: 0 },
    },
    leftArm: {
      rotation: { x: Math.PI / 4, y: 0, z: Math.PI / 6 },
      movement: { x: 0, y: 0, z: 0 },
    },
    rightForeArm: {
      rotation: { x: Math.PI / 4, y: 0, z: Math.PI / 8 }, // ثني الساعد نحو البطن
      movement: { x: 0, y: 0, z: 0 },
    },
    leftForeArm: {
      rotation: { x: Math.PI / 4, y: 0, z: -Math.PI / 8 }, // ثني الساعد نحو البطن
      movement: { x: 0, y: 0, z: 0 },
    },
  },
  speaking: {
    // حركات طبيعية أثناء الكلام
    rightArm: {
      rotation: { x: Math.PI / 3, y: 0, z: -Math.PI / 4 },
      movement: { x: 0.2, y: 0.15, z: 0.1 }, // نطاق حركة أكبر للتعبير
    },
    leftArm: {
      rotation: { x: Math.PI / 3, y: 0, z: Math.PI / 4 },
      movement: { x: 0.2, y: 0.15, z: 0.1 },
    },
    rightForeArm: {
      rotation: { x: -Math.PI / 6, y: 0, z: Math.PI / 6 },
      movement: { x: 0.15, y: 0.1, z: 0.12 },
    },
    leftForeArm: {
      rotation: { x: -Math.PI / 6, y: 0, z: -Math.PI / 6 },
      movement: { x: 0.15, y: 0.1, z: 0.12 },
    },
  },
};

// Utility Functions
const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const ELEVENLABS_API_KEY =
  "sk_63385b7f36aa405ffcf380178c7370c066746da5be191fb0";

// Avatar Model Component
const AvatarModel: React.FC<{ message: string }> = ({ message }) => {
  const gltf = useLoader(GLTFLoader, "./lina.glb");
  const bonesRef = useRef<BonesRef>({});
  const eyesRef = useRef<EyesRef>({});
  const lipsRef = useRef<THREE.Object3D | null>(null);
  const isSpeaking = useRef(false);
  const gestureTimeRef = useRef(0);
  const blinkTimer = useRef(0);
  const breatheTimer = useRef(0);

  useEffect(() => {
    if (!gltf.scene) return;

    // Initialize bone references
    bonesRef.current = {
      head: gltf.scene.getObjectByName("Head"),
      spine: gltf.scene.getObjectByName("Spine"),
      spineOne: gltf.scene.getObjectByName("Spine1"),
      spineTwo: gltf.scene.getObjectByName("Spine2"),
      hips: gltf.scene.getObjectByName("Hips"),
      leftUpLeg: gltf.scene.getObjectByName("LeftUpLeg"),
      rightUpLeg: gltf.scene.getObjectByName("RightUpLeg"),
      leftLeg: gltf.scene.getObjectByName("LeftLeg"),
      rightLeg: gltf.scene.getObjectByName("RightLeg"),
      leftFoot: gltf.scene.getObjectByName("LeftFoot"),
      rightFoot: gltf.scene.getObjectByName("RightFoot"),
      leftArm: gltf.scene.getObjectByName("LeftArm"),
      rightArm: gltf.scene.getObjectByName("RightArm"),
      leftForeArm: gltf.scene.getObjectByName("LeftForeArm"),
      rightForeArm: gltf.scene.getObjectByName("RightForeArm"),
      leftHand: gltf.scene.getObjectByName("LeftHand"),
      rightHand: gltf.scene.getObjectByName("RightHand"),
    };

    initializePose();
  }, [gltf]);

  const initializePose = () => {
    const {
      hips,
      spine,
      spineOne,
      spineTwo,
      leftUpLeg,
      rightUpLeg,
      leftLeg,
      rightLeg,
      leftArm,
      rightArm,
      leftForeArm,
      rightForeArm,
    } = bonesRef.current;

    // Set sitting pose
    if (hips) {
      hips.rotation.x = -Math.PI / 12;
      hips.position.y -= 0.8;
    }

    // Spine adjustments for sitting
    if (spine) spine.rotation.x = Math.PI / 18;
    if (spineOne) spineOne.rotation.x = Math.PI / 18;
    if (spineTwo) spineTwo.rotation.x = Math.PI / 18;

    // Leg positions for sitting
    if (leftUpLeg && rightUpLeg) {
      leftUpLeg.rotation.x = -Math.PI / 2.5;
      rightUpLeg.rotation.x = -Math.PI / 2.5;
    }

    if (leftLeg && rightLeg) {
      leftLeg.rotation.x = Math.PI / -1.8;
      rightLeg.rotation.x = Math.PI / -1.8;
    }

    // Initial arm positions
    const idlePattern = gesturePatterns.idle;
    if (leftArm && rightArm) {
      leftArm.rotation.set(
        idlePattern.leftArm.rotation.x,
        idlePattern.leftArm.rotation.y,
        idlePattern.leftArm.rotation.z
      );
      rightArm.rotation.set(
        idlePattern.rightArm.rotation.x,
        idlePattern.rightArm.rotation.y,
        idlePattern.rightArm.rotation.z
      );
    }

    if (leftForeArm && rightForeArm) {
      leftForeArm.rotation.set(
        idlePattern.leftForeArm.rotation.x,
        idlePattern.leftForeArm.rotation.y,
        idlePattern.leftForeArm.rotation.z
      );
      rightForeArm.rotation.set(
        idlePattern.rightForeArm.rotation.x,
        idlePattern.rightForeArm.rotation.y,
        idlePattern.rightForeArm.rotation.z
      );
    }
  };

  const blink = (delta: number) => {
    blinkTimer.current += delta;
    if (blinkTimer.current >= getRandomInRange(2, 4)) {
      const { leftEye, rightEye } = eyesRef.current;
      if (leftEye && rightEye) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
        setTimeout(() => {
          if (leftEye && rightEye) {
            leftEye.scale.y = 1;
            rightEye.scale.y = 1;
          }
        }, 150);
      }
      blinkTimer.current = 0;
    }
  };

  const breathe = (delta: number) => {
    const { spine } = bonesRef.current;
    breatheTimer.current += delta;
    if (spine) {
      const breatheAmount = Math.sin(breatheTimer.current * 1.5) * 0.01;
      spine.position.z = breatheAmount;
    }
  };

  const updateArmMovements = (time: number) => {
    const { leftArm, rightArm, leftForeArm, rightForeArm } = bonesRef.current;
    const pattern = isSpeaking.current
      ? gesturePatterns.speaking
      : gesturePatterns.idle;

    // توقيت الحركة يعتمد على حالة الكلام
    const gestureSpeed = isSpeaking.current ? 2.0 : 0.3;
    const gestureMagnitude = isSpeaking.current ? 1 : 0.1;

    // حركات طبيعية للمحادثة
    const primaryGesture = Math.sin(time * gestureSpeed) * gestureMagnitude;
    const secondaryGesture =
      Math.cos(time * gestureSpeed * 0.7) * (gestureMagnitude * 0.6);

    if (leftArm && rightArm) {
      // انتقال سلس بين وضع السكون والكلام
      const transitionSpeed = isSpeaking.current ? 0.15 : 0.08;

      // تحديث موضع الذراع الأيسر
      leftArm.rotation.z = lerp(
        leftArm.rotation.z,
        pattern.leftArm.rotation.z +
          (isSpeaking.current ? secondaryGesture * 0.2 : 0),
        transitionSpeed
      );

      rightArm.rotation.z = lerp(
        rightArm.rotation.z,
        pattern.rightArm.rotation.z -
          (isSpeaking.current ? primaryGesture * 0.2 : 0),
        transitionSpeed
      );

      // حركة خفيفة للأمام والخلف
      if (isSpeaking.current) {
        leftArm.rotation.y = Math.sin(time * gestureSpeed * 0.5) * 0.1;
        rightArm.rotation.y =
          Math.sin(time * gestureSpeed * 0.5 + Math.PI) * 0.1;
      } else {
        leftArm.rotation.y = lerp(leftArm.rotation.y, 0, transitionSpeed);
        rightArm.rotation.y = lerp(rightArm.rotation.y, 0, transitionSpeed);
      }
    }

    if (leftForeArm && rightForeArm) {
      const transitionSpeed = isSpeaking.current ? 0.15 : 0.08;

      // تحديث موضع الساعد الأيسر
      leftForeArm.rotation.x = lerp(
        leftForeArm.rotation.x,
        pattern.leftForeArm.rotation.x +
          (isSpeaking.current
            ? secondaryGesture * pattern.leftForeArm.movement.x
            : 0),
        transitionSpeed
      );
      leftForeArm.rotation.z = lerp(
        leftForeArm.rotation.z,
        pattern.leftForeArm.rotation.z +
          (isSpeaking.current ? Math.sin(time * gestureSpeed * 0.3) * 0.1 : 0),
        transitionSpeed
      );

      // تحديث موضع الساعد الأيمن
      rightForeArm.rotation.x = lerp(
        rightForeArm.rotation.x,
        pattern.rightForeArm.rotation.x +
          (isSpeaking.current
            ? primaryGesture * pattern.rightForeArm.movement.x
            : 0),
        transitionSpeed
      );
      rightForeArm.rotation.z = lerp(
        rightForeArm.rotation.z,
        pattern.rightForeArm.rotation.z +
          (isSpeaking.current
            ? Math.sin(time * gestureSpeed * 0.3 + Math.PI) * 0.1
            : 0),
        transitionSpeed
      );
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    gestureTimeRef.current += delta;

    blink(delta);
    breathe(delta);
    updateArmMovements(time);

    // Subtle head movement
    if (bonesRef.current.head) {
      const headTilt = Math.sin(time * 0.5) * 0.1;
      const headTurn = Math.sin(time * 0.3) * 0.05;

      bonesRef.current.head.rotation.y = lerp(
        bonesRef.current.head.rotation.y,
        headTurn,
        0.05
      );
      bonesRef.current.head.rotation.z = lerp(
        bonesRef.current.head.rotation.z,
        headTilt,
        0.05
      );
    }
  });

  return (
    <>
      <primitive object={gltf.scene} scale={2} position={[0, -0.6, -1.1]} />
      <AvatarMessage message={message} lipsRef={lipsRef} />
    </>
  );
};

// Avatar Message Component
const AvatarMessage: React.FC<{
  message: string;
  lipsRef: React.MutableRefObject<THREE.Object3D | null>;
}> = ({ message, lipsRef }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [displayedText, setDisplayedText] = useState(""); // النص الذي يظهر تدريجيًا

  const fetchSpeech = async (text: string) => {
    try {
      const response = await axios.post(
        `${ELEVENLABS_API_URL}/EXAVITQu4vr4xnSDxMaL`,
        {
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY,
          },
          responseType: "arraybuffer", // مهم لضمان استقبال الصوت بصيغة صحيحة
        }
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(new Audio(audioUrl));
    } catch (error) {
      console.error("Error fetching speech from Eleven Labs:");
    }
  };

  useEffect(() => {
    if (message) {
      console.log("Generating speech for:", message);
      fetchSpeech(message);

      // تأخير عرض النص لمدة ثانيتين
      const delayTimer = setTimeout(() => {
        let currentText = "";
        const typingTimer = setInterval(() => {
          currentText += message[currentText.length];
          setDisplayedText(currentText);

          if (currentText.length === message.length) {
            clearInterval(typingTimer);
          }
        }, 50); // سرعة كتابة الحروف
      }, 2000); // تأخير 2 ثانية

      return () => clearTimeout(delayTimer);
    }
  }, [message]);

  useEffect(() => {
    if (audio) {
      const playAudio = async () => {
        try {
          await audio.play();
          audio.addEventListener("play", () => {
            if (lipsRef.current) {
              lipsRef.current.scale.set(1, 0.7, 1);
            }
          });

          audio.addEventListener("ended", () => {
            if (lipsRef.current) {
              lipsRef.current.scale.set(1, 1, 1);
            }
          });
        } catch (error) {
          console.error("Audio playback failed:", error);
        }
      };

      playAudio();
    }
  }, [audio]);

  return (
    <Html position={[0.2, 0.8, 0]}>
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px",
          minWidth: "180px",
          maxWidth: "300px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
          {displayedText}
        </p>
      </div>
    </Html>
  );
};

const RoomModel: React.FC = () => {
  const roomGltf = useLoader(GLTFLoader, "./room.glb");
  return (
    <primitive
      object={roomGltf.scene}
      scale={1.5}
      position={[0, -1, -2]}
      rotation={[0, Math.PI / -2, 0]}
    />
  );
};

// Chair model component
const ChairModel: React.FC = () => {
  const chairGltf = useLoader(GLTFLoader, "./chair.glb");
  return (
    <primitive object={chairGltf.scene} scale={1.5} position={[0, -0.4, -1]} />
  );
};

// Main Avatar3D component
const Avatar3D: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1, 4], fov: 60 }}
      style={{ width: "100%", height: "100vh" }}
    >
      {/* Enhanced lighting setup */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={2.5}
        color="#e3a90b"
        castShadow
        shadow-mapSize={{ width: 2048, height: 2048 }}
      />
      <ambientLight intensity={2} color="#e3a90b" />
      <hemisphereLight
        groundColor="#ffe5b4"
        intensity={2}
        position={[0, 10, 0]}
      />
      <spotLight
        position={[-5, 10, 5]}
        intensity={2}
        angle={0.4}
        penumbra={0.5}
        color="#ffdab9"
        castShadow
      />

      {/* Scene components */}
      <RoomModel />
      <ChairModel />
      <AvatarModel message={message} />

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={0.5} // تقليل المسافة للسماح بزوم أقرب
        maxDistance={15} // زيادة المسافة للسماح بزوم أبعد
        target={new THREE.Vector3(0, 0, 0)}
      />
    </Canvas>
  );
};

export default Avatar3D;
