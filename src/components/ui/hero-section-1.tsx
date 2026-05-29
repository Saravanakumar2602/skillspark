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
                        }}>
                        <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-16">
                            <div
                                aria-hidden
                                className="bg-gradient-to-b to-transparent absolute inset-0 z-10 from-transparent"
                            />
                            <div className="inset-shadow-2xs bg-white relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 p-3 shadow-2xl ring-1 ring-slate-100">
                                {/* Dashboard Screenshot */}
                                <img
                                    className="aspect-[16/9] w-full rounded-xl object-cover border border-slate-100 shadow-sm"
                                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&auto=format&fit=crop&q=80"
                                    alt="SkillSpark Dashboard Showcase"
                                    width="2700"
                                    height="1440"
                                />
                            </div>
                        </div>
                    </AnimatedGroup>
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
                    <div className="group-hover:blur-[2px] mx-auto grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-40 sm:grid-cols-8 sm:gap-x-10 sm:gap-y-6 items-center">
                        {[
                            { name: 'Nvidia', url: 'https://html.tailus.io/blocks/customers/nvidia.svg' },
                            { name: 'Column', url: 'https://html.tailus.io/blocks/customers/column.svg' },
                            { name: 'GitHub', url: 'https://html.tailus.io/blocks/customers/github.svg' },
                            { name: 'Nike', url: 'https://html.tailus.io/blocks/customers/nike.svg' },
                            { name: 'Lemon Squeezy', url: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg' },
                            { name: 'Laravel', url: 'https://html.tailus.io/blocks/customers/laravel.svg' },
                            { name: 'Lilly', url: 'https://html.tailus.io/blocks/customers/lilly.svg' },
                            { name: 'OpenAI', url: 'https://html.tailus.io/blocks/customers/openai.svg' },
                        ].map((customer, idx) => (
                            <div key={idx} className="flex justify-center">
                                <img
                                    className="h-5 md:h-6 w-auto opacity-40 hover:opacity-100 duration-150 transition-opacity grayscale"
                                    src={customer.url}
                                    alt={`${customer.name} Logo`}
                                    height="24"
                                    width="auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
