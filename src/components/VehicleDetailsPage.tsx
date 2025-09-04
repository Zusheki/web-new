import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, Fuel, Cog, MapPin, Star, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  type: string;
  price: number;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  description: string;
  specifications: {
    year: number;
    fuel: string;
    transmission: string;
    seats: number;
    mileage: string;
  };
  owner: {
    name: string;
    phone: string;
    email: string;
    rating: number;
    verified: boolean;
  };
  availability: {
    available: boolean;
    nextAvailable: string;
  };
}

interface VehicleDetailsPageProps {
  vehicle: any;
  onBack: () => void;
}

export function VehicleDetailsPage({ vehicle, onBack }: VehicleDetailsPageProps) {
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: ''
  });

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking vehicle:', vehicle.id);
  };

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Vehicles</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            {/* Vehicle Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{vehicle.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{vehicle.rating} ({vehicle.reviews} reviews)</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">${vehicle.price}</div>
                  <div className="text-sm text-gray-600">per day</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{vehicle.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {vehicle.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">${vehicle.price}</div>
                <div className="text-sm text-gray-600">per day</div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={selectedDates.startDate}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={selectedDates.endDate}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDates.startDate || !selectedDates.endDate}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}