export interface StudentRecord {
  id: string;
  name: string;
  marks: number[];
  cgpa: number;
  grade: string;
}

export const INITIAL_STUDENTS: Array<{ id: string; name: string; marks: number[] }> = [
  { id: '241-15-101', name: 'Nafis Rahman', marks: [86, 77, 89, 78] },
  { id: '241-15-104', name: 'Tasnim Akter', marks: [91, 88, 85, 90] },
  { id: '241-15-109', name: 'Mahmudul Hasan', marks: [74, 78, 72, 76] },
  { id: '241-15-115', name: 'Farhan Sadik', marks: [68, 71, 66, 70] },
];

export function scoreToGradePoint(score: number): { point: number; letter: string } {
  const clamped = Math.max(0, Math.min(100, score));
  if (clamped >= 80) return { point: 4.0, letter: 'A+' };
  if (clamped >= 75) return { point: 3.75, letter: 'A' };
  if (clamped >= 70) return { point: 3.5, letter: 'A-' };
  if (clamped >= 65) return { point: 3.25, letter: 'B+' };
  if (clamped >= 60) return { point: 3.0, letter: 'B' };
  if (clamped >= 55) return { point: 2.75, letter: 'B-' };
  if (clamped >= 50) return { point: 2.5, letter: 'C+' };
  if (clamped >= 45) return { point: 2.25, letter: 'C' };
  if (clamped >= 40) return { point: 2.0, letter: 'D' };
  return { point: 0.0, letter: 'F' };
}

export function calculateStudentResult(marks: number[]): { cgpa: number; grade: string } {
  if (marks.length === 0) return { cgpa: 0.0, grade: 'F' };
  const points = marks.map((m) => scoreToGradePoint(m).point);
  const avgPoint = points.reduce((sum, p) => sum + p, 0) / points.length;
  const cgpa = Math.round(avgPoint * 100) / 100;

  let grade = 'F';
  if (cgpa >= 4.0) grade = 'A+';
  else if (cgpa >= 3.75) grade = 'A';
  else if (cgpa >= 3.5) grade = 'A-';
  else if (cgpa >= 3.25) grade = 'B+';
  else if (cgpa >= 3.0) grade = 'B';
  else if (cgpa >= 2.75) grade = 'B-';
  else if (cgpa >= 2.5) grade = 'C+';
  else if (cgpa >= 2.25) grade = 'C';
  else if (cgpa >= 2.0) grade = 'D';

  return { cgpa, grade };
}

export function createStudentRecord(id: string, name: string, marks: number[]): StudentRecord {
  const { cgpa, grade } = calculateStudentResult(marks);
  return {
    id: id.trim(),
    name: name.trim(),
    marks,
    cgpa,
    grade,
  };
}

export function findTopPerformer(records: StudentRecord[]): StudentRecord | null {
  if (records.length === 0) return null;
  // Max-heap root extraction equivalent
  let top = records[0];
  for (let i = 1; i < records.length; i++) {
    if (records[i].cgpa > top.cgpa) {
      top = records[i];
    }
  }
  return top;
}

export function searchStudentById(records: StudentRecord[], queryId: string): StudentRecord | null {
  const normalized = queryId.trim().toLowerCase();
  if (!normalized) return null;
  // Hash-bucket index lookup simulation
  const table = new Map<string, StudentRecord>();
  for (const rec of records) {
    table.set(rec.id.toLowerCase(), rec);
  }
  return table.get(normalized) ?? null;
}

export function sortStudentsByRank(records: StudentRecord[]): StudentRecord[] {
  const copy = [...records];
  // Bubble sort matching the C implementation
  for (let i = 0; i < copy.length - 1; i++) {
    for (let j = 0; j < copy.length - i - 1; j++) {
      if (copy[j].cgpa < copy[j + 1].cgpa) {
        const temp = copy[j];
        copy[j] = copy[j + 1];
        copy[j + 1] = temp;
      }
    }
  }
  return copy;
}
