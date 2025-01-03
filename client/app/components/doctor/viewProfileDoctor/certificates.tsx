interface Certificate {
  title: string;
  institution: string;
  date: string;
}

export function Certificates() {
  const certificates: Certificate[] = [
    {
      title: "Phase Oriented Approach to Schema Therapy",
      institution: "Institute of Schema Therapy of Switzerland",
      date: "Apr 2024 - Jun 2024",
    },
    {
      title: "Schema Therapy Diploma (ISST)",
      institution: "Institute of Schema Therapy",
      date: "Aug 2023 - Jan 2024",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Certificates
      </h2>
      <div className="space-y-4">
        {certificates.map((cert, index) => (
          <div key={index} className="border-l-2 border-main pl-4">
            <h3 className="font-medium">{cert.title}</h3>
            <p className="text-sm text-gray-600">{cert.institution}</p>
            <p className="text-sm text-gray-500">{cert.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
