import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import { getCurrentUser } from "../../service/authService";

const availableServices = ["Driver", "Plumber", "Electrician", "Cleaner"];
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

const DRIVER_BASE_FARE = 200;
const DRIVER_FREE_KM = 10;
const DRIVER_RATE_PER_KM = 20;
const OTHER_SERVICE_BOOKING_FEE = 200;

function parseLocationCoordinates(value) {
  if (!value) return null;

  const match = value.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!match) return null;

  return {
    lat: Number(match[1]),
    lng: Number(match[2]),
  };
}

function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function calculateDriverFare(pickup, destination) {
  const pickupCoords = parseLocationCoordinates(pickup);
  const destinationCoords = parseLocationCoordinates(destination);

  let distanceKm = 10;

  if (pickupCoords && destinationCoords) {
    distanceKm = haversineDistanceKm(
      pickupCoords.lat,
      pickupCoords.lng,
      destinationCoords.lat,
      destinationCoords.lng
    );
  }

  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    distanceKm = 10;
  }

  const totalKm = Math.max(distanceKm, 1);
  const extraKm = Math.max(0, totalKm - DRIVER_FREE_KM);
  const estimatedFare = DRIVER_BASE_FARE + extraKm * DRIVER_RATE_PER_KM;

  return {
    distanceKm: Math.round(totalKm),
    totalFare: Math.round(estimatedFare),
    minimumFare: DRIVER_BASE_FARE,
  };
}

function calculateServiceEstimate(form) {
  if (form.service === "Driver") {
    const fare = calculateDriverFare(form.pickup, form.destination);
    return {
      type: "driver",
      estimatedAmount: fare.totalFare,
      distanceKm: fare.distanceKm,
      minimumAmount: fare.minimumFare,
      payNow: fare.totalFare,
      balanceAfterService: 0,
    };
  }

  return {
    type: "service",
    estimatedAmount: OTHER_SERVICE_BOOKING_FEE,
    distanceKm: 0,
    minimumAmount: OTHER_SERVICE_BOOKING_FEE,
    payNow: OTHER_SERVICE_BOOKING_FEE,
    balanceAfterService: "To be settled after completion",
  };
}

