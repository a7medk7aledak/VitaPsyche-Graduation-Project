interface Interest {
  name: string;
  color?: string;
}

export function Interests() {
  const interests: Interest[] = [
    { name: "Mood disorders (depression)", color: "bg-teal-100 text-teal-800" },
    {
      name: "Anxiety disorders and obsessions",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Marriage Counseling/Relationship Disorders",
      color: "bg-green-100 text-green-800",
    },
    { name: "Psychotic disorders", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Interests
      </h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${interest.color}`}
          >
            {interest.name}
          </span>
        ))}
      </div>
    </div>
  );
}
