"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AlertBox = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Ensure the component works only in the browser environment
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setShowAlert(true);
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, [isMounted]);

  const redirectToLina = () => {
    if (isMounted) {
      router.push("/lina");
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  if (!isMounted || !showAlert) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        zIndex: 1000,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <img
        src="./images/Capture.jpeg"
        alt="Lina"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          marginBottom: "15px",
          objectFit: "cover",
        }}
      />
      <p style={{ marginBottom: "15px", fontSize: "16px", fontWeight: "bold" }}>
        Hi, I am Lina. Let&apos;s talk...
      </p>
      <button
        onClick={redirectToLina}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "14px",
          marginRight: "10px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
      >
        Go to Lina
      </button>
      <button
        onClick={closeAlert}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "14px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b02a37")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
      >
        Close
      </button>
    </div>
  );
};

export default AlertBox;
