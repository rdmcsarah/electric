


// // "use client"
// // import { useRef, useEffect, useState, useCallback } from "react";
// // import * as THREE from "three";
// // import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

// // // import { RoundedBoxGeometry } from "three-stdlib";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Projects from "../components/Projects";

// // if (typeof window !== "undefined") {
// //     gsap.registerPlugin(ScrollTrigger);
// // }

// // export default function InteractiveOldPC() {
// //     const containerRef = useRef<HTMLDivElement>(null);
// //     const videoRef = useRef<HTMLVideoElement | null>(null);
// //     const screenMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
// //     const isScrollingRef = useRef(false);
// //     const videoPlaybackRequestedRef = useRef(false);
// //     const fullscreenVideoTriggeredRef = useRef(false);

// //     // State for video overlay
// //     const [showVideo, setShowVideo] = useState(false);
// //     const videoContainerRef = useRef<HTMLDivElement>(null);
// //     const overlayVideoRef = useRef<HTMLVideoElement>(null);
// //     const [showProjects, setShowProjects] = useState(false);

// //     // Create video element with better error handling
// //     const createVideoElement = useCallback(() => {
// //         const video = document.createElement("video");
// //         video.src = "/video.mp4";
// //         video.loop = false;
// //         video.muted = true;
// //         video.playsInline = true;
// //         video.preload = "auto";
// //         video.crossOrigin = "anonymous";

// //         video.onerror = () => {
// //             console.warn("Video failed to load, using fallback texture");
// //         };

// //         return video;
// //     }, []);

// //     // Initialize video playback
// //     const initializeVideoPlayback = useCallback(async (video: HTMLVideoElement) => {
// //         try {
// //             const playPromise = video.play();
// //             if (playPromise !== undefined) {
// //                 await playPromise;
// //                 videoPlaybackRequestedRef.current = true;
// //             }
// //         } catch (err) {
// //             console.warn("Autoplay failed, waiting for user interaction:", err);
// //         }
// //     }, []);

// //     // Resume video when user interacts with page
// //     const resumeVideoOnInteraction = useCallback(() => {
// //         if (videoRef.current && !videoPlaybackRequestedRef.current) {
// //             videoRef.current.play().catch(() => { });
// //             videoPlaybackRequestedRef.current = true;
// //         }
// //     }, []);

// //     // Handle fullscreen video
// //     const handleFullscreenVideo = useCallback(() => {
// //         if (fullscreenVideoTriggeredRef.current) return;

// //         fullscreenVideoTriggeredRef.current = true;

// //         setShowVideo(true);
// //     }, []);

// //     // Handle video end
// //     const handleVideoEnded = useCallback(() => {
// //         setShowProjects(true); // Show projects immediately

// //         if (!videoContainerRef.current) return;

// //         gsap.to(videoContainerRef.current, {
// //             opacity: 0,
// //             duration: 1,
// //             ease: "power2.out",
// //             onComplete: () => {
// //                 setShowVideo(false);
// //                 // setShowProjects(true);
// //             },
// //         });
// //     }, []);
// //     useEffect(() => {
// //         window.scrollTo(0, 0);
// //     }, []);
// //     useEffect(() => {
// //         document.body.style.overflow = showVideo ? "hidden" : "";
// //         return () => {
// //             document.body.style.overflow = "";
// //         };
// //     }, [showVideo]);

// //     useEffect(() => {
// //         const container = containerRef.current;
// //         if (!container) return;

// //         document.addEventListener("click", resumeVideoOnInteraction);
// //         document.addEventListener("touchstart", resumeVideoOnInteraction);
// //         document.addEventListener("keydown", resumeVideoOnInteraction);

// //         /* -------------------- Scene -------------------- */
// //         const scene = new THREE.Scene();
// //         scene.background = new THREE.Color(0x4A4A4A);

// //         /* -------------------- Camera -------------------- */
// //         const camera = new THREE.PerspectiveCamera(
// //             50,
// //             window.innerWidth / window.innerHeight,
// //             0.1,
// //             100
// //         );
// //         camera.position.set(0, 0.3, 3);

// //         /* -------------------- Renderer -------------------- */
// //         const renderer = new THREE.WebGLRenderer({
// //             antialias: true,
// //             alpha: true,
// //             powerPreference: "high-performance"
// //         });
// //         renderer.setSize(window.innerWidth, window.innerHeight);
// //         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// //         renderer.shadowMap.enabled = true;
// //         renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// //         container.appendChild(renderer.domElement);

// //         /* -------------------- Lights -------------------- */
// //         scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// //         const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
// //         mainLight.position.set(3, 5, 2);
// //         mainLight.castShadow = true;
// //         mainLight.shadow.mapSize.width = 1024;
// //         mainLight.shadow.mapSize.height = 1024;
// //         scene.add(mainLight);

// //         const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
// //         fillLight.position.set(-3, 2, -2);
// //         scene.add(fillLight);

// //         /* -------------------- CRT Monitor Body -------------------- */
// //         const monitorWidth = 0.6;
// //         const monitorHeight = 0.5;
// //         const monitorDepth = 0.35;

// //         const monitorMesh = new THREE.Mesh(
// //             new RoundedBoxGeometry(monitorWidth, monitorHeight, monitorDepth, 8, 0.02),
// //             new THREE.MeshStandardMaterial({
// //                 color: 0x404040,
// //                 metalness: 0.1,
// //                 roughness: 0.9,
// //             })
// //         );
// //         monitorMesh.position.y = 0;
// //         monitorMesh.castShadow = true;
// //         monitorMesh.receiveShadow = true;
// //         scene.add(monitorMesh);

// //         /* -------------------- Screen Bezel -------------------- */
// //         const bezelThickness = 0.02;
// //         const bezelGeometry = new THREE.BoxGeometry(
// //             monitorWidth - 0.04,
// //             monitorHeight - 0.15,
// //             0.001
// //         );
// //         const bezelMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x1a1a1a,
// //             metalness: 0.05,
// //             roughness: 0.95,
// //         });
// //         const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
// //         bezel.position.z = monitorDepth / 2 + 0.02;
// //         monitorMesh.add(bezel);

// //         /* -------------------- CRT Screen (Curved) -------------------- */
// //         const screenWidth = monitorWidth - 0.1;
// //         const screenHeight = monitorHeight - 0.2;
// //         const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight, 64, 64);

// //         const video = createVideoElement();
// //         videoRef.current = video;

// //         const videoTexture = new THREE.VideoTexture(video);
// //         videoTexture.colorSpace = THREE.SRGBColorSpace;
// //         videoTexture.minFilter = THREE.LinearFilter;
// //         videoTexture.magFilter = THREE.LinearFilter;

// //         const scanlineCanvas = document.createElement('canvas');
// //         scanlineCanvas.width = 512;
// //         scanlineCanvas.height = 512;
// //         const ctx = scanlineCanvas.getContext('2d')!;
// //         ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
// //         for (let y = 0; y < scanlineCanvas.height; y += 2) {
// //             ctx.fillRect(0, y, scanlineCanvas.width, 1);
// //         }
// //         const scanlineTexture = new THREE.CanvasTexture(scanlineCanvas);

// //         const screenMaterial = new THREE.ShaderMaterial({
// //             uniforms: {
// //                 videoTexture: { value: videoTexture },
// //                 scanlineTexture: { value: scanlineTexture },
// //                 time: { value: 0 },
// //                 emissiveIntensity: { value: 0.1 }
// //             },
// //             vertexShader: `
// //                 varying vec2 vUv;
// //                 void main() {
// //                     vUv = uv;
// //                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// //                 }
// //             `,
// //             fragmentShader: `
// //                 uniform sampler2D videoTexture;
// //                 uniform sampler2D scanlineTexture;
// //                 uniform float time;
// //                 uniform float emissiveIntensity;
// //                 varying vec2 vUv;

// //                 void main() {
// //                     vec4 videoColor = texture2D(videoTexture, vUv);
// //                     vec4 scanline = texture2D(scanlineTexture, vec2(vUv.x, vUv.y + time * 0.1));

// //                     float gray = dot(videoColor.rgb, vec3(0.299, 0.587, 0.114));
// //                     vec3 crtColor = vec3(gray * 0.8, gray * 0.9, gray * 0.7);

// //                     crtColor *= (0.9 + 0.1 * scanline.r);

// //                     float dist = distance(vUv, vec2(0.5, 0.5));
// //                     float vignette = 1.0 - dist * 0.5;
// //                     crtColor *= vignette;

// //                     crtColor += crtColor * emissiveIntensity;

// //                     gl_FragColor = vec4(crtColor, 1.0);
// //                 }
// //             `,
// //             transparent: false
// //         });

// //         screenMaterialRef.current = screenMaterial;

// //         const screen = new THREE.Mesh(screenGeometry, screenMaterial);
// //         screen.position.z = monitorDepth / 2 + 0.022;
// //         monitorMesh.add(screen);

// //         /* -------------------- Monitor Base/Stand -------------------- */
// //         const baseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.05, 16);
// //         const baseMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x303030,
// //             metalness: 0.1,
// //             roughness: 0.85,
// //         });
// //         const base = new THREE.Mesh(baseGeometry, baseMaterial);
// //         base.position.y = -monitorHeight / 2 - 0.1;
// //         base.castShadow = true;
// //         monitorMesh.add(base);

// //         const neckGeometry = new THREE.CylinderGeometry(0.04, 0.06, 0.12, 8);
// //         const neck = new THREE.Mesh(neckGeometry, baseMaterial);
// //         neck.position.y = -monitorHeight / 2 - 0.05;
// //         neck.castShadow = true;
// //         monitorMesh.add(neck);

// //         /* -------------------- Detailed Buttons & Controls -------------------- */
// //         const buttonMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x606060,
// //             metalness: 0.2,
// //             roughness: 0.6,
// //         });

// //         const darkerButtonMaterial = buttonMaterial.clone();
// //         darkerButtonMaterial.color = new THREE.Color(0x505050);

// //         const silverButtonMaterial = buttonMaterial.clone();
// //         silverButtonMaterial.color = new THREE.Color(0xd0d0d0);
// //         silverButtonMaterial.metalness = 0.3;

// //         const powerButtonGeometry = new THREE.CylinderGeometry(0.018, 0.018, 0.02, 16);
// //         const powerButton = new THREE.Mesh(powerButtonGeometry, silverButtonMaterial);
// //         powerButton.rotation.x = Math.PI / 2;
// //         powerButton.position.set(-monitorWidth / 2 + 0.08, -monitorHeight / 2 + 0.15, monitorDepth / 2 + 0.01);
// //         monitorMesh.add(powerButton);

// //         const ledGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.01, 8);
// //         const ledMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x00ff00,
// //             emissive: 0x003300,
// //             emissiveIntensity: 0.5
// //         });
// //         const led = new THREE.Mesh(ledGeometry, ledMaterial);
// //         led.position.set(-monitorWidth / 2 + 0.08, -monitorHeight / 2 + 0.18, monitorDepth / 2 + 0.01);
// //         monitorMesh.add(led);

// //         const knobGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.015, 16);
// //         const knob = new THREE.Mesh(knobGeometry, darkerButtonMaterial);
// //         knob.rotation.x = Math.PI / 2;
// //         knob.position.set(monitorWidth / 2 - 0.1, -monitorHeight / 2 + 0.15, monitorDepth / 2 + 0.01);
// //         monitorMesh.add(knob);

// //         const brightnessKnob = knob.clone();
// //         brightnessKnob.position.x = monitorWidth / 2 - 0.06;
// //         monitorMesh.add(brightnessKnob);

// //         const smallButtonGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.015, 12);
// //         const buttonSpacing = 0.04;

// //         for (let i = 0; i < 4; i++) {
// //             const button = new THREE.Mesh(smallButtonGeometry, buttonMaterial);
// //             button.rotation.x = Math.PI / 2;
// //             button.position.set(
// //                 monitorWidth / 2 - 0.15 + (i * buttonSpacing),
// //                 -monitorHeight / 2 + 0.08,
// //                 monitorDepth / 2 + 0.01
// //             );
// //             monitorMesh.add(button);
// //         }

// //         const logoGeometry = new THREE.BoxGeometry(0.12, 0.03, 0.005);
// //         const logoMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x202020,
// //             metalness: 0.4,
// //             roughness: 0.3,
// //         });
// //         const logo = new THREE.Mesh(logoGeometry, logoMaterial);
// //         logo.position.set(0, -monitorHeight / 2 + 0.05, monitorDepth / 2 + 0.01);
// //         monitorMesh.add(logo);

// //         /* -------------------- Keyboard -------------------- */
// //         const keyboardWidth = 0.5;
// //         const keyboardHeight = 0.02;
// //         const keyboardDepth = 0.2;

// //         const keyboardGeometry = new THREE.BoxGeometry(keyboardWidth, keyboardHeight, keyboardDepth);
// //         const keyboardMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x353535,
// //             metalness: 0.05,
// //             roughness: 0.9,
// //         });
// //         const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
// //         keyboard.position.set(0, -0.6, 0.3);
// //         keyboard.rotation.x = -0.1;
// //         keyboard.castShadow = true;
// //         keyboard.receiveShadow = true;
// //         scene.add(keyboard);

// //         const keyRows = 4;
// //         const keysPerRow = 12;
// //         const keyWidth = 0.03;
// //         const keyHeight = 0.01;
// //         const keyDepth = 0.01;
// //         const keySpacing = 0.035;
// //         const rowSpacing = 0.025;

// //         const keyGeometry = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);
// //         const keyMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x252525,
// //             metalness: 0.1,
// //             roughness: 0.85,
// //         });

// //         for (let row = 0; row < keyRows; row++) {
// //             for (let col = 0; col < keysPerRow; col++) {
// //                 const key = new THREE.Mesh(keyGeometry, keyMaterial);
// //                 key.position.set(
// //                     (col - keysPerRow / 2 + 0.5) * keySpacing,
// //                     keyboard.position.y + keyboardHeight / 2 + keyHeight / 2 + 0.001,
// //                     keyboard.position.z + (row - keyRows / 2 + 0.5) * rowSpacing
// //                 );
// //                 key.castShadow = true;
// //                 scene.add(key);
// //             }
// //         }

// //         const spacebarGeometry = new THREE.BoxGeometry(0.15, 0.008, 0.025);
// //         const spacebar = new THREE.Mesh(spacebarGeometry, keyMaterial);
// //         spacebar.position.set(0, keyboard.position.y + keyboardHeight / 2 + 0.008 / 2 + 0.001, keyboard.position.z + 0.08);
// //         spacebar.castShadow = true;
// //         scene.add(spacebar);

// //         /* -------------------- Mouse -------------------- */
// //         const mouseGeometry = new THREE.SphereGeometry(0.025, 16, 16);
// //         mouseGeometry.scale(1.5, 0.7, 1);
// //         const mouseMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x303030,
// //             metalness: 0.1,
// //             roughness: 0.85,
// //         });
// //         const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
// //         mouse.position.set(0.3, -0.58, 0.15);
// //         mouse.castShadow = true;
// //         scene.add(mouse);

// //         const cableCurve = new THREE.CatmullRomCurve3([
// //             new THREE.Vector3(0.3, -0.58, 0.15),
// //             new THREE.Vector3(0.2, -0.7, 0.1),
// //             new THREE.Vector3(0.1, -0.8, -0.1),
// //             new THREE.Vector3(0, -0.9, -0.3),
// //         ]);

// //         const cableGeometry = new THREE.TubeGeometry(cableCurve, 20, 0.005, 8, false);
// //         const cableMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x202020,
// //             metalness: 0.05,
// //             roughness: 0.95,
// //         });
// //         const cable = new THREE.Mesh(cableGeometry, cableMaterial);
// //         scene.add(cable);

// //         /* -------------------- Desk Surface -------------------- */
// //         const deskWidth = 4;
// //         const deskDepth = 2;
// //         const deskThickness = 0.05;

// //         const deskGeometry = new THREE.BoxGeometry(deskWidth, deskThickness, deskDepth);
// //         const deskMaterial = new THREE.MeshStandardMaterial({
// //             color: 0x404040,
// //             metalness: 0,
// //             roughness: 0.7,
// //         });
// //         const desk = new THREE.Mesh(deskGeometry, deskMaterial);
// //         desk.position.set(0, -0.9, 0);
// //         desk.receiveShadow = true;
// //         scene.add(desk);

// //         const deskTextureCanvas = document.createElement('canvas');
// //         deskTextureCanvas.width = 256;
// //         deskTextureCanvas.height = 256;
// //         const deskCtx = deskTextureCanvas.getContext('2d')!;
// //         deskCtx.fillStyle = '#404040';
// //         deskCtx.fillRect(0, 0, 256, 256);
// //         deskCtx.strokeStyle = 'rgba(50, 50, 50, 0.1)';
// //         deskCtx.lineWidth = 1;
// //         for (let i = 0; i < 20; i++) {
// //             const x = Math.random() * 256;
// //             deskCtx.beginPath();
// //             deskCtx.moveTo(x, 0);
// //             deskCtx.bezierCurveTo(
// //                 x + 20, 50,
// //                 x - 20, 150,
// //                 x, 256
// //             );
// //             deskCtx.stroke();
// //         }
// //         const deskTexture = new THREE.CanvasTexture(deskTextureCanvas);
// //         deskMaterial.map = deskTexture;

// //         /* -------------------- CRT Screen Glow Effect -------------------- */
// //         const screenGlowGeometry = new THREE.PlaneGeometry(screenWidth + 0.02, screenHeight + 0.02);
// //         const screenGlowMaterial = new THREE.MeshBasicMaterial({
// //             color: 0x888888,
// //             transparent: true,
// //             opacity: 0.1,
// //             side: THREE.DoubleSide
// //         });
// //         const screenGlow = new THREE.Mesh(screenGlowGeometry, screenGlowMaterial);
// //         screenGlow.position.z = monitorDepth / 2 + 0.021;
// //         monitorMesh.add(screenGlow);

// //         /* -------------------- Scroll Animation -------------------- */
// //         const screenEmissiveIntensity = { value: 0.1 };
// //         let scrollTriggerInstance: ScrollTrigger | null = null;

// //         const tl = gsap.timeline({
// //             scrollTrigger: {
// //                 trigger: document.body,
// //                 start: "top top",
// //                 end: "+=200%",
// //                 scrub: 1.5,
// //                 pin: container,
// //                 pinSpacing: false,
// //                 onEnter: () => {
// //                     isScrollingRef.current = true;
// //                     if (videoRef.current && videoRef.current.paused) {
// //                         videoRef.current.play().catch(() => { });
// //                     }
// //                 },
// //                 onLeaveBack: () => {
// //                     isScrollingRef.current = false;
// //                 },
// //                 onUpdate: (self) => {
// //                     if (
// //                         self.progress >= 0.999 &&
// //                         !fullscreenVideoTriggeredRef.current
// //                     ) {
// //                         handleFullscreenVideo();
// //                     }
// //                 },

// //                 onEnterBack: () => { },
// //             },
// //         });

// //         tl.to(camera.position, {
// //             z: 1.2,
// //             y: 0.1,
// //             ease: "power2.out"
// //         })
// //             .to(camera, {
// //                 fov: 25,
// //                 onUpdate: () => camera.updateProjectionMatrix(),
// //                 ease: "power2.out"
// //             }, 0)
// //             .to(monitorMesh.rotation, {
// //                 y: Math.PI * 0.2,
// //                 x: -0.05,
// //                 ease: "power2.out"
// //             }, 0)
// //             .to(screenEmissiveIntensity, {
// //                 value: 0.3,
// //                 ease: "power2.out"
// //             }, 0);

// //         // scrollTriggerInstance = ScrollTrigger.getById(tl.scrollTrigger!.id)!;
// //         const SCROLL_TRIGGER_ID = 'my-trigger';

// //         scrollTriggerInstance = ScrollTrigger.getById(SCROLL_TRIGGER_ID)!;


// //         /* -------------------- Mouse Interaction -------------------- */
// //         let mouseX = 0;
// //         let mouseY = 0;
// //         const onMouseMove = (e: MouseEvent) => {
// //             mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
// //             mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
// //         };
// //         window.addEventListener("mousemove", onMouseMove);

// //         /* -------------------- Resize Handler -------------------- */
// //         const onResize = () => {
// //             camera.aspect = window.innerWidth / window.innerHeight;
// //             camera.updateProjectionMatrix();
// //             renderer.setSize(window.innerWidth, window.innerHeight);
// //             ScrollTrigger.refresh();
// //         };
// //         window.addEventListener("resize", onResize);

// //         initializeVideoPlayback(video);

// //         /* -------------------- Animation Loop -------------------- */
// //         const clock = new THREE.Clock();
// //         let animationId: number;

// //         const animate = () => {
// //             animationId = requestAnimationFrame(animate);

// //             const delta = clock.getDelta();
// //             const time = clock.getElapsedTime();

// //             monitorMesh.rotation.y += (mouseX - monitorMesh.rotation.y) * 0.05;
// //             monitorMesh.rotation.x += (-mouseY - monitorMesh.rotation.x) * 0.05;

// //             monitorMesh.position.y = Math.sin(time * 0.5) * 0.002;
// //             monitorMesh.rotation.z = Math.sin(time * 0.3) * 0.002;

// //             ledMaterial.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.2;

// //             if (screenMaterialRef.current) {
// //                 screenMaterialRef.current.uniforms.time.value = time;
// //                 screenMaterialRef.current.uniforms.emissiveIntensity.value = screenEmissiveIntensity.value;
// //             }

// //             scanlineTexture.offset.y += delta * 0.5;

// //             camera.lookAt(monitorMesh.position);
// //             renderer.render(scene, camera);
// //         };
// //         animate();

// //         /* -------------------- Cleanup -------------------- */
// //         return () => {
// //             window.removeEventListener("mousemove", onMouseMove);
// //             window.removeEventListener("resize", onResize);
// //             document.removeEventListener("click", resumeVideoOnInteraction);
// //             document.removeEventListener("touchstart", resumeVideoOnInteraction);
// //             document.removeEventListener("keydown", resumeVideoOnInteraction);

// //             if (videoRef.current) {
// //                 videoRef.current.pause();
// //                 videoRef.current.src = "";
// //                 videoRef.current.load();
// //             }

