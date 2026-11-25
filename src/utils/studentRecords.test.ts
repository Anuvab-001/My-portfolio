import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_STUDENTS,
  createStudentRecord,
  findTopPerformer,
  searchStudentById,
  sortStudentsByRank,
} from './studentRecords';

test('calculates CGPA and grade accurately from subject marks', () => {
  const rec = createStudentRecord('241-15-200', 'Arif', [82, 85, 80, 90]);
  assert.equal(rec.cgpa, 4.0);
  assert.equal(rec.grade, 'A+');
});

test('identifies top performer and sorts ranking descending by CGPA', () => {
  const records = INITIAL_STUDENTS.map((s) =>
    createStudentRecord(s.id, s.name, s.marks)
  );
  const top = findTopPerformer(records);
  assert.ok(top);
  assert.equal(top.id, '241-15-104');

  const ranked = sortStudentsByRank(records);
  assert.equal(ranked[0].id, '241-15-104');
  assert.ok(ranked[0].cgpa >= ranked[1].cgpa);
  assert.ok(ranked[1].cgpa >= ranked[2].cgpa);
});

test('searches student record by ID case-insensitively', () => {
  const records = INITIAL_STUDENTS.map((s) =>
    createStudentRecord(s.id, s.name, s.marks)
  );
  const found = searchStudentById(records, '241-15-109');
  assert.ok(found);
  assert.equal(found.name, 'Mahmudul Hasan');
  assert.equal(searchStudentById(records, '999-99-999'), null);
});
