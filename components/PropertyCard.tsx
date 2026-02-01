
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
      className="bg-white rounded-[2rem] overflow-hidden border border-amber-100/60 hover:border-amber-400/50 hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)] transition-all duration-500 cursor-pointer group"
      onClick={() => onViewDetails(property.id)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={property.photos[0]} 
          alt={property.title}
          className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black rounded-lg text-stone-900 uppercase tracking-widest border border-amber-100">
            {property.furnishing}
          </span>
        </div>
        <button className="absolute top-4 right-4 p-3 bg-white/40 backdrop-blur-md rounded-2xl text-stone-600 hover:bg-amber-500 hover:text-white transition-all shadow-lg border border-white/50">
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white text-white' : ''}`} />
        </button>
        <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-2xl text-sm font-black flex items-center shadow-lg">
          <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
          {property.rent.toLocaleString('en-IN')}/mo
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-stone-900 text-xl leading-snug line-clamp-1 mb-2 group-hover:text-amber-600 transition-colors">{property.title}</h3>
        
        <div className="flex items-center text-stone-500 text-sm font-medium mb-6">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-amber-500" />
          <span className="line-clamp-1">{property.location.area}, {property.location.city}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-amber-50 pt-5">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/30 border border-amber-100/50">
            <ShieldCheck className="w-4 h-4 text-amber-600 mb-1" />
            <span className="text-[9px] text-stone-400 font-black uppercase tracking-tighter">Deposit</span>
            <span className="text-xs font-bold text-stone-700">₹{property.deposit}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/30 border border-amber-100/50">
            <Users className="w-4 h-4 text-amber-600 mb-1" />
            <span className="text-[9px] text-stone-400 font-black uppercase tracking-tighter">Tenant</span>
            <span className="text-xs font-bold text-stone-700">{property.tenantType}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/30 border border-amber-100/50">
            <UtensilsCrossed className="w-4 h-4 text-amber-600 mb-1" />
            <span className="text-[9px] text-stone-400 font-black uppercase tracking-tighter">Policy</span>
            <span className="text-xs font-bold text-stone-700">{property.foodPreference}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