// //             cancelAnimationFrame(animationId);
// //             renderer.dispose();

// //             if (scrollTriggerInstance) {
// //                 scrollTriggerInstance.kill();
// //             }
// //             ScrollTrigger.getAll().forEach(trigger => trigger.kill());

// //             if (container.contains(renderer.domElement)) {
// //                 container.removeChild(renderer.domElement);
// //             }
// //         };
// //     }, [createVideoElement, initializeVideoPlayback, resumeVideoOnInteraction, handleFullscreenVideo]);

// //     // Effect for handling overlay video
// //     useEffect(() => {
// //         if (!showVideo || !videoContainerRef.current) return;

// //         // Pause the 3D scene video when fullscreen video plays
// //         if (videoRef.current) {
// //             videoRef.current.pause();
// //         }

// //         // Fade in overlay - make video cover entire screen
// //         gsap.fromTo(
// //             videoContainerRef.current,
// //             { opacity: 0 },
// //             {
// //                 opacity: 1,
// //                 duration: 1,
// //                 ease: "power2.out",
// //                 onComplete: () => {
// //                     if (overlayVideoRef.current) {
// //                         overlayVideoRef.current.play().catch(console.warn);
// //                     }
// //                 }
// //             }
// //         );

// //         // Cleanup when video ends or component unmounts
// //         return () => {
// //             // Resume 3D scene video when overlay is closed
// //             if (videoRef.current && !fullscreenVideoTriggeredRef.current) {
// //                 videoRef.current.play().catch(() => { });
// //             }
// //         };
// //     }, [showVideo]);



// //     return (
// //         <div className="relative w-full bg-gradient-to-b from-gray-100 to-gray-0">

// //             {/* Scroll space (controls how long the scroll is) */}
// //             <div className="h-[200vh]" />

// //             {/* PINNED SCENE */}
// //             <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen" />

// //             {/* HUD */}
// //             <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-mono z-10">
// //                 <div className="flex items-center space-x-4">
// //                     <div className="flex items-center">
// //                         <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
// //                         <span>POWER</span>
// //                     </div>
// //                     <div className="text-gray-500">|</div>
// //                     <div>VGA DISPLAY ACTIVE</div>
// //                     <div className="text-gray-500">|</div>
// //                     <div>60Hz @ 800×600</div>
// //                 </div>

// //                 <div className="mt-4 text-center text-gray-500 text-xs animate-pulse">
// //                     ↓ SCROLL TO ACTIVATE FULLSCREEN ↓
// //                 </div>
// //             </div>

// //             {/* 🔥 TRUE FULLSCREEN VIDEO OVERLAY */}
// //             {showVideo && (
// //                 <div
// //                     ref={videoContainerRef}
// //                     className="fixed inset-0 z-[9999] bg-black w-[100dvw] h-[100dvh]"
// //                 >
// //                     <video
// //                         ref={overlayVideoRef}
// //                         src="/glitch.mp4"
// //                         muted
// //                         autoPlay
// //                         playsInline
// //                         onEnded={handleVideoEnded}
// //                         className="w-full h-full object-cover"
// //                     />
// //                 </div>
// //             )}
// //             <section className="relative z-0">
// //                 {showProjects && <Projects />}
// //             </section>

// //         </div>
// //     );

// // }



// "use client"
// import { useRef, useEffect, useState, useCallback } from "react";
// import * as THREE from "three";
// import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Projects from "../components/Projects";

// if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger);
// }

// export default function InteractiveOldPC() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const screenMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
//     const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
//     const isScrollingRef = useRef(false);
//     const videoPlaybackRequestedRef = useRef(false);
//     const fullscreenVideoTriggeredRef = useRef(false);

//     // State for video overlay
//     const [showVideo, setShowVideo] = useState(false);
//     const videoContainerRef = useRef<HTMLDivElement>(null);
//     const overlayVideoRef = useRef<HTMLVideoElement>(null);
//     const [showProjects, setShowProjects] = useState(false);

//     // Create video element with better error handling
//     const createVideoElement = useCallback(() => {
//         const video = document.createElement("video");
//         video.src = "/video.mp4";
//         video.loop = false;
//         video.muted = true;
//         video.playsInline = true;
//         video.preload = "auto";
//         video.crossOrigin = "anonymous";

//         video.onerror = () => {
//             console.warn("Video failed to load, using fallback texture");
//         };

//         return video;
//     }, []);

//     // Initialize video playback
//     const initializeVideoPlayback = useCallback(async (video: HTMLVideoElement) => {
//         try {
//             const playPromise = video.play();
//             if (playPromise !== undefined) {
//                 await playPromise;
//                 videoPlaybackRequestedRef.current = true;
//             }
//         } catch (err) {
//             console.warn("Autoplay failed, waiting for user interaction:", err);
//         }
//     }, []);

//     // Resume video when user interacts with page
//     const resumeVideoOnInteraction = useCallback(() => {
//         if (videoRef.current && !videoPlaybackRequestedRef.current) {
//             videoRef.current.play().catch(() => { });
//             videoPlaybackRequestedRef.current = true;
//         }
//     }, []);

//     // Handle fullscreen video
//     const handleFullscreenVideo = useCallback(() => {
//         if (fullscreenVideoTriggeredRef.current) return;

//         fullscreenVideoTriggeredRef.current = true;

//         setShowVideo(true);
//     }, []);

//     // Handle video end
//     const handleVideoEnded = useCallback(() => {
//         setShowProjects(true); // Show projects immediately

//         if (!videoContainerRef.current) return;

//         gsap.to(videoContainerRef.current, {
//             opacity: 0,
//             duration: 1,
//             ease: "power2.out",
//             onComplete: () => {
//                 setShowVideo(false);
//                 // setShowProjects(true);
//             },
//         });
//     }, []);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     useEffect(() => {
//         document.body.style.overflow = showVideo ? "hidden" : "";
//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [showVideo]);

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         document.addEventListener("click", resumeVideoOnInteraction);
//         document.addEventListener("touchstart", resumeVideoOnInteraction);
//         document.addEventListener("keydown", resumeVideoOnInteraction);

//         /* -------------------- Scene -------------------- */
//         const scene = new THREE.Scene();
//         scene.background = new THREE.Color(0x2A2A2A);

//         /* -------------------- Camera -------------------- */
//         const camera = new THREE.PerspectiveCamera(
//             50,
//             window.innerWidth / window.innerHeight,
//             0.1,
//             100
//         );
//         camera.position.set(0, 0.3, 3);

//         /* -------------------- Renderer -------------------- */
//         const renderer = new THREE.WebGLRenderer({
//             antialias: true,
//             alpha: true,
//             powerPreference: "high-performance"
//         });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//         renderer.shadowMap.enabled = true;
//         renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//         renderer.outputColorSpace = THREE.SRGBColorSpace;
//         container.appendChild(renderer.domElement);

//         /* -------------------- Enhanced Lights -------------------- */
//         scene.add(new THREE.AmbientLight(0xffffff, 0.8));

//         const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
//         mainLight.position.set(3, 5, 2);
//         mainLight.castShadow = true;
//         mainLight.shadow.mapSize.width = 2048;
//         mainLight.shadow.mapSize.height = 2048;
//         mainLight.shadow.camera.near = 0.5;
//         mainLight.shadow.camera.far = 50;
//         mainLight.shadow.camera.left = -10;
//         mainLight.shadow.camera.right = 10;
//         mainLight.shadow.camera.top = 10;
//         mainLight.shadow.camera.bottom = -10;
//         mainLight.shadow.bias = -0.0001;
//         scene.add(mainLight);

//         const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
//         fillLight.position.set(-3, 2, -2);
//         scene.add(fillLight);

//         const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
//         rimLight.position.set(0, 3, -3);
//         scene.add(rimLight);

//         // Add subtle environmental lighting
//         const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
//         scene.add(hemiLight);

//         /* -------------------- Premium CRT Monitor Body -------------------- */
//         const monitorWidth = 0.65;
//         const monitorHeight = 0.55;
//         const monitorDepth = 0.4;

//         const monitorMesh = new THREE.Mesh(
//             new RoundedBoxGeometry(monitorWidth, monitorHeight, monitorDepth, 12, 0.015),
//             new THREE.MeshStandardMaterial({
//                 color: 0x303030,
//                 metalness: 0.3,
//                 roughness: 0.4,
//                 envMapIntensity: 0.2
//             })
//         );
//         monitorMesh.position.y = 0;
//         monitorMesh.castShadow = true;
//         monitorMesh.receiveShadow = true;
//         scene.add(monitorMesh);

//         /* -------------------- Premium Bezel with Accent Lighting -------------------- */
//         const bezelThickness = 0.015;
//         const bezelGeometry = new RoundedBoxGeometry(
//             monitorWidth - 0.03,
//             monitorHeight - 0.12,
//             bezelThickness,
//             8,
//             0.008
//         );

//         const bezelMaterial = new THREE.MeshStandardMaterial({
//             color: 0x0a0a0a,
//             metalness: 0.8,
//             roughness: 0.15,
//             emissive: 0x000000,
//             emissiveIntensity: 0
//         });
//         const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
//         bezel.position.z = monitorDepth / 2 + 0.02;
//         monitorMesh.add(bezel);

//         // Bezel accent strip (premium detail)
//         const bezelAccentGeometry = new THREE.BoxGeometry(
//             monitorWidth - 0.05,
//             0.003,
//             bezelThickness + 0.001
//         );
//         const bezelAccentMaterial = new THREE.MeshStandardMaterial({
//             color: 0x606060,
//             metalness: 0.9,
//             roughness: 0.1
//         });
//         const bezelAccent = new THREE.Mesh(bezelAccentGeometry, bezelAccentMaterial);
//         bezelAccent.position.set(0, monitorHeight / 2 - 0.08, bezelThickness / 2 + 0.001);
//         bezel.add(bezelAccent);

//         /* -------------------- Premium Glass Screen Protection -------------------- */
//         const glassGeometry = new THREE.PlaneGeometry(
//             monitorWidth - 0.08,
//             monitorHeight - 0.18
//         );

//         const glassMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0xffffff,
//             metalness: 0,
//             roughness: 0,
//             transmission: 0.95,
//             thickness: 0.05,
//             ior: 1.52,
//             specularIntensity: 1,
//             specularColor: 0xffffff,
//             envMapIntensity: 0.5,
//             transparent: true,
//             opacity: 0.9,
//             side: THREE.DoubleSide
//         });
//         glassMaterialRef.current = glassMaterial;

//         const glassScreen = new THREE.Mesh(glassGeometry, glassMaterial);
//         glassScreen.position.z = monitorDepth / 2 + 0.027;
//         monitorMesh.add(glassScreen);

//         /* -------------------- Enhanced CRT Screen (Curved) -------------------- */
//         const screenWidth = monitorWidth - 0.12;
//         const screenHeight = monitorHeight - 0.22;

//         // Create curved screen geometry
//         const screenSegments = 128;
//         const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight, screenSegments, screenSegments);

//         // Apply curvature to vertices
//         const curvature = 0.1;
//         const positionAttribute = screenGeometry.attributes.position;
//         for (let i = 0; i < positionAttribute.count; i++) {
//             const x = positionAttribute.getX(i);
//             const y = positionAttribute.getY(i);
//             const distance = Math.sqrt((x / (screenWidth / 2)) ** 2 + (y / (screenHeight / 2)) ** 2);
//             const z = -curvature * distance * distance;
//             positionAttribute.setZ(i, z);
//         }
//         screenGeometry.computeVertexNormals();

//         const video = createVideoElement();
//         videoRef.current = video;

//         const videoTexture = new THREE.VideoTexture(video);
//         videoTexture.colorSpace = THREE.SRGBColorSpace;
//         videoTexture.minFilter = THREE.LinearFilter;
//         videoTexture.magFilter = THREE.LinearFilter;
//         videoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

//         // Enhanced scanline effect with finer lines
//         const scanlineCanvas = document.createElement('canvas');
//         scanlineCanvas.width = 2048;
//         scanlineCanvas.height = 2048;
//         const ctx = scanlineCanvas.getContext('2d')!;
//         const gradient = ctx.createLinearGradient(0, 0, 0, scanlineCanvas.height);
//         gradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
//         gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
//         gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
//         ctx.fillStyle = gradient;
//         for (let y = 0; y < scanlineCanvas.height; y += 3) {
//             ctx.fillRect(0, y, scanlineCanvas.width, 1);
//         }
//         // Add subtle horizontal scanlines
//         for (let x = 0; x < scanlineCanvas.width; x += 4) {
//             ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
//             ctx.fillRect(x, 0, 1, scanlineCanvas.height);
//         }
//         const scanlineTexture = new THREE.CanvasTexture(scanlineCanvas);
//         scanlineTexture.wrapS = THREE.RepeatWrapping;
//         scanlineTexture.wrapT = THREE.RepeatWrapping;

//         // Create antiglare coating texture
//         const antiglareCanvas = document.createElement('canvas');
//         antiglareCanvas.width = 512;
//         antiglareCanvas.height = 512;
//         const antiglareCtx = antiglareCanvas.getContext('2d')!;
//         antiglareCtx.fillStyle = 'rgba(200, 200, 200, 0.1)';
//         antiglareCtx.fillRect(0, 0, 512, 512);
//         for (let i = 0; i < 2000; i++) {
//             const x = Math.random() * 512;
//             const y = Math.random() * 512;
//             const size = Math.random() * 2 + 0.5;
//             antiglareCtx.beginPath();
//             antiglareCtx.arc(x, y, size, 0, Math.PI * 2);
//             antiglareCtx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
//             antiglareCtx.fill();
//         }
//         const antiglareTexture = new THREE.CanvasTexture(antiglareCanvas);

//         const screenMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 videoTexture: { value: videoTexture },
//                 scanlineTexture: { value: scanlineTexture },
//                 antiglareTexture: { value: antiglareTexture },
//                 time: { value: 0 },
//                 emissiveIntensity: { value: 0.1 },
//                 curvature: { value: curvature },
//                 screenSize: { value: new THREE.Vector2(screenWidth, screenHeight) }
//             },
//             vertexShader: `
//                 varying vec2 vUv;
//                 varying vec3 vNormal;
//                 varying vec3 vViewPosition;
//                 uniform float curvature;
//                 uniform vec2 screenSize;

//                 void main() {
//                     vUv = uv;
//                     vNormal = normalize(normalMatrix * normal);

//                     // Enhanced curvature
//                     vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
//                     vViewPosition = worldPosition.xyz;

//                     // Add subtle screen bulge effect
//                     vec2 centeredUV = uv * 2.0 - 1.0;
//                     float dist = length(centeredUV);
//                     float bulge = curvature * dist * dist;

//                     vec3 pos = position;
//                     pos.z -= bulge * 0.5;

//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform sampler2D videoTexture;
//                 uniform sampler2D scanlineTexture;
//                 uniform sampler2D antiglareTexture;
//                 uniform float time;
//                 uniform float emissiveIntensity;
//                 varying vec2 vUv;
//                 varying vec3 vNormal;
//                 varying vec3 vViewPosition;

//                 void main() {
//                     // Sample video with chromatic aberration
//                     float chromaOffset = 0.002;
//                     vec2 uv = vUv;

//                     float red = texture2D(videoTexture, uv + vec2(chromaOffset, 0.0)).r;
//                     float green = texture2D(videoTexture, uv).g;
//                     float blue = texture2D(videoTexture, uv - vec2(chromaOffset, 0.0)).b;

//                     vec4 videoColor = vec4(red, green, blue, 1.0);

//                     // Enhanced CRT color grading
//                     float gray = dot(videoColor.rgb, vec3(0.299, 0.587, 0.114));
//                     vec3 crtColor = vec3(
//                         gray * 0.9 + 0.1,
//                         gray * 0.95 + 0.05,
//                         gray * 0.8 + 0.1
//                     );

//                     // Scanline effect with motion
//                     vec2 scanlineUV = vUv * vec2(1.0, 4.0);
//                     scanlineUV.y += time * 0.3;
//                     vec4 scanline = texture2D(scanlineTexture, scanlineUV);

//                     // Antiglare coating
//                     vec4 antiglare = texture2D(antiglareTexture, vUv * 2.0);

//                     // Enhanced vignette
//                     vec2 centeredUV = vUv * 2.0 - 1.0;
//                     float dist = length(centeredUV);
//                     float vignette = 1.0 - smoothstep(0.3, 1.2, dist * dist);
//                     vignette = vignette * 0.7 + 0.3;

//                     // Screen curvature shading
//                     vec3 normal = normalize(vNormal);
//                     float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.0);

//                     // Combine all effects
//                     crtColor *= vignette;
//                     crtColor *= (0.85 + 0.15 * scanline.r);
//                     crtColor = mix(crtColor, crtColor * 0.9, antiglare.r);
//                     crtColor += crtColor * emissiveIntensity * (1.0 + fresnel * 0.3);

//                     // Subtle screen bloom
//                     float luminance = dot(crtColor, vec3(0.2126, 0.7152, 0.0722));
//                     crtColor += crtColor * smoothstep(0.5, 1.0, luminance) * 0.1;

//                     gl_FragColor = vec4(crtColor, 1.0);
//                 }
//             `,
//             transparent: false
//         });

//         screenMaterialRef.current = screenMaterial;

//         const screen = new THREE.Mesh(screenGeometry, screenMaterial);
//         screen.position.z = monitorDepth / 2 + 0.023;
//         monitorMesh.add(screen);

//         /* -------------------- Premium Monitor Base/Stand -------------------- */
//         const baseGeometry = new THREE.CylinderGeometry(0.16, 0.22, 0.06, 32);
//         const baseMaterial = new THREE.MeshStandardMaterial({
//             color: 0x282828,
//             metalness: 0.4,
//             roughness: 0.3,
//         });
//         const base = new THREE.Mesh(baseGeometry, baseMaterial);
//         base.position.y = -monitorHeight / 2 - 0.12;
//         base.castShadow = true;
//         monitorMesh.add(base);

//         // Premium stand with brushed metal finish
//         const standConnectorGeometry = new THREE.CylinderGeometry(0.05, 0.07, 0.15, 16);
//         const standConnectorMaterial = new THREE.MeshStandardMaterial({
//             color: 0x383838,
//             metalness: 0.6,
//             roughness: 0.2,
//         });
//         const standConnector = new THREE.Mesh(standConnectorGeometry, standConnectorMaterial);
//         standConnector.position.y = -monitorHeight / 2 - 0.06;
//         standConnector.castShadow = true;
//         monitorMesh.add(standConnector);

//         // Tilt mechanism detail
//         const tiltRingGeometry = new THREE.TorusGeometry(0.065, 0.008, 8, 16);
//         const tiltRingMaterial = new THREE.MeshStandardMaterial({
//             color: 0x505050,
//             metalness: 0.8,
//             roughness: 0.1,
//         });
//         const tiltRing = new THREE.Mesh(tiltRingGeometry, tiltRingMaterial);
//         tiltRing.position.y = -monitorHeight / 2 - 0.02;
//         tiltRing.rotation.x = Math.PI / 2;
//         tiltRing.castShadow = true;
//         monitorMesh.add(tiltRing);

//         /* -------------------- Enhanced Controls & Branding -------------------- */
//         const buttonMaterial = new THREE.MeshStandardMaterial({
//             color: 0x404040,
//             metalness: 0.4,
//             roughness: 0.3,
//         });

//         const darkerButtonMaterial = buttonMaterial.clone();
//         darkerButtonMaterial.color = new THREE.Color(0x303030);
//         darkerButtonMaterial.metalness = 0.5;

//         const premiumButtonMaterial = new THREE.MeshStandardMaterial({
//             color: 0xa0a0a0,
//             metalness: 0.9,
//             roughness: 0.1,
//             emissive: 0x202020,
//             emissiveIntensity: 0.1
//         });

//         // Enhanced power button with indicator ring
//         const powerButtonRingGeometry = new THREE.RingGeometry(0.016, 0.02, 16);
//         const powerButtonRing = new THREE.Mesh(powerButtonRingGeometry, premiumButtonMaterial);
//         powerButtonRing.position.set(-monitorWidth / 2 + 0.08, -monitorHeight / 2 + 0.16, monitorDepth / 2 + 0.011);
//         powerButtonRing.rotation.x = -Math.PI / 2;
//         monitorMesh.add(powerButtonRing);

//         const powerButtonGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 24);
//         const powerButton = new THREE.Mesh(powerButtonGeometry, premiumButtonMaterial);
//         powerButton.position.set(-monitorWidth / 2 + 0.08, -monitorHeight / 2 + 0.16, monitorDepth / 2 + 0.015);
//         powerButton.rotation.x = Math.PI / 2;
//         monitorMesh.add(powerButton);

//         // Enhanced LED with glow effect
//         const ledGlowGeometry = new THREE.CircleGeometry(0.008, 16);
//         const ledGlowMaterial = new THREE.MeshBasicMaterial({
//             color: 0x00ff00,
//             transparent: true,
//             opacity: 0.3,
//             side: THREE.DoubleSide
//         });
//         const ledGlow = new THREE.Mesh(ledGlowGeometry, ledGlowMaterial);
//         ledGlow.position.set(-monitorWidth / 2 + 0.08, -monitorHeight / 2 + 0.19, monitorDepth / 2 + 0.01);
//         ledGlow.rotation.x = -Math.PI / 2;
//         monitorMesh.add(ledGlow);

//         const ledGeometry = new THREE.CylinderGeometry(0.004, 0.004, 0.006, 12);
//         const ledMaterial = new THREE.MeshStandardMaterial({
//             color: 0x00ff00,
//             emissive: 0x00aa00,
//             emissiveIntensity: 1
//         });
//         const led = new THREE.Mesh(ledGeometry, ledMaterial);
//         led.position.set(-monitorWidth / 2 + 0.08, -monitorHeight / 2 + 0.19, monitorDepth / 2 + 0.011);
//         monitorMesh.add(led);

//         // Enhanced knobs with fine detailing
//         const knobMainGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.012, 24);
//         const knobMain = new THREE.Mesh(knobMainGeometry, premiumButtonMaterial);
//         knobMain.position.set(monitorWidth / 2 - 0.1, -monitorHeight / 2 + 0.16, monitorDepth / 2 + 0.015);
//         knobMain.rotation.x = Math.PI / 2;
//         monitorMesh.add(knobMain);

