import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

interface HeroSectionProps {
  onExploreClick?: () => void;
  onAddSkillsClick?: () => void;
}

export function HeroSection({ onExploreClick, onAddSkillsClick }: HeroSectionProps) {
    return (
        <main className="overflow-hidden w-full relative">
            <div
                aria-hidden
                className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(250,100%,75%,.06)_0,hsla(250,100%,55%,.01)_50%,hsla(250,100%,45%,0)_80%)]" />
                <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,75%,.04)_0,hsla(160,100%,45%,.01)_80%,transparent_100%)] [translate:5%_-50%]" />
            </div>
            
            <section className="relative">
                <div className="relative pt-8 md:pt-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                            <AnimatedGroup variants={transitionVariants}>
                                <div
                                    className="hover:bg-slate-50 bg-[#6C63FF]/5 group mx-auto flex w-fit items-center gap-4 rounded-full border border-[#6C63FF]/15 p-1 pl-4 shadow-sm transition-all duration-300 select-none">
                                    <span className="text-[#6C63FF] text-xs font-semibold flex items-center gap-1">
                                        <Sparkles className="size-3.5" /> Introducing SkillSpark DNA Hub
                                    </span>
                                    <span className="block h-4 w-0.5 border-l bg-slate-300"></span>

                                    <div className="bg-[#6C63FF] text-white size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 duration-500 ease-in-out group-hover:translate-x-6">
                                            <span className="flex size-6 items-center justify-center -translate-x-6">
                                                <ArrowRight className="size-3 text-white" />
                                            </span>
                                            <span className="flex size-6 items-center justify-center -translate-x-6">
                                                <ArrowRight className="size-3 text-white" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                    
                                <h1
                                    className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-6xl lg:mt-12 xl:text-[5rem] font-extrabold text-slate-900 leading-tight">
                                    Where Student Talent Gets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#10B981]">Seen and Discovered</span>
                                </h1>
                                <p
                                    className="mx-auto mt-8 max-w-2xl text-balance text-slate-600 text-lg">
                                    Showcase your real-world skill DNA, verify LeetCode stat rings, display peer endorsements, and link your code repositories in a unified premium showcase.
                                </p>
                            </AnimatedGroup>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                                <div key={1} className="bg-[#6C63FF]/10 rounded-[14px] border border-[#6C63FF]/10 p-0.5 w-full md:w-auto">
                                    <Button
                                        onClick={onExploreClick}
                                        size="lg"
                                        className="rounded-xl px-7 text-base bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white w-full">
                                        <span className="text-nowrap font-bold">Explore Talent</span>
                                    </Button>
                                </div>
                                <Button
                                    key={2}
                                    onClick={onAddSkillsClick}
                                    size="lg"
                                    variant="ghost"
                                    className="h-11 rounded-xl px-7 text-base font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 w-full md:w-auto">
                                    <span className="text-nowrap">Add Your Skills</span>
                                </Button>
                            </AnimatedGroup>
                        </div>
                    </div>


                </div>
            </section>
            
            <section className="pb-12 pt-16 md:pb-24">
                <div className="group relative m-auto max-w-5xl px-6">
                    <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                        <button
                            onClick={onExploreClick}
                            className="block text-sm font-bold text-[#6C63FF] bg-white border border-[#6C63FF]/20 px-4 py-2 rounded-full shadow-lg duration-150 hover:bg-slate-50">
                            <span>Meet Our Top Talent</span>
                            <ChevronRight className="ml-1 inline-block size-3.5" />
                        </button>
                    </div>
                    <div className="group-hover:blur-[2px] mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 transition-all duration-500 group-hover:opacity-30 items-center justify-items-center">
                        
                        {/* NVIDIA */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 100 24">
                              <path d="M5 2c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7zm0 2c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z M5 6c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"/>
                              <text x="18" y="16" className="font-black text-[12px] tracking-widest font-sans">NVIDIA</text>
                            </svg>
                        </div>

                        {/* COLUMN */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 100 24">
                              <rect x="2" y="3" width="3" height="18" rx="0.5"/>
                              <rect x="8" y="3" width="3" height="18" rx="0.5"/>
                              <rect x="14" y="3" width="3" height="18" rx="0.5"/>
                              <text x="22" y="16" className="font-bold text-[11px] tracking-wider font-sans">COLUMN</text>
                            </svg>
                        </div>

                        {/* GITHUB */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 100 24">
                              <path d="M8 2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.2-.1-.2-.4-1.1.1-2.2 0 0 .7-.2 2.3.9.7-.2 1.4-.3 2.1-.3s1.4.1 2.1.3c1.6-1.1 2.3-.9 2.3-.9.5 1.1.2 2 .1 2.2.5.6.8 1.3.8 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.6v2.4c0 .2.1.5.5.4 3.2-1.1 5.5-4.1 5.5-7.6 0-4.4-3.6-8-8-8z"/>
                              <text x="20" y="16" className="font-extrabold text-[12px] tracking-wide font-sans">GitHub</text>
                            </svg>
                        </div>

                        {/* NIKE */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 75 24">
                              <path d="M4 13c6-2 11-5 13.5-7-.2.5-.7 1.2-1.3 1.8C13.5 10 9 13 3 14.5c-.7.2-.9.5-.4.6l2 1c.7.3 1.5.1 2.2-.4z"/>
                              <text x="22" y="16" className="font-black text-[12px] tracking-widest font-sans italic">NIKE</text>
                            </svg>
                        </div>

                        {/* LEMON SQUEEZY */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 110 24">
                              <circle cx="8" cy="11" r="5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                              <circle cx="8" cy="7.5" r="1" />
                              <text x="18" y="15" className="font-bold text-[10px] tracking-wider font-sans">LEMONSQUEEZY</text>
                            </svg>
                        </div>

                        {/* LARAVEL */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 95 24">
                              <path d="M3 13l4-7 4 7H3z"/>
                              <text x="16" y="16" className="font-black text-[12px] tracking-wider font-sans">LARAVEL</text>
                            </svg>
                        </div>

                        {/* LILLY */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 75 24">
                              <path d="M5 4c2 0 3.5 1.5 3.5 3.5S7 11 5 11s-3.5-1.5-3.5-3.5S3 4 5 4z"/>
                              <text x="14" y="16" className="font-bold text-[12px] tracking-wide font-sans italic">Lilly</text>
                            </svg>
                        </div>

                        {/* OPENAI */}
                        <div className="flex justify-center select-none">
                            <svg className="h-5 w-auto opacity-45 hover:opacity-100 duration-200 transition-opacity text-slate-500 fill-current" viewBox="0 0 90 24">
                              <circle cx="7" cy="11" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              <line x1="7" y1="6.5" x2="7" y2="15.5" stroke="currentColor" strokeWidth="1.5"/>
                              <line x1="2.5" y1="11" x2="11.5" y2="11" stroke="currentColor" strokeWidth="1.5"/>
                              <text x="16" y="15" className="font-extrabold text-[11px] tracking-widest font-sans">OPENAI</text>
                            </svg>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
