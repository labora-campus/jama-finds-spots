
import { useState } from 'react';
import { Heart, MapPin, Star, Clock, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

interface FavoritePlace {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  address: string;
  hours: string;
  image: string;
  dateAdded: Date;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoritePlace[]>([
    {
      id: '1',
      name: 'Café Tostado',
      type: 'Cafetería para trabajar',
      rating: 4.8,
      price: '$$',
      address: 'Av. Larco 123, Miraflores',
      hours: '7:00 AM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      dateAdded: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Astrid & Gastón',
      type: 'Restaurante de lujo',
      rating: 4.9,
      price: '$$$$',
      address: 'Av. Paz Soldán 290, San Isidro',
      hours: '12:00 PM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      dateAdded: new Date('2024-01-10'),
    },
    {
      id: '3',
      name: 'Work & Coffee',
      type: 'Coworking Café',
      rating: 4.7,
      price: '$',
      address: 'Jr. Schell 319, Miraflores',
      hours: '6:00 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      dateAdded: new Date('2024-01-05'),
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Heart size={28} className="text-red-500" fill="currentColor" />
            <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
          </div>
          <p className="text-gray-600">
            Todos los lugares que has guardado para visitar después
          </p>
        </div>

        {favorites.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Aún no tienes lugares favoritos
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explora lugares increíbles y guarda tus favoritos para no perderlos de vista
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  <MessageSquare className="mr-2" size={20} />
                  Hablar con Jamito IA
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" size="lg">
                  Explorar lugares
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {favorites.length} {favorites.length === 1 ? 'lugar guardado' : 'lugares guardados'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((place) => (
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
                        variant="destructive"
                        className="bg-red-500/90 hover:bg-red-600"
                        onClick={() => removeFavorite(place.id)}
                      >
                        <Trash2 size={16} />
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

                    <div className="text-xs text-gray-500 mb-4">
                      Guardado el {formatDate(place.dateAdded)}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                        Ver detalles
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeFavorite(place.id)}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Heart size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