//         const knobDetailGeometry = new THREE.TorusGeometry(0.011, 0.002, 4, 12);
//         const knobDetail = new THREE.Mesh(knobDetailGeometry, darkerButtonMaterial);
//         knobDetail.position.copy(knobMain.position);
//         knobDetail.rotation.x = Math.PI / 2;
//         monitorMesh.add(knobDetail);

//         const brightnessKnob = knobMain.clone();
//         brightnessKnob.position.x = monitorWidth / 2 - 0.06;
//         monitorMesh.add(brightnessKnob);

//         const brightnessKnobDetail = knobDetail.clone();
//         brightnessKnobDetail.position.x = monitorWidth / 2 - 0.06;
//         monitorMesh.add(brightnessKnobDetail);

//         // Premium control buttons with indents
//         const controlPanelGeometry = new THREE.BoxGeometry(0.2, 0.03, 0.005);
//         const controlPanelMaterial = new THREE.MeshStandardMaterial({
//             color: 0x202020,
//             metalness: 0.7,
//             roughness: 0.2,
//         });
//         const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
//         controlPanel.position.set(monitorWidth / 2 - 0.2, -monitorHeight / 2 + 0.08, monitorDepth / 2 + 0.011);
//         monitorMesh.add(controlPanel);

//         const smallButtonGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.006, 16);
//         const buttonSpacing = 0.035;

//         for (let i = 0; i < 4; i++) {
//             const button = new THREE.Mesh(smallButtonGeometry, premiumButtonMaterial);
//             button.rotation.x = Math.PI / 2;
//             button.position.set(
//                 monitorWidth / 2 - 0.15 + (i * buttonSpacing),
//                 -monitorHeight / 2 + 0.08,
//                 monitorDepth / 2 + 0.016
//             );
//             monitorMesh.add(button);

//             // Button labels
//             const labelGeometry = new THREE.PlaneGeometry(0.006, 0.003);
//             const labelMaterial = new THREE.MeshBasicMaterial({
//                 color: 0xffffff,
//                 transparent: true,
//                 opacity: 0.8
//             });
//             const label = new THREE.Mesh(labelGeometry, labelMaterial);
//             label.position.copy(button.position);
//             label.position.z += 0.003;
//             label.rotation.x = -Math.PI / 2;
//             monitorMesh.add(label);
//         }

//         // Premium branding
//         const logoGeometry = new RoundedBoxGeometry(
//             0.14,
//             0.025,
//             0.004,
//             4,
//             0.005
//         );
//         // const logoGeometry = new THREE.RoundedBoxGeometry(0.14, 0.025, 0.004, 4, 0.005);
//         const logoMaterial = new THREE.MeshStandardMaterial({
//             color: 0x101010,
//             metalness: 0.9,
//             roughness: 0.1,
//             emissive: 0x202020,
//             emissiveIntensity: 0.05
//         });
//         const logo = new THREE.Mesh(logoGeometry, logoMaterial);
//         logo.position.set(0, -monitorHeight / 2 + 0.045, monitorDepth / 2 + 0.011);
//         monitorMesh.add(logo);

//         // Model number/type
//         const modelTextGeometry = new THREE.PlaneGeometry(0.08, 0.01);
//         const modelTextMaterial = new THREE.MeshBasicMaterial({
//             color: 0x606060,
//             transparent: true,
//             opacity: 0.7,
//             side: THREE.DoubleSide
//         });
//         const modelText = new THREE.Mesh(modelTextGeometry, modelTextMaterial);
//         modelText.position.set(0, -monitorHeight / 2 + 0.02, monitorDepth / 2 + 0.011);
//         modelText.rotation.x = -Math.PI / 2;
//         monitorMesh.add(modelText);

//         /* -------------------- Screen Glow Effect (Enhanced) -------------------- */
//         const screenGlowGeometry = new THREE.PlaneGeometry(screenWidth + 0.03, screenHeight + 0.03, 1, 1);
//         const screenGlowMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 time: { value: 0 },
//                 intensity: { value: 0.1 }
//             },
//             vertexShader: `
//                 varying vec2 vUv;
//                 void main() {
//                     vUv = uv;
//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform float time;
//                 uniform float intensity;
//                 varying vec2 vUv;

//                 void main() {
//                     vec2 centeredUV = vUv * 2.0 - 1.0;
//                     float dist = length(centeredUV);
//                     float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * intensity;

//                     // Pulsing effect
//                     float pulse = sin(time * 2.0) * 0.1 + 0.9;

//                     gl_FragColor = vec4(0.8, 0.9, 1.0, alpha * pulse * 0.3);
//                 }
//             `,
//             transparent: true,
//             side: THREE.DoubleSide,
//             depthWrite: false,
//             blending: THREE.AdditiveBlending
//         });
//         const screenGlow = new THREE.Mesh(screenGlowGeometry, screenGlowMaterial);
//         screenGlow.position.z = monitorDepth / 2 + 0.022;
//         monitorMesh.add(screenGlow);

//         // Rest of the code remains exactly the same (keyboard, mouse, desk, scroll animation, etc.)
//         /* -------------------- Keyboard -------------------- */
//         const keyboardWidth = 0.5;
//         const keyboardHeight = 0.02;
//         const keyboardDepth = 0.2;

//         const keyboardGeometry = new THREE.BoxGeometry(keyboardWidth, keyboardHeight, keyboardDepth);
//         const keyboardMaterial = new THREE.MeshStandardMaterial({
//             color: 0x353535,
//             metalness: 0.05,
//             roughness: 0.9,
//         });
//         const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
//         keyboard.position.set(0, -0.6, 0.3);
//         keyboard.rotation.x = -0.1;
//         keyboard.castShadow = true;
//         keyboard.receiveShadow = true;
//         scene.add(keyboard);

//         const keyRows = 4;
//         const keysPerRow = 12;
//         const keyWidth = 0.03;
//         const keyHeight = 0.01;
//         const keyDepth = 0.01;
//         const keySpacing = 0.035;
//         const rowSpacing = 0.025;

//         const keyGeometry = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);
//         const keyMaterial = new THREE.MeshStandardMaterial({
//             color: 0x252525,
//             metalness: 0.1,
//             roughness: 0.85,
//         });

//         for (let row = 0; row < keyRows; row++) {
//             for (let col = 0; col < keysPerRow; col++) {
//                 const key = new THREE.Mesh(keyGeometry, keyMaterial);
//                 key.position.set(
//                     (col - keysPerRow / 2 + 0.5) * keySpacing,
//                     keyboard.position.y + keyboardHeight / 2 + keyHeight / 2 + 0.001,
//                     keyboard.position.z + (row - keyRows / 2 + 0.5) * rowSpacing
//                 );
//                 key.castShadow = true;
//                 scene.add(key);
//             }
//         }

//         const spacebarGeometry = new THREE.BoxGeometry(0.15, 0.008, 0.025);
//         const spacebar = new THREE.Mesh(spacebarGeometry, keyMaterial);
//         spacebar.position.set(0, keyboard.position.y + keyboardHeight / 2 + 0.008 / 2 + 0.001, keyboard.position.z + 0.08);
//         spacebar.castShadow = true;
//         scene.add(spacebar);

//         /* -------------------- Mouse -------------------- */
//         const mouseGeometry = new THREE.SphereGeometry(0.025, 16, 16);
//         mouseGeometry.scale(1.5, 0.7, 1);
//         const mouseMaterial = new THREE.MeshStandardMaterial({
//             color: 0x303030,
//             metalness: 0.1,
//             roughness: 0.85,
//         });
//         const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
//         mouse.position.set(0.3, -0.58, 0.15);
//         mouse.castShadow = true;
//         scene.add(mouse);

//         const cableCurve = new THREE.CatmullRomCurve3([
//             new THREE.Vector3(0.3, -0.58, 0.15),
//             new THREE.Vector3(0.2, -0.7, 0.1),
//             new THREE.Vector3(0.1, -0.8, -0.1),
//             new THREE.Vector3(0, -0.9, -0.3),
//         ]);

//         const cableGeometry = new THREE.TubeGeometry(cableCurve, 20, 0.005, 8, false);
//         const cableMaterial = new THREE.MeshStandardMaterial({
//             color: 0x202020,
//             metalness: 0.05,
//             roughness: 0.95,
//         });
//         const cable = new THREE.Mesh(cableGeometry, cableMaterial);
//         scene.add(cable);

//         /* -------------------- Desk Surface -------------------- */
//         const deskWidth = 4;
//         const deskDepth = 2;
//         const deskThickness = 0.05;

//         const deskGeometry = new THREE.BoxGeometry(deskWidth, deskThickness, deskDepth);
//         const deskMaterial = new THREE.MeshStandardMaterial({
//             color: 0x404040,
//             metalness: 0,
//             roughness: 0.7,
//         });
//         const desk = new THREE.Mesh(deskGeometry, deskMaterial);
//         desk.position.set(0, -0.9, 0);
//         desk.receiveShadow = true;
//         scene.add(desk);

//         const deskTextureCanvas = document.createElement('canvas');
//         deskTextureCanvas.width = 256;
//         deskTextureCanvas.height = 256;
//         const deskCtx = deskTextureCanvas.getContext('2d')!;
//         deskCtx.fillStyle = '#404040';
//         deskCtx.fillRect(0, 0, 256, 256);
//         deskCtx.strokeStyle = 'rgba(50, 50, 50, 0.1)';
//         deskCtx.lineWidth = 1;
//         for (let i = 0; i < 20; i++) {
//             const x = Math.random() * 256;
//             deskCtx.beginPath();
//             deskCtx.moveTo(x, 0);
//             deskCtx.bezierCurveTo(
//                 x + 20, 50,
//                 x - 20, 150,
//                 x, 256
//             );
//             deskCtx.stroke();
//         }
//         const deskTexture = new THREE.CanvasTexture(deskTextureCanvas);
//         deskMaterial.map = deskTexture;

//         /* -------------------- Scroll Animation -------------------- */
//         const screenEmissiveIntensity = { value: 0.1 };
//         let scrollTriggerInstance: ScrollTrigger | null = null;

//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: document.body,
//                 start: "top top",
//                 end: "+=200%",
//                 scrub: 1.5,
//                 pin: container,
//                 pinSpacing: false,
//                 onEnter: () => {
//                     isScrollingRef.current = true;
//                     if (videoRef.current && videoRef.current.paused) {
//                         videoRef.current.play().catch(() => { });
//                     }
//                 },
//                 onLeaveBack: () => {
//                     isScrollingRef.current = false;
//                 },
//                 onUpdate: (self) => {
//                     if (
//                         self.progress >= 0.999 &&
//                         !fullscreenVideoTriggeredRef.current
//                     ) {
//                         handleFullscreenVideo();
//                     }
//                 },

//                 onEnterBack: () => { },
//             },
//         });

//         tl.to(camera.position, {
//             z: 1.2,
//             y: 0.1,
//             ease: "power2.out"
//         })
//             .to(camera, {
//                 fov: 25,
//                 onUpdate: () => camera.updateProjectionMatrix(),
//                 ease: "power2.out"
//             }, 0)
//             .to(monitorMesh.rotation, {
//                 y: Math.PI * 0.2,
//                 x: -0.05,
//                 ease: "power2.out"
//             }, 0)
//             .to(screenEmissiveIntensity, {
//                 value: 0.3,
//                 ease: "power2.out"
//             }, 0)
//             .to(bezelMaterial, {
//                 emissiveIntensity: 0.05,
//                 ease: "power2.out"
//             }, 0);

//         const SCROLL_TRIGGER_ID = 'my-trigger';
//         scrollTriggerInstance = ScrollTrigger.getById(SCROLL_TRIGGER_ID)!;

//         /* -------------------- Mouse Interaction -------------------- */
//         let mouseX = 0;
//         let mouseY = 0;
//         const onMouseMove = (e: MouseEvent) => {
//             mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
//             mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
//         };
//         window.addEventListener("mousemove", onMouseMove);

//         /* -------------------- Resize Handler -------------------- */
//         const onResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             ScrollTrigger.refresh();
//         };
//         window.addEventListener("resize", onResize);

//         initializeVideoPlayback(video);

//         /* -------------------- Animation Loop -------------------- */
//         const clock = new THREE.Clock();
//         let animationId: number;

//         const animate = () => {
//             animationId = requestAnimationFrame(animate);

//             const delta = clock.getDelta();
//             const time = clock.getElapsedTime();

//             monitorMesh.rotation.y += (mouseX - monitorMesh.rotation.y) * 0.05;
//             monitorMesh.rotation.x += (-mouseY - monitorMesh.rotation.x) * 0.05;

//             monitorMesh.position.y = Math.sin(time * 0.5) * 0.002;
//             monitorMesh.rotation.z = Math.sin(time * 0.3) * 0.002;

//             ledMaterial.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.2;

//             if (screenMaterialRef.current) {
//                 screenMaterialRef.current.uniforms.time.value = time;
//                 screenMaterialRef.current.uniforms.emissiveIntensity.value = screenEmissiveIntensity.value;
//             }

//             if (glassMaterialRef.current) {
//                 glassMaterialRef.current.opacity = 0.85 + Math.sin(time * 0.5) * 0.05;
//             }

//             scanlineTexture.offset.y += delta * 0.5;

//             camera.lookAt(monitorMesh.position);
//             renderer.render(scene, camera);
//         };
//         animate();

//         /* -------------------- Cleanup -------------------- */
//         return () => {
//             window.removeEventListener("mousemove", onMouseMove);
//             window.removeEventListener("resize", onResize);
//             document.removeEventListener("click", resumeVideoOnInteraction);
//             document.removeEventListener("touchstart", resumeVideoOnInteraction);
//             document.removeEventListener("keydown", resumeVideoOnInteraction);

//             if (videoRef.current) {
//                 videoRef.current.pause();
//                 videoRef.current.src = "";
//                 videoRef.current.load();
//             }

//             cancelAnimationFrame(animationId);
//             renderer.dispose();

//             if (scrollTriggerInstance) {
//                 scrollTriggerInstance.kill();
//             }
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//             if (container.contains(renderer.domElement)) {
//                 container.removeChild(renderer.domElement);
//             }
//         };
//     }, [createVideoElement, initializeVideoPlayback, resumeVideoOnInteraction, handleFullscreenVideo]);

//     // Effect for handling overlay video
//     useEffect(() => {
//         if (!showVideo || !videoContainerRef.current) return;

//         // Pause the 3D scene video when fullscreen video plays
//         if (videoRef.current) {
//             videoRef.current.pause();
//         }

//         // Fade in overlay - make video cover entire screen
//         gsap.fromTo(
//             videoContainerRef.current,
//             { opacity: 0 },
//             {
//                 opacity: 1,
//                 duration: 1,
//                 ease: "power2.out",
//                 onComplete: () => {
//                     if (overlayVideoRef.current) {
//                         overlayVideoRef.current.play().catch(console.warn);
//                     }
//                 }
//             }
//         );

//         // Cleanup when video ends or component unmounts
//         return () => {
//             // Resume 3D scene video when overlay is closed
//             if (videoRef.current && !fullscreenVideoTriggeredRef.current) {
//                 videoRef.current.play().catch(() => { });
//             }
//         };
//     }, [showVideo]);



//     return (
//         <div className="relative w-full bg-gradient-to-b from-gray-100 to-gray-0">

//             {/* Scroll space (controls how long the scroll is) */}
//             <div className="h-[200vh]" />

//             {/* PINNED SCENE */}
//             <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen" />

//             {/* HUD */}
//             <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-mono z-10">
//                 <div className="flex items-center space-x-4">
//                     <div className="flex items-center">
//                         <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
//                         <span>POWER</span>
//                     </div>
//                     <div className="text-gray-500">|</div>
//                     <div>VGA DISPLAY ACTIVE</div>
//                     <div className="text-gray-500">|</div>
//                     <div>60Hz @ 800×600</div>
//                 </div>

//                 <div className="mt-4 text-center text-gray-500 text-xs animate-pulse">
//                     ↓ SCROLL TO ACTIVATE FULLSCREEN ↓
//                 </div>
//             </div>

//             {/* 🔥 TRUE FULLSCREEN VIDEO OVERLAY */}
//             {showVideo && (
//                 <div
//                     ref={videoContainerRef}
//                     className="fixed inset-0 z-[9999] bg-black w-[100dvw] h-[100dvh]"
//                 >
//                     <video
//                         ref={overlayVideoRef}
//                         src="/glitch.mp4"
//                         muted
//                         autoPlay
//                         playsInline
//                         onEnded={handleVideoEnded}
//                         className="w-full h-full object-cover"
//                     />
//                 </div>
//             )}
//             <section className="relative z-0">
//                 {showProjects && <Projects />}
//             </section>

//         </div>
//     );

// }



// "use client"
// import { useRef, useEffect, useState, useCallback } from "react";
// import * as THREE from "three";
// import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Projects from "../components/Projects";

// if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger);
// }

// export default function InteractiveOldPC() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const screenMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
//     const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
//     const isScrollingRef = useRef(false);
//     const videoPlaybackRequestedRef = useRef(false);
//     const fullscreenVideoTriggeredRef = useRef(false);

//     // State for video overlay
//     const [showVideo, setShowVideo] = useState(false);
//     const videoContainerRef = useRef<HTMLDivElement>(null);
//     const overlayVideoRef = useRef<HTMLVideoElement>(null);
//     const [showProjects, setShowProjects] = useState(false);

//     // Create video element with better error handling
//     const createVideoElement = useCallback(() => {
//         const video = document.createElement("video");
//         video.src = "/video.mp4";
//         video.loop = false;
//         video.muted = true;
//         video.playsInline = true;
//         video.preload = "auto";
//         video.crossOrigin = "anonymous";

//         video.onerror = () => {
//             console.warn("Video failed to load, using fallback texture");
//         };

//         return video;
//     }, []);

//     // Initialize video playback
//     const initializeVideoPlayback = useCallback(async (video: HTMLVideoElement) => {
//         try {
//             const playPromise = video.play();
//             if (playPromise !== undefined) {
//                 await playPromise;
//                 videoPlaybackRequestedRef.current = true;
//             }
//         } catch (err) {
//             console.warn("Autoplay failed, waiting for user interaction:", err);
//         }
//     }, []);

//     // Resume video when user interacts with page
//     const resumeVideoOnInteraction = useCallback(() => {
//         if (videoRef.current && !videoPlaybackRequestedRef.current) {
//             videoRef.current.play().catch(() => { });
//             videoPlaybackRequestedRef.current = true;
//         }
//     }, []);

//     // Handle fullscreen video
//     const handleFullscreenVideo = useCallback(() => {
//         if (fullscreenVideoTriggeredRef.current) return;

//         fullscreenVideoTriggeredRef.current = true;

//         setShowVideo(true);
//     }, []);

//     // Handle video end
//     const handleVideoEnded = useCallback(() => {
//         setShowProjects(true);

//         if (!videoContainerRef.current) return;

//         gsap.to(videoContainerRef.current, {
//             opacity: 0,
//             duration: 1,
//             ease: "power2.out",
//             onComplete: () => {
//                 setShowVideo(false);
//             },
//         });
//     }, []);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     useEffect(() => {
//         document.body.style.overflow = showVideo ? "hidden" : "";
//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [showVideo]);

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         document.addEventListener("click", resumeVideoOnInteraction);
//         document.addEventListener("touchstart", resumeVideoOnInteraction);
//         document.addEventListener("keydown", resumeVideoOnInteraction);

//         /* -------------------- Scene -------------------- */
//         const scene = new THREE.Scene();
//         scene.background = new THREE.Color(0x0A0A12);

//         /* -------------------- Camera -------------------- */
//         const camera = new THREE.PerspectiveCamera(
//             45,
//             window.innerWidth / window.innerHeight,
//             0.1,
//             100
//         );
//         camera.position.set(0, 0.3, 3.2);

//         /* -------------------- Renderer -------------------- */
//         const renderer = new THREE.WebGLRenderer({
//             antialias: true,
//             alpha: true,
//             powerPreference: "high-performance"
//         });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
//         renderer.shadowMap.enabled = true;
//         renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//         renderer.outputColorSpace = THREE.SRGBColorSpace;
//         renderer.toneMapping = THREE.ACESFilmicToneMapping;
//         renderer.toneMappingExposure = 1.2;
//         container.appendChild(renderer.domElement);

//         /* -------------------- Premium Lighting System -------------------- */
//         const ambientLight = new THREE.AmbientLight(0x4040FF, 0.15);
//         ambientLight.color.setHSL(0.66, 0.5, 0.3);
//         scene.add(ambientLight);

//         const mainLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
//         mainLight.position.set(4, 6, 3);
//         mainLight.castShadow = true;
//         mainLight.shadow.mapSize.width = 4096;
//         mainLight.shadow.mapSize.height = 4096;
//         mainLight.shadow.camera.near = 0.1;
//         mainLight.shadow.camera.far = 50;
//         mainLight.shadow.camera.left = -15;
//         mainLight.shadow.camera.right = 15;
//         mainLight.shadow.camera.top = 15;
//         mainLight.shadow.camera.bottom = -15;
//         mainLight.shadow.bias = -0.0005;
//         mainLight.shadow.radius = 2;
//         scene.add(mainLight);

//         const fillLight = new THREE.DirectionalLight(0x4488FF, 0.8);
//         fillLight.position.set(-4, 3, -3);
//         scene.add(fillLight);

//         const rimLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
//         rimLight.position.set(0, 4, -4);
//         scene.add(rimLight);

//         const hemiLight = new THREE.HemisphereLight(0x443388, 0x101010, 0.4);
//         scene.add(hemiLight);

//         const backLight = new THREE.PointLight(0x0066FF, 0.5, 10);
//         backLight.position.set(0, 0.5, -2);
//         scene.add(backLight);

//         /* -------------------- Premium Monitor Chassis -------------------- */
//         const monitorWidth = 0.68;
//         const monitorHeight = 0.58;
//         const monitorDepth = 0.42;

