"use client";
import React, { useState } from "react";
import Service from "./Service";
import { categories } from "@constants/categories";

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: string;
}

const categoriesTitles = categories.map((category) => category.title);

const ServicesManagment = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Service 1",
      category: "Psychology",
      price: 50,
      duration: "30",
    },
    {
      id: 2,
      name: "Service 2",
      category: "Consultation",
      price: 75,
      duration: "60",
    },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [newService, setNewService] = useState<Service>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    duration: "",
  });

  // useEffect(() => {
  //   fetchServices();
  // }, []);

  // const fetchServices = async () => {
  //   try {
  //     const response = await fetch("/api/services");
  //     const data = await response.json();
  //     setServices(data);
  //   } catch (error) {
  //     console.error("Failed to fetch services:", error);
  //   }
  // };

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveService = () => {
    if (!validateService()) return; // Don't proceed if validation fails
    if (editingServiceId) {
      //to check if it will be for editing or adding anew service
      setServices((prev) =>
        prev.map((service) =>
          service.id === editingServiceId
            ? { ...service, ...newService }
            : service
        )
      );
    } else {
      setServices((prev) => [...prev, { ...newService, id: prev.length + 1 }]);
    }
    resetForm();
    setIsPopupVisible(false);
  };

  //  const handleSaveService = async () => {
  //    if (!validateService()) return; // Don't proceed if validation fails

  //    const endpoint = editingServiceId
  //      ? `/api/services/${editingServiceId}`
  //      : "/api/services";
  //    const method = editingServiceId ? "PUT" : "POST";

  //    try {
  //      const response = await fetch(endpoint, {
  //        method: method,
  //        headers: {
  //          "Content-Type": "application/json",
  //        },
  //        body: JSON.stringify(newService),
  //      });

  //      if (!response.ok) throw new Error("Failed to save service");

  //      fetchServices(); // Refresh the list
  //      resetForm();
  //      setIsPopupVisible(false);
  //    } catch (error) {
  //      console.error("Error saving service:", error);
  //    }
  //  };

  const handleEditService = (id: number) => {
    setEditingServiceId(id);
    const serviceToEdit = services.find((service) => service.id === id);
    if (serviceToEdit) setNewService(serviceToEdit);
    setIsPopupVisible(true);
  };

  const handleRemoveService = (id: number) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  const handleCancel = () => {
    resetForm();
    setIsPopupVisible(false);
  };

  //  const handleRemoveService = async (id: number) => {
  //    try {
  //      const response = await fetch(`/api/services/${id}`, {
  //        method: "DELETE",
  //      });

  //      if (!response.ok) throw new Error("Failed to delete service");

  //      fetchServices(); // Refresh the list
  //    } catch (error) {
  //      console.error("Error deleting service:", error);
  //    }
  //  };

  const resetForm = () => {
    setEditingServiceId(null);
    setNewService({ id: 0, name: "", category: "", price: 0, duration: "" });
    setErrors({});
  };

  const validateService = () => {
    const formErrors: { [key: string]: string } = {};
    if (!newService.name) formErrors.name = "Service name is required.";
    if (!newService.category) formErrors.category = "Category is required.";
    if (!newService.price) {
      formErrors.price = "Price is required";
    } else if (newService.price <= 0) {
      formErrors.price = "Price must be a positive number.";
    }
    if (!newService.duration) formErrors.duration = "Duration is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  return (
    <div className="space-y-6 relative">
      <h2 className="text-3xl font-semibold text-gray-800">Services</h2>
      <div className="space-y-6">
        {services.map((service) => (
          <Service
            key={service.id}
            service={service}
            onEdit={handleEditService}
            onRemove={handleRemoveService}
          />
        ))}
        <button
          onClick={() => setIsPopupVisible(true)}
          className="mt-4 px-6 py-2 bg-[#00bfa5] hover:bg-[#139485] transition text-white rounded"
        >
          Add Service
        </button>
      </div>
      {/* Popup Modal of adding service and editing services */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingServiceId ? "Edit Service" : "Add Service"}
            </h2>

            {/* Form Inputs */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="serviceName"
                  className="block text-gray-700 mb-1"
                >
                  Service Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newService.name}
                  onChange={handleServiceChange}
                  id="serviceName"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={newService.category}
                  onChange={handleServiceChange}
                  id="category"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="">Select Category</option>
                  {categoriesTitles.map((category: string, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={newService.price}
                  onChange={handleServiceChange}
                  id="price"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label htmlFor="duration" className="block text-gray-700">
                  Duration
                </label>
                <select
                  name="duration"
                  value={newService.duration}
                  onChange={handleServiceChange}
                  className="w-full p-3 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                >
                  <option value="">select</option>
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                </select>
                {errors.duration && (
                  <p className="text-red-500 text-sm">{errors.duration}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleSaveService}
                  className="px-4 py-2 bg-[#00bfa5] hover:bg-[#139485] transition text-white rounded-md"
                >
                  {editingServiceId ? "Save" : "Add"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagment;
