import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { IAppointment } from "@myTypes/appointments";

const BASE_URL = "https://abdokh.pythonanywhere.com/api"; // Replace with your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

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
          url += `?doctor_id=${doctorId}`;
        } else if (patientId) {
          url += `?patient_id=${patientId}`;
        }

        const appointmentsResponse = await axios.get<
          IAppointment | IAppointment[]
        >(url, {
          headers: {
            Authorization: req.headers.authorization,
          },
        });

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

        console.log("payload of booking appointments are ", payload);
        const appointmentResponse = await axios.post<IAppointment>(
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
        const { id, status, date_time, patient, doctor } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Appointment ID is required" });
        }

        if (!patient || !doctor || !date_time || !status) {
          return res.status(400).json({
            error:
              "Missing required fields: patient, doctor, date_time are required",
          });
        }

        const updatedAppointmentResponse = await axios.put<IAppointment>(
          `${BASE_URL}/appointments/`,
          req.body,
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
