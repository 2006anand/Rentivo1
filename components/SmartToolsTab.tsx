
import React, { useState } from 'react';
import { Sparkles, FileText, Image as ImageIcon, Upload, Loader2, Wand2, Monitor, Smartphone, Maximize, ArrowRight, Zap } from 'lucide-react';
import { analyzeDocument, generateCustomBanner } from '../geminiService';
import { playUISound } from './SoundFeedback';

const SmartToolsTab: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "4:3" | "16:9" | "9:16">("16:9");
  const [bannerPrompt, setBannerPrompt] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    playUISound('tap');
    setAnalyzing(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const result = await analyzeDocument(base64, file.type);
      setAnalysisResult(result);
      setAnalyzing(false);
      playUISound('success');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateBanner = async () => {
    if (!bannerPrompt) return;
    playUISound('tap');
    setGenerating(true);
    const url = await generateCustomBanner(bannerPrompt, aspectRatio);
    setBannerUrl(url);
    setGenerating(false);
    if (url) playUISound('success');
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 space-y-20 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-zinc-900 pb-16 relative">
        <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full -z-10"></div>
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-blue-500/20">
            <Zap className="w-4 h-4" /> Neural Infrastructure
          </div>
          <h2 className="text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">Intelligent <span className="text-blue-500">Living.</span></h2>
          <p className="text-xl text-zinc-500 font-medium max-w-xl">Harness multi-modal AI for hyper-accurate document verification and professional asset creation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Document Scanner */}
        <div className="group bg-zinc-900/40 rounded-[3.5rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-zinc-800/50 flex flex-col hover:bg-zinc-900/60 hover:border-blue-600/20 transition-all duration-700 backdrop-blur-3xl">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-10 shadow-[0_20px_50px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform group-hover:rotate-3">
            <FileText className="text-white w-10 h-10" />
          </div>
          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">Spatial Analyzer</h3>
          <p className="text-zinc-500 mb-12 font-medium leading-relaxed">Verifying rent receipts, legal utility data, and maintenance records with neural precision.</p>
          
          <div className="flex-1 space-y-8">
            <label className="group/drop relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-800 rounded-[3rem] hover:border-blue-600 hover:bg-blue-600/5 transition-all cursor-pointer overflow-hidden shadow-inner">
              <div className="flex flex-col items-center transition-all group-hover/drop:scale-105 duration-500">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 group-hover/drop:bg-blue-600 group-hover/drop:text-white transition-colors border border-zinc-800">
                  <Upload className="w-7 h-7 text-zinc-600 group-hover/drop:text-white" />
                </div>
                <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Transmit Encrypted Data</span>
                <span className="text-[10px] text-zinc-600 mt-2 uppercase tracking-widest opacity-60">PDF, JPG, PNG Supported</span>
              </div>
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
            </label>

            {analyzing && (
              <div className="p-8 bg-black rounded-[2rem] flex items-center justify-center gap-6 border border-zinc-800 animate-pulse">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30"></div>
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin relative" />
                </div>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Neural computation in progress...</span>
              </div>
            )}

            {analysisResult && (
              <div className="p-10 bg-blue-600/5 rounded-[3rem] border border-blue-600/10 animate-in zoom-in-95 duration-700 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-black text-blue-500 text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                    <Sparkles className="w-4 h-4" /> Gemini Output
                  </h4>
                  <button onClick={() => setAnalysisResult(null)} className="text-[10px] font-black text-zinc-700 hover:text-white uppercase tracking-widest transition-colors">Wipe</button>
                </div>
                <div className="text-lg text-zinc-300 whitespace-pre-line leading-relaxed font-medium italic border-l-2 border-blue-600/30 pl-6">
                  {analysisResult}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banner Generator */}
        <div className="group bg-black rounded-[3.5rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex flex-col hover:shadow-[0_40px_100px_rgba(37,99,235,0.1)] transition-all duration-700 border border-zinc-900 backdrop-blur-3xl">
          <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] flex items-center justify-center mb-10 border border-zinc-800 group-hover:scale-110 transition-transform shadow-2xl group-hover:-rotate-3">
            <ImageIcon className="text-blue-500 w-10 h-10" />
          </div>
          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">Asset Visualizer</h3>
          <p className="text-zinc-500 mb-12 font-medium leading-relaxed">Generate cinematic architectural marketing assets with Gemini 2.5 Flash-Image.</p>
          
          <div className="space-y-10">
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "16:9", icon: <Monitor className="w-4 h-4" />, label: "Web Cinematic" },
                { id: "9:16", icon: <Smartphone className="w-4 h-4" />, label: "Mobile Feed" },
                { id: "1:1", icon: <Maximize className="w-4 h-4" />, label: "Post Canvas" }
              ].map((ratio) => (
                <button
                  key={ratio.id}
                  onClick={() => { playUISound('tap'); setAspectRatio(ratio.id as any); }}
                  className={`flex flex-col items-center gap-3 p-5 rounded-[1.75rem] border-2 transition-all active:scale-95 ${
                    aspectRatio === ratio.id 
                      ? "bg-blue-600 border-blue-600 text-white shadow-[0_15px_40px_rgba(37,99,235,0.4)] scale-105" 
                      : "bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:bg-zinc-800"
                  }`}
                >
                  {ratio.icon}
                  <span className="text-[9px] font-black uppercase tracking-widest">{ratio.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="relative group/input">
                <input 
                  type="text" 
                  placeholder="The design philosophy (e.g. brutalist interior, dusk lighting)"
                  className="w-full px-10 py-7 rounded-[2.5rem] bg-zinc-900 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-lg text-white placeholder:text-zinc-800 shadow-inner"
                  value={bannerPrompt}
                  onChange={(e) => setBannerPrompt(e.target.value)}
                />
                <button 
                  onClick={handleGenerateBanner}
                  disabled={generating || !bannerPrompt}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white text-black rounded-3xl font-black hover:scale-110 active:scale-90 transition-all disabled:opacity-10 shadow-2xl"
                >
                  {generating ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {bannerUrl ? (
              <div className="relative group/img rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-zinc-800 animate-in zoom-in-95 duration-1000">
                <img src={bannerUrl} alt="Generated Banner" className="w-full h-auto grayscale-[0.2] group-hover/img:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-500 flex items-end p-10 backdrop-blur-[2px]">
                  <button className="px-10 py-4 bg-white text-black rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl">Extract Asset</button>
                </div>
              </div>
            ) : (
              <div className="h-48 rounded-[3rem] bg-zinc-900 border-2 border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 font-black uppercase tracking-[0.4em] text-xs italic opacity-40">
                Latent Preview Zone
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartToolsTab;
