import hotelModel from "../models/Hotel.js";

// CREATE
export const createHotel = async (req, res) => {
  const newHotel = new hotelModel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
// UPDATE
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
export const deleteHotel = async (req, res) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET
export const getHotelById = async (req, res) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL
export const getHotels = async (req, res) => {
  const { min, max, limit, ...others } = req.query;
  console.log(min, max, limit, others);
  try {
    const hotels = await hotelModel.find(others).limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

// COUNT BY CITY
export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};
// COUNT BY TYPE
export const countByType = async (req, res) => {
  try {
    const hotelCount = await hotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelModel.countDocuments({ type: "resort" });
    const villaCount = await hotelModel.countDocuments({ type: "villa" });
    const cabinCount = await hotelModel.countDocuments({ type: "cabin" });
    console.log("COUNMT BYT TYPE");
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
};
