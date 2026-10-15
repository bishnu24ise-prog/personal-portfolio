"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  X,
  ChevronUp,
  ChevronDown,
  MessageSquareText,
  Bot,
  Zap,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio";

export const VOICE_INTRO_TEXT =
  "Hello and welcome! I am Bishnu Kumar Sardar's AI voice guide. Bishnu is a Full-Stack MERN developer, AI systems engineer, and UI/UX designer based in Bangalore, currently studying Information Science at Cambridge Institute of Technology with an 8.8 CGPA. He is a hackathon champion who builds real-world AI products across accessibility, agriculture, and 3D graphics, including UnifyTalk, CropIQ, and DevMap. Feel free to explore his featured case studies, verified certificates, and personal builder moments. He is currently open for Summer 2026 software engineering and AI internships. Enjoy your tour!";

export default function VoiceAgent() {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [spokenProgress, setSpokenProgress] = useState(0); // 0 to 100
  const [autoPromptVisible, setAutoPromptVisible] = useState(true);
  const [currentWord, setCurrentWord] = useState<string>("");

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check browser speech synthesis support and load voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      // Listen for custom trigger from Hero button or other components
      const handleCustomPlay = () => {
        playSpeech();
      };
      window.addEventListener("play-portfolio-voice-intro", handleCustomPlay);

      // Check if user previously muted/dismissed in session
      const previouslyDismissed = sessionStorage.getItem("voice_agent_dismissed");
      if (previouslyDismissed === "true") {
        setAutoPromptVisible(false);
        setIsMinimized(true);
      } else {
        // Attempt automatic initiation after 1.8 seconds on first interaction
        const timer = setTimeout(() => {
          // Attempt gentle speech initiation if permitted
          tryAutoplay();
        }, 1800);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("play-portfolio-voice-intro", handleCustomPlay);
        };
      }

      return () => {
        window.removeEventListener("play-portfolio-voice-intro", handleCustomPlay);
      };
    }
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  const getBestVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prefer high-quality English voices
    const preferredNames = [
      "Google US English",
      "Microsoft Guy Online",
      "Microsoft Jenny Online",
      "Samantha",
      "Daniel",
      "Alex",
      "Karen",
    ];

    for (const name of preferredNames) {
      const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith("en"));
      if (match) return match;
    }

    const enVoice = voices.find((v) => v.lang.startsWith("en"));
    return enVoice || voices[0] || null;
  };

  const tryAutoplay = () => {
    // Browsers often require one user gesture before allowing audio playback.
    // We register a one-shot document listener to start speech seamlessly on user's first touch/click/scroll!
    const startOnFirstGesture = () => {
      document.removeEventListener("click", startOnFirstGesture);
      document.removeEventListener("keydown", startOnFirstGesture);
      document.removeEventListener("scroll", startOnFirstGesture);
      
      const alreadyPlayed = sessionStorage.getItem("voice_agent_played");
      if (!alreadyPlayed && !hasStarted) {
        playSpeech();
      }
    };

    document.addEventListener("click", startOnFirstGesture, { once: true });
    document.addEventListener("keydown", startOnFirstGesture, { once: true });
    document.addEventListener("scroll", startOnFirstGesture, { once: true, passive: true });
  };

  const playSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // Reset any previous queue

    const utterance = new SpeechSynthesisUtterance(VOICE_INTRO_TEXT);
    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voice = getBestVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setHasStarted(true);
      setAutoPromptVisible(false);
      sessionStorage.setItem("voice_agent_played", "true");
    };

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const charIndex = event.charIndex;
        const remaining = VOICE_INTRO_TEXT.slice(charIndex);
        const match = remaining.match(/^\S+/);
        if (match) {
          setCurrentWord(match[0]);
        }
        const pct = Math.min(100, Math.round((charIndex / VOICE_INTRO_TEXT.length) * 100));
        setSpokenProgress(pct);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setSpokenProgress(100);
      setCurrentWord("");
    };

    utterance.onerror = (e) => {
      // Speech errors or cancel
      if (e.error !== "interrupted" && e.error !== "canceled") {
        console.warn("Speech synthesis notice:", e);
      }
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setHasStarted(true);
  };

  const pauseSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const resumeSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      playSpeech();
    }
  };

  const stopAndReplay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpokenProgress(0);
    playSpeech();
  };

  const stopSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setSpokenProgress(0);
    setCurrentWord("");
  };

  const toggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 1.25 : speed === 1.25 ? 1.5 : 1.0;
    setSpeed(nextSpeed);
    if (isPlaying) {
      // Re-trigger with new rate
      stopAndReplay();
    }
  };

  const handleDismiss = () => {
    stopSpeech();
    setIsMinimized(true);
    setAutoPromptVisible(false);
    sessionStorage.setItem("voice_agent_dismissed", "true");
  };

  if (!isSupported) return null;

  return (
    <>
      {/* 1. First-Visit Floating Prompt Toast (If not started yet and not dismissed) */}
      {autoPromptVisible && !hasStarted && !isMinimized && (
        <div className="fixed bottom-24 right-5 sm:right-8 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="glass-panel p-4 rounded-2xl border border-[var(--accent-cyan)]/40 shadow-2xl shadow-[var(--accent-cyan)]/15 bg-gradient-to-br from-[#0c121e]/95 via-[#090d16]/95 to-[#0b101c]/95 backdrop-blur-xl relative">
            <button
              onClick={handleDismiss}
              className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close welcome prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3 pr-4">
              <div className="p-2.5 rounded-xl bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] shrink-0 animate-pulse">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
                    Interactive AI Voice Guide
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-snug">
                  Welcome to Bishnu&apos;s portfolio! Would you like a 30-second audio introduction?
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={playSpeech}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-[#090C12] bg-[var(--accent-cyan)] hover:brightness-110 shadow-md shadow-[var(--accent-cyan)]/25 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Intro (30s)</span>
                  </button>

                  <button
                    onClick={() => {
                      setAutoPromptVisible(false);
                      setIsMinimized(true);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono text-[var(--text-muted)] hover:text-white transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Live Subtitles Banner (Appears when audio is playing and subtitles are enabled) */}
      {isPlaying && showSubtitles && !isMinimized && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="glass-panel px-5 py-3 rounded-2xl border border-[var(--accent-cyan)]/30 bg-[#090C14]/90 backdrop-blur-xl shadow-2xl text-center">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-ping" />
                <span className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-wider font-semibold">
                  Live Voice Transcript
                </span>
              </div>
              <button
                onClick={() => setShowSubtitles(false)}
                className="text-[10px] font-mono text-slate-400 hover:text-white"
              >
                Hide
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed line-clamp-2">
              &ldquo;{VOICE_INTRO_TEXT}&rdquo;
            </p>
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)] transition-all duration-300"
                style={{ width: `${spokenProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Voice Agent Dock (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-5 sm:right-8 z-50">
        {isMinimized ? (
          /* Minimized Compact Orb Trigger */
          <button
            onClick={() => {
              setIsMinimized(false);
              setAutoPromptVisible(false);
              if (!isPlaying && !isPaused) {
                playSpeech();
              }
            }}
            className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel border border-[var(--accent-cyan)]/40 hover:border-[var(--accent-cyan)] shadow-xl shadow-[var(--accent-cyan)]/20 hover:scale-105 transition-all duration-300 bg-[#090C14]/90 backdrop-blur-xl cursor-pointer"
            aria-label="Open AI Voice Guide"
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              {isPlaying && (
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
              )}
            </div>

            <Bot className="w-4 h-4 text-[var(--accent-cyan)]" />

            <span className="text-xs font-mono font-semibold text-slate-200">
              {isPlaying ? "AI Speaking..." : "AI Voice Guide"}
            </span>

            {/* Audio equalizing bars icon */}
            <div className="flex items-center gap-0.5 h-3 ml-1">
              <span
                className={`w-0.5 bg-[var(--accent-cyan)] rounded-full ${
                  isPlaying ? "animate-[sound-wave-1_0.8s_ease-in-out_infinite]" : "h-1.5"
                }`}
              />
              <span
                className={`w-0.5 bg-[var(--accent-cyan)] rounded-full ${
                  isPlaying ? "animate-[sound-wave-2_0.8s_ease-in-out_infinite]" : "h-3"
                }`}
              />
              <span
                className={`w-0.5 bg-[var(--accent-cyan)] rounded-full ${
                  isPlaying ? "animate-[sound-wave-3_0.8s_ease-in-out_infinite]" : "h-2"
                }`}
              />
            </div>
          </button>
        ) : (
          /* Expanded Full Control Dock */
          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-[var(--border-card-hover)] shadow-2xl shadow-black/60 bg-[#090C14]/95 backdrop-blur-xl w-80 sm:w-88 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Top Row: Title, Status, Minimize */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <div className="relative p-1.5 rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-white tracking-wide">
                      AI Voice Guide
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-[var(--accent-cyan)]">
                      Bishnu
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPlaying ? "bg-emerald-400 animate-pulse" : "bg-slate-400"
                      }`}
                    />
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {isPlaying ? "Speaking intro..." : isPaused ? "Paused" : "Ready"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize widget"
                  aria-label="Minimize AI Voice Guide"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close AI Voice Guide"
                  aria-label="Close AI Voice Guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Row: Animated Sound Wave Equalizer */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/5 mb-3">
              <div className="flex items-center gap-1 h-5">
                <span
                  className={`w-1 bg-[var(--accent-cyan)] rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-[sound-wave-1_0.7s_ease-in-out_infinite]" : "h-2"
                  }`}
                />
                <span
                  className={`w-1 bg-[var(--accent-cyan)] rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-[sound-wave-2_0.6s_ease-in-out_infinite]" : "h-4"
                  }`}
                />
                <span
                  className={`w-1 bg-[var(--accent-violet)] rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-[sound-wave-3_0.8s_ease-in-out_infinite]" : "h-3"
                  }`}
                />
                <span
                  className={`w-1 bg-[var(--accent-violet)] rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-[sound-wave-4_0.65s_ease-in-out_infinite]" : "h-5"
                  }`}
                />
                <span
                  className={`w-1 bg-[var(--accent-cyan)] rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-[sound-wave-1_0.75s_ease-in-out_infinite]" : "h-2"
                  }`}
                />
              </div>

              <span className="text-[11px] font-mono text-slate-300 truncate max-w-[170px]">
                {currentWord ? `"${currentWord}"` : "30s Overview Tour"}
              </span>

              {/* Speed toggle */}
              <button
                onClick={toggleSpeed}
                className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/10 hover:bg-white/20 text-[var(--accent-cyan)] border border-white/10 transition-colors"
                title="Toggle playback speed"
              >
                {speed}x
              </button>
            </div>

            {/* Bottom Row: Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                {isPlaying ? (
                  <button
                    onClick={pauseSpeech}
                    className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors cursor-pointer"
                    title="Pause voice intro"
                    aria-label="Pause"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                  </button>
                ) : isPaused ? (
                  <button
                    onClick={resumeSpeech}
                    className="p-2 rounded-xl bg-[var(--accent-cyan)] text-[#090C12] hover:brightness-110 shadow-md shadow-[var(--accent-cyan)]/25 transition-all cursor-pointer"
                    title="Resume voice intro"
                    aria-label="Resume"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={playSpeech}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold text-[#090C12] bg-[var(--accent-cyan)] hover:brightness-110 shadow-md shadow-[var(--accent-cyan)]/25 transition-all cursor-pointer"
                    title="Start voice introduction"
                    aria-label="Play Introduction"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Intro</span>
                  </button>
                )}

                <button
                  onClick={stopAndReplay}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Replay from start"
                  aria-label="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subtitles Toggle Button */}
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-colors cursor-pointer ${
                  showSubtitles
                    ? "bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30"
                    : "bg-white/5 text-[var(--text-muted)] hover:text-white border border-white/5"
                }`}
                title="Toggle subtitles banner"
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>CC</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
