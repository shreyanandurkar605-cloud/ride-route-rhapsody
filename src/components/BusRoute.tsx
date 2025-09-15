import React from 'react';
import { Clock, MapPin, Navigation, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BusRouteProps {
  busNumber: string;
  busName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  stops: string[];
  coaches: number;
  status: 'on-time' | 'delayed' | 'cancelled';
  onSetAlarm: () => void;
  onViewDetails: () => void;
}

const BusRoute: React.FC<BusRouteProps> = ({
  busNumber,
  busName,
  departureTime,
  arrivalTime,
  duration,
  fare,
  stops,
  coaches,
  status,
  onSetAlarm,
  onViewDetails,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'on-time': return 'bg-success text-success-foreground';
      case 'delayed': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-4 mb-4 hover:shadow-lg transition-smooth cursor-pointer" onClick={onViewDetails}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-lg text-primary">{busNumber}</h3>
            <Badge className={getStatusColor()}>
              {status === 'on-time' ? 'On Time' : status === 'delayed' ? 'Delayed' : 'Cancelled'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{busName}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">₹{fare}</p>
          <p className="text-xs text-muted-foreground">{coaches} coaches</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="font-bold text-xl">{departureTime}</p>
            <p className="text-xs text-muted-foreground">Departure</p>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="flex-1 h-px bg-border" />
              <Clock className="h-3 w-3" />
              <div className="flex-1 h-px bg-border" />
              <div className="w-2 h-2 bg-secondary rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground">{duration}</p>
          </div>
          
          <div className="text-center">
            <p className="font-bold text-xl">{arrivalTime}</p>
            <p className="text-xs text-muted-foreground">Arrival</p>
          </div>
        </div>
      </div>

      <Separator className="my-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Navigation className="h-4 w-4" />
          <span>{stops.length} stops</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSetAlarm();
          }}
          className="flex items-center space-x-1"
        >
          <Bell className="h-4 w-4" />
          <span>Set Alarm</span>
        </Button>
      </div>
    </Card>
  );
};

export default BusRoute;