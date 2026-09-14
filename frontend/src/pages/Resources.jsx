import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
} from "lucide-react";

export default function Resources() {
  const defaultResources = [
    {
      id: 1,
      name: "Seminar Hall A",
      location: "Academic Block A",
      capacity: 120,
    },
    {
      id: 2,
      name: "Computer Lab 02",
      location: "Technology Block",
      capacity: 60,
    },
    {
      id: 3,
      name: "Conference Room",
      location: "Administration Block",
      capacity: 30,
    },
  ];

  const resources =
    JSON.parse(localStorage.getItem("campusResources")) ||
    defaultResources;

  return (
    <main className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">
            CAMPUS FACILITIES
          </span>

          <h1>Resources</h1>

          <p>
            View all available campus resources and facilities.
          </p>
        </div>

        <Link to="/admin" className="admin-back-btn">
          <ArrowLeft size={18} />
          Dashboard
        </Link>
      </div>

      <div className="resources-grid">
        {resources.map((resource) => (
          <div
            className="admin-resource-card"
            key={resource.id}
          >
            <div className="resource-card-icon">
              <Building2 size={26} />
            </div>

            <h2>{resource.name}</h2>

            <p>
              <MapPin size={16} />
              {resource.location}
            </p>

            <p>
              <Users size={16} />
              Capacity: {resource.capacity}
            </p>

            <span className="resource-available">
              Available
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}