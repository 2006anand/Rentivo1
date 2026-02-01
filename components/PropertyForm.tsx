
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
    <div className="bg-white rounded-[3.5rem] shadow-2xl max-w-3xl mx-auto overflow-hidden animate-in zoom-in-95 duration-700 border border-amber-100">
      {/* Step Indicator Header */}
      <div className="bg-amber-50/50 border-b border-amber-100 px-12 py-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-[1.25rem] shadow-lg shadow-amber-200">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-stone-900 uppercase italic">LISTING ENGINE</h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 bg-white px-4 py-2 rounded-full border border-amber-100">Phase {step}/4</span>
        </div>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${step >= i ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]' : 'bg-amber-100'}`} 
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-12 py-12">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-stone-400">
                <Building2 className="w-6 h-6 text-amber-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Primary Parameters</h3>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Lease Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Modern Penthouse with Skyline View"
                  className="w-full px-8 py-5 rounded-[1.75rem] bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all font-bold text-lg text-stone-900 placeholder:text-stone-200"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Rent / Mo</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full pl-16 pr-8 py-5 rounded-[1.75rem] bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-lg text-stone-900 placeholder:text-stone-200"
                      value={formData.rent}
                      onChange={e => setFormData({...formData, rent: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Bond / Deposit</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-lg text-stone-900 placeholder:text-stone-200"
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
              <div className="flex items-center gap-4 text-stone-400">
                <MapPin className="w-6 h-6 text-amber-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Geo Verification</h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Market</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-amber-50/20 border-2 border-amber-100 outline-none font-bold text-stone-700 appearance-none"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Region / State</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-amber-50/20 border-2 border-amber-100 outline-none font-bold text-stone-700"
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
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">City District</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-amber-50/20 border-2 border-amber-100 outline-none font-bold text-stone-700 disabled:opacity-30"
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
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Local Area</label>
                  <select 
                    className="w-full px-8 py-5 rounded-[1.75rem] bg-amber-50/20 border-2 border-amber-100 outline-none font-bold text-stone-700 disabled:opacity-30"
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

              <div className="p-10 bg-amber-50 rounded-[2.5rem] flex items-center justify-between border border-amber-100">
                <div className="flex items-center gap-6">
                  <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-md">
                    <MapIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-stone-900 text-lg tracking-tight leading-none uppercase italic">Geo-Precision</p>
                    <p className="text-[10px] font-bold text-stone-400 mt-2 uppercase tracking-widest">Awaiting spatial data...</p>
                  </div>
                </div>
                <button type="button" className="px-6 py-3 bg-white text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-amber-100 hover:bg-amber-500 hover:text-white transition-all">Map Drop</button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-stone-400">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Filter Logic</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Fitment</label>
                  <select 
                    className="w-full px-6 py-4 bg-amber-50/30 rounded-[1.5rem] border border-amber-100 font-bold text-stone-700 outline-none focus:border-amber-400 transition-colors"
                    value={formData.furnishing}
                    onChange={e => setFormData({...formData, furnishing: e.target.value as FurnishingType})}
                  >
                    {Object.values(FurnishingType).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Cohort</label>
                  <select 
                    className="w-full px-6 py-4 bg-amber-50/30 rounded-[1.5rem] border border-amber-100 font-bold text-stone-700 outline-none focus:border-amber-400 transition-colors"
                    value={formData.tenantType}
                    onChange={e => setFormData({...formData, tenantType: e.target.value as TenantPreference})}
                  >
                    {Object.values(TenantPreference).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Cuisine Policy</label>
                  <select 
                    className="w-full px-6 py-4 bg-amber-50/30 rounded-[1.5rem] border border-amber-100 font-bold text-stone-700 outline-none focus:border-amber-400 transition-colors"
                    value={formData.foodPreference}
                    onChange={e => setFormData({...formData, foodPreference: e.target.value as FoodPreference})}
                  >
                    {Object.values(FoodPreference).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Asset Features</label>
                <div className="flex flex-wrap gap-3">
                  {FACILITIES_LIST.map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => handleFacilityToggle(f)}
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        formData.facilities.includes(f) 
                          ? 'bg-amber-500 border-amber-500 text-white shadow-md scale-105' 
                          : 'bg-white border-amber-100 text-stone-400 hover:border-amber-200 hover:text-stone-600'
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
              <div className="flex items-center gap-4 text-stone-400">
                <Layout className="w-6 h-6 text-amber-500" />
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px]">Asset Vision</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1 px-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Neural Narration</label>
                  <button 
                    type="button" 
                    onClick={handleAiDescription}
                    disabled={loading || !formData.title}
                    className="flex items-center gap-2 text-[10px] font-black text-amber-600 hover:text-amber-700 disabled:opacity-30 transition-all uppercase tracking-widest group"
                  >
                    <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    {loading ? 'Processing...' : 'Generate with Gemini'}
                  </button>
                </div>
                <textarea 
                  rows={6}
                  className="w-full px-8 py-6 rounded-[2.5rem] bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none font-medium text-stone-700 resize-none shadow-sm"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="The narrative of your space..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Asset Imagery</label>
                <div className="grid grid-cols-4 gap-6">
                  <button type="button" className="aspect-square rounded-[2rem] border-2 border-dashed border-amber-100 flex flex-col items-center justify-center text-stone-400 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 transition-all group">
                    <Camera className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Capture</span>
                  </button>
                  <div className="aspect-square rounded-[2rem] bg-amber-50 overflow-hidden relative border border-amber-100">
                    <img src="https://picsum.photos/seed/newprop/300" className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute top-3 right-3 bg-amber-500 text-white p-1.5 rounded-full shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 flex items-center justify-between pt-10 border-t border-amber-50">
          <button 
            type="button" 
            onClick={onCancel}
            className="text-[10px] font-black text-stone-400 hover:text-stone-600 uppercase tracking-[0.4em] px-6 transition-colors"
          >
            Abort
          </button>
          
          <div className="flex gap-6">
            {step > 1 && (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-10 py-5 rounded-2xl border border-amber-100 text-stone-500 font-black text-[10px] uppercase tracking-widest hover:bg-amber-50 transition-all flex items-center gap-3"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}
            {step < 4 ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="px-12 py-5 bg-amber-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-600 shadow-md transition-all flex items-center gap-3 group active:scale-95"
              >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                type="submit"
                className="px-14 py-5 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-stone-800 shadow-lg transition-all active:scale-95"
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
