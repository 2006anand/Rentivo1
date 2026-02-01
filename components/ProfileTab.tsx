
import React from 'react';
import { Camera, Calendar, Clock, Star, Building2, Mail, Phone, Info } from 'lucide-react';
import { User as UserType } from '../types';
import { playUISound } from './SoundFeedback';

interface ProfileTabProps {
  user: UserType;
  onUpdate: (updatedUser: Partial<UserType>) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, onUpdate }) => {
  const handleSave = () => {
    playUISound('success');
    // Save logic here
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Card: Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-zinc-900/40 rounded-[3rem] p-10 shadow-2xl border border-zinc-800/50 backdrop-blur-xl">
            <div className="relative group mx-auto w-48 h-48">
              <img 
                src={user.avatar} 
                className="w-full h-full rounded-[2.5rem] object-cover border-4 border-zinc-800 shadow-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                alt={user.name}
              />
              <button 
                onClick={() => playUISound('tap')}
                className="absolute -bottom-2 -right-2 p-4 bg-blue-600 text-white rounded-2xl shadow-2xl hover:scale-110 transition-transform active:scale-95 border-4 border-zinc-900"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center mt-10">
              <h2 className="text-3xl font-black text-white leading-tight tracking-tighter uppercase italic">{user.name}</h2>
              <p className="text-blue-500 font-black text-[10px] mt-3 uppercase tracking-[0.4em]">{user.role}</p>
              
              <div className="flex justify-center items-center gap-2 mt-6 px-5 py-2.5 bg-black/40 rounded-2xl inline-flex border border-zinc-800 shadow-inner">
                <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
                <span className="font-black text-white text-sm">{user.rating.toFixed(1)}</span>
                <span className="text-zinc-600 text-[10px] font-black ml-1 uppercase tracking-widest">Score</span>
              </div>
            </div>

            <div className="mt-12 space-y-6 pt-10 border-t border-zinc-800/50">
              <div className="flex items-center gap-4 text-zinc-500 group cursor-default">
                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight">{user.email}</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-500 group cursor-default">
                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight">{user.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-500 group cursor-default">
                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight uppercase tracking-widest text-[10px]">Active Since {new Date(user.joinedAt).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Details Form */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-zinc-900/40 rounded-[3rem] p-12 shadow-2xl border border-zinc-800/50 backdrop-blur-xl">
            <div className="flex items-center gap-5 mb-12">
              <div className="w-14 h-14 rounded-[1.25rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shadow-2xl">
                <Info className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Core Profile Data</h3>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Public Identity</label>
                  <input 
                    type="text" 
                    className="w-full px-8 py-5 rounded-2xl bg-black/40 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none transition-all font-bold text-white shadow-2xl"
                    value={user.name}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                  />
                </div>
                
                {user.role === 'LANDLORD' ? (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Corporate Entity</label>
                    <div className="relative">
                      <Building2 className="absolute left-7 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="e.g. Skyline Living"
                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-black/40 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none transition-all font-bold text-white shadow-2xl"
                        value={user.businessName || ''}
                        onChange={(e) => onUpdate({ businessName: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Migration Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-7 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                      <input 
                        type="date" 
                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-black/40 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none transition-all font-bold text-white shadow-2xl"
                        value={user.moveInDate || ''}
                        onChange={(e) => onUpdate({ moveInDate: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {user.role === 'RENTER' && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Mission Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-7 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <select 
                      className="w-full pl-16 pr-8 py-5 rounded-2xl bg-black/40 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none transition-all font-bold text-white shadow-2xl appearance-none"
                      value={user.duration || ''}
                      onChange={(e) => onUpdate({ duration: e.target.value })}
                    >
                      <option value="">Select horizon</option>
                      <option value="6 months">06 Months</option>
                      <option value="1 year">12 Months</option>
                      <option value="2 years+">Long Term (24m+)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Professional Brief</label>
                <textarea 
                  rows={5}
                  className="w-full px-8 py-6 rounded-[2rem] bg-black/40 border-2 border-zinc-800 focus:bg-black focus:border-blue-600 outline-none transition-all font-bold text-white shadow-2xl resize-none"
                  placeholder="The narrative of your housing requirements..."
                  value={user.bio || ''}
                  onChange={(e) => onUpdate({ bio: e.target.value })}
                />
              </div>

              <div className="pt-8">
                <button 
                  onClick={handleSave}
                  className="w-full sm:w-auto px-16 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
                >
                  Synchronize Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
