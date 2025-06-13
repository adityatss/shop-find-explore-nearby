
import React from 'react';
import { MapPin, Users, Store, Heart, Star, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Location-Based Discovery',
      description: 'Find shops and services near you with our smart location technology.'
    },
    {
      icon: Store,
      title: 'Easy Shop Management',
      description: 'Create and manage your shop with our intuitive tools and real-time updates.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with local businesses and customers in your neighborhood.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is safe with us. We prioritize security and privacy.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
              <Heart size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
            About ShopExplore
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting communities through local discovery. We make it easy to find amazing products 
            and services right in your neighborhood while helping local businesses thrive.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To bridge the gap between local businesses and customers by creating a platform that 
              celebrates community commerce and makes local discovery effortless and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 inline-block">
                  <feature.icon size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-8">Growing Together</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Local Shops</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