//         const monitorGeometry = new RoundedBoxGeometry(monitorWidth, monitorHeight, monitorDepth, 24, 0.02);
//         const monitorMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x101010,
//             metalness: 0.7,
//             roughness: 0.15,
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.1,
//             anisotropy: 1.0,
//             transmission: 0.05,
//             thickness: 0.5,
//             specularIntensity: 2.0,
//             specularColor: 0xFFFFFF,
//             envMapIntensity: 0.8,
//             side: THREE.DoubleSide
//         });
//         const monitorMesh = new THREE.Mesh(monitorGeometry, monitorMaterial);
//         monitorMesh.position.y = 0;
//         monitorMesh.castShadow = true;
//         monitorMesh.receiveShadow = true;
//         scene.add(monitorMesh);

//         /* -------------------- Nano-Edge Bezel -------------------- */
//         const bezelThickness = 0.012;
//         const bezelGeometry = new RoundedBoxGeometry(
//             monitorWidth - 0.02,
//             monitorHeight - 0.1,
//             bezelThickness,
//             16,
//             0.006
//         );

//         const bezelMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x050505,
//             metalness: 0.95,
//             roughness: 0.08,
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.05,
//             emissive: 0x000000,
//             emissiveIntensity: 0,
//             anisotropy: 0.8,
//             specularIntensity: 3.0,
//             side: THREE.DoubleSide
//         });
//         const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
//         bezel.position.z = monitorDepth / 2 + 0.015;
//         monitorMesh.add(bezel);

//         const bezelAccentGeometry = new THREE.TorusGeometry(
//             (monitorWidth - 0.04) / 2,
//             0.0015,
//             8,
//             64,
//             Math.PI * 2
//         );
//         const bezelAccentMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x808080,
//             metalness: 1.0,
//             roughness: 0.05,
//             emissive: 0x202020,
//             emissiveIntensity: 0.3,
//             side: THREE.DoubleSide
//         });
//         const bezelAccent = new THREE.Mesh(bezelAccentGeometry, bezelAccentMaterial);
//         bezelAccent.position.set(0, 0, bezelThickness / 2);
//         bezelAccent.rotation.x = Math.PI / 2;
//         bezel.add(bezelAccent);

//         /* -------------------- Nanoglass Screen Protection -------------------- */
//         const glassGeometry = new THREE.PlaneGeometry(
//             monitorWidth - 0.06,
//             monitorHeight - 0.14,
//             128,
//             128
//         );

//         const glassMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0xFFFFFF,
//             metalness: 0,
//             roughness: 0,
//             transmission: 0.98,
//             thickness: 0.1,
//             ior: 1.52,
//             specularIntensity: 2.0,
//             specularColor: 0xFFFFFF,
//             envMapIntensity: 1.0,
//             transparent: true,
//             opacity: 0.92,
//             side: THREE.DoubleSide,
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.05
//         });
//         glassMaterialRef.current = glassMaterial;

//         const glassScreen = new THREE.Mesh(glassGeometry, glassMaterial);
//         glassScreen.position.z = monitorDepth / 2 + 0.02;
//         monitorMesh.add(glassScreen);

//         /* -------------------- Quantum Dot Display -------------------- */
//         const screenWidth = monitorWidth - 0.1;
//         const screenHeight = monitorHeight - 0.18;

//         const screenSegments = 256;
//         const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight, screenSegments, screenSegments);

//         const curvature = 0.15;
//         const positionAttribute = screenGeometry.attributes.position;
//         for (let i = 0; i < positionAttribute.count; i++) {
//             const x = positionAttribute.getX(i);
//             const y = positionAttribute.getY(i);
//             const normalizedX = (x / (screenWidth / 2));
//             const normalizedY = (y / (screenHeight / 2));
//             const dist = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
//             const z = -curvature * Math.pow(dist, 2.5);
//             positionAttribute.setZ(i, z);
//         }
//         screenGeometry.computeVertexNormals();

//         const video = createVideoElement();
//         videoRef.current = video;

//         const videoTexture = new THREE.VideoTexture(video);
//         videoTexture.colorSpace = THREE.SRGBColorSpace;
//         videoTexture.minFilter = THREE.LinearFilter;
//         videoTexture.magFilter = THREE.LinearFilter;
//         videoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

//         const scanlineCanvas = document.createElement('canvas');
//         scanlineCanvas.width = 4096;
//         scanlineCanvas.height = 4096;
//         const ctx = scanlineCanvas.getContext('2d')!;

//         ctx.fillStyle = '#000';
//         ctx.fillRect(0, 0, scanlineCanvas.width, scanlineCanvas.height);

//         for (let y = 0; y < scanlineCanvas.height; y += 2) {
//             const alpha = 0.08 + Math.sin(y * 0.01) * 0.02;
//             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
//             ctx.fillRect(0, y, scanlineCanvas.width, 1);
//         }

//         for (let x = 0; x < scanlineCanvas.width; x += 3) {
//             const alpha = 0.03 + Math.cos(x * 0.005) * 0.01;
//             ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
//             ctx.fillRect(x, 0, 1, scanlineCanvas.height);
//         }

//         const scanlineTexture = new THREE.CanvasTexture(scanlineCanvas);
//         scanlineTexture.wrapS = THREE.RepeatWrapping;
//         scanlineTexture.wrapT = THREE.RepeatWrapping;

//         const quantumCanvas = document.createElement('canvas');
//         quantumCanvas.width = 1024;
//         quantumCanvas.height = 1024;
//         const quantumCtx = quantumCanvas.getContext('2d')!;

//         const gradient = quantumCtx.createRadialGradient(512, 512, 0, 512, 512, 512);
//         gradient.addColorStop(0, 'rgba(100, 150, 255, 0.2)');
//         gradient.addColorStop(0.3, 'rgba(80, 120, 220, 0.1)');
//         gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

//         quantumCtx.fillStyle = gradient;
//         quantumCtx.fillRect(0, 0, 1024, 1024);

//         for (let i = 0; i < 5000; i++) {
//             const x = Math.random() * 1024;
//             const y = Math.random() * 1024;
//             const size = Math.random() * 1.5 + 0.5;
//             const hue = 200 + Math.random() * 60;
//             quantumCtx.beginPath();
//             quantumCtx.arc(x, y, size, 0, Math.PI * 2);
//             quantumCtx.fillStyle = `hsla(${hue}, 80%, 70%, ${Math.random() * 0.15})`;
//             quantumCtx.fill();
//         }

//         const quantumTexture = new THREE.CanvasTexture(quantumCanvas);

//         const screenMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 videoTexture: { value: videoTexture },
//                 scanlineTexture: { value: scanlineTexture },
//                 quantumTexture: { value: quantumTexture },
//                 time: { value: 0 },
//                 emissiveIntensity: { value: 0.2 },
//                 curvature: { value: curvature },
//                 screenSize: { value: new THREE.Vector2(screenWidth, screenHeight) },
//                 chromaticAberration: { value: 0.003 },
//                 bloomThreshold: { value: 0.7 }
//             },
//             vertexShader: `
//                 varying vec2 vUv;
//                 varying vec3 vNormal;
//                 varying vec3 vWorldPosition;
//                 varying float vScreenDepth;
//                 uniform float curvature;
//                 uniform vec2 screenSize;

//                 void main() {
//                     vUv = uv;
//                     vNormal = normalize(normalMatrix * normal);

//                     vec4 worldPosition = modelMatrix * vec4(position, 1.0);
//                     vWorldPosition = worldPosition.xyz;

//                     vec2 centeredUV = uv * 2.0 - 1.0;
//                     float dist = length(centeredUV);
//                     float bulge = curvature * pow(dist, 2.5);

//                     vec3 pos = position;
//                     pos.z -= bulge * 0.8;
//                     vScreenDepth = pos.z;

//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform sampler2D videoTexture;
//                 uniform sampler2D scanlineTexture;
//                 uniform sampler2D quantumTexture;
//                 uniform float time;
//                 uniform float emissiveIntensity;
//                 uniform float chromaticAberration;
//                 uniform float bloomThreshold;
//                 varying vec2 vUv;
//                 varying vec3 vNormal;
//                 varying vec3 vWorldPosition;
//                 varying float vScreenDepth;

//                 void main() {
//                     vec2 uv = vUv;

//                     float r = texture2D(videoTexture, uv + vec2(chromaticAberration, 0.0)).r;
//                     float g = texture2D(videoTexture, uv).g;
//                     float b = texture2D(videoTexture, uv - vec2(chromaticAberration, 0.0)).b;

//                     vec4 videoColor = vec4(r, g, b, 1.0);

//                     float luminance = dot(videoColor.rgb, vec3(0.2126, 0.7152, 0.0722));

//                     vec3 quantumColor = vec3(
//                         luminance * 1.2,
//                         luminance * 1.1,
//                         luminance * 1.0
//                     );

//                     vec2 scanlineUV = uv * vec2(1.0, 3.0);
//                     scanlineUV.y += time * 0.5;
//                     vec4 scanline = texture2D(scanlineTexture, scanlineUV);

//                     vec4 quantum = texture2D(quantumTexture, uv * 2.0 + sin(time * 0.2) * 0.1);

//                     vec2 centeredUV = uv * 2.0 - 1.0;
//                     float dist = length(centeredUV);
//                     float vignette = 1.0 - smoothstep(0.3, 1.4, pow(dist, 1.5));
//                     vignette = vignette * 0.8 + 0.2;

//                     vec3 normal = normalize(vNormal);
//                     float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 3.0);

//                     vec3 finalColor = quantumColor * vignette;
//                     finalColor *= (0.9 + 0.1 * scanline.r);
//                     finalColor += quantum.rgb * 0.3;

//                     finalColor += finalColor * emissiveIntensity * (1.0 + fresnel * 0.5);

//                     float bloom = smoothstep(bloomThreshold, 1.0, luminance);
//                     finalColor += finalColor * bloom * 0.3;

//                     float scanlinePulse = sin(time * 3.0 + vWorldPosition.y * 10.0) * 0.02;
//                     finalColor += vec3(0.1, 0.2, 0.3) * scanlinePulse;

//                     gl_FragColor = vec4(finalColor, 1.0);
//                 }
//             `,
//             transparent: false
//         });

//         screenMaterialRef.current = screenMaterial;

//         const screen = new THREE.Mesh(screenGeometry, screenMaterial);
//         screen.position.z = monitorDepth / 2 + 0.018;
//         monitorMesh.add(screen);

//         /* -------------------- Carbon Fiber Stand -------------------- */
//         const baseGeometry = new THREE.CylinderGeometry(0.18, 0.24, 0.065, 64);
//         const baseMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x080808,
//             metalness: 0.9,
//             roughness: 0.1,
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.1,
//             anisotropy: 1.0,
//             side: THREE.DoubleSide
//         });
//         const base = new THREE.Mesh(baseGeometry, baseMaterial);
//         base.position.y = -monitorHeight / 2 - 0.125;
//         base.castShadow = true;
//         monitorMesh.add(base);

//         const standConnectorGeometry = new THREE.CylinderGeometry(0.055, 0.075, 0.16, 32);
//         const standConnectorMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x202020,
//             metalness: 0.95,
//             roughness: 0.08,
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });
//         const standConnector = new THREE.Mesh(standConnectorGeometry, standConnectorMaterial);
//         standConnector.position.y = -monitorHeight / 2 - 0.065;
//         standConnector.castShadow = true;
//         monitorMesh.add(standConnector);

//         const tiltRingGeometry = new THREE.TorusGeometry(0.07, 0.006, 16, 48);
//         const tiltRingMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x606060,
//             metalness: 0.98,
//             roughness: 0.05,
//             emissive: 0x303030,
//             emissiveIntensity: 0.2,
//             side: THREE.DoubleSide
//         });
//         const tiltRing = new THREE.Mesh(tiltRingGeometry, tiltRingMaterial);
//         tiltRing.position.y = -monitorHeight / 2 - 0.025;
//         tiltRing.rotation.x = Math.PI / 2;
//         tiltRing.castShadow = true;
//         monitorMesh.add(tiltRing);

//         /* -------------------- Holographic Controls -------------------- */
//         const controlBaseMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x151515,
//             metalness: 0.95,
//             roughness: 0.1,
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });

//         const holographicMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0xA0C8FF,
//             metalness: 1.0,
//             roughness: 0.05,
//             emissive: 0x4488FF,
//             emissiveIntensity: 0.4,
//             transmission: 0.3,
//             thickness: 0.5,
//             side: THREE.DoubleSide
//         });

//         const powerButtonGeometry = new THREE.CylinderGeometry(0.014, 0.014, 0.01, 32);
//         const powerButton = new THREE.Mesh(powerButtonGeometry, holographicMaterial);
//         powerButton.position.set(-monitorWidth / 2 + 0.085, -monitorHeight / 2 + 0.17, monitorDepth / 2 + 0.012);
//         powerButton.rotation.x = Math.PI / 2;
//         monitorMesh.add(powerButton);

//         const powerRingGeometry = new THREE.RingGeometry(0.016, 0.022, 32);
//         const powerRing = new THREE.Mesh(powerRingGeometry, holographicMaterial);
//         powerRing.position.copy(powerButton.position);
//         powerRing.position.z += 0.001;
//         powerRing.rotation.x = -Math.PI / 2;
//         monitorMesh.add(powerRing);

//         const ledCoreGeometry = new THREE.SphereGeometry(0.006, 24, 24);
//         const ledCoreMaterial = new THREE.MeshBasicMaterial({
//             color: 0x00FF88,
//             transparent: true,
//             opacity: 0.9
//         });
//         const ledCore = new THREE.Mesh(ledCoreGeometry, ledCoreMaterial);
//         ledCore.position.set(-monitorWidth / 2 + 0.085, -monitorHeight / 2 + 0.195, monitorDepth / 2 + 0.011);
//         monitorMesh.add(ledCore);

//         const ledHaloGeometry = new THREE.SphereGeometry(0.012, 32, 32);
//         const ledHaloMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 time: { value: 0 },
//                 color: { value: new THREE.Color(0x00FF88) }
//             },
//             vertexShader: `
//                 varying vec3 vNormal;
//                 void main() {
//                     vNormal = normalize(normalMatrix * normal);
//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform float time;
//                 uniform vec3 color;
//                 varying vec3 vNormal;

//                 void main() {
//                     float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
//                     float pulse = sin(time * 3.0) * 0.3 + 0.7;
//                     gl_FragColor = vec4(color, intensity * pulse * 0.4);
//                 }
//             `,
//             transparent: true,
//             side: THREE.BackSide,
//             blending: THREE.AdditiveBlending
//         });
//         const ledHalo = new THREE.Mesh(ledHaloGeometry, ledHaloMaterial);
//         ledHalo.position.copy(ledCore.position);
//         monitorMesh.add(ledHalo);

//         const knobBaseGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.014, 32);
//         const knobBase = new THREE.Mesh(knobBaseGeometry, holographicMaterial);
//         knobBase.position.set(monitorWidth / 2 - 0.105, -monitorHeight / 2 + 0.17, monitorDepth / 2 + 0.012);
//         knobBase.rotation.x = Math.PI / 2;
//         monitorMesh.add(knobBase);

//         const knobRingGeometry = new THREE.TorusGeometry(0.013, 0.0015, 8, 32);
//         const knobRing = new THREE.Mesh(knobRingGeometry, controlBaseMaterial);
//         knobRing.position.copy(knobBase.position);
//         knobRing.rotation.x = Math.PI / 2;
//         monitorMesh.add(knobRing);

//         const brightnessKnob = knobBase.clone();
//         brightnessKnob.position.x = monitorWidth / 2 - 0.065;
//         monitorMesh.add(brightnessKnob);

//         const brightnessRing = knobRing.clone();
//         brightnessRing.position.x = monitorWidth / 2 - 0.065;
//         monitorMesh.add(brightnessRing);

//         const controlPanelGeometry = new RoundedBoxGeometry(0.21, 0.035, 0.006, 8, 0.005);
//         const controlPanelMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x101010,
//             metalness: 0.98,
//             roughness: 0.05,
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });
//         const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
//         controlPanel.position.set(monitorWidth / 2 - 0.21, -monitorHeight / 2 + 0.085, monitorDepth / 2 + 0.011);
//         monitorMesh.add(controlPanel);

//         const touchButtonGeometry = new THREE.CylinderGeometry(0.009, 0.009, 0.008, 24);
//         const buttonSpacing = 0.038;

//         for (let i = 0; i < 4; i++) {
//             const button = new THREE.Mesh(touchButtonGeometry, holographicMaterial);
//             button.rotation.x = Math.PI / 2;
//             button.position.set(
//                 monitorWidth / 2 - 0.16 + (i * buttonSpacing),
//                 -monitorHeight / 2 + 0.085,
//                 monitorDepth / 2 + 0.015
//             );
//             monitorMesh.add(button);

//             const hologramGeometry = new THREE.PlaneGeometry(0.012, 0.012);
//             const hologramMaterial = new THREE.MeshBasicMaterial({
//                 color: 0x4488FF,
//                 transparent: true,
//                 opacity: 0.2,
//                 side: THREE.DoubleSide
//             });
//             const hologram = new THREE.Mesh(hologramGeometry, hologramMaterial);
//             hologram.position.copy(button.position);
//             hologram.position.z += 0.008;
//             hologram.rotation.x = -Math.PI / 2;
//             monitorMesh.add(hologram);
//         }

//         /* -------------------- Premium Branding -------------------- */
//         const logoGeometry = new RoundedBoxGeometry(0.15, 0.028, 0.005, 8, 0.006);
//         const logoMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x000000,
//             metalness: 0.98,
//             roughness: 0.05,
//             emissive: 0x202020,
//             emissiveIntensity: 0.3,
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });
//         const logo = new THREE.Mesh(logoGeometry, logoMaterial);
//         logo.position.set(0, -monitorHeight / 2 + 0.048, monitorDepth / 2 + 0.011);
//         monitorMesh.add(logo);

//         const modelBadgeGeometry = new THREE.PlaneGeometry(0.09, 0.012);
//         const modelBadgeMaterial = new THREE.MeshBasicMaterial({
//             color: 0x808080,
//             transparent: true,
//             opacity: 0.8,
//             side: THREE.DoubleSide
//         });
//         const modelBadge = new THREE.Mesh(modelBadgeGeometry, modelBadgeMaterial);
//         modelBadge.position.set(0, -monitorHeight / 2 + 0.022, monitorDepth / 2 + 0.011);
//         modelBadge.rotation.x = -Math.PI / 2;
//         monitorMesh.add(modelBadge);

//         /* -------------------- Quantum Holographic Glow -------------------- */
//         const screenAuraGeometry = new THREE.PlaneGeometry(screenWidth + 0.05, screenHeight + 0.05, 1, 1);
//         const screenAuraMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 time: { value: 0 },
//                 intensity: { value: 0.15 }
//             },
//             vertexShader: `
//                 varying vec2 vUv;
//                 varying vec3 vPosition;
//                 void main() {
//                     vUv = uv;
//                     vPosition = position;
//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform float time;
//                 uniform float intensity;
//                 varying vec2 vUv;
//                 varying vec3 vPosition;

//                 void main() {
//                     vec2 centeredUV = vUv * 2.0 - 1.0;
//                     float dist = length(centeredUV);

//                     float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * intensity;

//                     float pulse = sin(time * 1.5) * 0.2 + 0.8;
//                     float scan = sin(vPosition.y * 30.0 + time * 5.0) * 0.1 + 0.9;

//                     vec3 auraColor = vec3(
//                         0.4 + sin(time + dist * 5.0) * 0.2,
//                         0.6 + cos(time * 0.7 + dist * 3.0) * 0.2,
//                         1.0
//                     );

//                     gl_FragColor = vec4(auraColor, alpha * pulse * scan * 0.4);
//                 }
//             `,
//             transparent: true,
//             side: THREE.DoubleSide,
//             depthWrite: false,
//             blending: THREE.AdditiveBlending
//         });
//         const screenAura = new THREE.Mesh(screenAuraGeometry, screenAuraMaterial);
//         screenAura.position.z = monitorDepth / 2 + 0.017;
//         monitorMesh.add(screenAura);

//         /* -------------------- Keyboard -------------------- */
//         const keyboardWidth = 0.52;
//         const keyboardHeight = 0.022;
//         const keyboardDepth = 0.21;

//         const keyboardGeometry = new RoundedBoxGeometry(keyboardWidth, keyboardHeight, keyboardDepth, 8, 0.008);
//         const keyboardMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x181818,
//             metalness: 0.8,
//             roughness: 0.2,
//             clearcoat: 0.5,
//             side: THREE.DoubleSide
//         });
//         const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
//         keyboard.position.set(0, -0.62, 0.32);
//         keyboard.rotation.x = -0.12;
//         keyboard.castShadow = true;
//         keyboard.receiveShadow = true;
//         scene.add(keyboard);

//         const keyRows = 4;
//         const keysPerRow = 12;
//         const keyWidth = 0.032;
//         const keyHeight = 0.012;
//         const keyDepth = 0.008;
//         const keySpacing = 0.036;
//         const rowSpacing = 0.026;

//         const keyGeometry = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);
//         const keyMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x202020,
//             metalness: 0.7,
//             roughness: 0.3,
//             clearcoat: 0.3,
//             side: THREE.DoubleSide
//         });

//         for (let row = 0; row < keyRows; row++) {
//             for (let col = 0; col < keysPerRow; col++) {
//                 const key = new THREE.Mesh(keyGeometry, keyMaterial);
//                 key.position.set(
//                     (col - keysPerRow / 2 + 0.5) * keySpacing,
//                     keyboard.position.y + keyboardHeight / 2 + keyHeight / 2 + 0.001,
//                     keyboard.position.z + (row - keyRows / 2 + 0.5) * rowSpacing
//                 );
//                 key.rotation.x = keyboard.rotation.x;
//                 key.castShadow = true;
//                 scene.add(key);
//             }
//         }

//         const spacebarGeometry = new RoundedBoxGeometry(0.16, 0.01, 0.022, 4, 0.003);
//         const spacebar = new THREE.Mesh(spacebarGeometry, keyMaterial);
//         spacebar.position.set(0, keyboard.position.y + keyboardHeight / 2 + 0.01 / 2 + 0.001, keyboard.position.z + 0.082);
//         spacebar.rotation.x = keyboard.rotation.x;
//         spacebar.castShadow = true;
//         scene.add(spacebar);

