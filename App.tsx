
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PropertyCard from './components/PropertyCard';
import PropertyForm from './components/PropertyForm';
import ProfileTab from './components/ProfileTab';
import SmartToolsTab from './components/SmartToolsTab';
import { User, UserRole, Property } from './types';
import { MOCK_PROPERTIES, INDIA_STATES, STATE_DISTRICTS } from './constants';
import { playUISound } from './components/SoundFeedback';
import { 
  Search, Filter, Phone, MapPin, Check, Home, 
  PlusSquare, Star, ChevronLeft, Sparkles, Wand2, Zap, Heart,
  Globe, Navigation, X, FileText, IndianRupee, ArrowRight
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rentivo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeTab, setActiveTab] = useState('explore');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<UserRole>('RENTER');
  const [properties, setProperties] = useState<Property[]>(
    MOCK_PROPERTIES.map(p => ({
      ...p,
      reviews: [
        {
          id: 'r1',
          authorId: 'u1',
          authorName: 'Suresh Raina',
          authorAvatar: 'https://i.pravatar.cc/150?u=suresh',
          targetId: '1',
          content: 'Amazing location and the landlord is very helpful. Highly recommended!',
          rating: 5,
          timestamp: Date.now() - 172800000
        }
      ]
    })) as any
  );
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('rentivo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rentivo_user');
    }
  }, [user]);

  const handleLogin = (role: UserRole) => {
    playUISound('success');
    const newUser: User = {
      id: Math.random().toString(),
      name: role === 'LANDLORD' ? 'Arjun Sharma' : 'Rajesh Kumar',
      email: role === 'LANDLORD' ? 'arjun@landlord.com' : 'rajesh@renter.com',
      phone: '9988776655',
      role,
      avatar: `https://i.pravatar.cc/150?u=${role}`,
      rating: 4.8,
      reviewsCount: 12,
      joinedAt: Date.now(),
      bio: role === 'LANDLORD' ? "Experienced property owner in Delhi NCR focused on luxury stays." : "Quiet professional in tech looking for a 1-year lease."
    };
    setUser(newUser);
    setAuthModalOpen(false);
    setActiveTab(role === 'LANDLORD' ? 'dashboard' : 'explore');
  };

  const handleLogout = () => {
    playUISound('pop');
    setUser(null);
    setActiveTab('explore');
  };

  const changeTab = (tab: string) => {
    playUISound('tap');
    setActiveTab(tab);
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState ? p.location.state === selectedState : true;
    const matchesDistrict = selectedDistrict ? p.location.district === selectedDistrict : true;
    
    return matchesSearch && matchesState && matchesDistrict;
  });

  const LandingView = () => (
    <div className="flex flex-col items-center py-20 space-y-32 animate-in fade-in duration-1000">
      <div className="text-center max-w-5xl space-y-12 px-4 relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 shadow-2xl">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></span>
          Premium Rental Network India
        </div>
        
        <h2 className="text-8xl sm:text-[12rem] font-black text-white tracking-tighter leading-[0.75] flex flex-col items-center italic">
          <span>LEASE.</span>
          <span className="text-blue-600 -mt-4">BELIEVE.</span>
        </h2>
        
        <p className="text-2xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
          The future of luxury renting. Verified listings, AI-driven insights, and the seamless RENTIVO experience.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          <button 
            onClick={() => { playUISound('tap'); setAuthType('RENTER'); setAuthModalOpen(true); }}
            className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-500 hover:shadow-[0_20px_80px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center gap-3"
          >
            Find a Home <ArrowRight className="w-6 h-6" />
          </button>
          <button 
            onClick={() => { playUISound('tap'); setAuthType('LANDLORD'); setAuthModalOpen(true); }}
            className="px-12 py-6 bg-zinc-900 text-white border border-zinc-800 rounded-[2rem] font-black text-xl hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl"
          >
            List a Space
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl px-8">
        {[
          { icon: <Zap className="w-8 h-8 text-blue-500" />, title: "AI Vetting", desc: "Our neural networks verify every document and listing for 100% authenticity." },
          { icon: <Navigation className="w-8 h-8 text-blue-500" />, title: "Precision Search", desc: "Contextual location mapping that understands your commute and lifestyle." },
          { icon: <Sparkles className="w-8 h-8 text-blue-500" />, title: "Marketing Studio", desc: "Instantly generate premium marketing assets for your properties using Gemini." }
        ].map((feat, i) => (
          <div key={i} className="bg-zinc-900/40 p-12 rounded-[3.5rem] border border-zinc-800/50 shadow-2xl hover:bg-zinc-900/60 hover:border-blue-500/20 transition-all group relative overflow-hidden">
            <div className="mb-8 w-20 h-20 bg-black rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">{feat.icon}</div>
            <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{feat.title}</h4>
            <p className="text-zinc-500 leading-relaxed font-semibold text-lg">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ExploreView = () => (
    <div className="space-y-16 py-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-zinc-600 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search by city, area or landmark..."
              className="w-full pl-16 pr-8 py-7 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-xl text-white placeholder:text-zinc-700 shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { playUISound('tap'); setIsFilterOpen(!isFilterOpen); }}
            className={`flex items-center gap-3 px-10 py-7 rounded-[2.5rem] font-black text-lg transition-all active:scale-95 shadow-2xl ${isFilterOpen ? 'bg-blue-600 text-white shadow-blue-900/20' : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'}`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {isFilterOpen && (
          <div className="bg-zinc-900/80 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-6 duration-500">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">Market</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                <select className="w-full pl-12 pr-4 py-4 bg-black/40 rounded-2xl outline-none font-bold text-zinc-200 border border-zinc-800 appearance-none">
                  <option>India</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">Region</label>
              <select 
                className="w-full px-5 py-4 bg-black/40 rounded-2xl outline-none font-bold text-zinc-200 border border-zinc-800 focus:border-blue-600 transition-colors"
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
              >
                <option value="">All States</option>
                {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">District</label>
              <select 
                className="w-full px-5 py-4 bg-black/40 rounded-2xl outline-none font-bold text-zinc-200 border border-zinc-800 focus:border-blue-600 transition-colors disabled:opacity-30"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">All Districts</option>
                {selectedState && STATE_DISTRICTS[selectedState]?.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end gap-5 pt-6 border-t border-zinc-800">
              <button 
                onClick={() => { setSelectedState(''); setSelectedDistrict(''); setSearchQuery(''); }}
                className="px-8 py-3 text-zinc-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="px-10 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 active:scale-95"
              >
                Update Feed
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProperties.map(p => (
          <PropertyCard 
            key={p.id} 
            property={p} 
            onViewDetails={() => { playUISound('pop'); setSelectedProperty(p); }} 
          />
        ))}
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-16 py-10 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10">
        <div className="space-y-4">
          <h2 className="text-6xl font-black text-white tracking-tighter">Inventory.</h2>
          <p className="text-zinc-500 text-xl font-medium">Monitoring {properties.filter(p => p.landlordId === user?.id || p.landlordId === 'l1').length} active assets.</p>
        </div>
        <button 
          onClick={() => { playUISound('tap'); setIsAddingProperty(true); }}
          className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.3)] transition-all active:scale-95 flex items-center gap-3"
        >
          <PlusSquare className="w-6 h-6" />
          List New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {properties.filter(p => p.landlordId === user?.id || p.landlordId === 'l1').map(p => (
          <div key={p.id} className="bg-zinc-900/40 p-10 rounded-[3.5rem] border border-zinc-800/50 flex flex-col md:flex-row gap-12 hover:bg-zinc-900/60 transition-all group overflow-hidden relative shadow-2xl">
            <div className="w-full md:w-64 h-64 overflow-hidden rounded-[2.5rem] flex-shrink-0 shadow-2xl">
              <img src={p.photos[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={p.title} />
            </div>
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="space-y-3">
                <h3 className="text-4xl font-black text-white leading-tight group-hover:text-blue-500 transition-colors">{p.title}</h3>
                <div className="flex items-center gap-3 text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" /> {p.location.city} • {p.location.district}
                </div>
                <div className="flex flex-wrap gap-3 pt-6">
                  <div className="bg-blue-500/10 text-blue-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                    {p.interestedCount} Active Leads
                  </div>
                  <div className="bg-zinc-800 text-zinc-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Asset Live
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-12">
                <button className="flex-1 py-5 rounded-2xl bg-black border border-zinc-800 text-zinc-400 font-black text-xs uppercase tracking-widest hover:text-white transition-all active:scale-95">Settings</button>
                <button className="flex-[2] py-5 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.2)] active:scale-95">Analytics</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MainContent = () => {
    switch (activeTab) {
      case 'explore': return <ExploreView />;
      case 'dashboard': return <DashboardView />;
      case 'tools': return <SmartToolsTab />;
      case 'profile': return user ? <ProfileTab user={user} onUpdate={(updated) => setUser({ ...user, ...updated })} /> : <LandingView />;
      default: return <ExploreView />;
    }
  };

  const PropertyDetailView = ({ property }: { property: Property }) => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setSelectedProperty(null)} />
      <div className="relative bg-zinc-950 rounded-[4rem] w-full max-w-6xl max-h-[90vh] overflow-y-auto p-16 shadow-[0_0_100px_rgba(0,0,0,1)] border border-zinc-900 animate-in zoom-in-95 duration-500 ease-out scrollbar-hide">
        <button 
          onClick={() => setSelectedProperty(null)}
          className="absolute top-12 right-12 p-4 text-zinc-600 hover:text-white transition-all z-10 bg-zinc-900 rounded-3xl"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
             <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] group border border-zinc-800">
                <img src={property.photos[0]} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt={property.title} />
             </div>
             <div className="grid grid-cols-3 gap-6">
               {property.photos.slice(1, 4).map((photo, i) => (
                 <div key={i} className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-900 hover:border-blue-600/50 transition-colors">
                   <img src={photo} className="w-full h-full object-cover" alt="" />
                 </div>
               ))}
             </div>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">
                {property.furnishing} • Premium Verified
              </div>
              <h2 className="text-7xl font-black text-white tracking-tighter leading-[0.85]">{property.title}</h2>
              <div className="flex items-center gap-2 text-zinc-500 font-bold text-xl">
                <MapPin className="w-6 h-6 text-blue-600" />
                {property.location.area}, {property.location.city}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-3">Rate/Mo</p>
                <p className="text-5xl font-black text-white flex items-baseline tracking-tighter">
                  <span className="text-2xl mr-1 text-blue-500 italic">₹</span>{property.rent.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-3">Deposit</p>
                <p className="text-5xl font-black text-white flex items-baseline tracking-tighter">
                  <span className="text-2xl mr-1 text-blue-500 italic">₹</span>{property.deposit.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-black uppercase tracking-[0.3em] text-[10px] text-zinc-500 flex items-center gap-3">
                <FileText className="w-4 h-4 text-blue-500" /> Asset Description
              </h3>
              <p className="text-2xl text-zinc-400 font-medium leading-relaxed">{property.description}</p>
            </div>

            <div className="space-y-6">
              <h3 className="font-black uppercase tracking-[0.3em] text-[10px] text-zinc-500">Premium Perks</h3>
              <div className="flex flex-wrap gap-3">
                {property.facilities.map(f => (
                  <span key={f} className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-black text-zinc-300 flex items-center gap-3 hover:border-blue-500/30 transition-colors">
                    <Check className="w-4 h-4 text-blue-500" /> {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-900 flex items-center gap-6">
              <button className="flex-1 py-7 bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl hover:bg-blue-500 shadow-[0_20px_60px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center justify-center gap-4 group">
                <Phone className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                Connect Now
              </button>
              <button className="p-7 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:bg-zinc-800 transition-all active:scale-95 group">
                <Heart className="w-8 h-8 text-zinc-600 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout 
      userRole={user?.role || null} 
      onLogout={handleLogout} 
      activeTab={activeTab} 
      onTabChange={changeTab}
    >
      {!user && activeTab !== 'explore' && activeTab !== 'tools' ? (
        <LandingView />
      ) : (
        <MainContent />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-700" onClick={() => setAuthModalOpen(false)} />
          <div className="relative bg-zinc-950 rounded-[4rem] w-full max-w-xl p-20 shadow-[0_0_150px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 border border-zinc-900">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-12 right-12 p-3 text-zinc-700 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="text-center mb-16">
              <div className="w-28 h-28 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-[0_30px_60px_rgba(37,99,235,0.4)] -rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                <Home className="text-white w-14 h-14" />
              </div>
              <h3 className="text-6xl font-black text-white tracking-tighter uppercase">RENTIVO<span className="text-blue-500">.</span></h3>
              <p className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-[10px] mt-8 leading-relaxed">Modern • Elite • Verified</p>
            </div>

            <div className="space-y-8">
              <button 
                onClick={() => handleLogin(authType)}
                className="group w-full py-7 bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl hover:bg-blue-500 shadow-2xl shadow-blue-900/40 transition-all active:scale-95 flex items-center justify-center gap-5"
              >
                Access Gateway
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="text-center text-zinc-700 text-xs font-black uppercase tracking-widest">Preview Mode Active</p>
            </div>
          </div>
        </div>
      )}

      {/* Property Upload Overlay */}
      {isAddingProperty && (
        <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-6 overflow-y-auto animate-in fade-in duration-500">
          <div className="w-full max-w-4xl my-10">
            <PropertyForm 
              onCancel={() => { playUISound('pop'); setIsAddingProperty(false); }} 
              onSubmit={(data) => {
                playUISound('success');
                const newProp: Property = {
                  ...data,
                  id: Math.random().toString(),
                  landlordId: user?.id || 'l1',
                  createdAt: Date.now(),
                  interestedCount: 0,
                  reviews: [],
                  location: { 
                    ...data, 
                    country: 'India', 
                    coordinates: { lat: 28, lng: 77 } 
                  }
                } as any;
                setProperties([newProp, ...properties]);
                setIsAddingProperty(false);
              }} 
            />
          </div>
        </div>
      )}

      {selectedProperty && <PropertyDetailView property={selectedProperty} />}
    </Layout>
  );
};

const Users = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default App;
