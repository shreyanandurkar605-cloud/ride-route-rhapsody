import React, { useState } from 'react';
import SearchHeader from '@/components/SearchHeader';
import BusRoute from '@/components/BusRoute';
import SettingsDrawer from '@/components/SettingsDrawer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigation } from '@/App';
import heroImage from '@/assets/hero-bus-tracking.jpg';

// Mock data for bus routes
const mockBusRoutes = [
  {
    id: '1',
    busNumber: 'MH-12-AB-1234',
    busName: 'Pune - Mumbai Express',
    departureTime: '08:30',
    arrivalTime: '11:45',
    duration: '3h 15m',
    fare: 250,
    stops: ['Hinjewadi', 'Wakad', 'Baner', 'Aundh', 'Shivajinagar'],
    coaches: 45,
    status: 'on-time' as const,
  },
  {
    id: '2',
    busNumber: 'MH-12-CD-5678',
    busName: 'Shivaji Nagar Limited',
    departureTime: '09:15',
    arrivalTime: '12:00',
    duration: '2h 45m',
    fare: 180,
    stops: ['Kothrud', 'Deccan', 'FC Road', 'JM Road'],
    coaches: 35,
    status: 'delayed' as const,
  },
  {
    id: '3',
    busNumber: 'MH-12-EF-9012',
    busName: 'Airport Shuttle',
    departureTime: '10:00',
    arrivalTime: '11:30',
    duration: '1h 30m',
    fare: 120,
    stops: ['Viman Nagar', 'Kharadi', 'Hadapsar'],
    coaches: 25,
    status: 'on-time' as const,
  },
];

const SearchPage: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [busRoutes] = useState(mockBusRoutes);
  const { toast } = useToast();
  const { navigate } = useNavigation();

  const handleSearch = () => {
    if (from.trim() && to.trim()) {
      setShowResults(true);
      toast({
        title: "Searching buses...",
        description: `Finding routes from ${from} to ${to}`,
      });
    }
  };

  const handleSetAlarm = (busId: string) => {
    toast({
      title: "Alarm Set!",
      description: "You'll be notified 30 minutes before departure",
    });
  };

  const handleViewDetails = (busId: string) => {
    toast({
      title: "Route Details",
      description: "Detailed view coming soon!",
    });
  };

  const handleNavigate = (page: string) => {
    setIsSettingsOpen(false);
    if (page === 'history' || page === 'timetable') {
      navigate(page);
    } else {
      toast({
        title: page.charAt(0).toUpperCase() + page.slice(1),
        description: `${page} page coming soon!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <SearchHeader
        onMenuClick={() => setIsSettingsOpen(true)}
        from={from}
        to={to}
        date={date}
        onFromChange={setFrom}
        onToChange={setTo}
        onDateChange={setDate}
        onSearch={handleSearch}
      />

      <div className="px-4 pb-6">
        {!showResults ? (
          <div className="text-center py-8">
            {/* Hero Image */}
            <div className="relative mb-8 mx-auto max-w-md rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={heroImage} 
                alt="Bus tracking technology" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/20" />
            </div>
            
            <div className="animate-float mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <Navigation className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Find Your Perfect Bus Route</h2>
            <p className="text-muted-foreground mb-8 px-4">
              Enter your source and destination to discover available bus routes with real-time tracking.
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Card className="p-4 text-center hover:shadow-lg transition-smooth">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Real-time Tracking</h3>
                <p className="text-sm text-muted-foreground">Live bus locations</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-lg transition-smooth">
                <Navigation className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <h3 className="font-semibold mb-1">Multiple Routes</h3>
                <p className="text-sm text-muted-foreground">Compare options</p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Available Routes</h2>
                <p className="text-sm text-muted-foreground">
                  {from} → {to} • {busRoutes.length} buses found
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {busRoutes.map((route) => (
              <BusRoute
                key={route.id}
                {...route}
                onSetAlarm={() => handleSetAlarm(route.id)}
                onViewDetails={() => handleViewDetails(route.id)}
              />
            ))}
          </div>
        )}
      </div>

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default SearchPage;