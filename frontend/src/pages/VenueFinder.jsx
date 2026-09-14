import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  Users,
  Calendar,
  Clock,
  Wifi,
  Wind,
  Monitor,
  Mic,
  Speaker,
  Laptop,
  Search,
  Check,
  Plus,
  Minus,
} from "lucide-react";

export default function VenueFinder() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventType: "",
    people: "",
    date: "",
    startTime: "",
    endTime: "",
    facilities: [],
    equipment: [],
  });

  const facilities = [
    { name: "WiFi", icon: <Wifi size={20} /> },
    { name: "Air Conditioning", icon: <Wind size={20} /> },
    { name: "Projector", icon: <Monitor size={20} /> },
  ];

  const equipmentList = [
    { name: "Microphone", icon: <Mic size={20} /> },
    { name: "Speaker", icon: <Speaker size={20} /> },
    { name: "Laptop", icon: <Laptop size={20} /> },
  ];

  /* MULTIPLE FACILITIES SELECT */

  const toggleFacility = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((item) => item !== facility)
        : [...prev.facilities, facility],
    }));
  };

  /* EQUIPMENT ADD / REMOVE */

  const updateEquipment = (equipmentName, action) => {
    setFormData((prev) => {
      const existing = prev.equipment.find(
        (item) => item.name === equipmentName
      );

      let updatedEquipment;

      if (action === "add") {
        if (existing) {
          updatedEquipment = prev.equipment.map((item) =>
            item.name === equipmentName
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedEquipment = [
            ...prev.equipment,
            { name: equipmentName, quantity: 1 },
          ];
        }
      } else {
        if (!existing) return prev;

        if (existing.quantity === 1) {
          updatedEquipment = prev.equipment.filter(
            (item) => item.name !== equipmentName
          );
        } else {
          updatedEquipment = prev.equipment.map((item) =>
            item.name === equipmentName
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
      }

      return {
        ...prev,
        equipment: updatedEquipment,
      };
    });
  };

  const getQuantity = (equipmentName) => {
    const item = formData.equipment.find(
      (item) => item.name === equipmentName
    );

    return item ? item.quantity : 0;
  };

  /* SUBMIT */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.eventType ||
      !formData.people ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert("Please fill all required details!");
      return;
    }

    navigate("/match-result", {
      state: formData,
    });
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="venue-finder-page">

          {/* HEADER */}

          <div className="venue-finder-header">
            <div>
              <p className="page-kicker">SMART RESOURCE FINDER</p>

              <h1>Find Your Perfect Resource</h1>

              <p>
                Tell us what you need and CampusFlow will find the
                best available resource for your event.
              </p>
            </div>
          </div>

          <form
            className="venue-finder-form"
            onSubmit={handleSubmit}
          >

            {/* EVENT DETAILS */}

            <section className="finder-section">
              <h2>Event Details</h2>

              <div className="form-grid">

                <div className="input-group">
                  <label>Event Type *</label>

                  <select
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        eventType: e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select Event Type
                    </option>

                    <option>Workshop</option>
                    <option>Seminar</option>
                    <option>Meeting</option>
                    <option>Competition</option>
                    <option>Lecture</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>
                    Number of People *
                  </label>

                  <div className="input-icon">
                    <Users size={18} />

                    <input
                      type="number"
                      placeholder="e.g. 100"
                      value={formData.people}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          people: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

              </div>
            </section>


            {/* DATE & TIME */}

            <section className="finder-section">
              <h2>Date & Time</h2>

              <div className="form-grid">

                <div className="input-group">
                  <label>Date *</label>

                  <div className="input-icon">
                    <Calendar size={18} />

                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>


                <div className="input-group">
                  <label>Start Time *</label>

                  <div className="input-icon">
                    <Clock size={18} />

                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>


                <div className="input-group">
                  <label>End Time *</label>

                  <div className="input-icon">
                    <Clock size={18} />

                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

              </div>
            </section>


            {/* MULTIPLE FACILITIES */}

            <section className="finder-section">

              <div className="section-title-row">
                <div>
                  <h2>Required Facilities</h2>

                  <p>
                    You can select multiple facilities.
                  </p>
                </div>
              </div>


              <div className="facility-selection-grid">

                {facilities.map((facility) => {
                  const selected =
                    formData.facilities.includes(
                      facility.name
                    );

                  return (
                    <button
                      type="button"
                      key={facility.name}
                      className={`facility-select-card ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() =>
                        toggleFacility(facility.name)
                      }
                    >

                      <div className="facility-icon">
                        {facility.icon}
                      </div>

                      <span>{facility.name}</span>

                      {selected && (
                        <div className="facility-check">
                          <Check size={15} />
                        </div>
                      )}

                    </button>
                  );
                })}

              </div>

            </section>


            {/* EQUIPMENT */}

            <section className="finder-section">

              <div className="section-title-row">
                <div>
                  <h2>Additional Equipment</h2>

                  <p>
                    Add equipment required for your event.
                  </p>
                </div>
              </div>


              <div className="equipment-grid">

                {equipmentList.map((equipment) => {
                  const quantity =
                    getQuantity(equipment.name);

                  return (
                    <div
                      className="equipment-card"
                      key={equipment.name}
                    >

                      <div className="equipment-info">

                        <div className="equipment-icon">
                          {equipment.icon}
                        </div>

                        <span>{equipment.name}</span>

                      </div>


                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() =>
                            updateEquipment(
                              equipment.name,
                              "remove"
                            )
                          }
                        >
                          <Minus size={16} />
                        </button>


                        <strong>{quantity}</strong>


                        <button
                          type="button"
                          onClick={() =>
                            updateEquipment(
                              equipment.name,
                              "add"
                            )
                          }
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                    </div>
                  );
                })}

              </div>

            </section>


            {/* BUTTON */}

            <button
              type="submit"
              className="find-resource-btn"
            >
              <Search size={20} />

              Find Smart Matches

            </button>

          </form>

        </div>
      </main>
    </div>
  );
}