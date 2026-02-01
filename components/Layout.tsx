
import React from 'react';
import { Home, Search, PlusSquare, User as UserIcon, Bell, Wand2 } from 'lucide-react';
import { UserRole } from '../types';
import { playUISound } from './SoundFeedback';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole | null;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, onLogout, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-[120] bg-black/60 backdrop-blur-2xl border-b border-zinc-900/50 px-8 py-5 flex items-center justify-between shadow-2xl">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onTabChange(userRole === 'LANDLORD' ? 'dashboard' : 'explore')}
        >
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500">
            <Home className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">RENTIVO<span className="text-blue-500">.</span></h1>
        </div>

        <div className="hidden md:flex items-center gap-10 mr-auto ml-16">
           <button 
            onClick={() => onTabChange('explore')} 
            className={`text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'explore' ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
            Explore
           </button>
           <button 
            onClick={() => onTabChange('tools')} 
            className={`text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300 ${activeTab === 'tools' ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
            <Wand2 className="w-4 h-4" /> AI Tools
           </button>
        </div>

        {userRole ? (
          <div className="flex items-center gap-6">
            <button className="p-3 text-zinc-500 hover:text-blue-500 hover:bg-zinc-900/50 rounded-2xl transition-all relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            </button>
            <div className="h-8 w-px bg-zinc-900"></div>
            <button 
              onClick={() => onTabChange('profile')}
              className={`flex items-center gap-3 p-1.5 pl-4 rounded-2xl border transition-all duration-500 ${activeTab === 'profile' ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.3)]' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 shadow-sm'}`}
            >
              <div className="flex flex-col items-end leading-none mr-1">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${activeTab === 'profile' ? 'text-blue-100' : 'text-zinc-500'}`}>Session</span>
                <span className={`text-xs font-bold ${activeTab === 'profile' ? 'text-white' : 'text-zinc-200'}`}>Profile</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center overflow-hidden border border-zinc-800">
                <UserIcon className={`w-5 h-5 ${activeTab === 'profile' ? 'text-white' : 'text-zinc-500'}`} />
              </div>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
             <button onClick={() => onTabChange('explore')} className="text-xs font-black text-zinc-400 uppercase tracking-widest hover:text-white transition-colors">Login</button>
             <button onClick={() => onTabChange('explore')} className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20">Sign Up</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      {userRole && (
        <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 rounded-[2rem] flex justify-around items-center py-4 px-4 z-[120] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <NavButton active={activeTab === 'explore'} icon={<Search />} label="Explore" onClick={() => onTabChange('explore')} />
          <NavButton active={activeTab === 'tools'} icon={<Wand2 />} label="AI" onClick={() => onTabChange('tools')} />
          {userRole === 'LANDLORD' && <NavButton active={activeTab === 'dashboard'} icon={<PlusSquare />} label="Lease" onClick={() => onTabChange('dashboard')} />}
          <NavButton active={activeTab === 'profile'} icon={<UserIcon />} label="Account" onClick={() => onTabChange('profile')} />
        </nav>
      )}
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    onClick={() => { playUISound('tap'); onClick(); }}
    className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${active ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-blue-500/10 shadow-inner' : ''}`}>
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
    </div>
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);

export default Layout;
