"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

const projects = [
    {
        id: 1,
        title: "DreamScreen",
        description: "Interactive experience",
        image: null,
        tags: ["Immersive", "Interactive", "XR"],
    },
    {
        id: 2,
        title: "Across the Bridge",
        description: "Documentary",
        image: null,
        tags: ["Documentary", "Social", "Impact"],
    },
    {
        id: 3,
        title: "Capture with Aaron Chang",
        description: "TV Series",
        image: null,
        tags: ["Photography", "Education", "Series"],
    },
    {
        id: 4,
        title: "Tradesville",
        description: "Reality TV",
        image: null,
        tags: ["Reality", "Construction", "Drama"],
    },
];

export default function Projects() {
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const cursorLineRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayText, setDisplayText] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);
    const ballContainerRef = useRef<HTMLDivElement>(null);
    const neuralNetworkRef = useRef<HTMLDivElement>(null);

    /* =============================
       FAST TYPING TEXT - STAYS FIXED
    ============================== */
    useLayoutEffect(() => {
        const baseText = "Positioned at the axis of talent and content across ";
        const words = ["film", "music", "fashion"];
        const typingSpeed = 0.01;

        let timeout: any;

        const typeBase = async () => {
            for (let i = 0; i <= baseText.length; i++) {
                setDisplayText(baseText.slice(0, i));
                await new Promise((r) => (timeout = setTimeout(r, typingSpeed * 1000)));
            }
            cycleWords(0);
        };

        const cycleWords = async (index: number) => {
            if (index >= words.length) return;
            const word = words[index];

            for (let i = 0; i <= word.length; i++) {
                setDisplayText(baseText + word.slice(0, i));
                await new Promise((r) => (timeout = setTimeout(r, typingSpeed * 1000)));
            }

            await new Promise((r) => setTimeout(r, 300));

            if (index < words.length - 1) {
                for (let i = word.length; i >= 0; i--) {
                    setDisplayText(baseText + word.slice(0, i));
                    await new Promise((r) => (timeout = setTimeout(r, typingSpeed * 800)));
                }
                cycleWords(index + 1);
            } else {
                setTypingComplete(true);
                gsap.to(progressRef.current, {
                    scaleX: 1,
                    duration: 1,
                    ease: "power2.inOut",
                });
            }
        };

        typeBase();

        return () => clearTimeout(timeout);
    }, []);

    /* =============================
       THICK DIGITAL MOUSE TRAIL
    ============================== */
    useEffect(() => {
        const svg = cursorLineRef.current;
        if (!svg) return;

        const paths: SVGPathElement[] = [];
        for (let i = 0; i < 3; i++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "#FFFFFF");
            path.setAttribute("stroke-width", (5 + i * 2).toString());
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-linejoin", "round");
            path.setAttribute("opacity", `${0.4 + i * 0.1}`);
            svg.appendChild(path);
            paths.push(path);
        }

        const points: { x: number; y: number }[] = [];
        const maxPoints = 20;
        const segmentLength = 15;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const createDigitalPath = (points: { x: number; y: number }[], offset: number) => {
            if (points.length < 2) return "";

            let d = `M ${points[0].x + offset} ${points[0].y + offset}`;

            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const midX = (prev.x + curr.x) / 2;
                const midY = (prev.y + curr.y) / 2;

                d += ` L ${midX + offset} ${prev.y + offset}`;
                d += ` L ${midX + offset} ${curr.y + offset}`;
                d += ` L ${curr.x + offset} ${curr.y + offset}`;
            }

            return d;
        };

        const animate = () => {
            points.push({ x: mouseX, y: mouseY });
            if (points.length > maxPoints) points.shift();

            paths.forEach((path, i) => {
                const offset = (i - 1) * 3;
                const digitalPath = createDigitalPath(points, offset);
                path.setAttribute("d", digitalPath);
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMouseMove);
        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            paths.forEach((path) => path.remove());
        };
    }, []);


    /* =============================
       ANIMATED BORDER DRAWING EFFECT
    ============================= */
    useEffect(() => {
        if (!typingComplete) return;

        const borderElement = document.getElementById("header-border");
        const headerElement = document.getElementById("projects-header");

        if (!borderElement || !headerElement) return;

        headerElement.style.position = "relative";
        borderElement.style.position = "absolute";
        borderElement.style.top = "-8px";
        borderElement.style.left = "-8px";
        borderElement.style.width = `calc(100% + 16px)`;
        borderElement.style.height = `calc(100% + 16px)`;
        borderElement.style.opacity = "0";
        borderElement.style.borderRadius = "6px";
        borderElement.style.clipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

        const tl = gsap.timeline({
            defaults: { duration: 1.5, ease: "power2.inOut" },
        });

        tl.to(borderElement, { opacity: 1, duration: 0.5 })
            .to(borderElement, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 2,
                ease: "power3.inOut",
            })
            .to(
                borderElement,
                {
                    backgroundPosition: "100% 100%",
                    duration: 3,
                    repeat: -1,
                    ease: "none",
                },
                "-=1.5"
            );

        return () => {
            tl.kill();
        };
    }, [typingComplete]);





    return (
        <div className="w-full min-h-screen bg-black text-white perspective-1000 overflow-hidden">
            {/* ELECTRIC GRID SECTION WITH 3D EFFECT */}
            <div
                ref={containerRef}
                className="relative w-[80%] h-[80vh] mx-auto mt-20 rounded-lg overflow-hidden border border-white/20"
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Flowing spherical background */}
                <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{
                        transform: "translateZ(-120px) scale(1.6)",
                        background:
                            "radial-gradient(circle at center, transparent 25%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.02) 100%)",
                        transition: "transform 1s ease-in-out",
                        willChange: "transform",
                    }}
                ></div>

                {/* Centered 3D Text */}
                <div className="absolute inset-0 flex items-center justify-center z-10 px-8">
                    <div
                        ref={textRef}
                        className="w-full max-w-[90%] text-left"
                        style={{
                            transformStyle: "preserve-3d",
                            transition: "transform 0.6s ease-out",
                        }}
                    >
                        <div
                            className="font-black leading-[0.9] tracking-tight text-[4rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem]"
                            style={{
                                transform: "translateZ(60px)",

                            }}
                        >
                            <span className="text-white relative">
                                {displayText}
                                {typingComplete && <span className="text-white blink-cursor">_</span>}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Depth cursor lines */}
                <svg
                    ref={cursorLineRef}
                    className="absolute inset-0 w-full h-full pointer-events-none z-20"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(40px)",
                        transition: "transform 0.6s ease-out",
                    }}
                >
                    {/* Dynamic paths drawn via GSAP */}
                </svg>
            </div>




            {/* REST OF THE PAGE CONTENT */}
            <div
                className="mt-40 p-8 text-white relative"
                style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)",
                }}
            >
                {/* Main Content */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Animated Border Box around Header */}
                    <div className="relative mb-12">
                        {/* Border Drawing Animation */}
                        <div
                            id="header-border"
                            className="absolute border-2 border-white pointer-events-none"
                            style={{
                                top: "-12px",
                                left: "-12px",
                                right: "-12px",
                                bottom: "-12px",
                                opacity: 0,
                                borderRadius: "8px",
                                boxShadow: "0 0 20px rgba(255, 255, 255, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.3)",
                                background: "linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.08) 50%, transparent 60%)",
                                backgroundSize: "300% 300%",
                            }}
                        />

                        {/* Header with styling */}
                        <h1
                            id="projects-header"
                            className="text-5xl md:text-7xl font-bold py-6 px-8 relative inline-block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                        >
                            Our Projects
                        </h1>
                    </div>

                    {/* Content Paragraph */}
                    <div className="mb-16">
                        <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8 px-4">
                            Positioned at the axis of talent and content across film, television, music and beyond. HLE creates
                            opportunities for the storytellers, trendsetters, and creatives of all types who are looking to get their
                            message amplified. By helping shape original media that appeals to the industry's mandates.
                        </p>
                    </div>

                    {/* 3D Book-Like Projects Section */}
                    <div className="mb-24 relative">
                        <div
                            className="relative w-full overflow-x-auto overflow-y-hidden py-12"
                            style={{ perspective: "1500px" }}
                        >
                            {/* Left & right gradient overlays for depth effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>

                            {/* Horizontal scroll container */}
                            <div
                                className="flex space-x-12 will-change-transform py-8 cursor-grab"
                                style={{ transformStyle: "preserve-3d" }}
                                onMouseDown={(e) => {
                                    const slider = e.currentTarget;
                                    let isDown = true;
                                    let startX = e.pageX - slider.offsetLeft;
                                    let scrollLeft = slider.scrollLeft;

                                    const onMouseMove = (eMove: MouseEvent) => {
                                        if (!isDown) return;
                                        const x = eMove.pageX - slider.offsetLeft;
                                        const walk = (x - startX) * 2; // scroll speed
                                        slider.scrollLeft = scrollLeft - walk;
                                    };

                                    const onMouseUp = () => {
                                        isDown = false;
                                        document.removeEventListener("mousemove", onMouseMove);
                                        document.removeEventListener("mouseup", onMouseUp);
                                    };

                                    document.addEventListener("mousemove", onMouseMove);
                                    document.addEventListener("mouseup", onMouseUp);
                                }}
                            >
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="book-card bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl rounded-lg p-6 w-80 min-w-[320px] h-96 relative border border-white/10"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            boxShadow: `
              0 20px 40px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 20px rgba(255, 255, 255, 0.2)
            `,
                                            transition: "transform 0.3s ease",
                                        }}
                                    >
                                        {/* Spine effect */}
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-800 to-gray-900"
                                            style={{
                                                transform: "translateZ(-10px)",
                                                boxShadow: "inset 0 0 10px rgba(255, 255, 255, 1)",
                                            }}
                                        ></div>

                                        {/* Pages effect */}
                                        <div className="book-page absolute right-2 top-4 bottom-4 w-3 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 opacity-60"></div>
                                        <div className="book-page absolute right-4 top-4 bottom-4 w-2 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 opacity-40"></div>
                                        <div className="book-page absolute right-6 top-4 bottom-4 w-1 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 opacity-30"></div>

                                        {/* Book cover content */}
                                        <div className="relative z-10 h-full flex flex-col justify-between">
                                            <div>
                                                <div className="text-3xl font-bold mb-4 text-white">{project.title}</div>
                                                <div className="text-lg text-gray-300 mb-6 font-medium border-l-4 border-white pl-4 py-2">
                                                    {project.description}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                {project.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-sm bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg font-medium border border-white/20"
                                                        style={{
                                                            transform: "translateZ(20px)",
                                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* ANIMATED ROTATING BALL SECTION */}
                    <div ref={ballContainerRef} className="mt-32 mb-20 px-4 relative">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                {/* Text Content */}
                                <div className="relative z-20">
                                    <div className="relative inline-block mb-12">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-gray-400/10 blur-xl rounded-full"></div>
                                        <h2 className="text-5xl md:text-6xl font-bold leading-tight relative">
                                            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                                                Helping visionaries
                                            </span>
                                            <br />
                                            <span className="text-white text-4xl md:text-5xl font-normal mt-6 block">
                                                transform ideas into reality
                                            </span>
                                        </h2>
                                    </div>

                                    <div className="space-y-8">
                                        <p className="text-xl text-gray-300 leading-relaxed">
                                            We bridge the gap between creative vision and commercial success, crafting narratives that resonate deeply with audiences while meeting industry standards.
                                        </p>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm">
                                                <div className="text-4xl font-bold text-white mb-3">360°</div>
                                                <div className="text-gray-300 font-medium">Holistic Creative Strategy</div>
                                            </div>
                                            <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm">
                                                <div className="text-4xl font-bold text-white mb-3">24/7</div>
                                                <div className="text-gray-300 font-medium">Dedicated Support</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Animations */}
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                    50% { transform: translate(-50%, -50%) translateY(-20px); }
                }
                .blink-cursor {
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
}


