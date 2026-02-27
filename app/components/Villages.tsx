"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import VillageModal from "./VillageModal";

interface Village {
    id: string;
    name: string;
    country: string;
    kage: string;
    symbol: string;
    image: string;
    description: string;
    color: string;
    extendedDescription?: string;
    notableClans?: string[];
    landmarks?: string[];
}

const Villages = () => {
    const [activeVillage, setActiveVillage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const villages: Village[] = [
        {
            id: "leaf",
            name: "Hidden Leaf Village",
            country: "Land of Fire",
            kage: "Hokage",
            symbol: "Konohagakure",
            image: "/heeden-leaf.png",
            description: "Hidden in the leaves, this is the home of Naruto Uzumaki. Founded by Hashirama Senju and Madara Uchiha, it is the most powerful and influential of all hidden villages.",
            color: "from-orange-500 to-red-600",
            extendedDescription: "Founded to end the era of warring states, Konoha became a symbol of peace. However, it has faced numerous disasters, including the Nine-Tails attack and the Pain invasion. Through the Will of Fire, its citizens always unite to rebuild and protect the next generation.",
            notableClans: ["Uchiha", "Senju", "Hyuga", "Uzumaki", "Sarutobi"],
            landmarks: ["Hokage Monument", "Ichiraku Ramen", "Forest of Death"],
        },
        {
            id: "sand",
            name: "Hidden Sand Village",
            country: "Land of Wind",
            kage: "Kazekage",
            symbol: "Sunagakure",
            image: "/hidden-sand1.png",
            description: "Surrounded by a vast desert, the Hidden Sand is known for its puppetry jutsu and powerful Wind Style techniques. Home to Gaara, the current Kazekage.",
            color: "from-yellow-600 to-orange-700",
            extendedDescription: "Historically isolationist due to harsh desert conditions and limited resources, Suna once allied with Orochimaru out of desperation to destroy the Leaf. After realizing their mistake, they forged an unbreakable alliance with Konoha.",
            notableClans: ["Kazekage Clan", "Shirogane"],
            landmarks: ["Kazekage Residence", "Green Room", "Sunagakure Aviary"],
        },
        {
            id: "cloud",
            name: "Hidden Cloud Village",
            country: "Land of Lightning",
            kage: "Raikage",
            symbol: "Kumogakure",
            image: "/heeden-cloud.png",
            description: "Nestled among high mountain peaks above the clouds, this village specializes in Lightning Style ninjutsu and is known for its incredible military might.",
            color: "from-blue-500 to-cyan-400",
            extendedDescription: "A highly militaristic village that actively sought to amass power and tailed beasts, often resorting to kidnapping kekkei genkai users from other villages. They are fiercely loyal to the Raikage.",
            notableClans: ["Yotsuki", "Chinoike"],
            landmarks: ["Raikage's Office", "Valley of Clouds and Lightning", "Turtle Island"],
        },
        {
            id: "stone",
            name: "Hidden Stone Village",
            country: "Land of Earth",
            kage: "Tsuchikage",
            symbol: "Iwagakure",
            image: "/heeden-stone.png",
            description: "A fortress-like village surrounded by rocky terrain. Its ninja are experts in Earth Style jutsu and possess unyielding determination.",
            color: "from-stone-600 to-amber-800",
            extendedDescription: "Protected by a massive mountain range, Iwa ninjas are known for their strong discipline and the 'Will of Stone'. During the Third Ninja War, they famously employed mercenary groups like the Akatsuki to lower costs.",
            notableClans: ["Kamizuru"],
            landmarks: ["Tsuchikage's Residence", "Iwagakure Stone Memorial"],
        },
        {
            id: "mist",
            name: "Hidden Mist Village",
            country: "Land of Water",
            kage: "Mizukage",
            symbol: "Kirigakure",
            image: "/heeden-mist.png",
            description: "Shrouded in thick fog, this mysterious village is known for its Water Style jutsu and the legendary Seven Ninja Swordsmen of the Mist.",
            color: "from-cyan-600 to-blue-800",
            extendedDescription: "Once known as the 'Blood Mist Village' due to a deadly graduation exam where students had to kill their friends. The village operated in extreme isolation under the influence of Obito Uchiha but later moved to a much more open, peaceful society.",
            notableClans: ["Hozuki", "Yuki", "Kaguya", "Hoshigaki"],
            landmarks: ["Mizukage's Office", "Mist Academy"],
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

    return (
        <section
            ref={sectionRef}
            id="villages"
            className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] bg-gradient-to-br ${villages[activeVillage].color} transition-colors duration-1000`}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        }`}
                >
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
                        <div className={`w-2 h-2 rounded-full animate-pulse bg-gradient-to-r ${villages[activeVillage].color}`}></div>
                        <span className="text-gray-300 text-sm font-medium">
                            The Five Great Shinobi Countries
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-wider">
                        Hidden <span className={`bg-gradient-to-r ${villages[activeVillage].color} bg-clip-text text-transparent`}>Villages</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore the powerful strongholds that maintain the balance of power across the ninja world.
                    </p>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[500px]">

                    {/* Left Navigation */}
                    <div className={`lg:col-span-4 space-y-4 transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
                        {villages.map((village, index) => {
                            const isActive = index === activeVillage;
                            return (
                                <button
                                    key={village.id}
                                    onClick={() => setActiveVillage(index)}
                                    className={`w-full text-left p-6 rounded-2xl transition-all duration-500 relative overflow-hidden group border ${isActive
                                        ? `bg-gradient-to-r ${village.color} bg-opacity-20 border-white/30 transform scale-105 shadow-2xl`
                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    <div className="relative z-10">
                                        <h3 className={`text-xl font-bold mb-1 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                                            {village.name}
                                        </h3>
                                        <p className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}>
                                            {village.country}
                                        </p>
                                    </div>
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-[shimmer_2s_infinite]"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Content */}
                    <div className={`lg:col-span-8 h-full transform transition-all duration-1000 delay-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group">
                            {/* Dynamic Image */}
                            <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
                                {villages.map((village, index) => (
                                    <div
                                        key={village.id}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${index === activeVillage ? "opacity-100 z-10" : "opacity-0 z-0"
                                            }`}
                                    >
                                        <Image
                                            src={village.image}
                                            alt={village.name}
                                            fill
                                            className="object-contain object-center bg-black/40 transition-transform duration-1000 lg:group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                        <div className={`absolute inset-0 bg-gradient-to-r ${village.color} opacity-20 mix-blend-overlay`}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Village Details Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                                <div className="animate-fade-in-up" key={activeVillage}>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm">
                                            {villages[activeVillage].symbol}
                                        </span>
                                        <span className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${villages[activeVillage].color} text-white font-bold text-sm shadow-lg`}>
                                            Led by {villages[activeVillage].kage}
                                        </span>
                                    </div>
                                    <p className="text-gray-200 text-lg leading-relaxed md:w-3/4 mb-6">
                                        {villages[activeVillage].description}
                                    </p>

                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className={`px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r ${villages[activeVillage].color} hover:scale-105 transition-transform duration-300 shadow-xl flex items-center space-x-2`}
                                    >
                                        <span>Learn More</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <VillageModal
                village={isModalOpen ? villages[activeVillage] : null}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default Villages;
