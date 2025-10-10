import { useSelector } from "react-redux";
import { getProjectName } from "../services/projectService";

export default function Table() {
  const { timeCards, projects } = useSelector((state) => state.app);

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
        {timeCards.map((timeCard) => {
          return (
            <tr key={timeCard.id} className="bg-gray-800 text-white">
              <td className="border px-4 py-2">
                {getProjectName(projects, timeCard.projectId)}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayOfWeek === "Monday" ? timeCard.durationInMins : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayOfWeek === "Tuesday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayOfWeek === "Wednesday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayOfWeek === "Thursday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayOfWeek === "Friday" ? timeCard.durationInMins : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayOfWeek === "Saturday"
                  ? timeCard.durationInMins
                  : ""}
              </td>
              <td className="border px-4 py-2">
                {timeCard.dayOfWeek === "Sunday" ? timeCard.durationInMins : ""}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