//         /* -------------------- Ergonomic Mouse -------------------- */
//         const mouseGeometry = new THREE.SphereGeometry(0.028, 32, 32);
//         mouseGeometry.scale(1.6, 0.65, 1);
//         const mouseMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x181818,
//             metalness: 0.7,
//             roughness: 0.25,
//             clearcoat: 0.5,
//             side: THREE.DoubleSide
//         });
//         const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
//         mouse.position.set(0.32, -0.6, 0.17);
//         mouse.castShadow = true;
//         scene.add(mouse);

//         const cableCurve = new THREE.CatmullRomCurve3([
//             new THREE.Vector3(0.32, -0.6, 0.17),
//             new THREE.Vector3(0.22, -0.72, 0.12),
//             new THREE.Vector3(0.12, -0.82, -0.08),
//             new THREE.Vector3(0.02, -0.92, -0.28),
//         ]);

//         const cableGeometry = new THREE.TubeGeometry(cableCurve, 32, 0.006, 16, false);
//         const cableMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x101010,
//             metalness: 0.3,
//             roughness: 0.7,
//             side: THREE.DoubleSide
//         });
//         const cable = new THREE.Mesh(cableGeometry, cableMaterial);
//         scene.add(cable);

//         /* -------------------- Carbon Fiber Desk -------------------- */
//         const deskWidth = 4.2;
//         const deskDepth = 2.2;
//         const deskThickness = 0.06;

//         const deskGeometry = new THREE.BoxGeometry(deskWidth, deskThickness, deskDepth);
//         const deskMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x282828,
//             metalness: 0.4,
//             roughness: 0.6,
//             side: THREE.DoubleSide
//         });
//         const desk = new THREE.Mesh(deskGeometry, deskMaterial);
//         desk.position.set(0, -0.92, 0);
//         desk.receiveShadow = true;
//         scene.add(desk);

//         const carbonCanvas = document.createElement('canvas');
//         carbonCanvas.width = 512;
//         carbonCanvas.height = 512;
//         const carbonCtx = carbonCanvas.getContext('2d')!;

//         carbonCtx.fillStyle = '#282828';
//         carbonCtx.fillRect(0, 0, 512, 512);

//         carbonCtx.strokeStyle = 'rgba(40, 40, 40, 0.8)';
//         carbonCtx.lineWidth = 2;

//         const gridSize = 40;
//         for (let x = 0; x < 512; x += gridSize) {
//             for (let y = 0; y < 512; y += gridSize) {
//                 carbonCtx.beginPath();
//                 carbonCtx.moveTo(x, y);
//                 carbonCtx.lineTo(x + gridSize, y + gridSize);
//                 carbonCtx.stroke();

//                 carbonCtx.beginPath();
//                 carbonCtx.moveTo(x + gridSize, y);
//                 carbonCtx.lineTo(x, y + gridSize);
//                 carbonCtx.stroke();
//             }
//         }

//         carbonCtx.fillStyle = 'rgba(60, 60, 60, 0.3)';
//         for (let i = 0; i < 100; i++) {
//             const x = Math.random() * 512;
//             const y = Math.random() * 512;
//             const size = Math.random() * 4 + 1;
//             carbonCtx.beginPath();
//             carbonCtx.arc(x, y, size, 0, Math.PI * 2);
//             carbonCtx.fill();
//         }

//         const carbonTexture = new THREE.CanvasTexture(carbonCanvas);
//         deskMaterial.map = carbonTexture;
//         deskMaterial.normalScale = new THREE.Vector2(0.5, 0.5);

//         /* -------------------- Ambient Particles -------------------- */
//         const particleCount = 100;
//         const particlesGeometry = new THREE.BufferGeometry();
//         const positions = new Float32Array(particleCount * 3);
//         const colors = new Float32Array(particleCount * 3);

//         for (let i = 0; i < particleCount; i++) {
//             positions[i * 3] = (Math.random() - 0.5) * 10;
//             positions[i * 3 + 1] = Math.random() * 2;
//             positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

//             colors[i * 3] = 0.3 + Math.random() * 0.2;
//             colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
//             colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
//         }

//         particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//         particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//         const particlesMaterial = new THREE.PointsMaterial({
//             size: 0.02,
//             vertexColors: true,
//             transparent: true,
//             opacity: 0.6,
//             blending: THREE.AdditiveBlending
//         });

//         const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//         scene.add(particles);

//         /* -------------------- Scroll Animation -------------------- */
//         const screenEmissiveIntensity = { value: 0.2 };
//         let scrollTriggerInstance: ScrollTrigger | null = null;

//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: document.body,
//                 start: "top top",
//                 end: "+=200%",
//                 scrub: 1.5,
//                 pin: container,
//                 pinSpacing: false,
//                 onEnter: () => {
//                     isScrollingRef.current = true;
//                     if (videoRef.current && videoRef.current.paused) {
//                         videoRef.current.play().catch(() => { });
//                     }
//                 },
//                 onLeaveBack: () => {
//                     isScrollingRef.current = false;
//                 },
//                 onUpdate: (self) => {
//                     if (
//                         self.progress >= 0.999 &&
//                         !fullscreenVideoTriggeredRef.current
//                     ) {
//                         handleFullscreenVideo();
//                     }
//                 },
//                 onEnterBack: () => { },
//             },
//         });

//         tl.to(camera.position, {
//             z: 1.1,
//             y: 0.15,
//             ease: "power3.out"
//         })
//             .to(camera, {
//                 fov: 22,
//                 onUpdate: () => camera.updateProjectionMatrix(),
//                 ease: "power3.out"
//             }, 0)
//             .to(monitorMesh.rotation, {
//                 y: Math.PI * 0.25,
//                 x: -0.03,
//                 ease: "power3.out"
//             }, 0)
//             .to(screenEmissiveIntensity, {
//                 value: 0.5,
//                 ease: "power3.out"
//             }, 0)
//             .to(bezelMaterial, {
//                 emissiveIntensity: 0.1,
//                 ease: "power3.out"
//             }, 0)
//             .to(glassMaterial, {
//                 transmission: 0.7,
//                 opacity: 0.7,
//                 ease: "power3.out"
//             }, 0);

//         const SCROLL_TRIGGER_ID = 'my-trigger';
//         scrollTriggerInstance = ScrollTrigger.getById(SCROLL_TRIGGER_ID)!;

//         /* -------------------- Mouse Interaction -------------------- */
//         let mouseX = 0;
//         let mouseY = 0;
//         const onMouseMove = (e: MouseEvent) => {
//             mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
//             mouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
//         };
//         window.addEventListener("mousemove", onMouseMove);

//         /* -------------------- Resize Handler -------------------- */
//         const onResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             ScrollTrigger.refresh();
//         };
//         window.addEventListener("resize", onResize);

//         initializeVideoPlayback(video);

//         /* -------------------- Animation Loop -------------------- */
//         const clock = new THREE.Clock();
//         let animationId: number;

//         const animate = () => {
//             animationId = requestAnimationFrame(animate);

//             const delta = clock.getDelta();
//             const time = clock.getElapsedTime();

//             monitorMesh.rotation.y += (mouseX - monitorMesh.rotation.y) * 0.04;
//             monitorMesh.rotation.x += (-mouseY - monitorMesh.rotation.x) * 0.04;

//             monitorMesh.position.y = Math.sin(time * 0.4) * 0.003;
//             monitorMesh.rotation.z = Math.sin(time * 0.25) * 0.0015;

//             ledHaloMaterial.uniforms.time.value = time;

//             if (screenMaterialRef.current) {
//                 screenMaterialRef.current.uniforms.time.value = time;
//                 screenMaterialRef.current.uniforms.emissiveIntensity.value = screenEmissiveIntensity.value;
//             }

//             if (glassMaterialRef.current) {
//                 glassMaterialRef.current.opacity = 0.88 + Math.sin(time * 0.4) * 0.04;
//             }

//             scanlineTexture.offset.y += delta * 0.6;
//             quantumTexture.offset.x += delta * 0.05;

//             particles.rotation.y += delta * 0.05;

//             camera.lookAt(monitorMesh.position);
//             renderer.render(scene, camera);
//         };
//         animate();

//         /* -------------------- Cleanup -------------------- */
//         return () => {
//             window.removeEventListener("mousemove", onMouseMove);
//             window.removeEventListener("resize", onResize);
//             document.removeEventListener("click", resumeVideoOnInteraction);
//             document.removeEventListener("touchstart", resumeVideoOnInteraction);
//             document.removeEventListener("keydown", resumeVideoOnInteraction);

//             if (videoRef.current) {
//                 videoRef.current.pause();
//                 videoRef.current.src = "";
//                 videoRef.current.load();
//             }

//             cancelAnimationFrame(animationId);
//             renderer.dispose();

//             if (scrollTriggerInstance) {
//                 scrollTriggerInstance.kill();
//             }
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//             if (container.contains(renderer.domElement)) {
//                 container.removeChild(renderer.domElement);
//             }
//         };
//     }, [createVideoElement, initializeVideoPlayback, resumeVideoOnInteraction, handleFullscreenVideo]);

//     // Effect for handling overlay video
//     useEffect(() => {
//         if (!showVideo || !videoContainerRef.current) return;

//         if (videoRef.current) {
//             videoRef.current.pause();
//         }

//         gsap.fromTo(
//             videoContainerRef.current,
//             { opacity: 0 },
//             {
//                 opacity: 1,
//                 duration: 1,
//                 ease: "power3.out",
//                 onComplete: () => {
//                     if (overlayVideoRef.current) {
//                         overlayVideoRef.current.play().catch(console.warn);
//                     }
//                 }
//             }
//         );

//         return () => {
//             if (videoRef.current && !fullscreenVideoTriggeredRef.current) {
//                 videoRef.current.play().catch(() => { });
//             }
//         };
//     }, [showVideo]);

//     return (
//         <div className="relative w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black">

//             {/* Scroll space */}
//             <div className="h-[200vh]" />

//             {/* PINNED SCENE */}
//             <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen" />

//             {/* Advanced HUD */}
//             <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
//                 <div className="backdrop-blur-xl bg-gradient-to-r from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl p-5 shadow-2xl">
//                     <div className="flex items-center space-x-8">
//                         <div className="flex items-center">
//                             <div className="relative mr-3">
//                                 <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/30 animate-pulse" />
//                                 <div className="absolute inset-0 rounded-full bg-green-400 blur-md animate-pulse" />
//                             </div>
//                             <span className="text-gray-300 font-mono text-sm tracking-wider">SYSTEM ACTIVE</span>
//                         </div>

//                         <div className="h-4 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />

//                         <div className="text-gray-400 font-mono text-sm">
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
//                                 <span className="tracking-wider">QUANTUM DISPLAY</span>
//                             </div>
//                             <div className="text-gray-500 text-xs mt-1">4K @ 144Hz • HDR1000</div>
//                         </div>

//                         <div className="h-4 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />

//                         <div className="text-gray-400 font-mono text-sm">
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
//                                 <span className="tracking-wider">NEURAL LINK</span>
//                             </div>
//                             <div className="text-gray-500 text-xs mt-1">LATENCY &lt;1ms</div>
//                         </div>
//                     </div>

//                     <div className="mt-6 text-center">
//                         <div className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full">
//                             <div className="flex items-center space-x-3">
//                                 <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse" />
//                                 <span className="text-gray-300 font-mono text-xs tracking-widest animate-pulse">
//                                     ↓ SCROLL TO INITIATE QUANTUM TRANSFER ↓
//                                 </span>
//                                 <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Quantum Transfer Video Overlay */}
//             {showVideo && (
//                 <div
//                     ref={videoContainerRef}
//                     className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-900 to-black w-[100dvw] h-[100dvh]"
//                 >
//                     <video
//                         ref={overlayVideoRef}
//                         src="/glitch.mp4"
//                         muted
//                         autoPlay
//                         playsInline
//                         onEnded={handleVideoEnded}
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
//                 </div>
//             )}

//             <section className="relative z-0">
//                 {showProjects && <Projects />}
//             </section>
//         </div>
//     );
// }


// "use client"
// import { useRef, useEffect, useState, useCallback } from "react";
// import * as THREE from "three";
// import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Projects from "../components/Projects";

// if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger);
// }

// export default function InteractiveOldPC() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const screenMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
//     const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
//     const isScrollingRef = useRef(false);
//     const videoPlaybackRequestedRef = useRef(false);
//     const fullscreenVideoTriggeredRef = useRef(false);

//     // State for video overlay
//     const [showVideo, setShowVideo] = useState(false);
//     const videoContainerRef = useRef<HTMLDivElement>(null);
//     const overlayVideoRef = useRef<HTMLVideoElement>(null);
//     const [showProjects, setShowProjects] = useState(false);

//     // Create video element with better error handling
//     const createVideoElement = useCallback(() => {
//         const video = document.createElement("video");
//         video.src = "/video.mp4";
//         video.loop = false;
//         video.muted = true;
//         video.playsInline = true;
//         video.preload = "auto";
//         video.crossOrigin = "anonymous";

//         video.onerror = () => {
//             console.warn("Video failed to load, using fallback texture");
//         };

//         return video;
//     }, []);

//     // Initialize video playback
//     const initializeVideoPlayback = useCallback(async (video: HTMLVideoElement) => {
//         try {
//             const playPromise = video.play();
//             if (playPromise !== undefined) {
//                 await playPromise;
//                 videoPlaybackRequestedRef.current = true;
//             }
//         } catch (err) {
//             console.warn("Autoplay failed, waiting for user interaction:", err);
//         }
//     }, []);

//     // Resume video when user interacts with page
//     const resumeVideoOnInteraction = useCallback(() => {
//         if (videoRef.current && !videoPlaybackRequestedRef.current) {
//             videoRef.current.play().catch(() => { });
//             videoPlaybackRequestedRef.current = true;
//         }
//     }, []);

//     // Handle fullscreen video
//     const handleFullscreenVideo = useCallback(() => {
//         if (fullscreenVideoTriggeredRef.current) return;

//         fullscreenVideoTriggeredRef.current = true;

//         setShowVideo(true);
//     }, []);

//     // Handle video end
//     const handleVideoEnded = useCallback(() => {
//         setShowProjects(true);

//         if (!videoContainerRef.current) return;

//         gsap.to(videoContainerRef.current, {
//             opacity: 0,
//             duration: 1,
//             ease: "power2.out",
//             onComplete: () => {
//                 setShowVideo(false);
//             },
//         });
//     }, []);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     useEffect(() => {
//         document.body.style.overflow = showVideo ? "hidden" : "";
//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [showVideo]);

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         document.addEventListener("click", resumeVideoOnInteraction);
//         document.addEventListener("touchstart", resumeVideoOnInteraction);
//         document.addEventListener("keydown", resumeVideoOnInteraction);

//         /* -------------------- Scene with Brighter Background -------------------- */
//         const scene = new THREE.Scene();
//         scene.background = new THREE.Color(0x1A1A2E); // Brighter dark blue background

//         /* -------------------- Camera -------------------- */
//         const camera = new THREE.PerspectiveCamera(
//             45,
//             window.innerWidth / window.innerHeight,
//             0.1,
//             100
//         );
//         camera.position.set(0, 0.3, 3.2);

//         /* -------------------- Renderer with Enhanced Colors -------------------- */
//         const renderer = new THREE.WebGLRenderer({
//             antialias: true,
//             alpha: true,
//             powerPreference: "high-performance"
//         });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
//         renderer.shadowMap.enabled = true;
//         renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//         renderer.outputColorSpace = THREE.SRGBColorSpace;
//         renderer.toneMapping = THREE.ACESFilmicToneMapping;
//         renderer.toneMappingExposure = 1.4; // Increased exposure for brighter scene
//         container.appendChild(renderer.domElement);

//         /* -------------------- Enhanced Bright Lighting System -------------------- */
//         const ambientLight = new THREE.AmbientLight(0x6080FF, 0.3); // Brighter ambient light
//         ambientLight.color.setHSL(0.66, 0.6, 0.5); // More saturated and brighter
//         scene.add(ambientLight);

//         const mainLight = new THREE.DirectionalLight(0xFFFFFF, 2.2); // Increased intensity
//         mainLight.position.set(4, 6, 3);
//         mainLight.castShadow = true;
//         mainLight.shadow.mapSize.width = 4096;
//         mainLight.shadow.mapSize.height = 4096;
//         mainLight.shadow.camera.near = 0.1;
//         mainLight.shadow.camera.far = 50;
//         mainLight.shadow.camera.left = -15;
//         mainLight.shadow.camera.right = 15;
//         mainLight.shadow.camera.top = 15;
//         mainLight.shadow.camera.bottom = -15;
//         mainLight.shadow.bias = -0.0005;
//         mainLight.shadow.radius = 2;
//         scene.add(mainLight);

//         const fillLight = new THREE.DirectionalLight(0x66AAFF, 1.2); // Brighter fill light
//         fillLight.position.set(-4, 3, -3);
//         scene.add(fillLight);

//         const rimLight = new THREE.DirectionalLight(0xFFFFFF, 1.0); // Brighter rim light
//         rimLight.position.set(0, 4, -4);
//         scene.add(rimLight);

//         const hemiLight = new THREE.HemisphereLight(0x5566CC, 0x303040, 0.6); // Brighter hemisphere
//         scene.add(hemiLight);

//         const backLight = new THREE.PointLight(0x0088FF, 0.8, 10); // Brighter point light
//         backLight.position.set(0, 0.5, -2);
//         scene.add(backLight);

//         /* -------------------- Premium Monitor Chassis with Brighter Accents -------------------- */
//         const monitorWidth = 0.68;
//         const monitorHeight = 0.58;
//         const monitorDepth = 0.42;

//         const monitorGeometry = new RoundedBoxGeometry(monitorWidth, monitorHeight, monitorDepth, 24, 0.02);
//         const monitorMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x202020, // Brighter dark color
//             metalness: 0.8, // More metallic
//             roughness: 0.12, // Smoother
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.08,
//             anisotropy: 1.0,
//             transmission: 0.08,
//             thickness: 0.5,
//             specularIntensity: 2.5, // Higher specular
//             specularColor: 0xFFFFFF,
//             envMapIntensity: 1.0, // Higher environment reflection
//             side: THREE.DoubleSide
//         });
//         const monitorMesh = new THREE.Mesh(monitorGeometry, monitorMaterial);
//         monitorMesh.position.y = 0;
//         monitorMesh.castShadow = true;
//         monitorMesh.receiveShadow = true;
//         scene.add(monitorMesh);

//         /* -------------------- Enhanced Nano-Edge Bezel -------------------- */
//         const bezelThickness = 0.012;
//         const bezelGeometry = new RoundedBoxGeometry(
//             monitorWidth - 0.02,
//             monitorHeight - 0.1,
//             bezelThickness,
//             16,
//             0.006
//         );

//         const bezelMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x151515,
//             metalness: 0.97,
//             roughness: 0.05,
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.03,
//             emissive: 0x404040, // Brighter emissive
//             emissiveIntensity: 0,
//             anisotropy: 0.9,
//             specularIntensity: 3.5,
//             side: THREE.DoubleSide
//         });
//         const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
//         bezel.position.z = monitorDepth / 2 + 0.015;
//         monitorMesh.add(bezel);

//         const bezelAccentGeometry = new THREE.TorusGeometry(
//             (monitorWidth - 0.04) / 2,
//             0.002, // Thicker accent
//             8,
//             64,
//             Math.PI * 2
//         );
//         const bezelAccentMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0xAAAAAA, // Brighter accent
//             metalness: 1.0,
//             roughness: 0.03,
//             emissive: 0x505050, // Brighter emissive
//             emissiveIntensity: 0.5, // Higher intensity
//             side: THREE.DoubleSide
//         });
//         const bezelAccent = new THREE.Mesh(bezelAccentGeometry, bezelAccentMaterial);
//         bezelAccent.position.set(0, 0, bezelThickness / 2);
//         bezelAccent.rotation.x = Math.PI / 2;
//         bezel.add(bezelAccent);

//         /* -------------------- Enhanced Nanoglass Screen Protection -------------------- */
//         const glassGeometry = new THREE.PlaneGeometry(
//             monitorWidth - 0.06,
//             monitorHeight - 0.14,
//             128,
//             128
//         );

//         const glassMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0xFFFFFF,
//             metalness: 0,
//             roughness: 0,
//             transmission: 0.95,
//             thickness: 0.08,
//             ior: 1.52,
//             specularIntensity: 2.5,
//             specularColor: 0xFFFFFF,
//             envMapIntensity: 1.2,
//             transparent: true,
//             opacity: 0.88,
//             side: THREE.DoubleSide,
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.03
//         });
//         glassMaterialRef.current = glassMaterial;

//         const glassScreen = new THREE.Mesh(glassGeometry, glassMaterial);
//         glassScreen.position.z = monitorDepth / 2 + 0.02;
//         monitorMesh.add(glassScreen);

//         /* -------------------- Enhanced Quantum Dot Display -------------------- */
//         const screenWidth = monitorWidth - 0.1;
//         const screenHeight = monitorHeight - 0.18;

//         const screenSegments = 256;
//         const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight, screenSegments, screenSegments);

//         const curvature = 0.15;
//         const positionAttribute = screenGeometry.attributes.position;
//         for (let i = 0; i < positionAttribute.count; i++) {
//             const x = positionAttribute.getX(i);
//             const y = positionAttribute.getY(i);
//             const normalizedX = (x / (screenWidth / 2));
//             const normalizedY = (y / (screenHeight / 2));
//             const dist = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
//             const z = -curvature * Math.pow(dist, 2.5);
//             positionAttribute.setZ(i, z);
//         }
//         screenGeometry.computeVertexNormals();

//         const video = createVideoElement();
//         videoRef.current = video;

//         const videoTexture = new THREE.VideoTexture(video);
//         videoTexture.colorSpace = THREE.SRGBColorSpace;
//         videoTexture.minFilter = THREE.LinearFilter;
//         videoTexture.magFilter = THREE.LinearFilter;
//         videoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

//         // Enhanced scanline effect with brighter colors
//         const scanlineCanvas = document.createElement('canvas');
//         scanlineCanvas.width = 4096;
//         scanlineCanvas.height = 4096;
//         const ctx = scanlineCanvas.getContext('2d')!;

//         ctx.fillStyle = '#000';
//         ctx.fillRect(0, 0, scanlineCanvas.width, scanlineCanvas.height);

