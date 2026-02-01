
import React, { useState } from 'react';
import { Camera, MapPin, Check, ChevronRight, ChevronLeft, Sparkles, Building2, IndianRupee, Layout, Map as MapIcon, ShieldCheck, Zap } from 'lucide-react';
import { COUNTRIES, INDIA_STATES, STATE_DISTRICTS, DISTRICT_AREAS, FACILITIES_LIST } from '../constants';
import { FurnishingType, TenantPreference, FoodPreference } from '../types';
import { generatePropertyDescription } from '../geminiService';
import { playUISound } from './SoundFeedback';

interface PropertyFormProps {
  onSubmit: (propertyData: any) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rent: '',
    deposit: '',
    country: 'India',
    state: '',
    district: '',
    city: '',
    area: '',
    address: '',
    furnishing: FurnishingType.UNFURNISHED,
    tenantType: TenantPreference.BOTH,
    foodPreference: FoodPreference.NON_VEG,
    facilities: [] as string[],
    photos: [] as string[]
  });

  const nextStep = () => {
    playUISound('tap');
    setStep(prev => prev + 1);
  };
  const prevStep = () => {
    playUISound('pop');
    setStep(prev => prev - 1);
  };

  const handleFacilityToggle = (facility: string) => {
    playUISound('tap');
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleAiDescription = async () => {
    if (!formData.title || !formData.city) return;
    setLoading(true);
    playUISound('tap');
    const desc = await generatePropertyDescription({
      title: formData.title,
      rent: Number(formData.rent),
      location: `${formData.city}, ${formData.state}`,
      facilities: formData.facilities
    });
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
    playUISound('success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUISound('success');
    onSubmit(formData);
  };

  return (
    <div className="bg-zinc-950 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,1)] max-w-3xl mx-auto overflow-hidden animate-in zoom-in-95 duration-700 border border-zinc-900">
      {/* Step Indicator Header */}
      <div className="bg-black/40 border-b border-zinc-900 px-12 py-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-[1.25rem] shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">LISTING ENGINE</h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 bg-white/5 px-4 py-2 rounded-full border border-zinc-800">Phase {step}/4</span>
        </div>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${step >= i ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'bg-zinc-900'}`} 
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-12 py-12">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-600">
                <Building2 className="w-6 h-6 text-blue-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Primary Parameters</h3>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Lease Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Modern Penthouse with Skyline View"
                  className="w-full px-8 py-5 rounded-[1.75rem] bg-zinc-900 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-lg text-white placeholder:text-zinc-800"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Rent / Mo</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full pl-16 pr-8 py-5 rounded-[1.75rem] bg-zinc-900 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none transition-all font-bold text-lg text-white placeholder:text-zinc-800"
                      value={formData.rent}
                      onChange={e => setFormData({...formData, rent: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Bond / Deposit</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-zinc-900 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none transition-all font-bold text-lg text-white placeholder:text-zinc-800"
                    value={formData.deposit}
                    onChange={e => setFormData({...formData, deposit: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-600">
                <MapPin className="w-6 h-6 text-blue-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Geo Verification</h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Market</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-zinc-900 border-2 border-zinc-800 outline-none font-bold text-zinc-300 appearance-none"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Region / State</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-zinc-900 border-2 border-zinc-800 outline-none font-bold text-zinc-300"
                    value={formData.state}
                    onChange={e => setFormData({...formData, state: e.target.value, district: '', city: ''})}
                    required
                  >
                    <option value="">Select Region</option>
                    {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">City District</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-zinc-900 border-2 border-zinc-800 outline-none font-bold text-zinc-300 disabled:opacity-30"
                    value={formData.district}
                    onChange={e => setFormData({...formData, district: e.target.value, city: ''})}
                    required
                    disabled={!formData.state}
                  >
                    <option value="">Select District</option>
                    {formData.state && STATE_DISTRICTS[formData.state]?.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Local Area</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-zinc-900 border-2 border-zinc-800 outline-none font-bold text-zinc-300 disabled:opacity-30"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    required
                    disabled={!formData.district}
                  >
                    <option value="">Select Area</option>
                    {formData.district && DISTRICT_AREAS[formData.district]?.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              </div>

              <div className="p-10 bg-blue-600/5 rounded-[2.5rem] flex items-center justify-between border border-blue-600/10 shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
                    <MapIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg tracking-tight leading-none uppercase italic">Geo-Precision</p>
                    <p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase tracking-widest">Awaiting spatial data...</p>
                  </div>
                </div>
                <button type="button" className="px-6 py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 hover:text-white transition-all">Map Drop</button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-600">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Filter Logic</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Fitment</label>
                  <select 
                    className="w-full px-6 py-4 bg-zinc-900 rounded-[1.5rem] border border-zinc-800 font-bold text-zinc-300 outline-none focus:border-blue-600 transition-colors"
                    value={formData.furnishing}
                    onChange={e => setFormData({...formData, furnishing: e.target.value as FurnishingType})}
                  >
                    {Object.values(FurnishingType).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Cohort</label>
                  <select 
                    className="w-full px-6 py-4 bg-zinc-900 rounded-[1.5rem] border border-zinc-800 font-bold text-zinc-300 outline-none focus:border-blue-600 transition-colors"
                    value={formData.tenantType}
                    onChange={e => setFormData({...formData, tenantType: e.target.value as TenantPreference})}
                  >
                    {Object.values(TenantPreference).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Cuisine Policy</label>
                  <select 
                    className="w-full px-6 py-4 bg-zinc-900 rounded-[1.5rem] border border-zinc-800 font-bold text-zinc-300 outline-none focus:border-blue-600 transition-colors"
                    value={formData.foodPreference}
                    onChange={e => setFormData({...formData, foodPreference: e.target.value as FoodPreference})}
                  >
                    {Object.values(FoodPreference).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Asset Features</label>
                <div className="flex flex-wrap gap-3">
                  {FACILITIES_LIST.map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => handleFacilityToggle(f)}
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        formData.facilities.includes(f) 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-900/30 scale-105' 
                          : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-600">
                <Layout className="w-6 h-6 text-blue-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Asset Vision</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1 px-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Neural Narration</label>
                  <button 
                    type="button" 
                    onClick={handleAiDescription}
                    disabled={loading || !formData.title}
                    className="flex items-center gap-2 text-[10px] font-black text-blue-500 hover:text-blue-400 disabled:opacity-20 transition-all uppercase tracking-widest group"
                  >
                    <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    {loading ? 'Processing...' : 'Generate with Gemini'}
                  </button>
                </div>
                <textarea 
                  rows={6}
                  className="w-full px-8 py-6 rounded-[2.5rem] bg-zinc-900 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none font-medium text-zinc-200 resize-none shadow-2xl"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="The narrative of your space..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Asset Imagery</label>
                <div className="grid grid-cols-4 gap-6">
                  <button type="button" className="aspect-square rounded-[2rem] border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 hover:border-blue-600 hover:bg-blue-600/5 hover:text-blue-500 transition-all group shadow-xl">
                    <Camera className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Capture</span>
                  </button>
                  <div className="aspect-square rounded-[2rem] bg-zinc-900 overflow-hidden relative shadow-2xl border border-zinc-800">
                    <img src="https://picsum.photos/seed/newprop/300" className="w-full h-full object-cover grayscale-[0.5]" alt="Preview" />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full shadow-2xl border border-white/20">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 flex items-center justify-between pt-10 border-t border-zinc-900">
          <button 
            type="button" 
            onClick={onCancel}
            className="text-[10px] font-black text-zinc-700 hover:text-zinc-500 uppercase tracking-[0.4em] px-6 transition-colors"
          >
            Abort
          </button>
          
          <div className="flex gap-6">
            {step > 1 && (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-10 py-5 rounded-2xl border border-zinc-800 text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-3"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}
            {step < 4 ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all flex items-center gap-3 group active:scale-95 shadow-xl"
              >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                type="submit"
                className="px-14 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-200 hover:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-all active:scale-95 shadow-2xl"
              >
                Launch Listing
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
