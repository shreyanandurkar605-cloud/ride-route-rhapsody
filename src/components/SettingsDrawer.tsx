import React from 'react';
import { X, Moon, Sun, Globe, Settings, Share, Star, AlertTriangle, Lightbulb, History, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useApp, languages } from '@/contexts/AppContext';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  const { theme, language, toggleTheme, setLanguage } = useApp();

  const menuItems = [
    { icon: History, label: 'History', action: () => onNavigate('history') },
    { icon: Clock, label: 'Timetable', action: () => onNavigate('timetable') },
    { icon: Settings, label: 'Settings', action: () => onNavigate('settings') },
    { icon: Share, label: 'Share App', action: () => navigator.share?.({ title: 'Bus Finder App', url: window.location.origin }) },
    { icon: Star, label: 'Rate Us', action: () => window.open('https://play.google.com/store', '_blank') },
    { icon: AlertTriangle, label: 'Report Issue', action: () => onNavigate('report') },
    { icon: Lightbulb, label: 'Suggest Feature', action: () => onNavigate('suggest') },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Bus Finder
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>Theme</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="transition-smooth"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Language</span>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start space-x-3 h-12"
                onClick={item.action}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer;