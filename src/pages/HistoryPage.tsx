import React from 'react';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockHistory = [
  {
    id: '1',
    from: 'Hinjewadi',
    to: 'Shivajinagar',
    date: '2024-01-15',
    busNumber: 'MH-12-AB-1234',
    status: 'completed',
  },
  {
    id: '2', 
    from: 'Pune Station',
    to: 'Airport',
    date: '2024-01-14',
    busNumber: 'MH-12-EF-9012',
    status: 'completed',
  }
];

interface HistoryPageProps {
  onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-gradient-primary p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Journey History</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {mockHistory.map((journey) => (
          <Card key={journey.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{journey.busNumber}</Badge>
              <span className="text-sm text-muted-foreground">{journey.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{journey.from}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium">{journey.to}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;