//         for (let y = 0; y < scanlineCanvas.height; y += 2) {
//             const alpha = 0.15 + Math.sin(y * 0.01) * 0.04; // Brighter scanlines
//             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
//             ctx.fillRect(0, y, scanlineCanvas.width, 1);
//         }

//         for (let x = 0; x < scanlineCanvas.width; x += 3) {
//             const alpha = 0.08 + Math.cos(x * 0.005) * 0.03; // Brighter vertical lines
//             ctx.fillStyle = `rgba(220, 240, 255, ${alpha})`;
//             ctx.fillRect(x, 0, 1, scanlineCanvas.height);
//         }

//         const scanlineTexture = new THREE.CanvasTexture(scanlineCanvas);
//         scanlineTexture.wrapS = THREE.RepeatWrapping;
//         scanlineTexture.wrapT = THREE.RepeatWrapping;

//         // Enhanced quantum texture with brighter particles
//         const quantumCanvas = document.createElement('canvas');
//         quantumCanvas.width = 1024;
//         quantumCanvas.height = 1024;
//         const quantumCtx = quantumCanvas.getContext('2d')!;

//         const gradient = quantumCtx.createRadialGradient(512, 512, 0, 512, 512, 512);
//         gradient.addColorStop(0, 'rgba(120, 180, 255, 0.3)'); // Brighter center
//         gradient.addColorStop(0.3, 'rgba(100, 150, 240, 0.2)');
//         gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

//         quantumCtx.fillStyle = gradient;
//         quantumCtx.fillRect(0, 0, 1024, 1024);

//         // More and brighter quantum particles
//         for (let i = 0; i < 7000; i++) {
//             const x = Math.random() * 1024;
//             const y = Math.random() * 1024;
//             const size = Math.random() * 2 + 0.5; // Larger particles
//             const hue = 200 + Math.random() * 60;
//             quantumCtx.beginPath();
//             quantumCtx.arc(x, y, size, 0, Math.PI * 2);
//             quantumCtx.fillStyle = `hsla(${hue}, 90%, 80%, ${Math.random() * 0.25})`; // Brighter particles
//             quantumCtx.fill();
//         }

//         const quantumTexture = new THREE.CanvasTexture(quantumCanvas);

//         // Enhanced shader material with brighter colors
//         const screenMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 videoTexture: { value: videoTexture },
//                 scanlineTexture: { value: scanlineTexture },
//                 quantumTexture: { value: quantumTexture },
//                 time: { value: 0 },
//                 emissiveIntensity: { value: 0.3 }, // Higher base intensity
//                 curvature: { value: curvature },
//                 screenSize: { value: new THREE.Vector2(screenWidth, screenHeight) },
//                 chromaticAberration: { value: 0.004 }, // More noticeable aberration
//                 bloomThreshold: { value: 0.6 }, // Lower threshold for more bloom
//                 saturation: { value: 1.3 } // Higher saturation
//             },
//             vertexShader: `
//                 varying vec2 vUv;
//                 varying vec3 vNormal;
//                 varying vec3 vWorldPosition;
//                 varying float vScreenDepth;
//                 uniform float curvature;
//                 uniform vec2 screenSize;

//                 void main() {
//                     vUv = uv;
//                     vNormal = normalize(normalMatrix * normal);

//                     vec4 worldPosition = modelMatrix * vec4(position, 1.0);
//                     vWorldPosition = worldPosition.xyz;

//                     vec2 centeredUV = uv * 2.0 - 1.0;
//                     float dist = length(centeredUV);
//                     float bulge = curvature * pow(dist, 2.5);

//                     vec3 pos = position;
//                     pos.z -= bulge * 0.8;
//                     vScreenDepth = pos.z;

//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform sampler2D videoTexture;
//                 uniform sampler2D scanlineTexture;
//                 uniform sampler2D quantumTexture;
//                 uniform float time;
//                 uniform float emissiveIntensity;
//                 uniform float chromaticAberration;
//                 uniform float bloomThreshold;
//                 uniform float saturation;
//                 varying vec2 vUv;
//                 varying vec3 vNormal;
//                 varying vec3 vWorldPosition;
//                 varying float vScreenDepth;

//                 vec3 adjustSaturation(vec3 color, float saturation) {
//                     float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
//                     return mix(vec3(luminance), color, saturation);
//                 }

//                 void main() {
//                     vec2 uv = vUv;

//                     // Enhanced chromatic aberration
//                     float r = texture2D(videoTexture, uv + vec2(chromaticAberration * 1.5, 0.0)).r;
//                     float g = texture2D(videoTexture, uv).g;
//                     float b = texture2D(videoTexture, uv - vec2(chromaticAberration * 1.5, 0.0)).b;

//                     vec4 videoColor = vec4(r, g, b, 1.0);
//                     videoColor.rgb = adjustSaturation(videoColor.rgb, saturation);

//                     float luminance = dot(videoColor.rgb, vec3(0.2126, 0.7152, 0.0722));

//                     // Brighter quantum colors
//                     vec3 quantumColor = vec3(
//                         luminance * 1.4,
//                         luminance * 1.3,
//                         luminance * 1.2
//                     );

//                     vec2 scanlineUV = uv * vec2(1.0, 3.0);
//                     scanlineUV.y += time * 0.5;
//                     vec4 scanline = texture2D(scanlineTexture, scanlineUV);

//                     vec4 quantum = texture2D(quantumTexture, uv * 2.0 + sin(time * 0.2) * 0.1);

//                     vec2 centeredUV = uv * 2.0 - 1.0;
//                     float dist = length(centeredUV);
//                     float vignette = 1.0 - smoothstep(0.2, 1.4, pow(dist, 1.5)); // Reduced vignette
//                     vignette = vignette * 0.9 + 0.1;

//                     vec3 normal = normalize(vNormal);
//                     float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.5);

//                     vec3 finalColor = quantumColor * vignette;
//                     finalColor *= (0.95 + 0.15 * scanline.r); // More scanline effect
//                     finalColor += quantum.rgb * 0.4; // Brighter quantum overlay

//                     finalColor += finalColor * emissiveIntensity * (1.2 + fresnel * 0.7); // More emissive

//                     float bloom = smoothstep(bloomThreshold, 1.0, luminance);
//                     finalColor += finalColor * bloom * 0.4; // More bloom

//                     float scanlinePulse = sin(time * 3.0 + vWorldPosition.y * 10.0) * 0.03; // Stronger pulse
//                     finalColor += vec3(0.15, 0.3, 0.5) * scanlinePulse;

//                     // Add subtle color shifting
//                     finalColor.r += sin(time * 0.5) * 0.05;
//                     finalColor.g += cos(time * 0.3) * 0.05;

//                     gl_FragColor = vec4(finalColor, 1.0);
//                 }
//             `,
//             transparent: false
//         });

//         screenMaterialRef.current = screenMaterial;

//         const screen = new THREE.Mesh(screenGeometry, screenMaterial);
//         screen.position.z = monitorDepth / 2 + 0.018;
//         monitorMesh.add(screen);

//         /* -------------------- Enhanced Carbon Fiber Stand -------------------- */
//         const baseGeometry = new THREE.CylinderGeometry(0.18, 0.24, 0.065, 64);
//         const baseMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x101010,
//             metalness: 0.92,
//             roughness: 0.08,
//             clearcoat: 1.0,
//             clearcoatRoughness: 0.08,
//             anisotropy: 1.0,
//             side: THREE.DoubleSide
//         });
//         const base = new THREE.Mesh(baseGeometry, baseMaterial);
//         base.position.y = -monitorHeight / 2 - 0.125;
//         base.castShadow = true;
//         monitorMesh.add(base);

//         const standConnectorGeometry = new THREE.CylinderGeometry(0.055, 0.075, 0.16, 32);
//         const standConnectorMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x303030,
//             metalness: 0.97,
//             roughness: 0.06,
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });
//         const standConnector = new THREE.Mesh(standConnectorGeometry, standConnectorMaterial);
//         standConnector.position.y = -monitorHeight / 2 - 0.065;
//         standConnector.castShadow = true;
//         monitorMesh.add(standConnector);

//         const tiltRingGeometry = new THREE.TorusGeometry(0.07, 0.008, 16, 48); // Thicker ring
//         const tiltRingMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x808080,
//             metalness: 0.99,
//             roughness: 0.04,
//             emissive: 0x606060,
//             emissiveIntensity: 0.4, // Higher emissive
//             side: THREE.DoubleSide
//         });
//         const tiltRing = new THREE.Mesh(tiltRingGeometry, tiltRingMaterial);
//         tiltRing.position.y = -monitorHeight / 2 - 0.025;
//         tiltRing.rotation.x = Math.PI / 2;
//         tiltRing.castShadow = true;
//         monitorMesh.add(tiltRing);

//         /* -------------------- Brighter Holographic Controls -------------------- */
//         const controlBaseMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x252525,
//             metalness: 0.97,
//             roughness: 0.08,
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });

//         const holographicMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0xB0D8FF,
//             metalness: 1.0,
//             roughness: 0.03,
//             emissive: 0x66AAFF,
//             emissiveIntensity: 0.6, // Brighter emissive
//             transmission: 0.4,
//             thickness: 0.5,
//             side: THREE.DoubleSide
//         });

//         const powerButtonGeometry = new THREE.CylinderGeometry(0.014, 0.014, 0.01, 32);
//         const powerButton = new THREE.Mesh(powerButtonGeometry, holographicMaterial);
//         powerButton.position.set(-monitorWidth / 2 + 0.085, -monitorHeight / 2 + 0.17, monitorDepth / 2 + 0.012);
//         powerButton.rotation.x = Math.PI / 2;
//         monitorMesh.add(powerButton);

//         const powerRingGeometry = new THREE.RingGeometry(0.016, 0.022, 32);
//         const powerRing = new THREE.Mesh(powerRingGeometry, holographicMaterial);
//         powerRing.position.copy(powerButton.position);
//         powerRing.position.z += 0.001;
//         powerRing.rotation.x = -Math.PI / 2;
//         monitorMesh.add(powerRing);

//         const ledCoreGeometry = new THREE.SphereGeometry(0.008, 32, 32); // Larger LED
//         const ledCoreMaterial = new THREE.MeshBasicMaterial({
//             color: 0x00FFAA,
//             transparent: true,
//             opacity: 0.95
//         });
//         const ledCore = new THREE.Mesh(ledCoreGeometry, ledCoreMaterial);
//         ledCore.position.set(-monitorWidth / 2 + 0.085, -monitorHeight / 2 + 0.195, monitorDepth / 2 + 0.011);
//         monitorMesh.add(ledCore);

//         const ledHaloGeometry = new THREE.SphereGeometry(0.018, 48, 48); // Larger halo
//         const ledHaloMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 time: { value: 0 },
//                 color: { value: new THREE.Color(0x00FFAA) },
//                 intensity: { value: 1.5 }
//             },
//             vertexShader: `
//                 varying vec3 vNormal;
//                 void main() {
//                     vNormal = normalize(normalMatrix * normal);
//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform float time;
//                 uniform vec3 color;
//                 uniform float intensity;
//                 varying vec3 vNormal;

//                 void main() {
//                     float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
//                     float pulse = sin(time * 3.0) * 0.4 + 0.8;
//                     gl_FragColor = vec4(color, intensity * pulse * 0.5);
//                 }
//             `,
//             transparent: true,
//             side: THREE.BackSide,
//             blending: THREE.AdditiveBlending
//         });
//         const ledHalo = new THREE.Mesh(ledHaloGeometry, ledHaloMaterial);
//         ledHalo.position.copy(ledCore.position);
//         monitorMesh.add(ledHalo);

//         const knobBaseGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.014, 32);
//         const knobBase = new THREE.Mesh(knobBaseGeometry, holographicMaterial);
//         knobBase.position.set(monitorWidth / 2 - 0.105, -monitorHeight / 2 + 0.17, monitorDepth / 2 + 0.012);
//         knobBase.rotation.x = Math.PI / 2;
//         monitorMesh.add(knobBase);

//         const knobRingGeometry = new THREE.TorusGeometry(0.013, 0.002, 8, 32);
//         const knobRing = new THREE.Mesh(knobRingGeometry, controlBaseMaterial);
//         knobRing.position.copy(knobBase.position);
//         knobRing.rotation.x = Math.PI / 2;
//         monitorMesh.add(knobRing);

//         const brightnessKnob = knobBase.clone();
//         brightnessKnob.position.x = monitorWidth / 2 - 0.065;
//         monitorMesh.add(brightnessKnob);

//         const brightnessRing = knobRing.clone();
//         brightnessRing.position.x = monitorWidth / 2 - 0.065;
//         monitorMesh.add(brightnessRing);

//         const controlPanelGeometry = new RoundedBoxGeometry(0.21, 0.035, 0.006, 8, 0.005);
//         const controlPanelMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x181818,
//             metalness: 0.99,
//             roughness: 0.04,
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });
//         const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
//         controlPanel.position.set(monitorWidth / 2 - 0.21, -monitorHeight / 2 + 0.085, monitorDepth / 2 + 0.011);
//         monitorMesh.add(controlPanel);

//         const touchButtonGeometry = new THREE.CylinderGeometry(0.009, 0.009, 0.008, 24);
//         const buttonSpacing = 0.038;

//         for (let i = 0; i < 4; i++) {
//             const button = new THREE.Mesh(touchButtonGeometry, holographicMaterial);
//             button.rotation.x = Math.PI / 2;
//             button.position.set(
//                 monitorWidth / 2 - 0.16 + (i * buttonSpacing),
//                 -monitorHeight / 2 + 0.085,
//                 monitorDepth / 2 + 0.015
//             );
//             monitorMesh.add(button);

//             const hologramGeometry = new THREE.PlaneGeometry(0.015, 0.015); // Larger holograms
//             const hologramMaterial = new THREE.MeshBasicMaterial({
//                 color: 0x66AAFF,
//                 transparent: true,
//                 opacity: 0.3, // More visible
//                 side: THREE.DoubleSide
//             });
//             const hologram = new THREE.Mesh(hologramGeometry, hologramMaterial);
//             hologram.position.copy(button.position);
//             hologram.position.z += 0.008;
//             hologram.rotation.x = -Math.PI / 2;
//             monitorMesh.add(hologram);
//         }

//         /* -------------------- Enhanced Premium Branding -------------------- */
//         const logoGeometry = new RoundedBoxGeometry(0.15, 0.028, 0.005, 8, 0.006);
//         const logoMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x000000,
//             metalness: 0.99,
//             roughness: 0.04,
//             emissive: 0x404040,
//             emissiveIntensity: 0.5, // Brighter logo
//             clearcoat: 1.0,
//             side: THREE.DoubleSide
//         });
//         const logo = new THREE.Mesh(logoGeometry, logoMaterial);
//         logo.position.set(0, -monitorHeight / 2 + 0.048, monitorDepth / 2 + 0.011);
//         monitorMesh.add(logo);

//         const modelBadgeGeometry = new THREE.PlaneGeometry(0.09, 0.012);
//         const modelBadgeMaterial = new THREE.MeshBasicMaterial({
//             color: 0xA0A0A0,
//             transparent: true,
//             opacity: 0.9, // More visible
//             side: THREE.DoubleSide
//         });
//         const modelBadge = new THREE.Mesh(modelBadgeGeometry, modelBadgeMaterial);
//         modelBadge.position.set(0, -monitorHeight / 2 + 0.022, monitorDepth / 2 + 0.011);
//         modelBadge.rotation.x = -Math.PI / 2;
//         monitorMesh.add(modelBadge);

//         /* -------------------- Enhanced Quantum Holographic Glow -------------------- */
//         const screenAuraGeometry = new THREE.PlaneGeometry(screenWidth + 0.05, screenHeight + 0.05, 1, 1);
//         const screenAuraMaterial = new THREE.ShaderMaterial({
//             uniforms: {
//                 time: { value: 0 },
//                 intensity: { value: 0.25 } // Brighter aura
//             },
//             vertexShader: `
//                 varying vec2 vUv;
//                 varying vec3 vPosition;
//                 void main() {
//                     vUv = uv;
//                     vPosition = position;
//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 uniform float time;
//                 uniform float intensity;
//                 varying vec2 vUv;
//                 varying vec3 vPosition;

//                 void main() {
//                     vec2 centeredUV = vUv * 2.0 - 1.0;
//                     float dist = length(centeredUV);

//                     float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * intensity;

//                     float pulse = sin(time * 1.5) * 0.3 + 0.9; // Stronger pulse
//                     float scan = sin(vPosition.y * 40.0 + time * 6.0) * 0.15 + 0.95; // Faster scan

//                     vec3 auraColor = vec3(
//                         0.5 + sin(time + dist * 5.0) * 0.3,
//                         0.7 + cos(time * 0.7 + dist * 3.0) * 0.3,
//                         1.0
//                     );

//                     gl_FragColor = vec4(auraColor, alpha * pulse * scan * 0.5);
//                 }
//             `,
//             transparent: true,
//             side: THREE.DoubleSide,
//             depthWrite: false,
//             blending: THREE.AdditiveBlending
//         });
//         const screenAura = new THREE.Mesh(screenAuraGeometry, screenAuraMaterial);
//         screenAura.position.z = monitorDepth / 2 + 0.017;
//         monitorMesh.add(screenAura);

//         /* -------------------- Enhanced Keyboard -------------------- */
//         const keyboardWidth = 0.52;
//         const keyboardHeight = 0.022;
//         const keyboardDepth = 0.21;

//         const keyboardGeometry = new RoundedBoxGeometry(keyboardWidth, keyboardHeight, keyboardDepth, 8, 0.008);
//         const keyboardMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x282828,
//             metalness: 0.85,
//             roughness: 0.18,
//             clearcoat: 0.6,
//             side: THREE.DoubleSide
//         });
//         const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
//         keyboard.position.set(0, -0.62, 0.32);
//         keyboard.rotation.x = -0.12;
//         keyboard.castShadow = true;
//         keyboard.receiveShadow = true;
//         scene.add(keyboard);

//         const keyRows = 4;
//         const keysPerRow = 12;
//         const keyWidth = 0.032;
//         const keyHeight = 0.012;
//         const keyDepth = 0.008;
//         const keySpacing = 0.036;
//         const rowSpacing = 0.026;

//         const keyGeometry = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);
//         const keyMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x303030,
//             metalness: 0.8,
//             roughness: 0.25,
//             clearcoat: 0.4,
//             side: THREE.DoubleSide
//         });

//         for (let row = 0; row < keyRows; row++) {
//             for (let col = 0; col < keysPerRow; col++) {
//                 const key = new THREE.Mesh(keyGeometry, keyMaterial);
//                 key.position.set(
//                     (col - keysPerRow / 2 + 0.5) * keySpacing,
//                     keyboard.position.y + keyboardHeight / 2 + keyHeight / 2 + 0.001,
//                     keyboard.position.z + (row - keyRows / 2 + 0.5) * rowSpacing
//                 );
//                 key.rotation.x = keyboard.rotation.x;
//                 key.castShadow = true;
//                 scene.add(key);
//             }
//         }

//         const spacebarGeometry = new RoundedBoxGeometry(0.16, 0.01, 0.022, 4, 0.003);
//         const spacebar = new THREE.Mesh(spacebarGeometry, keyMaterial);
//         spacebar.position.set(0, keyboard.position.y + keyboardHeight / 2 + 0.01 / 2 + 0.001, keyboard.position.z + 0.082);
//         spacebar.rotation.x = keyboard.rotation.x;
//         spacebar.castShadow = true;
//         scene.add(spacebar);

//         /* -------------------- Enhanced Ergonomic Mouse -------------------- */
//         const mouseGeometry = new THREE.SphereGeometry(0.028, 32, 32);
//         mouseGeometry.scale(1.6, 0.65, 1);
//         const mouseMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x282828,
//             metalness: 0.8,
//             roughness: 0.22,
//             clearcoat: 0.6,
//             side: THREE.DoubleSide
//         });
//         const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
//         mouse.position.set(0.32, -0.6, 0.17);
//         mouse.castShadow = true;
//         scene.add(mouse);

//         const cableCurve = new THREE.CatmullRomCurve3([
//             new THREE.Vector3(0.32, -0.6, 0.17),
//             new THREE.Vector3(0.22, -0.72, 0.12),
//             new THREE.Vector3(0.12, -0.82, -0.08),
//             new THREE.Vector3(0.02, -0.92, -0.28),
//         ]);

//         const cableGeometry = new THREE.TubeGeometry(cableCurve, 32, 0.006, 16, false);
//         const cableMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x202020,
//             metalness: 0.4,
//             roughness: 0.6,
//             side: THREE.DoubleSide
//         });
//         const cable = new THREE.Mesh(cableGeometry, cableMaterial);
//         scene.add(cable);

//         /* -------------------- Brighter Carbon Fiber Desk -------------------- */
//         const deskWidth = 4.2;
//         const deskDepth = 2.2;
//         const deskThickness = 0.06;

//         const deskGeometry = new THREE.BoxGeometry(deskWidth, deskThickness, deskDepth);
//         const deskMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x383838,
//             metalness: 0.5,
//             roughness: 0.5,
//             side: THREE.DoubleSide
//         });
//         const desk = new THREE.Mesh(deskGeometry, deskMaterial);
//         desk.position.set(0, -0.92, 0);
//         desk.receiveShadow = true;
//         scene.add(desk);

//         const carbonCanvas = document.createElement('canvas');
//         carbonCanvas.width = 512;
//         carbonCanvas.height = 512;
//         const carbonCtx = carbonCanvas.getContext('2d')!;

//         carbonCtx.fillStyle = '#383838';
//         carbonCtx.fillRect(0, 0, 512, 512);

//         carbonCtx.strokeStyle = 'rgba(60, 60, 60, 0.9)';
//         carbonCtx.lineWidth = 2;

//         const gridSize = 40;
//         for (let x = 0; x < 512; x += gridSize) {
//             for (let y = 0; y < 512; y += gridSize) {
//                 carbonCtx.beginPath();
//                 carbonCtx.moveTo(x, y);
//                 carbonCtx.lineTo(x + gridSize, y + gridSize);
//                 carbonCtx.stroke();

