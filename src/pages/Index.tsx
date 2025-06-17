
import { Link } from 'react-router-dom';
import { MessageSquare, Search, MapPin, Star, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Jamito IA',
      description: 'Conversa con nuestro asistente inteligente para encontrar el lugar perfecto',
    },
    {
      icon: Search,
      title: 'Búsqueda Avanzada',
      description: 'Usa filtros detallados para encontrar exactamente lo que buscas',
    },
    {
      icon: Heart,
      title: 'Favoritos',
      description: 'Guarda tus lugares preferidos para visitarlos después',
    },
  ];

  const samplePlaces = [
    {
      name: 'Café Tostado',
      type: 'Cafetería para trabajar',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    },
    {
      name: 'Astrid & Gastón',
      type: 'Restaurante de lujo',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    },
    {
      name: 'Burger Bros',
      type: 'Casual con amigos',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Encuentra el lugar{' '}
            <span className="gradient-text">perfecto</span>{' '}
            para cada momento
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ya sea para trabajar, una cita romántica, salir con amigos o disfrutar en familia, 
            Jama te ayuda a descubrir el lugar ideal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/chat">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200">
                <MessageSquare className="mr-2" size={24} />
                Habla con Jamito IA
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200">
                <Search className="mr-2" size={24} />
                Buscar lugares
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            ¿Cómo funciona Jama?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Places */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Lugares populares
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {samplePlaces.map((place, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Heart size={16} />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm font-medium text-gray-700">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{place.type}</p>
                  <Button variant="outline" className="w-full">
                    <MapPin size={16} className="mr-2" />
                    Ver ubicación
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Zap size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para descubrir tu próximo lugar favorito?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de personas que ya encontraron su lugar perfecto con Jama
          </p>
          <Link to="/chat">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-orange-500 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
              <MessageSquare className="mr-2" size={24} />
              Comenzar ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-2xl font-bold">Jama</span>
          </div>
          <p className="text-gray-400">
            Encuentra el lugar perfecto para cada momento de tu vida.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
