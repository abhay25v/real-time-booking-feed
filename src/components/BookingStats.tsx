import { Card } from "@/components/ui/card";
import { Calendar, TrendingUp, Users, DollarSign } from "lucide-react";

interface BookingStatsProps {
  totalBookings: number;
  todayBookings: number;
  totalGuests: number;
  estimatedRevenue: number;
}

export const BookingStats = ({ totalBookings, todayBookings, totalGuests, estimatedRevenue }: BookingStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-secondary border-border shadow-booking">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-foreground">{totalBookings}</p>
          </div>
          <Calendar className="h-8 w-8 text-primary" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-secondary border-border shadow-booking">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Today's Bookings</p>
            <p className="text-2xl font-bold text-foreground">{todayBookings}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-success" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-secondary border-border shadow-booking">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Total Guests</p>
            <p className="text-2xl font-bold text-foreground">{totalGuests}</p>
          </div>
          <Users className="h-8 w-8 text-primary" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-secondary border-border shadow-booking">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Est. Revenue</p>
            <p className="text-2xl font-bold text-foreground">${estimatedRevenue.toLocaleString()}</p>
          </div>
          <DollarSign className="h-8 w-8 text-success" />
        </div>
      </Card>
    </div>
  );
};