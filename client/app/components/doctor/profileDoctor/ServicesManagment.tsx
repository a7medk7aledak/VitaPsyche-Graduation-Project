"use client";
import React, { useCallback, useEffect, useState } from "react";
import Service from "./Service";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import useAxios from "@hooks/useAxios";

interface Service {
  id: number;
  name: string;
  description?: string;
  price: string;
  duration: string;
  is_active?: boolean;
  category: number; //when connecting make it number
  doctors?: string[];
}

const API_URL = "/api/services";

const ServicesManagment = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [newService, setNewService] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    category: 0, //when connecting make it 0
    price: "",
    duration: "",
    is_active: true,
    doctors: [],
  });

  const axiosInstance = useAxios(); 
  
  const fetchServices = useCallback(async () => {
    try {
      const response = await axiosInstance.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveService = async () => {
    if (!validateService()) return; // Don't proceed if validation fails
    try {
      if (editingServiceId) {
        // Update service
        await axiosInstance.put(
          `/api/services?id=${editingServiceId}`,
          newService
        );
      } else {
        // Add new service
        await axiosInstance.post(API_URL, newService);
      }

      fetchServices();
      resetForm();
      setIsPopupVisible(false);
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEditService = (id: number) => {
    setEditingServiceId(id);
    const serviceToEdit = services.find((service) => service.id === id);
    if (serviceToEdit) setNewService(serviceToEdit);
    setIsPopupVisible(true);
  };

  const handleRemoveService = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/services?id=${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsPopupVisible(false);
  };

  const resetForm = () => {
    setEditingServiceId(null);
    setNewService({
      id: 0,
      name: "",
      description: "",
      category: 0, //when connecting make it 0
      price: "",
      duration: "",
      is_active: true,
      doctors: [],
    });
    setErrors({});
  };

  const validateService = () => {
    const formErrors: { [key: string]: string } = {};
    if (!newService.name) formErrors.name = "Service name is required.";
    if (!newService.category) formErrors.category = "Category is required.";
    if (!newService.price) {
      formErrors.price = "Price is required";
    } else if (parseInt(newService.price) <= 0) {
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
        {services.map((service) => {
          const categoryObj = categories.find(
            (cat) => cat.id === service.category
          );

          const categoryName = categoryObj
            ? categoryObj.name
            : "Unknown Category";

          return (
            <Service
              key={service.id}
              categoryName={categoryName}
              service={service}
              onEdit={handleEditService}
              onRemove={handleRemoveService}
            />
          );
        })}
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
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-1"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newService.description}
                  onChange={handleServiceChange}
                  id="description"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={newService.category}
                  onChange={handleServiceChange}
                  id="category"
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
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
                <label htmlFor="duration" className="block text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  name="duration"
                  value={newService.duration}
                  onChange={handleServiceChange}
                  className="w-full p-2 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[#8fd3d1] focus:ring-offset-2 transition duration-200"
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
