import React, { useState } from 'react';
import { ArrowLeft, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockTimetable = [
  { busNumber: 'MH-12-AB-1234', route: 'Hinjewadi - Shivajinagar', times: ['06:30', '08:30', '10:30', '12:30', '14:30', '16:30', '18:30'] },
  { busNumber: 'MH-12-CD-5678', route: 'Kothrud - Deccan', times: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
  { busNumber: 'MH-12-EF-9012', route: 'Viman Nagar - Airport', times: ['05:30', '06:30', '07:30', '08:30', '09:30', '10:30', '11:30'] },
];

interface TimetablePageProps {
  onBack: () => void;
}

const TimetablePage: React.FC<TimetablePageProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const filteredTimetable = mockTimetable.filter(bus => 
    bus.busNumber.toLowerCase().includes(search.toLowerCase()) ||
    bus.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-gradient-primary p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Bus Timetable</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bus number or route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/95"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredTimetable.map((bus) => (
          <Card key={bus.busNumber} className="p-4">
            <div className="mb-3">
              <Badge variant="outline" className="mb-2">{bus.busNumber}</Badge>
              <h3 className="font-semibold">{bus.route}</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {bus.times.map((time, index) => (
                <div key={index} className="flex items-center justify-center bg-muted rounded-lg p-2">
                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="text-sm font-medium">{time}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TimetablePage;