import { useState, useEffect } from 'react';
import { BookingCard } from './BookingCard';
import { BookingStats } from './BookingStats';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  venueName: string;
  partySize: number;
  time: string;
  timestamp: Date;
  customerName: string;
  phone: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const VENUE_NAMES = [
  "The Grand Hall", "Sunset Terrace", "Garden Pavilion", "Crystal Ballroom", 
  "Rooftop Lounge", "Waterfront Vista", "Heritage Manor", "Sky Deck",
  "Bamboo Garden", "Metropolitan Suite", "Lakeside Retreat", "Downtown Loft"
];

const CUSTOMER_NAMES = [
  "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Thompson",
  "Jessica Williams", "Alex Martinez", "Amanda Davis", "Ryan Wilson",
  "Lisa Anderson", "Chris Taylor", "Maria Garcia", "James Brown"
];

const generateRandomBooking = (): Booking => {
  const now = new Date();
  const partySize = Math.floor(Math.random() * 180) + 20; // 20-200 people
  const hour = Math.floor(Math.random() * 10) + 10; // 10 AM - 8 PM
  const minute = Math.random() < 0.5 ? '00' : '30';
  const time = `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    venueName: VENUE_NAMES[Math.floor(Math.random() * VENUE_NAMES.length)],
    partySize,
    time,
    timestamp: now,
    customerName: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    status: Math.random() > 0.3 ? 'confirmed' : 'pending'
  };
};

export const BookingDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [newBookingId, setNewBookingId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const newBooking = generateRandomBooking();
      setNewBookingId(newBooking.id);
      setBookings(prev => [newBooking, ...prev].slice(0, 50)); // Keep only latest 50 bookings
      
      toast({
        title: "New Booking Received! 🎉",
        description: `${newBooking.customerName} - ${newBooking.venueName}`,
        duration: 3000,
      });

      // Clear the "new" highlight after 3 seconds
      setTimeout(() => setNewBookingId(''), 3000);
    }, 5000);

    return () => clearInterval(interval);
  }, [isRunning, toast]);

  // Initialize with some bookings
  useEffect(() => {
    const initialBookings = Array.from({ length: 5 }, generateRandomBooking);
    setBookings(initialBookings);
  }, []);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetBookings = () => {
    setBookings([]);
    setNewBookingId('');
  };

  const totalGuests = bookings.reduce((sum, booking) => sum + booking.partySize, 0);
  const estimatedRevenue = totalGuests * 85; // Estimate $85 per person
  const todayBookings = bookings.filter(booking => 
    booking.timestamp.toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Live Bookings Viewer
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time booking monitoring dashboard
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-primary text-primary">
              {isRunning ? 'Live' : 'Paused'}
            </Badge>
            <Button 
              onClick={toggleSimulation}
              variant={isRunning ? "destructive" : "default"}
              size="sm"
              className="gap-2"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? 'Pause' : 'Start'} Simulation
            </Button>
            <Button 
              onClick={resetBookings}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Stats */}
        <BookingStats 
          totalBookings={bookings.length}
          todayBookings={todayBookings}
          totalGuests={totalGuests}
          estimatedRevenue={estimatedRevenue}
        />

        {/* Bookings Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Recent Bookings ({bookings.length})
            </h2>
            {isRunning && (
              <Badge className="bg-gradient-success text-success-foreground animate-pulse">
                Receiving Live Updates
              </Badge>
            )}
          </div>
          
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No bookings yet. {isRunning ? 'Waiting for new bookings...' : 'Start the simulation to see bookings.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking}
                  isNew={booking.id === newBookingId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};