function BookService() {
  const currentUser = getCurrentUser();
  const today = new Date();
  const todayString = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const [form, setForm] = useState({
    customerName: currentUser?.name || "",
    phone: currentUser?.phone || "",
    pickup: "",
    destination: "",
    address: "",
    issue: "",
    date: "",
    timeSlot: "",
    service: "Driver",
  });
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const isDriverService = form.service === "Driver";
  const isElectricianService = form.service === "Electrician";
  const pricingSummary = calculateServiceEstimate(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setForm((prev) => {
      if (name === "service") {
        return {
          ...prev,
          service: value,
          pickup: value === "Driver" ? prev.pickup : "",
          destination: value === "Driver" ? prev.destination : "",
          address: value === "Driver" ? "" : prev.address,
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const validateBooking = () => {
    const { date, timeSlot } = form;

    if (!date) {
      return "Please select a booking date.";
    }

    if (!timeSlot) {
      return "Please select a time slot.";
    }

    if (isDriverService) {
      if (!form.pickup.trim()) {
        return "Please enter the pickup location.";
      }

      if (!form.destination.trim()) {
        return "Please enter the destination.";
      }
    } else {
      if (!form.address.trim()) {
        return "Please enter the house address or landmark.";
      }

      if (isElectricianService && !form.issue.trim()) {
        return "Please describe the electrical issue.";
      }
    }

    const selectedDate = new Date(`${date}T00:00:00`);
    const todayDate = new Date(`${todayString}T00:00:00`);

    if (selectedDate < todayDate) {
      return "Booking date cannot be before today.";
    }

    if (selectedDate.getTime() === todayDate.getTime()) {
      const [timeText, meridiem] = timeSlot.split(" ");
      let [hours, minutes] = timeText.split(":").map(Number);

      if (meridiem === "PM" && hours !== 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;

      const selectedDateTime = new Date(date);
      selectedDateTime.setHours(hours, minutes, 0, 0);

      const minimumAllowedTime = new Date();
      minimumAllowedTime.setHours(minimumAllowedTime.getHours() + 1);

      if (selectedDateTime < minimumAllowedTime) {
        return "For today’s booking, the time slot must be at least 1 hour after the current time.";
      }
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateBooking();
    if (validationError) {
      setError(validationError);
      return;
    }

    const locationText = isDriverService
      ? `Pickup: ${form.pickup} to ${form.destination}`
      : `Service address: ${form.address}`;
    const issueText = isElectricianService ? ` Issue: ${form.issue}` : "";

    alert(
      `Booking created for ${form.customerName}. ` +
        `Estimated fare: ₹${pricingSummary.estimatedAmount}. ` +
        `${locationText}. Service: ${form.service}.` +
        `${issueText} Date: ${form.date} at ${form.timeSlot}.`
    );
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentLocationText = `Current Location (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;

        setForm((prev) => ({
          ...prev,
          pickup: isDriverService ? currentLocationText : prev.pickup,
          address: isDriverService ? prev.address : currentLocationText,
        }));
        setLocationStatus("Current location captured successfully.");
        setError("");

        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(mapsUrl, "_blank", "noopener,noreferrer");
      },
      () => {
        setError("Unable to access your current location. Please enter the pickup manually.");
        setLocationStatus("");
      }
    );
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <BackButton />
      <h1>Book a Service</h1>
      <p>Local service booking for Mukkom / Kozhikode area</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <input
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
          style={inputStyle}
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          style={inputStyle}
        />
        <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
          {availableServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {isDriverService ? (
          <>
            <div style={{ display: "grid", gap: "8px" }}>
              <input
                name="pickup"
                value={form.pickup}
                onChange={handleChange}
                placeholder="Pickup Location"
                style={inputStyle}
              />
              <button type="button" onClick={handleUseCurrentLocation} style={secondaryButtonStyle}>
                Use my current location
              </button>
              {locationStatus && <small style={{ color: "green" }}>{locationStatus}</small>}
            </div>
            <input
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="Destination"
              style={inputStyle}
            />
          </>
        ) : (
          <>
            <div style={{ display: "grid", gap: "8px" }}>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House address / landmark"
                style={inputStyle}
              />
              <button type="button" onClick={handleUseCurrentLocation} style={secondaryButtonStyle}>
                Use current location
              </button>
              {locationStatus && <small style={{ color: "green" }}>{locationStatus}</small>}
            </div>
            {isElectricianService && (
              <textarea
                name="issue"
                value={form.issue}
                onChange={handleChange}
                placeholder="Describe the electrical issue (for example: switch not working, short circuit, fan issue)"
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            )}
          </>
        )}

        <input
          type="date"
          name="date"
          value={form.date}
          min={todayString}
          onChange={handleChange}
          style={inputStyle}
        />

        <select name="timeSlot" value={form.timeSlot} onChange={handleChange} style={inputStyle}>
          <option value="">Select time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        

        {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

        <div style={{ background: "#f3f4f6", padding: "12px 16px", borderRadius: "8px", display: "grid", gap: "6px" }}>
          {isDriverService ? (
            <>
              <div>Estimated charge: <strong>₹{pricingSummary.estimatedAmount}</strong></div>
              <div>Distance estimate: <strong>{pricingSummary.distanceKm} km</strong></div>
              <div>Minimum fare: <strong>₹{pricingSummary.minimumAmount}</strong> for first 10 km</div>
              <div>Extra distance rate: <strong>₹{DRIVER_RATE_PER_KM}/km</strong> after 10 km</div>
            </>
          ) : (
            <>
              <div>Minimum booking charge: <strong>₹{pricingSummary.estimatedAmount}</strong></div>
              <div>Pay now: <strong>₹{pricingSummary.payNow}</strong></div>
              <div>Balance after service: <strong>{pricingSummary.balanceAfterService}</strong></div>
            </>
          )}
        </div>

        <button type="submit" style={buttonStyle}>Confirm Booking</button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "12px 16px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const secondaryButtonStyle = {
  padding: "10px 12px",
  background: "#e5e7eb",
  color: "#111827",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default BookService;
