import { useQuery, useQueryClient } from "react-query";
import { projectDatabase } from "../firebase/config";

async function fetchCourses(Semester, Year) {
  const storageRef = projectDatabase.ref("Courses");
  const snapshot = await storageRef.orderByChild("Year").equalTo(Year).once("value");
  let resourceDocs = [];

  snapshot.forEach(childSnapshot => {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    if (childData.Semester === Semester) {
      childData = { ...childData, childKey };
      resourceDocs.push(childData);
    }
  });

  return resourceDocs;
}

export default function useCourses({ Semester, Year }) {
  const queryClient = useQueryClient();

  const key = `courses-${Year}-${Semester}`;

  const { data, isError, isLoading } = useQuery(
    [key, Semester, Year],
    c => fetchCourses(c.queryKey[1], c.queryKey[2]),
    {
      retry: 2,
      keepPreviousData: true,
    }
  );

  const refetchCourses = () => {
    queryClient.invalidateQueries(key);
  };

  return { courses: data || [], loading: isLoading, error: isError, refetchCourses };
}
