import StudentForm from "../_components/StudentFormComponent";

export default async function StudentFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { studentId } = await searchParams;
  console.log("studentId", studentId);

  if (studentId) {
    return <StudentForm studentId={studentId} />;
  } else {
    return <StudentForm />;
  }
}
