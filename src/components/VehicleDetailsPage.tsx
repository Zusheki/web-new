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
  vehicleId: number;
  onBack: () => void;
  onBooking: (vehicleId: number) => void;
  user: any;
  onShowLogin: () => void;
}

export default function VehicleDetailsPage({ vehicleId, onBack, onBooking, user, onShowLogin }: VehicleDetailsPageProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    // Simulate API call to fetch vehicle details
    const fetchVehicle = async () => {
      setLoading(true);
      // Mock data - in real app, this would be an API call
      const mockVehicle: Vehicle = {
        id: vehicleId,
        name: 'Toyota Camry 2023',
        type: 'Sedan',
        price: 45,
        location: 'Downtown, City Center',
        image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: 4.8,
        reviews: 127,
        features: ['GPS Navigation', 'Bluetooth', 'Air Conditioning', 'Backup Camera', 'USB Charging'],
        description: 'Experience comfort and reliability with our 2023 Toyota Camry. Perfect for business trips, family outings, or daily commuting. This well-maintained vehicle offers excellent fuel efficiency and a smooth driving experience.',
        specifications: {
          year: 2023,
          fuel: 'Gasoline',
          transmission: 'Automatic',
          seats: 5,
          mileage: '32 MPG'
        },
        owner: {
          name: 'John Smith',
          phone: '+1 (555) 123-4567',
          email: 'john.smith@email.com',
          rating: 4.9,
          verified: true
        },
        availability: {
          available: true,
          nextAvailable: '2024-01-15'
        }
      };
      
      setTimeout(() => {
        setVehicle(mockVehicle);
        setLoading(false);
      }, 500);
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleBooking = () => {
    if (!user) {
      onShowLogin();
      return;
    }
    onBooking(vehicleId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{vehicle.specifications.year}</div>
                    <div className="text-xs text-gray-600">Year</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Fuel className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{vehicle.specifications.fuel}</div>
                    <div className="text-xs text-gray-600">Fuel Type</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Cog className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{vehicle.specifications.transmission}</div>
                    <div className="text-xs text-gray-600">Transmission</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{vehicle.specifications.seats}</div>
                    <div className="text-xs text-gray-600">Seats</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Owner</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{vehicle.owner.name}</h4>
                    {vehicle.owner.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{vehicle.owner.rating} rating</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <a
                    href={`tel:${vehicle.owner.phone}`}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${vehicle.owner.email}`}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </a>
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

              {/* Availability Status */}
              <div className="mb-6">
                {vehicle.availability.available ? (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Available Now</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 p-3 rounded-lg">
                    <Clock className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Not Available</div>
                      <div className="text-sm">Next available: {vehicle.availability.nextAvailable}</div>
                    </div>
                  </div>
                )}
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

              {/* Booking Summary */}
              {selectedDates.startDate && selectedDates.endDate && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Daily Rate:</span>
                      <span>${vehicle.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>
                        {Math.ceil((new Date(selectedDates.endDate).getTime() - new Date(selectedDates.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                    <div className="border-t pt-1 mt-2 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>
                        ${vehicle.price * Math.ceil((new Date(selectedDates.endDate).getTime() - new Date(selectedDates.startDate).getTime()) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Now Button */}
              <button
                onClick={handleBooking}
                disabled={!vehicle.availability.available || !selectedDates.startDate || !selectedDates.endDate}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {!user ? 'Login to Book' : 'Book Now'}
              </button>

              {/* Contact Owner */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Contact Owner</h4>
                <div className="space-y-2">
                  <a
                    href={`tel:${vehicle.owner.phone}`}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{vehicle.owner.phone}</span>
                  </a>
                  <a
                    href={`mailto:${vehicle.owner.email}`}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{vehicle.owner.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}