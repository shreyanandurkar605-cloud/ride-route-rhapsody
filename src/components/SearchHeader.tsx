import React from 'react';
import { MapPin, Menu, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SearchHeaderProps {
  onMenuClick: () => void;
  from: string;
  to: string;
  date: Date;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onDateChange: (date: Date) => void;
  onSearch: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  onMenuClick,
  from,
  to,
  date,
  onFromChange,
  onToChange,
  onDateChange,
  onSearch,
}) => {
  const isToday = format(new Date(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  const isTomorrow = format(new Date(Date.now() + 86400000), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');

  return (
    <div className="sticky top-0 z-50 bg-gradient-primary shadow-lg">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuClick}
            className="text-primary-foreground hover:bg-white/20"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Bus Finder</h1>
          <div className="w-10" />
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <Input
                placeholder="From (Source)"
                value={from}
                onChange={(e) => onFromChange(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
              <Input
                placeholder="To (Destination)"
                value={to}
                onChange={(e) => onToChange(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant={isToday ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDateChange(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant={isTomorrow ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDateChange(new Date(Date.now() + 86400000))}
                >
                  Tomorrow
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {!isToday && !isTomorrow && format(date, 'dd MMM')}
                      {(isToday || isTomorrow) && 'Calendar'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && onDateChange(date)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button 
              onClick={onSearch} 
              className="w-full gradient-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-smooth"
              disabled={!from.trim() || !to.trim()}
            >
              Find Buses
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SearchHeader;