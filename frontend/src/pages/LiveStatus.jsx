import { useState } from "react";

import Navbar from "../components/Navbar";

import {
  Building2,
  Search,
  MapPin,
  Users,
  Wifi,
} from "lucide-react";

function LiveStatus() {
  const [search, setSearch] = useState("");

  const resources = [
    {
      name: "Seminar Hall A",
      location: "Academic Block A",
      capacity: "150",
      status: "Available",
    },
    {
      name: "Auditorium",
      location: "Main Campus",
      capacity: "300",
      status: "Occupied",
    },
    {
      name: "Computer Lab 02",
      location: "Technology Block",
      capacity: "60",
      status: "Pending",
    },
    {
      name: "Conference Room B",
      location: "Admin Block",
      capacity: "40",
      status: "Available",
    },
    {
      name: "Sports Hall",
      location: "Sports Complex",
      capacity: "200",
      status: "Available",
    },
    {
      name: "Seminar Hall C",
      location: "Academic Block B",
      capacity: "100",
      status: "Occupied",
    },
  ];

  const filteredResources = resources.filter((resource) =>
    resource.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="page-header live-header">
          <div>
            <p className="page-kicker">REAL-TIME CAMPUS STATUS</p>

            <h1>Live Resource Status 🟢</h1>

            <p className="page-subtitle">
              Monitor the current availability of campus
              resources.
            </p>
          </div>

          <div className="live-indicator">
            <span></span>
            Live Updates
          </div>
        </div>

        <div className="status-controls">
          <div className="status-search">
            <Search size={19} />

            <input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="status-legend">
            <span>
              <i className="available-dot"></i>
              Available
            </span>

            <span>
              <i className="occupied-dot"></i>
              Occupied
            </span>

            <span>
              <i className="pending-dot"></i>
              Pending
            </span>
          </div>
        </div>

        <div className="resource-grid">
          {filteredResources.map((resource, index) => (
            <div className="resource-card" key={index}>
              <div className="resource-card-top">
                <div className="resource-main-icon">
                  <Building2 />
                </div>

                <span
                  className={`live-status ${resource.status.toLowerCase()}`}
                >
                  {resource.status}
                </span>
              </div>

              <h3>{resource.name}</h3>

              <p>
                <MapPin size={15} />
                {resource.location}
              </p>

              <div className="resource-card-bottom">
                <span>
                  <Users size={16} />
                  {resource.capacity} Capacity
                </span>

                <span>
                  <Wifi size={16} />
                  WiFi
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default LiveStatus;