//                 carbonCtx.beginPath();
//                 carbonCtx.moveTo(x + gridSize, y);
//                 carbonCtx.lineTo(x, y + gridSize);
//                 carbonCtx.stroke();
//             }
//         }

//         carbonCtx.fillStyle = 'rgba(80, 80, 80, 0.4)';
//         for (let i = 0; i < 150; i++) {
//             const x = Math.random() * 512;
//             const y = Math.random() * 512;
//             const size = Math.random() * 5 + 2;
//             carbonCtx.beginPath();
//             carbonCtx.arc(x, y, size, 0, Math.PI * 2);
//             carbonCtx.fill();
//         }

//         const carbonTexture = new THREE.CanvasTexture(carbonCanvas);
//         deskMaterial.map = carbonTexture;
//         deskMaterial.normalScale = new THREE.Vector2(0.5, 0.5);

//         /* -------------------- Brighter Ambient Particles -------------------- */
//         const particleCount = 150; // More particles
//         const particlesGeometry = new THREE.BufferGeometry();
//         const positions = new Float32Array(particleCount * 3);
//         const colors = new Float32Array(particleCount * 3);

//         for (let i = 0; i < particleCount; i++) {
//             positions[i * 3] = (Math.random() - 0.5) * 10;
//             positions[i * 3 + 1] = Math.random() * 2;
//             positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

//             colors[i * 3] = 0.4 + Math.random() * 0.3; // Brighter colors
//             colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
//             colors[i * 3 + 2] = 0.9 + Math.random() * 0.3;
//         }

//         particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//         particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//         const particlesMaterial = new THREE.PointsMaterial({
//             size: 0.025, // Larger particles
//             vertexColors: true,
//             transparent: true,
//             opacity: 0.8, // More visible
//             blending: THREE.AdditiveBlending
//         });

//         const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//         scene.add(particles);

//         /* -------------------- Scroll Animation -------------------- */
//         const screenEmissiveIntensity = { value: 0.3 }; // Higher initial intensity
//         let scrollTriggerInstance: ScrollTrigger | null = null;

//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: document.body,
//                 start: "top top",
//                 end: "+=200%",
//                 scrub: 1.5,
//                 pin: container,
//                 pinSpacing: false,
//                 onEnter: () => {
//                     isScrollingRef.current = true;
//                     if (videoRef.current && videoRef.current.paused) {
//                         videoRef.current.play().catch(() => { });
//                     }
//                 },
//                 onLeaveBack: () => {
//                     isScrollingRef.current = false;
//                 },
//                 onUpdate: (self) => {
//                     if (
//                         self.progress >= 0.999 &&
//                         !fullscreenVideoTriggeredRef.current
//                     ) {
//                         handleFullscreenVideo();
//                     }
//                 },
//                 onEnterBack: () => { },
//             },
//         });

//         tl.to(camera.position, {
//             z: 1.1,
//             y: 0.15,
//             ease: "power3.out"
//         })
//             .to(camera, {
//                 fov: 22,
//                 onUpdate: () => camera.updateProjectionMatrix(),
//                 ease: "power3.out"
//             }, 0)
//             .to(monitorMesh.rotation, {
//                 y: Math.PI * 0.25,
//                 x: -0.03,
//                 ease: "power3.out"
//             }, 0)
//             .to(screenEmissiveIntensity, {
//                 value: 0.7, // Higher final intensity
//                 ease: "power3.out"
//             }, 0)
//             .to(bezelMaterial, {
//                 emissiveIntensity: 0.2, // Brighter bezel
//                 ease: "power3.out"
//             }, 0)
//             .to(glassMaterial, {
//                 transmission: 0.8,
//                 opacity: 0.75,
//                 ease: "power3.out"
//             }, 0);

//         const SCROLL_TRIGGER_ID = 'my-trigger';
//         scrollTriggerInstance = ScrollTrigger.getById(SCROLL_TRIGGER_ID)!;

//         /* -------------------- Mouse Interaction -------------------- */
//         let mouseX = 0;
//         let mouseY = 0;
//         const onMouseMove = (e: MouseEvent) => {
//             mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
//             mouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
//         };
//         window.addEventListener("mousemove", onMouseMove);

//         /* -------------------- Resize Handler -------------------- */
//         const onResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             ScrollTrigger.refresh();
//         };
//         window.addEventListener("resize", onResize);

//         initializeVideoPlayback(video);

//         /* -------------------- Animation Loop -------------------- */
//         const clock = new THREE.Clock();
//         let animationId: number;

//         const animate = () => {
//             animationId = requestAnimationFrame(animate);

//             const delta = clock.getDelta();
//             const time = clock.getElapsedTime();

//             monitorMesh.rotation.y += (mouseX - monitorMesh.rotation.y) * 0.04;
//             monitorMesh.rotation.x += (-mouseY - monitorMesh.rotation.x) * 0.04;

//             monitorMesh.position.y = Math.sin(time * 0.4) * 0.003;
//             monitorMesh.rotation.z = Math.sin(time * 0.25) * 0.0015;

//             ledHaloMaterial.uniforms.time.value = time;

//             if (screenMaterialRef.current) {
//                 screenMaterialRef.current.uniforms.time.value = time;
//                 screenMaterialRef.current.uniforms.emissiveIntensity.value = screenEmissiveIntensity.value;
//             }

//             if (glassMaterialRef.current) {
//                 glassMaterialRef.current.opacity = 0.9 + Math.sin(time * 0.4) * 0.05; // More variation
//             }

//             scanlineTexture.offset.y += delta * 0.6;
//             quantumTexture.offset.x += delta * 0.05;

//             particles.rotation.y += delta * 0.05;

//             camera.lookAt(monitorMesh.position);
//             renderer.render(scene, camera);
//         };
//         animate();

//         /* -------------------- Cleanup -------------------- */
//         return () => {
//             window.removeEventListener("mousemove", onMouseMove);
//             window.removeEventListener("resize", onResize);
//             document.removeEventListener("click", resumeVideoOnInteraction);
//             document.removeEventListener("touchstart", resumeVideoOnInteraction);
//             document.removeEventListener("keydown", resumeVideoOnInteraction);

//             if (videoRef.current) {
//                 videoRef.current.pause();
//                 videoRef.current.src = "";
//                 videoRef.current.load();
//             }

//             cancelAnimationFrame(animationId);
//             renderer.dispose();

//             if (scrollTriggerInstance) {
//                 scrollTriggerInstance.kill();
//             }
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//             if (container.contains(renderer.domElement)) {
//                 container.removeChild(renderer.domElement);
//             }
//         };
//     }, [createVideoElement, initializeVideoPlayback, resumeVideoOnInteraction, handleFullscreenVideo]);

//     // Effect for handling overlay video
//     useEffect(() => {
//         if (!showVideo || !videoContainerRef.current) return;

//         if (videoRef.current) {
//             videoRef.current.pause();
//         }

//         gsap.fromTo(
//             videoContainerRef.current,
//             { opacity: 0 },
//             {
//                 opacity: 1,
//                 duration: 1,
//                 ease: "power3.out",
//                 onComplete: () => {
//                     if (overlayVideoRef.current) {
//                         overlayVideoRef.current.play().catch(console.warn);
//                     }
//                 }
//             }
//         );

//         return () => {
//             if (videoRef.current && !fullscreenVideoTriggeredRef.current) {
//                 videoRef.current.play().catch(() => { });
//             }
//         };
//     }, [showVideo]);

//     return (
//         <div className="relative w-full bg-gradient-to-b from-blue-950 via-gray-900 to-black">

//             {/* Scroll space */}
//             <div className="h-[200vh]" />

//             {/* PINNED SCENE */}
//             <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen" />

//             {/* Enhanced Brighter HUD */}
//             <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
//                 <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/90 to-purple-900/80 border border-blue-500/60 rounded-2xl p-6 shadow-2xl shadow-blue-500/20">
//                     <div className="flex items-center space-x-10">
//                         <div className="flex items-center">
//                             <div className="relative mr-4">
//                                 <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-500/50 animate-pulse" />
//                                 <div className="absolute inset-0 rounded-full bg-green-400 blur-lg animate-pulse" />
//                             </div>
//                             <span className="text-cyan-100 font-mono text-sm tracking-wider font-bold">SYSTEM ACTIVE</span>
//                         </div>

//                         <div className="h-5 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

//                         <div className="text-cyan-100 font-mono text-sm">
//                             <div className="flex items-center space-x-3">
//                                 <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
//                                 <span className="tracking-wider font-bold">QUANTUM DISPLAY</span>
//                             </div>
//                             <div className="text-blue-300 text-xs mt-1">4K @ 144Hz • HDR1000</div>
//                         </div>

//                         <div className="h-5 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />

//                         <div className="text-cyan-100 font-mono text-sm">
//                             <div className="flex items-center space-x-3">
//                                 <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
//                                 <span className="tracking-wider font-bold">NEURAL LINK</span>
//                             </div>
//                             <div className="text-purple-300 text-xs mt-1">LATENCY &lt;1ms</div>
//                         </div>
//                     </div>

//                     <div className="mt-8 text-center">
//                         <div className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 rounded-xl shadow-lg">
//                             <div className="flex items-center space-x-4">
//                                 <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse shadow-lg" />
//                                 <span className="text-cyan-100 font-mono text-sm tracking-widest animate-pulse font-bold">
//                                     ↓ SCROLL TO INITIATE QUANTUM TRANSFER ↓
//                                 </span>
//                                 <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse shadow-lg" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Quantum Transfer Video Overlay */}
//             {showVideo && (
//                 <div
//                     ref={videoContainerRef}
//                     className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-950 via-indigo-900 to-black w-[100dvw] h-[100dvh]"
//                 >
//                     <video
//                         ref={overlayVideoRef}
//                         src="/glitch.mp4"
//                         muted
//                         autoPlay
//                         playsInline
//                         onEnded={handleVideoEnded}
//                         className="w-full h-full object-cover brightness-125 contrast-125"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
//                 </div>
//             )}

//             <section className="relative z-0">
//                 {showProjects && <Projects />}
//             </section>
//         </div>
//     );
// }



