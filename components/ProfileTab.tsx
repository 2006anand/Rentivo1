
import React, { useState, useRef } from 'react';
import { Camera, Calendar, Clock, Star, Building2, Mail, Phone, Info, Check, X, Crop, Upload, Wand2, MessageSquare, ShieldCheck, ArrowUpRight, User as UserIcon, LogOut, ChevronLeft, ChevronRight, Zap, FileText } from 'lucide-react';
import { User as UserType, Inquiry } from '../types';
import { playUISound } from './SoundFeedback';

interface ProfileTabProps {
  user: UserType;
  inquiries: Inquiry[];
  onUpdate: (updatedUser: Partial<UserType>) => void;
  onLogout: () => void;
  onBack: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, inquiries, onUpdate, onLogout, onBack }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'DETAILS' | 'MESSAGES'>('DETAILS');
  const [currentStep, setCurrentStep] = useState(1);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const userInquiries = inquiries.filter(iq => 
    user.role === 'LANDLORD' ? iq.receiverId === user.id : iq.senderId === user.id
  );

  const handleSave = () => {
    setIsSaving(true);
    playUISound('success');
    setTimeout(() => {
      setIsSaving(false);
      setCurrentStep(1); // Reset wizard after successful save
    }, 1200);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      playUISound('tap');
      setCurrentStep(prev => prev + 1);
    } else {
      handleSave();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      playUISound('pop');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playUISound('tap');
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const finalizeImage = () => {
    if (!tempImage || !canvasRef.current) return;
    
    setIsProcessing(true);
    playUISound('tap');
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = Math.min(img.width, img.height);
      const offsetX = (img.width - size) / 2;
      const offsetY = (img.height - size) / 2;

      canvas.width = 400;
      canvas.height = 400;
      ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 400, 400);

      const finalBase64 = canvas.toDataURL('image/jpeg', 0.9);
      onUpdate({ avatar: finalBase64 });
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsCropModalOpen(false);
        setTempImage(null);
        playUISound('success');
      }, 800);
    };
    img.src = tempImage;
  };

  const steps = [
    { id: 1, title: 'Neural ID', icon: <UserIcon className="w-4 h-4" /> },
    { id: 2, title: 'Logistics', icon: <Calendar className="w-4 h-4" /> },
    { id: 3, title: 'Narrative', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 md:py-10 animate-in fade-in slide-in-from-bottom-5 duration-700 px-4">
      {/* Action Header */}
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors group"
        >
          <div className="p-2 bg-white rounded-xl border border-amber-100 group-hover:border-amber-400 shadow-sm transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Explore
        </button>

        <button 
          onClick={() => { playUISound('pop'); onLogout(); }}
          className="flex items-center gap-3 px-4 py-2.5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 hover:bg-rose-100 transition-all active:scale-95 group"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileSelect}
      />

      {isCropModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-xl" onClick={() => !isProcessing && setIsCropModalOpen(false)} />
          <div className="relative bg-[#FFFDF0] rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl border border-amber-100 animate-in zoom-in-95 duration-500 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-stone-900 uppercase italic tracking-tighter">Identity Refiner</h3>
              <button onClick={() => setIsCropModalOpen(false)} className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-amber-50 border-2 border-amber-100 mb-8 group shadow-inner">
              {tempImage && (
                <img 
                  src={tempImage} 
                  className="w-full h-full object-cover" 
                  alt="Preview" 
                />
              )}
              <div className="absolute inset-0 border-[24px] border-stone-900/20 pointer-events-none"></div>
              
              {isProcessing && (
                <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                </div>
              )}
            </div>

            <button 
              onClick={finalizeImage}
              disabled={isProcessing}
              className="w-full py-5 bg-stone-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl"
            >
              <Wand2 className="w-4 h-4" /> Save New Identity
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Identity Snapshot */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-amber-100/60 backdrop-blur-xl sticky top-24">
            <div className="relative group mx-auto w-36 h-36 md:w-44 md:h-44">
              <img 
                src={user.avatar} 
                className="w-full h-full rounded-[2rem] object-cover border-4 border-white shadow-md group-hover:scale-105 transition-all duration-500"
                alt={user.name}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 bg-amber-500 text-white rounded-xl shadow-lg hover:scale-110 transition-transform active:scale-95 border-4 border-white group/btn"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center mt-8">
              <h2 className="text-2xl font-black text-stone-900 leading-tight tracking-tighter uppercase italic">{user.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-amber-50 rounded-xl inline-flex border border-amber-100 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-black text-stone-700 text-xs">{user.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="mt-10 space-y-2">
              <button 
                onClick={() => { setActiveSubTab('DETAILS'); playUISound('tap'); }}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${activeSubTab === 'DETAILS' ? 'bg-stone-900 text-white shadow-lg' : 'bg-amber-50/50 text-stone-400 hover:bg-amber-100/50'}`}
              >
                <Zap className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Config Portal</span>
              </button>
              <button 
                onClick={() => { setActiveSubTab('MESSAGES'); playUISound('tap'); }}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all relative ${activeSubTab === 'MESSAGES' ? 'bg-stone-900 text-white shadow-lg' : 'bg-amber-50/50 text-stone-400 hover:bg-amber-100/50'}`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Neural Comm</span>
                {userInquiries.length > 0 && activeSubTab !== 'MESSAGES' && (
                   <span className="absolute right-4 w-5 h-5 bg-amber-500 text-white rounded-full text-[8px] flex items-center justify-center font-black">{userInquiries.length}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Multi-Step Configuration Wizard */}
        <div className="lg:col-span-8 space-y-8">
          {activeSubTab === 'DETAILS' ? (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-amber-100/60 backdrop-blur-xl animate-in slide-in-from-right-4 duration-500 overflow-hidden">
              {/* Wizard Progress Bar */}
              <div className="bg-amber-50/30 border-b border-amber-100 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 ${currentStep >= step.id ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-stone-300 border border-amber-100'}`}>
                        {currentStep > step.id ? <Check className="w-4 h-4" /> : step.icon}
                      </div>
                      <span className={`hidden md:block text-[9px] font-black uppercase tracking-widest ${currentStep === step.id ? 'text-stone-900' : 'text-stone-300'}`}>
                        {step.title}
                      </span>
                      {step.id < 3 && <div className={`w-8 h-px ${currentStep > step.id ? 'bg-amber-500' : 'bg-amber-100'}`} />}
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                  Step {currentStep}/3
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="min-h-[300px]">
                  {currentStep === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-stone-900 uppercase italic tracking-tighter">Core Identity</h3>
                        <p className="text-xs font-medium text-stone-400">Synchronize your primary contact and name across the Rentivo network.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Legal Designation</label>
                          <input 
                            type="text" 
                            className="w-full px-6 py-4 rounded-2xl bg-amber-50/20 border border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 shadow-sm"
                            value={user.name}
                            onChange={(e) => onUpdate({ name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Encrypted Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                            <input 
                              type="text" 
                              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-amber-50/20 border border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 shadow-sm"
                              value={user.phone}
                              onChange={(e) => onUpdate({ phone: e.target.value })}
                              placeholder="+91 00000 00000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-stone-900 uppercase italic tracking-tighter">Temporal Logistics</h3>
                        <p className="text-xs font-medium text-stone-400">Define your housing timeline and operational entity details.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {user.role === 'LANDLORD' ? (
                          <div className="col-span-2 space-y-2.5">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Business Entity</label>
                            <div className="relative">
                              <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                              <input 
                                type="text" 
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-amber-50/20 border border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 shadow-sm"
                                value={user.businessName || ''}
                                onChange={(e) => onUpdate({ businessName: e.target.value })}
                                placeholder="e.g. Skyline Living India"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-2.5">
                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Move-In Horizon</label>
                              <input 
                                type="date" 
                                className="w-full px-6 py-4 rounded-2xl bg-amber-50/20 border border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 shadow-sm"
                                value={user.moveInDate || ''}
                                onChange={(e) => onUpdate({ moveInDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2.5">
                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Lease Commitment</label>
                              <select 
                                className="w-full px-6 py-4 rounded-2xl bg-amber-50/20 border border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 shadow-sm appearance-none"
                                value={user.duration || ''}
                                onChange={(e) => onUpdate({ duration: e.target.value })}
                              >
                                <option value="">Select Horizon</option>
                                <option value="6 months">06 Months</option>
                                <option value="1 year">12 Months</option>
                                <option value="2 years+">Long Term (24m+)</option>
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-stone-900 uppercase italic tracking-tighter">Spatial Narrative</h3>
                        <p className="text-xs font-medium text-stone-400">Articulate your housing philosophy or property management vision.</p>
                      </div>

                      <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Professional Brief</label>
                        <textarea 
                          rows={6}
                          className="w-full px-6 py-5 rounded-[1.5rem] bg-amber-50/20 border border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 resize-none shadow-sm"
                          value={user.bio || ''}
                          onChange={(e) => onUpdate({ bio: e.target.value })}
                          placeholder="Tell the network who you are..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-amber-50 flex items-center justify-between">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 disabled:opacity-0 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  
                  <button 
                    onClick={nextStep}
                    disabled={isSaving}
                    className={`px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg ${currentStep === 3 ? 'bg-amber-500 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
                  >
                    {isSaving ? (
                      <><Check className="w-5 h-5 animate-bounce" /> Saved</>
                    ) : (
                      <>
                        {currentStep === 3 ? 'Update Profile' : 'Next Phase'}
                        {currentStep < 3 && <ChevronRight className="w-4 h-4" />}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between mb-4 bg-stone-900 p-6 md:p-8 rounded-[2rem] text-white shadow-xl">
                 <div className="flex items-center gap-4">
                   <ShieldCheck className="w-6 h-6 text-amber-500" />
                   <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Neural Comm Logs</h3>
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">{userInquiries.length} Active Leads</span>
               </div>

               <div className="grid grid-cols-1 gap-4">
                 {userInquiries.length > 0 ? userInquiries.map(iq => (
                   <div key={iq.id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-amber-100 flex flex-col md:flex-row gap-6 group hover:border-amber-500 transition-all">
                     <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-amber-50 shadow-inner">
                       <img src={iq.propertyPhoto} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt="" />
                     </div>
                     <div className="flex-1 space-y-4">
                       <div className="flex items-start justify-between">
                         <h4 className="font-black text-stone-900 text-lg tracking-tighter uppercase italic truncate">{iq.propertyTitle}</h4>
                         <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${iq.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{iq.status}</span>
                       </div>
                       <p className="p-4 bg-amber-50/30 rounded-xl italic text-stone-600 font-medium text-sm leading-relaxed border-l-4 border-amber-200">"{iq.message}"</p>
                       <div className="flex flex-wrap gap-4 text-[9px] font-black uppercase tracking-widest text-stone-400">
                          <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {iq.moveInDate || 'Flexible'}</div>
                          <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-500" /> {new Date(iq.timestamp).toLocaleDateString()}</div>
                       </div>
                     </div>
                   </div>
                 )) : (
                   <div className="py-24 bg-amber-50/20 rounded-[2.5rem] border-2 border-dashed border-amber-100 flex flex-col items-center justify-center text-center px-10">
                     <MessageSquare className="w-10 h-10 text-stone-200 mb-4" />
                     <p className="text-sm font-black text-stone-400 uppercase tracking-widest">No Active Transmissions</p>
                   </div>
                 )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
