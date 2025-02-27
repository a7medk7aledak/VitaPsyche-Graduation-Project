import useAxios from "@hooks/useAxios";
import { isAxiosError } from "axios";
import { useState, useEffect } from "react";

interface ICertifacteProps {
  doctorId?: string | "" | null;
  hasEditPermission: boolean;
}
interface Certificate {
  id?: number;
  certificate_name: string;
  description?: string;
  start_date: string;
  end_date: string;
  doctor_id?: number;
}

export function Certificates({
  doctorId,
  hasEditPermission,
}: ICertifacteProps) {
  const axiosInstance = useAxios();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Certificate>({
    certificate_name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      // If doctorId is present in URL, fetch certificates for that doctor
      const endpoint = doctorId
        ? `/api/certificates?doctorId=${doctorId}`
        : "/api/certificates";
      const response = await axiosInstance.get(endpoint);
      setCertificates(response.data);
    } catch (err) {
      setError("Failed to load certificates. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ensure doctor_id is set if we're using URL doctorId

      if (editingId) {
        await axiosInstance.put(`/api/certificates?id=${editingId}`, formData);
      } else {
        await axiosInstance.post("/api/certificates", formData);
      }

      // Refresh certificates list and reset form
      fetchCertificates();
      resetForm();
    } catch (error) {
      setError(
        editingId ? "Failed to update certificate" : "Failed to add certificate"
      );
      if (isAxiosError(error)) {
        const { status, data } = error?.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
      }
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;

    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        await axiosInstance.delete(`/api/certificates?id=${id}`);
        fetchCertificates();
      } catch (err) {
        setError("Failed to delete certificate");
        console.error(err);
      }
    }
  };

  const handleEdit = (cert: Certificate) => {
    setFormData({
      certificate_name: cert.certificate_name,
      description: cert.description,
      start_date: cert.start_date,
      end_date: cert.end_date,
    });
    setEditingId(cert.id || null);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      certificate_name: "",
      description: "",
      start_date: "",
      end_date: "",
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Format date range for display
  const formatDateRange = (startDate: string, endDate: string) => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleCancel = () => {
    setIsFormOpen(!isFormOpen);
    setFormData({
      certificate_name: "",
      description: "",
      start_date: "",
      end_date: "",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Certificates</h2>
        {hasEditPermission && (
          <button
            onClick={handleCancel}
            className="bg-button text-white px-4 py-2 rounded hover:bg-buttonhov transition"
          >
            {isFormOpen ? "Cancel" : "Add Certificate"}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {isFormOpen && hasEditPermission && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-3">
            {editingId ? "Edit Certificate" : "Add New Certificate"}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Name*
              </label>
              <input
                type="text"
                name="certificate_name"
                value={formData.certificate_name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-main focus:outline-none"
                required
                minLength={1}
                maxLength={255}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-main focus:outline-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-main focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-main focus:outline-none"
                required
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="bg-button text-white px-4 py-2 rounded hover:bg-buttonhov transition"
              >
                {editingId ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-4">Loading certificates...</div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          {hasEditPermission
            ? " No certificates found. Add your first certificate."
            : "No certificates found."}
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="border-l-2 border-main pl-4 group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{cert.certificate_name}</h3>
                  {cert.description && (
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    {formatDateRange(cert.start_date, cert.end_date)}
                  </p>
                </div>
                {hasEditPermission && (
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="text-[#00bfa5] hover:text-[#139485]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
