import mongoose from "mongoose";
import { Service } from "../Service/service.model";
import { Slot } from "../Slot/slot.model";
import { CBooking } from "./booking.interface";
import { Booking } from "./booking.model";


const createBooking = async (bookingData: CBooking) => {
    const { serviceId, slotId, customerId, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate } = bookingData;
    
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Verify service existence
      const serviceM = await Service.findById(serviceId).session(session);
      if (!serviceM) {
        throw new Error('Service not found');
      }
  
      // Verify slot availability
      const slot = await Slot.findById(slotId).session(session);
      if (!slot || slot.isBooked !== 'available') {
        throw new Error('Slot not available');
      }
  
      // Create booking
      const booking = new Booking({
        customer: customerId,
        service: serviceId,
        slot: slot,
        vehicleType,
        vehicleBrand,
        vehicleModel,
        manufacturingYear,
        registrationPlate
      });
  
      const savedBooking = await booking.save({ session });
  
      // Update slot status
      slot.isBooked = 'booked';
      await slot.save({ session });
  
      await session.commitTransaction();
      session.endSession();
  
      // Populate booking with relevant data
      await (await (await savedBooking.populate('customer')).populate('service')).populate('slot');
  
      return savedBooking;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };


  export const BookingServices =  {
    createBooking
  };