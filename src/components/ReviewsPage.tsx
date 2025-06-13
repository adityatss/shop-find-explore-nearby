
import React from 'react';
import { Star, User, Calendar } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const reviews = [
    {
      id: 1,
      user: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Amazing platform! Found the perfect local bakery through ShopExplore. The location-based search is incredibly accurate.',
      shop: 'Sweet Dreams Bakery'
    },
    {
      id: 2,
      user: 'Mike Chen',
      rating: 5,
      date: '2024-01-12',
      comment: 'As a shop owner, this platform has been a game-changer. Easy to set up and manage my inventory. Highly recommended!',
      shop: 'Chen\'s Electronics'
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great concept and execution. The interface is clean and intuitive. Would love to see more filtering options.',
      shop: 'Local Grocery Store'
    },
    {
      id: 4,
      user: 'David Thompson',
      rating: 5,
      date: '2024-01-08',
      comment: 'Discovered so many hidden gems in my neighborhood! The community aspect is fantastic.',
      shop: 'Artisan Coffee House'
    },
    {
      id: 5,
      user: 'Lisa Park',
      rating: 4,
      date: '2024-01-05',
      comment: 'Very helpful for finding local services. The shop details are comprehensive and up-to-date.',
      shop: 'Park\'s Pet Supplies'
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Reviews</h1>
          <p className="text-lg text-gray-600 mb-6">
            See what our community is saying about ShopExplore
          </p>
          
          {/* Overall Rating */}
          <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-gray-600">
              Based on {reviews.length} reviews
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.user}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
              
              <div className="text-sm text-blue-600 font-medium">
                Reviewed: {review.shop}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-blue-100 mb-6">
            Help others discover great local businesses by sharing your review!
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
