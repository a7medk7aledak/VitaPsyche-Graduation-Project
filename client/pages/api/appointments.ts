import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

interface Appointment {
  id?: number;
  patient: string;
  doctor: string;
  services: string;
  date_time: string;
  cost: string;
  notes?: string;
  status?: string;
}

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        // Handle filtering options
        const { doctorId, patientId, appointmentId } = req.query;

        let url = `${BASE_URL}/appointments/`;

        // Build query parameters
        if (appointmentId) {
          url = `${BASE_URL}/appointments/${appointmentId}/`;
        } else if (doctorId) {
          url += `?doctor=${doctorId}`;
        } else if (patientId) {
          url += `?patient=${patientId}`;
        }

        const appointmentsResponse = await axios.get<
          Appointment | Appointment[]
        >(url, {
          headers: {
            Authorization: req.headers.authorization,
          },
        });

        console.log(appointmentsResponse.data);
        return res.status(200).json(appointmentsResponse.data);
      }

      case "POST": {
        // Validate required fields
        const { patient, doctor, services, date_time, cost } = req.body;

        if (!patient || !doctor || !services || !date_time || !cost) {
          return res.status(400).json({
            error:
              "Missing required fields: patient, doctor, services, date_time, and cost are required",
          });
        }
        console.log(date_time);

        // Create payload with notes explicitly set (can be null)
        const payload = {
          patient,
          doctor,
          services: [parseInt(services)],
          date_time,
          cost,
          notes: req.body.notes || null,
          status: "booked",
        };

        const appointmentResponse = await axios.post<Appointment>(
          `${BASE_URL}/appointments/`,
          payload,
          {
            headers: {
              Authorization: req.headers.authorization,
              "Content-Type": "application/json",
            },
          }
        );

        return res.status(201).json(appointmentResponse.data);
      }

      case "PUT": {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ error: "Appointment ID is required" });
        }

        // Validate required fields for update
        const { patient, doctor, services, date_time, cost } = req.body;

        if (!patient || !doctor || !services || !date_time || !cost) {
          return res.status(400).json({
            error:
              "Missing required fields: patient, doctor, services, date_time, and cost are required",
          });
        }

        // Create payload with notes and status explicitly set
        const payload = {
          patient,
          doctor,
          services,
          date_time,
          cost,
          notes: req.body.notes || null,
          status: req.body.status || "pending",
        };

        const updatedAppointmentResponse = await axios.put<Appointment>(
          `${BASE_URL}/appointments/${id}/`,
          payload,
          {
            headers: {
              Authorization: req.headers.authorization,
              "Content-Type": "application/json",
            },
          }
        );

        return res.status(200).json(updatedAppointmentResponse.data);
      }

      case "DELETE": {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ error: "Appointment ID is required" });
        }

        await axios.delete(`${BASE_URL}/appointments/${id}/`, {
          headers: { Authorization: req.headers.authorization },
        });

        return res.status(204).end();
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    const { status, data } = axiosErrorHandler(error);
    console.log("status code: " + status, data);
    return res.status(status).json(data);
  }
}
