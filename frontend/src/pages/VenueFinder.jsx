import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  Search,
  Users,
  CalendarDays,
  Clock,
  Building2,
  Sparkles,
  Wifi,
  Wind,
  Monitor,
  Mic,
  Speaker,
  Laptop,
  Check,
  Plus,
  Minus,
} from "lucide-react";

function VenueFinder() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    resourceType: "",
    people: "",
    date: "",
    startTime: "",
    endTime: "",
    facilities: [],
    equipment: [],
  });

  const facilities = [
    {
      name: "Projector",
      icon: <Monitor size={20} />,
    },
    {
      name: "WiFi",
      icon: <Wifi size={20} />,
    },
    {
      name: "Air Conditioning",
      icon: <Wind size={20} />,
    },
  ];

  const equipmentList = [
    {
      name: "Microphone",
      icon: <Mic size={20} />,
    },
    {
      name: "Speaker",
      icon: <Speaker size={20} />,
    },
    {
      name: "Laptop",
      icon: <Laptop size={20} />,
    },
  ];

  // Select / unselect facilities
  const toggleFacility = (facilityName) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facilityName)
        ? prev.facilities.filter((item) => item !== facilityName)
        : [...prev.facilities, facilityName],
    }));
  };

  // Add / remove equipment
  const updateEquipment = (equipmentName, action) => {
    setFormData((prev) => {
      const existingItem = prev.equipment.find(
        (item) => item.name === equipmentName
      );

      let updatedEquipment;

      if (action === "add") {
        if (existingItem) {
          updatedEquipment = prev.equipment.map((item) =>
            item.name === equipmentName
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        } else {
          updatedEquipment = [
            ...prev.equipment,
            {
              name: equipmentName,
              quantity: 1,
            },
          ];
        }
      } else {
        if (!existingItem) {
          return prev;
        }

        if (existingItem.quantity === 1) {
          updatedEquipment = prev.equipment.filter(
            (item) => item.name !== equipmentName
          );
        } else {
          updatedEquipment = prev.equipment.map((item) =>
            item.name === equipmentName
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
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

  // Get equipment quantity
  const getQuantity = (equipmentName) => {
    const item = formData.equipment.find(
      (item) => item.name === equipmentName
    );

    return item ? item.quantity : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/match-result", {
      state: formData,
    });
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <p className="page-kicker">
              SMART RESOURCE FINDER
            </p>

            <h1>Find Your Perfect Resource 🔍</h1>

            <p className="page-subtitle">
              Enter your requirements and CampusFlow will find the
              best available campus resource for you.
            </p>
          </div>
        </div>

        <div className="finder-layout">
          {/* LEFT INFORMATION SECTION */}
          <div className="finder-info">
            <div className="finder-icon">
              <Sparkles size={32} />
            </div>

            <h2>Smart Matching</h2>

            <p>
              CampusFlow analyzes your requirements including
              capacity, facilities, equipment and availability.
            </p>

            <div className="matching-steps">
              <div>
                <span>01</span>
                <p>Enter Requirements</p>
              </div>

              <div>
                <span>02</span>
                <p>Check Availability</p>
              </div>

              <div>
                <span>03</span>
                <p>Get Best Matches</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            className="finder-form"
            onSubmit={handleSubmit}
          >
            <h2>Tell Us What You Need</h2>

            {/* BASIC DETAILS */}
            <div className="form-grid">

              <div className="form-group">
                <label>
                  <Building2 size={16} />
                  Resource Type
                </label>

                <select
                  required
                  value={formData.resourceType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      resourceType: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select Resource
                  </option>

                  <option>Seminar Hall</option>
                  <option>Auditorium</option>
                  <option>Computer Lab</option>
                  <option>Conference Room</option>
                  <option>Sports Facility</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <Users size={16} />
                  Number of Attendees
                </label>

                <input
                  type="number"
                  placeholder="e.g. 100"
                  required
                  value={formData.people}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      people: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  <CalendarDays size={16} />
                  Date
                </label>

                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  <Clock size={16} />
                  Start Time
                </label>

                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  <Clock size={16} />
                  End Time
                </label>

                <input
                  type="time"
                  required
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

            {/* REQUIRED FACILITIES */}
            <div className="requirements-section">
              <h3>Required Facilities</h3>

              <p className="section-description">
                Select all facilities required for your event.
              </p>

              <div className="facility-selection-grid">
                {facilities.map((facility) => {
                  const isSelected =
                    formData.facilities.includes(
                      facility.name
                    );

                  return (
                    <button
                      type="button"
                      key={facility.name}
                      className={`facility-select-card ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() =>
                        toggleFacility(facility.name)
                      }
                    >
                      <div className="facility-icon">
                        {facility.icon}
                      </div>

                      <span>{facility.name}</span>

                      {isSelected && (
                        <div className="facility-check">
                          <Check size={15} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ADDITIONAL EQUIPMENT */}
            <div className="requirements-section">
              <h3>Additional Equipment</h3>

              <p className="section-description">
                Add the equipment required for your event.
              </p>

              <div className="equipment-grid">
                {equipmentList.map((equipment) => {
                  const quantity = getQuantity(
                    equipment.name
                  );

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
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn-primary finder-submit"
            >
              <Search size={19} />
              Find Smart Matches
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}

export default VenueFinder;