import { useSelector } from "react-redux";
import { getProjectName } from "../services/projectService";

export default function Table() {
  const { timeCards, projects } = useSelector((state) => state.app);

  return (
    <table className="table-auto">
      <thead>
        <tr className="text-white">
          <th className="px-4 py-2">Project</th>
          <th className="px-4 py-2">Sunday</th>
          <th className="px-4 py-2">Monday</th>
          <th className="px-4 py-2">Tuesday</th>
          <th className="px-4 py-2">Wednesday</th>
          <th className="px-4 py-2">Thursday</th>
          <th className="px-4 py-2">Friday</th>
          <th className="px-4 py-2">Saturday</th>
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
                {timeCard.sunMins ? timeCard.sunMins : 0}
              </td>
              <td className="border px-4 py-2">
                {timeCard.monMins ? timeCard.monMins : 0}
              </td>
              <td className="border px-4 py-2">
                {timeCard.tueMins ? timeCard.tueMins : 0}
              </td>
              <td className="border px-4 py-2">
                {timeCard.wedMins ? timeCard.wedMins : 0}
              </td>
              <td className="border px-4 py-2">
                {timeCard.thuMins ? timeCard.thuMins : 0}
              </td>
              <td className="border px-4 py-2">
                {timeCard.friMins ? timeCard.friMins : 0}
              </td>
              <td className="border px-4 py-2">
                {timeCard.satMins ? timeCard.satMins : 0}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
