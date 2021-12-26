import { useQuery } from "react-query";
import { projectDatabase } from "../firebase/config";

async function fetchCourse(id) {
  const storageRef = projectDatabase.ref("Courses");
  const snapshot = await storageRef.orderByKey().equalTo(id).once("value");
  return snapshot.val()[id];
}

export default function useCourse(id) {
  const key = `course-${id}`;

  return useQuery([key, id], c => fetchCourse(c.queryKey[1]), {
    retry: 2,
    keepPreviousData: true,
  });
}
