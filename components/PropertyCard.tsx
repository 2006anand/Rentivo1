
import React from 'react';
import { MapPin, IndianRupee, Heart, ShieldCheck, Users, UtensilsCrossed } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: string) => void;
  isFavorite?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails, isFavorite = false }) => {
  return (
    <div 
      className="bg-zinc-900/40 rounded-[2rem] overflow-hidden border border-zinc-800/50 hover:border-blue-500/30 hover:bg-zinc-900/60 transition-all duration-500 cursor-pointer group shadow-xl"
      onClick={() => onViewDetails(property.id)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={property.photos[0]} 
          alt={property.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-black rounded-lg text-white uppercase tracking-widest border border-white/10">
            {property.furnishing}
          </span>
        </div>
        <button className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-2xl text-white/50 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white text-white' : ''}`} />
        </button>
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-black flex items-center shadow-2xl shadow-blue-900/40">
          <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
          {property.rent.toLocaleString('en-IN')}/mo
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-zinc-100 text-xl leading-snug line-clamp-1 mb-2 group-hover:text-blue-400 transition-colors">{property.title}</h3>
        
        <div className="flex items-center text-zinc-500 text-sm font-medium mb-6">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-blue-500" />
          <span className="line-clamp-1">{property.location.area}, {property.location.city}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-zinc-800/50 pt-5">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/20 border border-zinc-800/30">
            <ShieldCheck className="w-4 h-4 text-blue-500 mb-1" />
            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-tighter">Deposit</span>
            <span className="text-xs font-bold text-zinc-300">₹{property.deposit}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/20 border border-zinc-800/30">
            <Users className="w-4 h-4 text-blue-500 mb-1" />
            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-tighter">Tenant</span>
            <span className="text-xs font-bold text-zinc-300">{property.tenantType}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/20 border border-zinc-800/30">
            <UtensilsCrossed className="w-4 h-4 text-blue-500 mb-1" />
            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-tighter">Policy</span>
            <span className="text-xs font-bold text-zinc-300">{property.foodPreference}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
