import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

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

interface BookingCardProps {
  booking: Booking;
  isNew?: boolean;
}

export const BookingCard = ({ booking, isNew = false }: BookingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-gradient-success text-success-foreground';
      case 'pending':
        return 'bg-gradient-primary text-primary-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card 
      className={`
        border-border bg-gradient-secondary shadow-booking transition-smooth
        ${isNew ? 'animate-pulse shadow-glow' : ''} 
        hover:shadow-glow p-6 border
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-lg text-foreground">{booking.venueName}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{booking.customerName}</p>
          <p className="text-muted-foreground text-xs">{booking.phone}</p>
        </div>
        <Badge className={`${getStatusColor(booking.status)} capitalize`}>
          {booking.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Party Size</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Time</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Date</span>
        </div>
        
        <div className="font-medium text-foreground">{booking.partySize} people</div>
        <div className="font-medium text-foreground">{booking.time}</div>
        <div className="font-medium text-foreground">
          {booking.timestamp.toLocaleDateString()}
        </div>
      </div>
    </Card>
  );
};