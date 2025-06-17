
import { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin, Star, Heart, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';

interface Place {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  address: string;
  hours: string;
  image: string;
  cuisine?: string;
  wifi: boolean;
  parking: boolean;
  petFriendly: boolean;
  isFavorite: boolean;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    category: '',
    cuisine: '',
    priceRange: '',
    location: '',
    wifi: false,
    parking: false,
    petFriendly: false,
  });

  const samplePlaces: Place[] = [
    {
      id: '1',
      name: 'Café Tostado',
      type: 'Cafetería',
      rating: 4.8,
      price: '$$',
      address: 'Av. Larco 123, Miraflores',
      hours: '7:00 AM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      cuisine: 'Café',
      wifi: true,
      parking: true,
      petFriendly: false,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Astrid & Gastón',
      type: 'Restaurante',
      rating: 4.9,
      price: '$$$$',
      address: 'Av. Paz Soldán 290, San Isidro',
      hours: '12:00 PM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      cuisine: 'Peruana',
      wifi: true,
      parking: true,
      petFriendly: false,
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Burger Bros',
      type: 'Restaurante Casual',
      rating: 4.6,
      price: '$$',
      address: 'Av. José Pardo 798, Miraflores',
      hours: '11:00 AM - 12:00 AM',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      cuisine: 'Americana',
      wifi: true,
      parking: false,
      petFriendly: true,
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Work & Coffee',
      type: 'Coworking Café',
      rating: 4.7,
      price: '$',
      address: 'Jr. Schell 319, Miraflores',
      hours: '6:00 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      cuisine: 'Café',
      wifi: true,
      parking: false,
      petFriendly: true,
      isFavorite: false,
    },
  ];

  const [places, setPlaces] = useState(samplePlaces);

  const toggleFavorite = (placeId: string) => {
    setFavorites(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const categories = [
    'Cafetería',
    'Restaurante',
    'Bar',
    'Coworking',
    'Parque',
    'Centro Comercial',
  ];

  const cuisines = [
    'Peruana',
    'Italiana',
    'Japonesa',
    'Mexicana',
    'Americana',
    'Vegetariana',
    'Asiática',
  ];

  const priceRanges = [
    { value: '$', label: '$ - Económico' },
    { value: '$$', label: '$$ - Moderado' },
    { value: '$$$', label: '$$$ - Caro' },
    { value: '$$$$', label: '$$$$ - Muy caro' },
  ];

  const locations = [
    'Miraflores',
    'San Isidro',
    'Barranco',
    'Surco',
    'La Molina',
    'Centro de Lima',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-4">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar lugares, comida, ambiente..."
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filtros</span>
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">Categoría</Label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Tipo de comida</Label>
                  <Select value={filters.cuisine} onValueChange={(value) => setFilters({...filters, cuisine: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las cocinas" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisines.map(cuisine => (
                        <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Precio</Label>
                  <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier precio" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map(range => (
                        <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Ubicación</Label>
                  <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las zonas" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="wifi" 
                    checked={filters.wifi}
                    onCheckedChange={(checked) => setFilters({...filters, wifi: !!checked})}
                  />
                  <Label htmlFor="wifi" className="text-sm">WiFi disponible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="parking" 
                    checked={filters.parking}
                    onCheckedChange={(checked) => setFilters({...filters, parking: !!checked})}
                  />
                  <Label htmlFor="parking" className="text-sm">Estacionamiento</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="petFriendly" 
                    checked={filters.petFriendly}
                    onCheckedChange={(checked) => setFilters({...filters, petFriendly: !!checked})}
                  />
                  <Label htmlFor="petFriendly" className="text-sm">Pet-friendly</Label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {places.length} lugares encontrados
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className={`bg-white/90 hover:bg-white ${favorites.includes(place.id) ? 'text-red-500' : 'text-gray-600'}`}
                      onClick={() => toggleFavorite(place.id)}
                    >
                      <Heart size={16} fill={favorites.includes(place.id) ? 'currentColor' : 'none'} />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {place.price}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                      <p className="text-sm text-gray-600">{place.type}</p>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm font-medium text-gray-700">{place.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2 flex-shrink-0" />
                      <span className="truncate">{place.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-2 flex-shrink-0" />
                      <span>{place.hours}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.cuisine && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {place.cuisine}
                      </span>
                    )}
                    {place.wifi && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        WiFi
                      </span>
                    )}
                    {place.parking && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Parking
                      </span>
                    )}
                    {place.petFriendly && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Pet-friendly
                      </span>
                    )}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
