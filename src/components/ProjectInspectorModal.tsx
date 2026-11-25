import { FormEvent, useEffect, useState } from 'react';
import { ExternalLink, Terminal, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';
import { DIU_LOCATIONS, findShortestCampusPath } from '../utils/campusGraph';
import {
  INITIAL_STUDENTS,
  StudentRecord,
  createStudentRecord,
  findTopPerformer,
  searchStudentById,
  sortStudentsByRank,
} from '../utils/studentRecords';

interface ProjectInspectorModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

function CampusNavigationDemo() {
  const [sourceId, setSourceId] = useState('main-gate');
  const [destinationId, setDestinationId] = useState('innovation-lab');

  const route = findShortestCampusPath(sourceId, destinationId);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="demo-source-location"
            className="block text-xs font-medium text-slate-300"
          >
            Source Campus Location
          </label>
          <select
            id="demo-source-location"
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#090D16] px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {DIU_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="demo-dest-location"
            className="block text-xs font-medium text-slate-300"
          >
            Destination Campus Location
          </label>
          <select
            id="demo-dest-location"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#090D16] px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {DIU_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Console-style output matching the C console application */}
      <div
        data-testid="campus-console-output"
        className="rounded-xl border border-slate-800 bg-[#090D16] p-4 font-mono text-xs leading-relaxed text-slate-200"
      >
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-slate-400">
          <Terminal className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
          <span>Dijkstra Shortest Path Output (Sample Campus Graph)</span>
        </div>

        {route.found ? (
          <div className="mt-3 space-y-2">
            <p>
              <span className="text-slate-400">Route:</span>{' '}
              <span className="text-blue-300">{route.pathNames.join(' -> ')}</span>
            </p>
            <p className="tabular-nums">
              <span className="text-slate-400">Total Walking Distance:</span>{' '}
              <span className="text-white">{route.totalDistanceMeters} meters</span>
            </p>
            <p className="tabular-nums">
              <span className="text-slate-400">Estimated Walking Time:</span>{' '}
              <span className="text-white">
                {route.estimatedMinutes === 0
                  ? '0 min (same location)'
                  : `~${route.estimatedMinutes} min`}
              </span>
            </p>
            {route.hops.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-slate-400 mb-1">Segment Breakdown:</p>
                <ul className="space-y-1">
                  {route.hops.map((hop, idx) => (
                    <li key={idx} className="tabular-nums text-slate-300">
                      {idx + 1}. {hop.fromName} -&gt; {hop.toName} ({hop.distanceMeters} m)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-3 text-rose-400">No route found between the selected locations.</p>
        )}
      </div>
    </div>
  );
}

function StudentRecordDemo() {
  const [records, setRecords] = useState<StudentRecord[]>(() =>
    INITIAL_STUDENTS.map((s) => createStudentRecord(s.id, s.name, s.marks))
  );
  const [searchId, setSearchId] = useState('241-15-104');
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newMarksText, setNewMarksText] = useState('84, 79, 88, 82');
  const [formError, setFormError] = useState<string | null>(null);

  const searchResult = searchStudentById(records, searchId);
  const topPerformer = findTopPerformer(records);
  const rankedRecords = sortStudentsByRank(records);

  const handleAddStudent = (e: FormEvent) => {
    e.preventDefault();
    const id = newId.trim();
    const name = newName.trim();
    const marks = newMarksText
      .split(',')
      .map((part) => Number(part.trim()))
      .filter((n) => Number.isFinite(n));

    if (!id || !name) {
      setFormError('Student ID and Name are required.');
      return;
    }
    if (marks.length === 0 || marks.some((m) => m < 0 || m > 100)) {
      setFormError('Enter comma-separated marks between 0 and 100.');
      return;
    }
    if (records.some((r) => r.id.toLowerCase() === id.toLowerCase())) {
      setFormError('A student with this ID already exists.');
      return;
    }

    setRecords((prev) => [...prev, createStudentRecord(id, name, marks)]);
    setNewId('');
    setNewName('');
    setFormError(null);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="demo-student-search"
            className="block text-xs font-medium text-slate-300"
          >
            Search Student by ID (Hash Lookup)
          </label>
          <input
            id="demo-student-search"
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="e.g. 241-15-104"
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#090D16] px-3 py-2 font-mono text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <p className="mt-2 font-mono text-xs text-slate-300">
            {searchId.trim() === '' ? (
              <span className="text-slate-500">Enter an ID to look up a record.</span>
            ) : searchResult ? (
              <span className="text-blue-300 tabular-nums">
                Found: {searchResult.name} · CGPA {searchResult.cgpa.toFixed(2)} ({searchResult.grade})
              </span>
            ) : (
              <span className="text-rose-400">No record found for &quot;{searchId}&quot;.</span>
            )}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-[#090D16] p-3.5">
          <p className="text-xs font-medium text-slate-400">Top Performer (Max Heap Root)</p>
          {topPerformer ? (
            <div className="mt-1.5">
              <p className="text-sm font-semibold text-white">{topPerformer.name}</p>
              <p className="mt-0.5 font-mono text-xs text-blue-400 tabular-nums">
                {topPerformer.id} · CGPA {topPerformer.cgpa.toFixed(2)} ({topPerformer.grade})
              </p>
            </div>
          ) : (
            <p className="mt-1.5 text-xs text-slate-500">No student records available.</p>
          )}
        </div>
      </div>

      {/* Add record mini-form */}
      <form
        onSubmit={handleAddStudent}
        className="rounded-lg border border-slate-800 bg-[#090D16] p-4"
      >
        <p className="text-xs font-semibold text-slate-200">Add Sample Student Record</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="new-student-id" className="block text-xs text-slate-400">
              Student ID
            </label>
            <input
              id="new-student-id"
              type="text"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder="241-15-120"
              className="mt-1 w-full rounded-md border border-slate-700 bg-[#0F1624] px-2.5 py-1.5 font-mono text-xs text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="new-student-name" className="block text-xs text-slate-400">
              Full Name
            </label>
            <input
              id="new-student-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Sakib Ahmed"
              className="mt-1 w-full rounded-md border border-slate-700 bg-[#0F1624] px-2.5 py-1.5 text-xs text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="new-student-marks" className="block text-xs text-slate-400">
              4 Marks (comma separated)
            </label>
            <input
              id="new-student-marks"
              type="text"
              value={newMarksText}
              onChange={(e) => setNewMarksText(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-700 bg-[#0F1624] px-2.5 py-1.5 font-mono text-xs text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        </div>
        {formError && (
          <p role="alert" className="mt-2 text-xs text-rose-400">
            {formError}
          </p>
        )}
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Add &amp; Re-rank
          </button>
        </div>
      </form>

      {/* Sorted ranking table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#090D16]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400">
            <tr>
              <th className="px-3 py-2.5 font-medium">Rank</th>
              <th className="px-3 py-2.5 font-medium">Student ID</th>
              <th className="px-3 py-2.5 font-medium">Name</th>
              <th className="px-3 py-2.5 font-medium text-right">CGPA</th>
              <th className="px-3 py-2.5 font-medium text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {rankedRecords.map((student, idx) => (
              <tr key={student.id} className="text-slate-200">
                <td className="px-3 py-2 font-mono tabular-nums text-slate-400">#{idx + 1}</td>
                <td className="px-3 py-2 font-mono tabular-nums">{student.id}</td>
                <td className="px-3 py-2 font-medium">{student.name}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums text-blue-300">
                  {student.cgpa.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right font-mono">{student.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProjectInspectorModal({ project, onClose }: ProjectInspectorModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-800 bg-[#0F1624] p-6 sm:p-8 text-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <p className="text-xs font-mono text-blue-400">
              {project.language} · {project.environment} · Interactive Algorithm Simulation
            </p>
            <h2
              id="project-modal-title"
              className="mt-1 font-display text-xl font-semibold text-white"
            >
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project simulation"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Note: The original project is a C console application. This browser preview simulates its
          underlying algorithm logic interactively so you can test how it works.
        </p>

        <div className="mt-5">
          {project.id === 'diu-campus-navigation' ? (
            <CampusNavigationDemo />
          ) : (
            <StudentRecordDemo />
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            Open GitHub Repository
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
