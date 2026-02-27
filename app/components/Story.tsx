"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface StoryArc {
    id: string;
    title: string;
    subtitle: string;
    episodes: string;
    image: string;
    description: string;
    color: string;
    highlights: string[];
}

const Story = () => {
    const [activeArc, setActiveArc] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const storyArcs: StoryArc[] = [
        {
            id: "part1",
            title: "The Boy with the Nine-Tails",
            subtitle: "Naruto Part 1",
            episodes: "Episodes 1 - 135",
            image: "/naruto-child1.png",
            description: "A young, isolated ninja named Naruto Uzumaki struggles to gain recognition from his village while dealing with the sealed Nine-Tailed Fox within him. He joins Team 7 with Sasuke and Sakura under the guidance of Kakashi.",
            color: "from-orange-400 to-orange-600",
            highlights: ["Land of Waves Arc", "Chunin Exams", "Konoha Crush", "Search for Tsunade", "Sasuke Recovery Mission"],
        },
        {
            id: "shippuden-start",
            title: "The Akatsuki Awakens",
            subtitle: "Shippuden: Early Arcs",
            episodes: "Episodes 1 - 175",
            image: "/akatsuki1.png",
            description: "After two and a half years of training with Jiraiya, Naruto returns to the village. The mysterious Akatsuki organization begins making their move to capture all the Tailed Beasts.",
            color: "from-red-600 to-red-900",
            highlights: ["Kazekage Rescue", "Tenchi Bridge Reconnaissance", "Akatsuki Suppression", "Tale of Jiraiya the Gallant", "Pain's Assault"],
        },
        {
            id: "war-build",
            title: "The Gathering Storm",
            subtitle: "Shippuden: Mid Arcs",
            episodes: "Episodes 197 - 253",
            image: "/five.png",
            description: "As tensions rise between the Hidden Villages and the Akatsuki, the Five Kage Summit is called. Sasuke descends further into darkness while Naruto strives to master the Nine-Tails' chakra.",
            color: "from-purple-600 to-indigo-900",
            highlights: ["Five Kage Summit", "Fourth Shinobi World War Countdown", "Paradise Life on a Boat", "Controlling the Nine-Tails"],
        },
        {
            id: "war-climax",
            title: "The Fourth Great Ninja War",
            subtitle: "Shippuden: Climax",
            episodes: "Episodes 254 - 479",
            image: "https://wallpapercave.com/wp/wp4319453.jpg",
            description: "The Allied Shinobi Forces face off against Obito, Madara, and the reanimated army. Legendary figures from the past return to the battlefield in the fight that will determine the fate of the ninja world.",
            color: "from-orange-600 to-red-600",
            highlights: ["Seven Ninja Swordsmen", "The Ten-Tails Revival", "Team 7 Reunited", "Kaguya Otsutsuki Strikes", "Naruto vs Sasuke"],
        },
        {
            id: "epilogue",
            title: "A New Era",
            subtitle: "Shippuden: Epilogue",
            episodes: "Episodes 480 - 500",
            image: "https://wallpapercave.com/wp/wp6615714.jpg",
            description: "Following the conclusion of the Fourth Great Ninja War, the heroes navigate their lives in the hard-won peace. The era concludes with the long-awaited wedding of Naruto and Hinata.",
            color: "from-pink-400 to-red-300",
            highlights: ["Sasuke's Story: Sunrise", "Shikamaru's Story", "Hidden Leaf Village Grand Sports Festival", "Naruto and Hinata's Wedding"],
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return;

        // Calculate which arc is most visible in the scroll container
        const container = scrollContainerRef.current;
        const scrollPosition = container.scrollTop;
        const itemHeight = 300; // Approximate height of a timeline item

        const newActiveArc = Math.min(
            Math.max(Math.floor((scrollPosition + itemHeight / 2) / itemHeight), 0),
            storyArcs.length - 1
        );

        if (newActiveArc !== activeArc) {
            setActiveArc(newActiveArc);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="story"
            className="relative min-h-screen w-full bg-black py-20 overflow-hidden"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
                <Image
                    src={storyArcs[activeArc].image}
                    alt={storyArcs[activeArc].title}
                    fill
                    className="object-cover opacity-20 blur-md scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        }`}
                >
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600/10 backdrop-blur-sm border border-red-500/30 rounded-full mb-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <svg className="w-5 h-5 text-red-500 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-400 text-sm font-bold tracking-widest uppercase">
                            The Epic Saga
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-wider">
                        Chronicles of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 animate-gradient-text">A Hero</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Journey through the defining eras that shaped Naruto's destiny from an outcast to the savior of the ninja world.
                    </p>
                </div>

                {/* Content Layout */}
                <div className="grid lg:grid-cols-12 gap-12 items-start h-[600px]">

                    {/* Left Side - Interactive Visual Showcase */}
                    <div className={`lg:col-span-7 h-full w-full transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
                        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20 border border-white/10 group">
                            <Image
                                key={activeArc}
                                src={storyArcs[activeArc].image}
                                alt={storyArcs[activeArc].title}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105 animate-fade-in"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                            {/* Highlight Badges */}
                            <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
                                <span className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${storyArcs[activeArc].color} text-white font-bold text-sm shadow-lg w-max animate-slide-in-right`}>
                                    {storyArcs[activeArc].episodes}
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 font-semibold text-sm w-max">
                                    {storyArcs[activeArc].subtitle}
                                </span>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <h3 className="text-4xl font-black text-white mb-4 drop-shadow-lg">{storyArcs[activeArc].title}</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {storyArcs[activeArc].highlights.slice(0, 3).map((highlight, idx) => (
                                        <span key={idx} className="text-xs text-orange-200 border border-orange-500/30 bg-orange-500/10 px-3 py-1 rounded-full">
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Timeline Scroll */}
                    <div className={`lg:col-span-5 h-full relative transform transition-all duration-1000 delay-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>

                        {/* Scroll Indicator Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-800 rounded-full hidden md:block z-0">
                            <div
                                className="absolute top-0 w-full bg-gradient-to-b from-orange-500 to-red-600 rounded-full transition-all duration-500 ease-out"
                                style={{ height: `${((activeArc + 1) / storyArcs.length) * 100}%` }}
                            ></div>
                        </div>

                        {/* Scrollable Container */}
                        <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="h-full overflow-y-auto pr-4 custom-scrollbar relative z-10 pb-32"
                        >
                            <div className="space-y-8 pl-0 md:pl-16">
                                {storyArcs.map((arc, index) => {
                                    const isActive = index === activeArc;
                                    return (
                                        <div
                                            key={arc.id}
                                            onClick={() => setActiveArc(index)}
                                            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${isActive
                                                ? "bg-white/10 border-white/20 shadow-xl scale-105"
                                                : "bg-transparent border-transparent hover:bg-white/5 opacity-50 hover:opacity-100"
                                                }`}
                                        >
                                            {/* Timeline Dot */}
                                            <div className={`absolute -left-10 md:left-[-3rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 transition-colors duration-300 hidden md:flex items-center justify-center ${isActive ? "bg-red-600 border-black shadow-[0_0_15px_rgba(220,38,38,0.7)]" : "bg-gray-800 border-gray-900"
                                                }`}>
                                                {isActive && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                                            </div>

                                            <h4 className={`text-2xl font-bold mb-2 ${isActive ? "text-orange-400" : "text-gray-300"}`}>
                                                {arc.subtitle}
                                            </h4>
                                            <p className={`text-md leading-relaxed ${isActive ? "text-gray-200" : "text-gray-500"}`}>
                                                {arc.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Scroll Hint */}
                        <div className="absolute bottom-4 right-8 bg-black/80 text-gray-400 text-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 animate-bounce shadow-lg pointer-events-none">
                            <span>Scroll to explore</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;