"use client"
import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projects from "../components/Projects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveOldPC() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const screenMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
    const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
    const isScrollingRef = useRef(false);
    const videoPlaybackRequestedRef = useRef(false);
    const fullscreenVideoTriggeredRef = useRef(false);

    // State for video overlay
    const [showVideo, setShowVideo] = useState(false);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const overlayVideoRef = useRef<HTMLVideoElement>(null);
    const [showProjects, setShowProjects] = useState(false);

    // Create video element with better error handling
    const createVideoElement = useCallback(() => {
        const video = document.createElement("video");
        video.src = "/video.mp4";
        video.loop = false;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.crossOrigin = "anonymous";

        video.onerror = () => {
            console.warn("Video failed to load, using fallback texture");
        };

        return video;
    }, []);

    // Initialize video playback
    const initializeVideoPlayback = useCallback(async (video: HTMLVideoElement) => {
        try {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                await playPromise;
                videoPlaybackRequestedRef.current = true;
            }
        } catch (err) {
            console.warn("Autoplay failed, waiting for user interaction:", err);
        }
    }, []);

    // Resume video when user interacts with page
    const resumeVideoOnInteraction = useCallback(() => {
        if (videoRef.current && !videoPlaybackRequestedRef.current) {
            videoRef.current.play().catch(() => { });
            videoPlaybackRequestedRef.current = true;
        }
    }, []);

    // Handle fullscreen video
    const handleFullscreenVideo = useCallback(() => {
        if (fullscreenVideoTriggeredRef.current) return;

        fullscreenVideoTriggeredRef.current = true;

        setShowVideo(true);
    }, []);

    // Handle video end
    const handleVideoEnded = useCallback(() => {
        setShowProjects(true);

        if (!videoContainerRef.current) return;

        gsap.to(videoContainerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                setShowVideo(false);
            },
        });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.body.style.overflow = showVideo ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [showVideo]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        document.addEventListener("click", resumeVideoOnInteraction);
        document.addEventListener("touchstart", resumeVideoOnInteraction);
        document.addEventListener("keydown", resumeVideoOnInteraction);

        /* -------------------- Scene with Brighter Background -------------------- */
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1A1A2E); // Brighter dark blue background

        /* -------------------- Camera -------------------- */
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.set(0, 0.3, 3.2);

        /* -------------------- Renderer with Enhanced Colors -------------------- */
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4; // Increased exposure for brighter scene
        container.appendChild(renderer.domElement);

        /* -------------------- Enhanced Bright Lighting System -------------------- */
        const ambientLight = new THREE.AmbientLight(0x6080FF, 0.3); // Brighter ambient light
        ambientLight.color.setHSL(0.66, 0.6, 0.5); // More saturated and brighter
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xFFFFFF, 2.2); // Increased intensity
        mainLight.position.set(4, 6, 3);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 4096;
        mainLight.shadow.mapSize.height = 4096;
        mainLight.shadow.camera.near = 0.1;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -15;
        mainLight.shadow.camera.right = 15;
        mainLight.shadow.camera.top = 15;
        mainLight.shadow.camera.bottom = -15;
        mainLight.shadow.bias = -0.0005;
        mainLight.shadow.radius = 2;
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x66AAFF, 1.2); // Brighter fill light
        fillLight.position.set(-4, 3, -3);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xFFFFFF, 1.0); // Brighter rim light
        rimLight.position.set(0, 4, -4);
        scene.add(rimLight);

        const hemiLight = new THREE.HemisphereLight(0x5566CC, 0x303040, 0.6); // Brighter hemisphere
        scene.add(hemiLight);

        const backLight = new THREE.PointLight(0x0088FF, 0.8, 10); // Brighter point light
        backLight.position.set(0, 0.5, -2);
        scene.add(backLight);

        /* -------------------- Premium Monitor Chassis with Brighter Accents -------------------- */
        const monitorWidth = 0.68;
        const monitorHeight = 0.58;
        const monitorDepth = 0.42;

        const monitorGeometry = new RoundedBoxGeometry(monitorWidth, monitorHeight, monitorDepth, 24, 0.02);
        const monitorMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x202020, // Brighter dark color
            metalness: 0.8, // More metallic
            roughness: 0.12, // Smoother
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            anisotropy: 1.0,
            transmission: 0.08,
            thickness: 0.5,
            specularIntensity: 2.5, // Higher specular
            specularColor: 0xFFFFFF,
            envMapIntensity: 1.0, // Higher environment reflection
            side: THREE.DoubleSide
        });
        const monitorMesh = new THREE.Mesh(monitorGeometry, monitorMaterial);
        monitorMesh.position.y = 0;
        monitorMesh.castShadow = true;
        monitorMesh.receiveShadow = true;
        scene.add(monitorMesh);

        /* -------------------- Enhanced Nano-Edge Bezel -------------------- */
        const bezelThickness = 0.012;
        const bezelGeometry = new RoundedBoxGeometry(
            monitorWidth - 0.02,
            monitorHeight - 0.1,
            bezelThickness,
            16,
            0.006
        );

        const bezelMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x151515,
            metalness: 0.97,
            roughness: 0.05,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            emissive: 0x404040, // Brighter emissive
            emissiveIntensity: 0,
            anisotropy: 0.9,
            specularIntensity: 3.5,
            side: THREE.DoubleSide
        });
        const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
        bezel.position.z = monitorDepth / 2 + 0.015;
        monitorMesh.add(bezel);

        const bezelAccentGeometry = new THREE.TorusGeometry(
            (monitorWidth - 0.04) / 2,
            0.002, // Thicker accent
            8,
            64,
            Math.PI * 2
        );
        const bezelAccentMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xAAAAAA, // Brighter accent
            metalness: 1.0,
            roughness: 0.03,
            emissive: 0x505050, // Brighter emissive
            emissiveIntensity: 0.5, // Higher intensity
            side: THREE.DoubleSide
        });
        const bezelAccent = new THREE.Mesh(bezelAccentGeometry, bezelAccentMaterial);
        bezelAccent.position.set(0, 0, bezelThickness / 2);
        bezelAccent.rotation.x = Math.PI / 2;
        bezel.add(bezelAccent);

        /* -------------------- Enhanced Nanoglass Screen Protection -------------------- */
        const glassGeometry = new THREE.PlaneGeometry(
            monitorWidth - 0.06,
            monitorHeight - 0.14,
            128,
            128
        );

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xFFFFFF,
            metalness: 0,
            roughness: 0,
            transmission: 0.95,
            thickness: 0.08,
            ior: 1.52,
            specularIntensity: 2.5,
            specularColor: 0xFFFFFF,
            envMapIntensity: 1.2,
            transparent: true,
            opacity: 0.88,
            side: THREE.DoubleSide,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03
        });
        glassMaterialRef.current = glassMaterial;

        const glassScreen = new THREE.Mesh(glassGeometry, glassMaterial);
        glassScreen.position.z = monitorDepth / 2 + 0.02;
        monitorMesh.add(glassScreen);

        /* -------------------- Enhanced Quantum Dot Display -------------------- */
        const screenWidth = monitorWidth - 0.1;
        const screenHeight = monitorHeight - 0.18;

        const screenSegments = 256;
        const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight, screenSegments, screenSegments);

        const curvature = 0.15;
        const positionAttribute = screenGeometry.attributes.position;
        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);
            const normalizedX = (x / (screenWidth / 2));
            const normalizedY = (y / (screenHeight / 2));
            const dist = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
            const z = -curvature * Math.pow(dist, 2.5);
            positionAttribute.setZ(i, z);
        }
        screenGeometry.computeVertexNormals();

        const video = createVideoElement();
        videoRef.current = video;

        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Enhanced scanline effect with brighter colors
        const scanlineCanvas = document.createElement('canvas');
        scanlineCanvas.width = 4096;
        scanlineCanvas.height = 4096;
        const ctx = scanlineCanvas.getContext('2d')!;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, scanlineCanvas.width, scanlineCanvas.height);

        for (let y = 0; y < scanlineCanvas.height; y += 2) {
            const alpha = 0.15 + Math.sin(y * 0.01) * 0.04; // Brighter scanlines
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillRect(0, y, scanlineCanvas.width, 1);
        }

        for (let x = 0; x < scanlineCanvas.width; x += 3) {
            const alpha = 0.08 + Math.cos(x * 0.005) * 0.03; // Brighter vertical lines
            ctx.fillStyle = `rgba(220, 240, 255, ${alpha})`;
            ctx.fillRect(x, 0, 1, scanlineCanvas.height);
        }

        const scanlineTexture = new THREE.CanvasTexture(scanlineCanvas);
        scanlineTexture.wrapS = THREE.RepeatWrapping;
        scanlineTexture.wrapT = THREE.RepeatWrapping;

        // Enhanced quantum texture with brighter particles
        const quantumCanvas = document.createElement('canvas');
        quantumCanvas.width = 1024;
        quantumCanvas.height = 1024;
        const quantumCtx = quantumCanvas.getContext('2d')!;

        const gradient = quantumCtx.createRadialGradient(512, 512, 0, 512, 512, 512);
        gradient.addColorStop(0, 'rgba(120, 180, 255, 0.3)'); // Brighter center
        gradient.addColorStop(0.3, 'rgba(100, 150, 240, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        quantumCtx.fillStyle = gradient;
        quantumCtx.fillRect(0, 0, 1024, 1024);

        // More and brighter quantum particles
        for (let i = 0; i < 7000; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 1024;
            const size = Math.random() * 2 + 0.5; // Larger particles
            const hue = 200 + Math.random() * 60;
            quantumCtx.beginPath();
            quantumCtx.arc(x, y, size, 0, Math.PI * 2);
            quantumCtx.fillStyle = `hsla(${hue}, 90%, 80%, ${Math.random() * 0.25})`; // Brighter particles
            quantumCtx.fill();
        }

        const quantumTexture = new THREE.CanvasTexture(quantumCanvas);

        // Enhanced shader material with brighter colors
        const screenMaterial = new THREE.ShaderMaterial({
            uniforms: {
                videoTexture: { value: videoTexture },
                scanlineTexture: { value: scanlineTexture },
                quantumTexture: { value: quantumTexture },
                time: { value: 0 },
                emissiveIntensity: { value: 0.3 }, // Higher base intensity
                curvature: { value: curvature },
                screenSize: { value: new THREE.Vector2(screenWidth, screenHeight) },
                chromaticAberration: { value: 0.004 }, // More noticeable aberration
                bloomThreshold: { value: 0.6 }, // Lower threshold for more bloom
                saturation: { value: 1.3 } // Higher saturation
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                varying float vScreenDepth;
                uniform float curvature;
                uniform vec2 screenSize;
                
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    
                    vec2 centeredUV = uv * 2.0 - 1.0;
                    float dist = length(centeredUV);
                    float bulge = curvature * pow(dist, 2.5);
                    
                    vec3 pos = position;
                    pos.z -= bulge * 0.8;
                    vScreenDepth = pos.z;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D videoTexture;
                uniform sampler2D scanlineTexture;
                uniform sampler2D quantumTexture;
                uniform float time;
                uniform float emissiveIntensity;
                uniform float chromaticAberration;
                uniform float bloomThreshold;
                uniform float saturation;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                varying float vScreenDepth;
                
                vec3 adjustSaturation(vec3 color, float saturation) {
                    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
                    return mix(vec3(luminance), color, saturation);
                }
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Enhanced chromatic aberration
                    float r = texture2D(videoTexture, uv + vec2(chromaticAberration * 1.5, 0.0)).r;
                    float g = texture2D(videoTexture, uv).g;
                    float b = texture2D(videoTexture, uv - vec2(chromaticAberration * 1.5, 0.0)).b;
                    
                    vec4 videoColor = vec4(r, g, b, 1.0);
                    videoColor.rgb = adjustSaturation(videoColor.rgb, saturation);
                    
                    float luminance = dot(videoColor.rgb, vec3(0.2126, 0.7152, 0.0722));
                    
                    // Brighter quantum colors
                    vec3 quantumColor = vec3(
                        luminance * 1.4,
                        luminance * 1.3,
                        luminance * 1.2
                    );
                    
                    vec2 scanlineUV = uv * vec2(1.0, 3.0);
                    scanlineUV.y += time * 0.5;
                    vec4 scanline = texture2D(scanlineTexture, scanlineUV);
                    
                    vec4 quantum = texture2D(quantumTexture, uv * 2.0 + sin(time * 0.2) * 0.1);
                    
                    vec2 centeredUV = uv * 2.0 - 1.0;
                    float dist = length(centeredUV);
                    float vignette = 1.0 - smoothstep(0.2, 1.4, pow(dist, 1.5)); // Reduced vignette
                    vignette = vignette * 0.9 + 0.1;
                    
                    vec3 normal = normalize(vNormal);
                    float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.5);
                    
                    vec3 finalColor = quantumColor * vignette;
                    finalColor *= (0.95 + 0.15 * scanline.r); // More scanline effect
                    finalColor += quantum.rgb * 0.4; // Brighter quantum overlay
                    
                    finalColor += finalColor * emissiveIntensity * (1.2 + fresnel * 0.7); // More emissive
                    
                    float bloom = smoothstep(bloomThreshold, 1.0, luminance);
                    finalColor += finalColor * bloom * 0.4; // More bloom
                    
                    float scanlinePulse = sin(time * 3.0 + vWorldPosition.y * 10.0) * 0.03; // Stronger pulse
                    finalColor += vec3(0.15, 0.3, 0.5) * scanlinePulse;
                    
                    // Add subtle color shifting
                    finalColor.r += sin(time * 0.5) * 0.05;
                    finalColor.g += cos(time * 0.3) * 0.05;
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
            transparent: false
        });

        screenMaterialRef.current = screenMaterial;

        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.z = monitorDepth / 2 + 0.018;
        monitorMesh.add(screen);

        /* -------------------- Enhanced Carbon Fiber Stand -------------------- */
        const baseGeometry = new THREE.CylinderGeometry(0.18, 0.24, 0.065, 64);
        const baseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x101010,
            metalness: 0.92,
            roughness: 0.08,
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            anisotropy: 1.0,
            side: THREE.DoubleSide
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -monitorHeight / 2 - 0.125;
        base.castShadow = true;
        monitorMesh.add(base);

        const standConnectorGeometry = new THREE.CylinderGeometry(0.055, 0.075, 0.16, 32);
        const standConnectorMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x303030,
            metalness: 0.97,
            roughness: 0.06,
            clearcoat: 1.0,
            side: THREE.DoubleSide
        });
        const standConnector = new THREE.Mesh(standConnectorGeometry, standConnectorMaterial);
        standConnector.position.y = -monitorHeight / 2 - 0.065;
        standConnector.castShadow = true;
        monitorMesh.add(standConnector);

        const tiltRingGeometry = new THREE.TorusGeometry(0.07, 0.008, 16, 48); // Thicker ring
        const tiltRingMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x808080,
            metalness: 0.99,
            roughness: 0.04,
            emissive: 0x606060,
            emissiveIntensity: 0.4, // Higher emissive
            side: THREE.DoubleSide
        });
        const tiltRing = new THREE.Mesh(tiltRingGeometry, tiltRingMaterial);
        tiltRing.position.y = -monitorHeight / 2 - 0.025;
        tiltRing.rotation.x = Math.PI / 2;
        tiltRing.castShadow = true;
        monitorMesh.add(tiltRing);

        /* -------------------- Brighter Holographic Controls -------------------- */
        const controlBaseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x252525,
            metalness: 0.97,
            roughness: 0.08,
            clearcoat: 1.0,
            side: THREE.DoubleSide
        });

        const holographicMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xB0D8FF,
            metalness: 1.0,
            roughness: 0.03,
            emissive: 0x66AAFF,
            emissiveIntensity: 0.6, // Brighter emissive
            transmission: 0.4,
            thickness: 0.5,
            side: THREE.DoubleSide
        });

        const powerButtonGeometry = new THREE.CylinderGeometry(0.014, 0.014, 0.01, 32);
        const powerButton = new THREE.Mesh(powerButtonGeometry, holographicMaterial);
        powerButton.position.set(-monitorWidth / 2 + 0.085, -monitorHeight / 2 + 0.17, monitorDepth / 2 + 0.012);
        powerButton.rotation.x = Math.PI / 2;
        monitorMesh.add(powerButton);

        const powerRingGeometry = new THREE.RingGeometry(0.016, 0.022, 32);
        const powerRing = new THREE.Mesh(powerRingGeometry, holographicMaterial);
        powerRing.position.copy(powerButton.position);
        powerRing.position.z += 0.001;
        powerRing.rotation.x = -Math.PI / 2;
        monitorMesh.add(powerRing);

        const ledCoreGeometry = new THREE.SphereGeometry(0.008, 32, 32); // Larger LED
        const ledCoreMaterial = new THREE.MeshBasicMaterial({
            color: 0x00FFAA,
            transparent: true,
            opacity: 0.95
        });
        const ledCore = new THREE.Mesh(ledCoreGeometry, ledCoreMaterial);
        ledCore.position.set(-monitorWidth / 2 + 0.085, -monitorHeight / 2 + 0.195, monitorDepth / 2 + 0.011);
        monitorMesh.add(ledCore);

        const ledHaloGeometry = new THREE.SphereGeometry(0.018, 48, 48); // Larger halo
        const ledHaloMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x00FFAA) },
                intensity: { value: 1.5 }
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                uniform float intensity;
                varying vec3 vNormal;
                
                void main() {
                    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
                    float pulse = sin(time * 3.0) * 0.4 + 0.8;
                    gl_FragColor = vec4(color, intensity * pulse * 0.5);
                }
            `,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        const ledHalo = new THREE.Mesh(ledHaloGeometry, ledHaloMaterial);
        ledHalo.position.copy(ledCore.position);
        monitorMesh.add(ledHalo);

        const knobBaseGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.014, 32);
        const knobBase = new THREE.Mesh(knobBaseGeometry, holographicMaterial);
        knobBase.position.set(monitorWidth / 2 - 0.105, -monitorHeight / 2 + 0.17, monitorDepth / 2 + 0.012);
        knobBase.rotation.x = Math.PI / 2;
        monitorMesh.add(knobBase);

        const knobRingGeometry = new THREE.TorusGeometry(0.013, 0.002, 8, 32);
        const knobRing = new THREE.Mesh(knobRingGeometry, controlBaseMaterial);
        knobRing.position.copy(knobBase.position);
        knobRing.rotation.x = Math.PI / 2;
        monitorMesh.add(knobRing);

        const brightnessKnob = knobBase.clone();
        brightnessKnob.position.x = monitorWidth / 2 - 0.065;
        monitorMesh.add(brightnessKnob);

        const brightnessRing = knobRing.clone();
        brightnessRing.position.x = monitorWidth / 2 - 0.065;
        monitorMesh.add(brightnessRing);

        const controlPanelGeometry = new RoundedBoxGeometry(0.21, 0.035, 0.006, 8, 0.005);
        const controlPanelMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x181818,
            metalness: 0.99,
            roughness: 0.04,
            clearcoat: 1.0,
            side: THREE.DoubleSide
        });
        const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
        controlPanel.position.set(monitorWidth / 2 - 0.21, -monitorHeight / 2 + 0.085, monitorDepth / 2 + 0.011);
        monitorMesh.add(controlPanel);

        const touchButtonGeometry = new THREE.CylinderGeometry(0.009, 0.009, 0.008, 24);
        const buttonSpacing = 0.038;

        for (let i = 0; i < 4; i++) {
            const button = new THREE.Mesh(touchButtonGeometry, holographicMaterial);
            button.rotation.x = Math.PI / 2;
            button.position.set(
                monitorWidth / 2 - 0.16 + (i * buttonSpacing),
                -monitorHeight / 2 + 0.085,
                monitorDepth / 2 + 0.015
            );
            monitorMesh.add(button);

            const hologramGeometry = new THREE.PlaneGeometry(0.015, 0.015); // Larger holograms
            const hologramMaterial = new THREE.MeshBasicMaterial({
                color: 0x66AAFF,
                transparent: true,
                opacity: 0.3, // More visible
                side: THREE.DoubleSide
            });
            const hologram = new THREE.Mesh(hologramGeometry, hologramMaterial);
            hologram.position.copy(button.position);
            hologram.position.z += 0.008;
            hologram.rotation.x = -Math.PI / 2;
            monitorMesh.add(hologram);
        }

        /* -------------------- Enhanced Premium Branding -------------------- */
        const logoGeometry = new RoundedBoxGeometry(0.15, 0.028, 0.005, 8, 0.006);
        const logoMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 0.99,
            roughness: 0.04,
            emissive: 0x404040,
            emissiveIntensity: 0.5, // Brighter logo
            clearcoat: 1.0,
            side: THREE.DoubleSide
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.set(0, -monitorHeight / 2 + 0.048, monitorDepth / 2 + 0.011);
        monitorMesh.add(logo);

        const modelBadgeGeometry = new THREE.PlaneGeometry(0.09, 0.012);
        const modelBadgeMaterial = new THREE.MeshBasicMaterial({
            color: 0xA0A0A0,
            transparent: true,
            opacity: 0.9, // More visible
            side: THREE.DoubleSide
        });
        const modelBadge = new THREE.Mesh(modelBadgeGeometry, modelBadgeMaterial);
        modelBadge.position.set(0, -monitorHeight / 2 + 0.022, monitorDepth / 2 + 0.011);
        modelBadge.rotation.x = -Math.PI / 2;
        monitorMesh.add(modelBadge);

        /* -------------------- Enhanced Quantum Holographic Glow -------------------- */
        const screenAuraGeometry = new THREE.PlaneGeometry(screenWidth + 0.05, screenHeight + 0.05, 1, 1);
        const screenAuraMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                intensity: { value: 0.25 } // Brighter aura
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                void main() {
                    vUv = uv;
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float intensity;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    vec2 centeredUV = vUv * 2.0 - 1.0;
                    float dist = length(centeredUV);
                    
                    float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * intensity;
                    
                    float pulse = sin(time * 1.5) * 0.3 + 0.9; // Stronger pulse
                    float scan = sin(vPosition.y * 40.0 + time * 6.0) * 0.15 + 0.95; // Faster scan
                    
                    vec3 auraColor = vec3(
                        0.5 + sin(time + dist * 5.0) * 0.3,
                        0.7 + cos(time * 0.7 + dist * 3.0) * 0.3,
                        1.0
                    );
                    
                    gl_FragColor = vec4(auraColor, alpha * pulse * scan * 0.5);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        const screenAura = new THREE.Mesh(screenAuraGeometry, screenAuraMaterial);
        screenAura.position.z = monitorDepth / 2 + 0.017;
        monitorMesh.add(screenAura);

        /* -------------------- Enhanced Keyboard -------------------- */
        const keyboardWidth = 0.52;
        const keyboardHeight = 0.022;
        const keyboardDepth = 0.21;

        const keyboardGeometry = new RoundedBoxGeometry(keyboardWidth, keyboardHeight, keyboardDepth, 8, 0.008);
        const keyboardMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x282828,
            metalness: 0.85,
            roughness: 0.18,
            clearcoat: 0.6,
            side: THREE.DoubleSide
        });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.position.set(0, -0.62, 0.32);
        keyboard.rotation.x = -0.12;
        keyboard.castShadow = true;
        keyboard.receiveShadow = true;
        scene.add(keyboard);

        const keyRows = 4;
        const keysPerRow = 12;
        const keyWidth = 0.032;
        const keyHeight = 0.012;
        const keyDepth = 0.008;
        const keySpacing = 0.036;
        const rowSpacing = 0.026;

        const keyGeometry = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);
        const keyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x303030,
            metalness: 0.8,
            roughness: 0.25,
            clearcoat: 0.4,
            side: THREE.DoubleSide
        });

        for (let row = 0; row < keyRows; row++) {
            for (let col = 0; col < keysPerRow; col++) {
                const key = new THREE.Mesh(keyGeometry, keyMaterial);
                key.position.set(
                    (col - keysPerRow / 2 + 0.5) * keySpacing,
                    keyboard.position.y + keyboardHeight / 2 + keyHeight / 2 + 0.001,
                    keyboard.position.z + (row - keyRows / 2 + 0.5) * rowSpacing
                );
                key.rotation.x = keyboard.rotation.x;
                key.castShadow = true;
                scene.add(key);
            }
        }

        const spacebarGeometry = new RoundedBoxGeometry(0.16, 0.01, 0.022, 4, 0.003);
        const spacebar = new THREE.Mesh(spacebarGeometry, keyMaterial);
        spacebar.position.set(0, keyboard.position.y + keyboardHeight / 2 + 0.01 / 2 + 0.001, keyboard.position.z + 0.082);
        spacebar.rotation.x = keyboard.rotation.x;
        spacebar.castShadow = true;
        scene.add(spacebar);

        /* -------------------- Enhanced Ergonomic Mouse -------------------- */
        const mouseGeometry = new THREE.SphereGeometry(0.028, 32, 32);
        mouseGeometry.scale(1.6, 0.65, 1);
        const mouseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x282828,
            metalness: 0.8,
            roughness: 0.22,
            clearcoat: 0.6,
            side: THREE.DoubleSide
        });
        const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
        mouse.position.set(0.32, -0.6, 0.17);
        mouse.castShadow = true;
        scene.add(mouse);

        const cableCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.32, -0.6, 0.17),
            new THREE.Vector3(0.22, -0.72, 0.12),
            new THREE.Vector3(0.12, -0.82, -0.08),
            new THREE.Vector3(0.02, -0.92, -0.28),
        ]);

        const cableGeometry = new THREE.TubeGeometry(cableCurve, 32, 0.006, 16, false);
        const cableMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x202020,
            metalness: 0.4,
            roughness: 0.6,
            side: THREE.DoubleSide
        });
        const cable = new THREE.Mesh(cableGeometry, cableMaterial);
        scene.add(cable);

        /* -------------------- Brighter Carbon Fiber Desk -------------------- */
        const deskWidth = 4.2;
        const deskDepth = 2.2;
        const deskThickness = 0.06;

        const deskGeometry = new THREE.BoxGeometry(deskWidth, deskThickness, deskDepth);
        const deskMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x383838,
            metalness: 0.5,
            roughness: 0.5,
            side: THREE.DoubleSide
        });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(0, -0.92, 0);
        desk.receiveShadow = true;
        scene.add(desk);

        const carbonCanvas = document.createElement('canvas');
        carbonCanvas.width = 512;
        carbonCanvas.height = 512;
        const carbonCtx = carbonCanvas.getContext('2d')!;

        carbonCtx.fillStyle = '#383838';
        carbonCtx.fillRect(0, 0, 512, 512);

        carbonCtx.strokeStyle = 'rgba(60, 60, 60, 0.9)';
        carbonCtx.lineWidth = 2;

        const gridSize = 40;
        for (let x = 0; x < 512; x += gridSize) {
            for (let y = 0; y < 512; y += gridSize) {
                carbonCtx.beginPath();
                carbonCtx.moveTo(x, y);
                carbonCtx.lineTo(x + gridSize, y + gridSize);
                carbonCtx.stroke();

                carbonCtx.beginPath();
                carbonCtx.moveTo(x + gridSize, y);
                carbonCtx.lineTo(x, y + gridSize);
                carbonCtx.stroke();
            }
        }

        carbonCtx.fillStyle = 'rgba(80, 80, 80, 0.4)';
        for (let i = 0; i < 150; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 5 + 2;
            carbonCtx.beginPath();
            carbonCtx.arc(x, y, size, 0, Math.PI * 2);
            carbonCtx.fill();
        }

        const carbonTexture = new THREE.CanvasTexture(carbonCanvas);
        deskMaterial.map = carbonTexture;
        deskMaterial.normalScale = new THREE.Vector2(0.5, 0.5);

        /* -------------------- Brighter Ambient Particles -------------------- */
        const particleCount = 150; // More particles
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = Math.random() * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            colors[i * 3] = 0.4 + Math.random() * 0.3; // Brighter colors
            colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
            colors[i * 3 + 2] = 0.9 + Math.random() * 0.3;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025, // Larger particles
            vertexColors: true,
            transparent: true,
            opacity: 0.8, // More visible
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        /* -------------------- Scroll Animation -------------------- */
        const screenEmissiveIntensity = { value: 0.3 }; // Higher initial intensity
        let scrollTriggerInstance: ScrollTrigger | null = null;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "+=200%",
                scrub: 1.5,
                pin: container,
                pinSpacing: false,
                onEnter: () => {
                    isScrollingRef.current = true;
                    if (videoRef.current && videoRef.current.paused) {
                        videoRef.current.play().catch(() => { });
                    }
                },
                onLeaveBack: () => {
                    isScrollingRef.current = false;
                },
                onUpdate: (self) => {
                    if (
                        self.progress >= 0.999 &&
                        !fullscreenVideoTriggeredRef.current
                    ) {
                        handleFullscreenVideo();
                    }
                },
                onEnterBack: () => { },
            },
        });

        tl.to(camera.position, {
            z: 1.1,
            y: 0.15,
            ease: "power3.out"
        })
            .to(camera, {
                fov: 22,
                onUpdate: () => camera.updateProjectionMatrix(),
                ease: "power3.out"
            }, 0)
            .to(monitorMesh.rotation, {
                y: Math.PI * 0.25,
                x: -0.03,
                ease: "power3.out"
            }, 0)
            .to(screenEmissiveIntensity, {
                value: 0.7, // Higher final intensity
                ease: "power3.out"
            }, 0)
            .to(bezelMaterial, {
                emissiveIntensity: 0.2, // Brighter bezel
                ease: "power3.out"
            }, 0)
            .to(glassMaterial, {
                transmission: 0.8,
                opacity: 0.75,
                ease: "power3.out"
            }, 0);

        const SCROLL_TRIGGER_ID = 'my-trigger';
        scrollTriggerInstance = ScrollTrigger.getById(SCROLL_TRIGGER_ID)!;

        /* -------------------- Mouse Interaction -------------------- */
        let mouseX = 0;
        let mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
        };
        window.addEventListener("mousemove", onMouseMove);

        /* -------------------- Resize Handler -------------------- */
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        initializeVideoPlayback(video);

        /* -------------------- Animation Loop -------------------- */
        const clock = new THREE.Clock();
        let animationId: number;

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            monitorMesh.rotation.y += (mouseX - monitorMesh.rotation.y) * 0.04;
            monitorMesh.rotation.x += (-mouseY - monitorMesh.rotation.x) * 0.04;

            monitorMesh.position.y = Math.sin(time * 0.4) * 0.003;
            monitorMesh.rotation.z = Math.sin(time * 0.25) * 0.0015;

            ledHaloMaterial.uniforms.time.value = time;

            if (screenMaterialRef.current) {
                screenMaterialRef.current.uniforms.time.value = time;
                screenMaterialRef.current.uniforms.emissiveIntensity.value = screenEmissiveIntensity.value;
            }

            if (glassMaterialRef.current) {
                glassMaterialRef.current.opacity = 0.9 + Math.sin(time * 0.4) * 0.05; // More variation
            }

            scanlineTexture.offset.y += delta * 0.6;
            quantumTexture.offset.x += delta * 0.05;

            particles.rotation.y += delta * 0.05;

            camera.lookAt(monitorMesh.position);
            renderer.render(scene, camera);
        };
        animate();

        /* -------------------- Cleanup -------------------- */
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("click", resumeVideoOnInteraction);
            document.removeEventListener("touchstart", resumeVideoOnInteraction);
            document.removeEventListener("keydown", resumeVideoOnInteraction);

            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = "";
                videoRef.current.load();
            }

            cancelAnimationFrame(animationId);
            renderer.dispose();

            if (scrollTriggerInstance) {
                scrollTriggerInstance.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [createVideoElement, initializeVideoPlayback, resumeVideoOnInteraction, handleFullscreenVideo]);

    // Effect for handling overlay video
    useEffect(() => {
        if (!showVideo || !videoContainerRef.current) return;

        if (videoRef.current) {
            videoRef.current.pause();
        }

        gsap.fromTo(
            videoContainerRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                    if (overlayVideoRef.current) {
                        overlayVideoRef.current.play().catch(console.warn);
                    }
                }
            }
        );

        return () => {
            if (videoRef.current && !fullscreenVideoTriggeredRef.current) {
                videoRef.current.play().catch(() => { });
            }
        };
    }, [showVideo]);

    return (
        <div className="relative w-full bg-gradient-to-b from-blue-950 via-gray-900 to-black">

            {/* Scroll space */}
            <div className="h-[200vh]" />

            {/* PINNED SCENE */}
            <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen" />

            {/* Enhanced Brighter HUD */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
                <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/90 to-purple-900/80 border border-blue-500/60 rounded-2xl p-6 shadow-2xl shadow-blue-500/20">
                    <div className="flex items-center space-x-10">
                        <div className="flex items-center">
                            <div className="relative mr-4">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-500/50 animate-pulse" />
                                <div className="absolute inset-0 rounded-full bg-green-400 blur-lg animate-pulse" />
                            </div>
                            <span className="text-cyan-100 font-mono text-sm tracking-wider font-bold">SYSTEM ACTIVE</span>
                        </div>

                        <div className="h-5 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                        <div className="text-cyan-100 font-mono text-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                                <span className="tracking-wider font-bold">QUANTUM DISPLAY</span>
                            </div>
                            <div className="text-blue-300 text-xs mt-1">4K @ 144Hz • HDR1000</div>
                        </div>

                        <div className="h-5 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />

                        <div className="text-cyan-100 font-mono text-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                                <span className="tracking-wider font-bold">NEURAL LINK</span>
                            </div>
                            <div className="text-purple-300 text-xs mt-1">LATENCY &lt;1ms</div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 rounded-xl shadow-lg">
                            <div className="flex items-center space-x-4">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse shadow-lg" />
                                <span className="text-cyan-100 font-mono text-sm tracking-widest animate-pulse font-bold">
                                    ↓ SCROLL TO INITIATE QUANTUM TRANSFER ↓
                                </span>
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quantum Transfer Video Overlay */}
            {showVideo && (
                <div
                    ref={videoContainerRef}
                    className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-950 via-indigo-900 to-black w-[100dvw] h-[100dvh]"
                >
                    <video
                        ref={overlayVideoRef}
                        src="/glitch.mp4"
                        muted
                        autoPlay
                        playsInline
                        onEnded={handleVideoEnded}
                        className="w-full h-full object-cover brightness-125 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
                </div>
            )}

            <section className="relative z-0">
                {showProjects && <Projects />}
            </section>
        </div>
    );
}