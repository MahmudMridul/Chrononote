export default function Table() {
  return (
    <table className="table-auto">
      <thead>
        <tr className="text-white">
          <th className="px-4 py-2">Project</th>
          <th className="px-4 py-2">Monday</th>
          <th className="px-4 py-2">Tuesday</th>
          <th className="px-4 py-2">Wednesday</th>
          <th className="px-4 py-2">Thursday</th>
          <th className="px-4 py-2">Friday</th>
          <th className="px-4 py-2">Saturday</th>
          <th className="px-4 py-2">Sunday</th>
        </tr>
      </thead>
      <tbody>
        {dummyTimeCards.map((timeCard) => {
          return (
            <tr key={timeCard.id} className="bg-gray-800 text-white">
              <td className="border px-4 py-2">Project {timeCard.projectId}</td>
              <td className="border px-4 py-2">
                {timeCard.dayofWeek === "Monday" ? timeCard.durationInMins : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayofWeek === "Tuesday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayofWeek === "Wednesday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayofWeek === "Thursday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayofWeek === "Friday" ? timeCard.durationInMins : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayofWeek === "Saturday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayofWeek === "Sunday" ? timeCard.durationInMins : ""}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const dummyTimeCards = [
  {
    id: 1,
    durationInMins: 120,
    date: "2023-10-01",
    dayofWeek: "Monday",
    projectId: 1,
  },
  {
    id: 2,
    durationInMins: 90,
    date: "2023-10-02",
    dayofWeek: "Tuesday",
    projectId: 1,
  },
  {
    id: 3,
    durationInMins: 60,
    date: "2023-10-03",
    dayofWeek: "Wednesday",
    projectId: 2,
  },
  {
    id: 4,
    durationInMins: 30,
    date: "2023-10-04",
    dayofWeek: "Thursday",
    projectId: 2,
  },
  {
    id: 5,
    durationInMins: 45,
    date: "2023-10-05",
    dayofWeek: "Friday",
    projectId: 3,
  },
  {
    id: 6,
    durationInMins: 150,
    date: "2023-10-06",
    dayofWeek: "Saturday",
    projectId: 3,
  },
  {
    id: 7,
    durationInMins: 200,
    date: "2023-10-07",
    dayofWeek: "Sunday",
    projectId: 3,
  },
];
