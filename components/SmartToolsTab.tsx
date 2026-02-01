
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-amber-100 pb-16 relative">
        <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-amber-400/5 blur-[100px] rounded-full -z-10"></div>
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-amber-100">
            <Zap className="w-4 h-4" /> Neural Infrastructure
          </div>
          <h2 className="text-7xl font-black text-stone-900 tracking-tighter leading-[0.85] uppercase italic">Intelligent <span className="text-amber-500">Living.</span></h2>
          <p className="text-xl text-stone-500 font-medium max-w-xl">Harness multi-modal AI for hyper-accurate document verification and professional asset creation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Document Scanner */}
        <div className="group bg-white rounded-[3.5rem] p-12 shadow-sm border border-amber-100/60 flex flex-col hover:border-amber-400/50 transition-all duration-700 backdrop-blur-3xl">
          <div className="w-20 h-20 bg-amber-500 rounded-[2rem] flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform group-hover:rotate-3">
            <FileText className="text-white w-10 h-10" />
          </div>
          <h3 className="text-3xl font-black text-stone-900 mb-4 tracking-tighter uppercase italic">Spatial Analyzer</h3>
          <p className="text-stone-500 mb-12 font-medium leading-relaxed">Verifying rent receipts, legal utility data, and maintenance records with neural precision.</p>
          
          <div className="flex-1 space-y-8">
            <label className="group/drop relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-amber-100 rounded-[3rem] hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer overflow-hidden shadow-inner">
              <div className="flex flex-col items-center transition-all group-hover/drop:scale-105 duration-500">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 group-hover/drop:bg-amber-500 group-hover/drop:text-white transition-colors border border-amber-50 shadow-sm">
                  <Upload className="w-7 h-7 text-stone-400 group-hover/drop:text-white" />
                </div>
                <span className="text-xs font-black text-stone-400 uppercase tracking-widest">Transmit Encrypted Data</span>
                <span className="text-[10px] text-stone-300 mt-2 uppercase tracking-widest opacity-60">PDF, JPG, PNG Supported</span>
              </div>
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
            </label>

            {analyzing && (
              <div className="p-8 bg-amber-50 rounded-[2rem] flex items-center justify-center gap-6 border border-amber-100 animate-pulse">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-30"></div>
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin relative" />
                </div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em]">Neural computation in progress...</span>
              </div>
            )}

            {analysisResult && (
              <div className="p-10 bg-amber-50/50 rounded-[3rem] border border-amber-100 animate-in zoom-in-95 duration-700 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-black text-amber-600 text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                    <Sparkles className="w-4 h-4" /> Gemini Output
                  </h4>
                  <button onClick={() => setAnalysisResult(null)} className="text-[10px] font-black text-stone-400 hover:text-stone-900 uppercase tracking-widest transition-colors">Wipe</button>
                </div>
                <div className="text-lg text-stone-600 whitespace-pre-line leading-relaxed font-medium italic border-l-2 border-amber-300/50 pl-6">
                  {analysisResult}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banner Generator */}
        <div className="group bg-[#FFFDF0] rounded-[3.5rem] p-12 shadow-sm flex flex-col hover:shadow-xl transition-all duration-700 border border-amber-100 backdrop-blur-3xl">
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-10 border border-amber-50 group-hover:scale-110 transition-transform shadow-md group-hover:-rotate-3">
            <ImageIcon className="text-amber-500 w-10 h-10" />
          </div>
          <h3 className="text-3xl font-black text-stone-900 mb-4 tracking-tighter uppercase italic">Asset Visualizer</h3>
          <p className="text-stone-500 mb-12 font-medium leading-relaxed">Generate cinematic architectural marketing assets with Gemini 2.5 Flash-Image.</p>
          
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
                      ? "bg-stone-900 border-stone-900 text-white shadow-xl scale-105" 
                      : "bg-white border-amber-100 text-stone-400 hover:border-amber-300 hover:bg-amber-50"
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
                  className="w-full px-10 py-7 rounded-[2.5rem] bg-white border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all font-bold text-lg text-stone-800 placeholder:text-stone-200"
                  value={bannerPrompt}
                  onChange={(e) => setBannerPrompt(e.target.value)}
                />
                <button 
                  onClick={handleGenerateBanner}
                  disabled={generating || !bannerPrompt}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-amber-500 text-white rounded-3xl font-black hover:scale-110 active:scale-90 transition-all disabled:opacity-20 shadow-md"
                >
                  {generating ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {bannerUrl ? (
              <div className="relative group/img rounded-[3rem] overflow-hidden shadow-lg border border-amber-50 animate-in zoom-in-95 duration-1000">
                <img src={bannerUrl} alt="Generated Banner" className="w-full h-auto group-hover/img:scale-[1.02] transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-500 flex items-end p-10 backdrop-blur-[1px]">
                  <button className="px-10 py-4 bg-white text-stone-900 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-amber-50 transition-colors shadow-lg">Extract Asset</button>
                </div>
              </div>
            ) : (
              <div className="h-48 rounded-[3rem] bg-white border-2 border-dashed border-amber-100 flex items-center justify-center text-stone-300 font-black uppercase tracking-[0.4em] text-xs italic opacity-40 shadow-inner">
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
