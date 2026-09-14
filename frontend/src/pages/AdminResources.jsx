import { useState } from "react";
import {
  Building2,
  MapPin,
  Users,
  Plus,
  Trash2,
} from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminResources() {

  const defaultResources = [
    {
      id: 1,
      name: "Seminar Hall A",
      location: "Academic Block A",
      capacity: 120,
      status: "Available",
    },
    {
      id: 2,
      name: "Computer Lab 02",
      location: "Technology Block",
      capacity: 60,
      status: "Available",
    },
    {
      id: 3,
      name: "Conference Room",
      location: "Administration Block",
      capacity: 30,
      status: "Available",
    },
  ];


  const [resources, setResources] = useState(
    JSON.parse(localStorage.getItem("campusResources")) ||
      defaultResources
  );

  const [showForm, setShowForm] = useState(false);

  const [newResource, setNewResource] = useState({
    name: "",
    location: "",
    capacity: "",
  });


  const addResource = (e) => {

    e.preventDefault();

    const resource = {
      id: Date.now(),
      ...newResource,
      capacity: Number(newResource.capacity),
      status: "Available",
    };

    const updated = [...resources, resource];

    setResources(updated);

    localStorage.setItem(
      "campusResources",
      JSON.stringify(updated)
    );

    setNewResource({
      name: "",
      location: "",
      capacity: "",
    });

    setShowForm(false);
  };


  const deleteResource = (id) => {

    const updated = resources.filter(
      (resource) => resource.id !== id
    );

    setResources(updated);

    localStorage.setItem(
      "campusResources",
      JSON.stringify(updated)
    );
  };


  return (

    <div className="admin-layout">

      <AdminNavbar />


      <main className="admin-main admin-page-main">


        {/* TOP */}

        <div className="admin-page-topbar">

          <div>

            <span className="admin-kicker">
              RESOURCE MANAGEMENT
            </span>

            <h1>
              Campus Resources
            </h1>

            <p>
              Add, manage and monitor all available campus
              facilities.
            </p>

          </div>


          <button
            className="admin-primary-btn"
            onClick={() =>
              setShowForm(!showForm)
            }
          >

            <Plus size={18} />

            Add Resource

          </button>

        </div>


        {/* ADD FORM */}

        {showForm && (

          <form
            className="admin-resource-form"
            onSubmit={addResource}
          >

            <input
              type="text"
              placeholder="Resource Name"
              value={newResource.name}
              onChange={(e) =>
                setNewResource({
                  ...newResource,
                  name: e.target.value,
                })
              }
              required
            />


            <input
              type="text"
              placeholder="Location"
              value={newResource.location}
              onChange={(e) =>
                setNewResource({
                  ...newResource,
                  location: e.target.value,
                })
              }
              required
            />


            <input
              type="number"
              placeholder="Capacity"
              value={newResource.capacity}
              onChange={(e) =>
                setNewResource({
                  ...newResource,
                  capacity: e.target.value,
                })
              }
              required
            />


            <button type="submit">
              Save Resource
            </button>

          </form>

        )}


        {/* RESOURCES */}

        <div className="resources-grid">

          {resources.map((resource) => (

            <div
              className="admin-resource-card"
              key={resource.id}
            >

              <div className="resource-card-icon">

                <Building2 size={25} />

              </div>


              <h2>
                {resource.name}
              </h2>


              <p>

                <MapPin size={16} />

                {resource.location}

              </p>


              <p>

                <Users size={16} />

                Capacity: {resource.capacity}

              </p>


              <span className="resource-available">

                {resource.status}

              </span>


              <button
                className="delete-resource-btn"
                onClick={() =>
                  deleteResource(resource.id)
                }
              >

                <Trash2 size={17} />

                Remove

              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}