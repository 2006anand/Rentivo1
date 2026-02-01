
import React, { useState, useRef } from 'react';
import { Camera, Calendar, Clock, Star, Building2, Mail, Phone, Info, Check, X, Crop, Upload, Wand2, MessageSquare, ShieldCheck, ArrowUpRight, User as UserIcon, LogOut, ChevronLeft } from 'lucide-react';
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
    setTimeout(() => setIsSaving(false), 1200);
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

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors group"
        >
          <div className="p-2 bg-white rounded-lg border border-amber-100 group-hover:border-amber-500">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Explore
        </button>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-600 transition-colors group"
        >
          Sign Out Portal
          <div className="p-2 bg-rose-50 rounded-lg border border-rose-100 group-hover:bg-rose-100">
            <LogOut className="w-4 h-4" />
          </div>
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
          <div className="relative bg-[#FFFDF0] rounded-[3rem] w-full max-w-lg p-10 shadow-2xl border border-amber-100 animate-in zoom-in-95 duration-500 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-stone-900 uppercase italic tracking-tighter">Avatar Refiner</h3>
              <button onClick={() => setIsCropModalOpen(false)} className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-amber-50 border-2 border-amber-100 mb-8 group">
              {tempImage && (
                <img 
                  src={tempImage} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
                  alt="Preview" 
                />
              )}
              <div className="absolute inset-0 border-[32px] border-stone-900/40 pointer-events-none"></div>
              <div className="absolute inset-8 border border-white/40 border-dashed pointer-events-none"></div>
              
              {isProcessing && (
                <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Optimizing...</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center">Neural algorithms will center-crop and optimize your identity.</p>
              <button 
                onClick={finalizeImage}
                disabled={isProcessing}
                className="w-full py-5 bg-stone-900 text-white rounded-[1.75rem] font-black text-xs uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl"
              >
                <Wand2 className="w-4 h-4" /> Finalize Identity
              </button>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Side: Summary Card */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-sm border border-amber-100/60 backdrop-blur-xl sticky top-32">
            <div className="relative group mx-auto w-40 h-40 md:w-48 md:h-48">
              <img 
                src={user.avatar} 
                className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-lg group-hover:scale-[1.02] transition-all duration-700"
                alt={user.name}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 md:p-4 bg-amber-500 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95 border-4 border-white group/btn"
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
            
            <div className="text-center mt-8 md:mt-10">
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 leading-tight tracking-tighter uppercase italic">{user.name}</h2>
              <p className="text-amber-600 font-black text-[10px] mt-3 uppercase tracking-[0.4em]">{user.role}</p>
              
              <div className="flex justify-center items-center gap-2 mt-6 px-5 py-2.5 bg-amber-50 rounded-2xl inline-flex border border-amber-100 shadow-inner">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-black text-stone-700 text-sm">{user.rating.toFixed(1)}</span>
                <span className="text-stone-400 text-[10px] font-black ml-1 uppercase tracking-widest">Score</span>
              </div>
            </div>

            <div className="mt-10 md:mt-12 space-y-3">
              <button 
                onClick={() => setActiveSubTab('DETAILS')}
                className={`w-full p-4 md:p-5 rounded-2xl flex items-center gap-4 transition-all ${activeSubTab === 'DETAILS' ? 'bg-stone-900 text-white shadow-lg' : 'bg-amber-50/50 text-stone-400 hover:bg-amber-100/50'}`}
              >
                <UserIcon className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Account Details</span>
              </button>
              <button 
                onClick={() => setActiveSubTab('MESSAGES')}
                className={`w-full p-4 md:p-5 rounded-2xl flex items-center gap-4 transition-all relative ${activeSubTab === 'MESSAGES' ? 'bg-stone-900 text-white shadow-lg' : 'bg-amber-50/50 text-stone-400 hover:bg-amber-100/50'}`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Portal</span>
                {userInquiries.length > 0 && activeSubTab !== 'MESSAGES' && (
                   <span className="absolute right-4 w-5 h-5 bg-amber-500 text-white rounded-full text-[8px] flex items-center justify-center font-black">{userInquiries.length}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Tab Content */}
        <div className="lg:col-span-8 space-y-8">
          {activeSubTab === 'DETAILS' ? (
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-amber-100/60 backdrop-blur-xl animate-in slide-in-from-right-10 duration-500">
              <div className="flex items-center gap-5 mb-10 md:mb-12">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[1.25rem] bg-amber-50 border border-amber-100 flex items-center justify-center shadow-sm">
                  <Info className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-stone-900 uppercase italic tracking-tighter">Identity Management</h3>
              </div>

              <div className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Public Identity</label>
                    <input 
                      type="text" 
                      className="w-full px-6 md:px-8 py-4 md:py-5 rounded-2xl bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800"
                      value={user.name}
                      onChange={(e) => onUpdate({ name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Contact Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-6 md:left-7 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                      <input 
                        type="text" 
                        className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 rounded-2xl bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800"
                        value={user.phone}
                        onChange={(e) => onUpdate({ phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Secure Bio</label>
                  <textarea 
                    rows={5}
                    className="w-full px-6 md:px-8 py-5 md:py-6 rounded-[2rem] bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 resize-none shadow-sm"
                    value={user.bio || ''}
                    onChange={(e) => onUpdate({ bio: e.target.value })}
                  />
                </div>

                <div className="pt-6 md:pt-8">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`w-full sm:w-auto px-12 md:px-16 py-4 md:py-6 rounded-[2rem] font-black text-lg md:text-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg ${isSaving ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
                  >
                    {isSaving ? <Check className="w-6 h-6 animate-bounce" /> : 'Update Profile'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                 <div className="flex items-center gap-5">
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-[1.25rem] bg-stone-900 flex items-center justify-center shadow-lg">
                     <ShieldCheck className="w-6 h-6 text-amber-500" />
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-stone-900 uppercase italic tracking-tighter">Secure Communication</h3>
                 </div>
                 <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{userInquiries.length} Conversations</span>
               </div>

               <div className="grid grid-cols-1 gap-6">
                 {userInquiries.length > 0 ? userInquiries.map(iq => (
                   <div key={iq.id} className="bg-white rounded-[3rem] p-8 md:p-10 shadow-sm border border-amber-100 flex flex-col md:flex-row gap-8 md:gap-10 group hover:border-amber-500 transition-all">
                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden flex-shrink-0 border border-amber-50 shadow-inner mx-auto md:mx-0">
                       <img src={iq.propertyPhoto} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="" />
                     </div>
                     <div className="flex-1 space-y-4 md:space-y-6">
                       <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                         <div className="space-y-1">
                           <h4 className="font-black text-stone-900 text-lg md:text-xl tracking-tighter truncate uppercase italic">{iq.propertyTitle}</h4>
                           <div className="flex items-center gap-3">
                             <img src={iq.senderAvatar} className="w-6 h-6 rounded-full border border-amber-100" alt="" />
                             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{user.role === 'LANDLORD' ? 'From' : 'To Landlord of'} {iq.senderName}</span>
                           </div>
                         </div>
                         <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${iq.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : iq.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                           {iq.status}
                         </div>
                       </div>
                       
                       <div className="p-4 md:p-6 bg-amber-50/50 rounded-2xl italic text-stone-600 font-medium leading-relaxed border-l-4 border-amber-200 text-sm md:text-base">
                         "{iq.message}"
                       </div>

                       <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] font-black uppercase tracking-widest text-stone-400">
                          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" /> {iq.moveInDate || 'TBD'}</div>
                          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> {new Date(iq.timestamp).toLocaleDateString()}</div>
                          <div className="flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-amber-500" /> Verified</div>
                       </div>
                     </div>
                   </div>
                 )) : (
                   <div className="py-24 md:py-32 bg-amber-50/20 rounded-[3rem] md:rounded-[4rem] border-2 border-dashed border-amber-100 flex flex-col items-center justify-center text-center px-10">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-amber-50">
                       <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-stone-200" />
                     </div>
                     <p className="text-xl font-black text-stone-400 uppercase tracking-tighter italic mb-2">Latent Space Empty</p>
                     <p className="text-stone-300 font-medium max-w-xs text-sm">Once you transmit secure inquiries, they will manifest here as chronological logs.</p>
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
