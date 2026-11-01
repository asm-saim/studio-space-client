export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;
  hours: number;
  guests: number;
  notes: string;
  hourlyRate: number;
  totalPrice: number;
  securityDeposit: number;
  status: BookingStatus;
  createdAt: string;
};

export type BookingInput = {
  studioId: string;
  date: string;
  startTime: string;
  endTime: string;
  guests: number;
  notes: string;
};