import { TService } from "./Service";
import { TSlot } from "./Slot";

  export interface TBooking {
    _id: string;
    service: TService;
    slot: TSlot;
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }