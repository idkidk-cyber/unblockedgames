import React, { useState } from 'react';

export const PanicCloakOverlay = ({
  isOpen,
  onClose,
  preset,
  onPresetChange,
}) => {
  const [docText, setDocText] = useState(
    `AP European History - Unit 4 Study Guide\nInstructor: Dr. Harrison · Fall Semester\n\nI. The Scientific Revolution & Enlightenment Principles\nDuring the seventeenth and eighteenth centuries, European intellectual traditions experienced profound restructuring. Empirical observation, formalized by Francis Bacon and René Descartes, supplanted scholastic orthodoxy.\n\nKey Concepts for Thursday's Exam:\n1. Heliocentrism vs. Geocentric Ptolemaic paradigms (Copernicus, Kepler, Galileo).\n2. Newton's Principia Mathematica (1687) and universal gravitation synthesis.\n3. Social contract philosophy: Thomas Hobbes vs. John Locke on natural rights and popular sovereignty.\n\nDiscussion Question:\nHow did the diffusion of encyclopedic print media alter public discourse in urban coffeehouses? Be prepared to cite Diderot's Encyclopédie in your response.`
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white text-slate-900 select-text overflow-auto font-sans">
      {/* Secret un-cloak banner on hover */}
      <div className="group fixed top-0 right-0 z-50 p-2 opacity-10 hover:opacity-100 transition-opacity">
        <div className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-2 shadow-lg">
          <span>Stealth Active (Esc to exit)</span>
          <select
            value={preset}
            onChange={(e) => onPresetChange(e.target.value)}
            className="bg-slate-800 text-xs px-1.5 py-0.5 rounded text-white border border-slate-700"
          >
            <option value="docs">Google Docs</option>
            <option value="classroom">Google Classroom</option>
            <option value="wikipedia">Wikipedia</option>
          </select>
          <button
            onClick={onClose}
            className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-2 py-0.5 rounded"
          >
            Return to Games
          </button>
        </div>
      </div>

      {preset === 'classroom' ? (
        /* Google Classroom Disguise */
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
          <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-4">
              <span className="text-xl font-medium text-gray-700">Google Classroom</span>
              <span className="text-gray-400">›</span>
              <span className="text-base text-gray-800 font-semibold">AP European History · Period 3</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Enzo W.</span>
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                EW
              </div>
            </div>
          </header>

          <main className="max-w-4xl w-full mx-auto p-6 space-y-6">
            <div className="bg-emerald-700 text-white p-8 rounded-lg shadow-sm">
              <h1 className="text-3xl font-bold">AP European History</h1>
              <p className="text-emerald-100 text-sm mt-1">Period 3 · Room 204 · Dr. Harrison</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3 h-fit">
                <h3 className="font-semibold text-gray-800 text-sm">Upcoming</h3>
                <p className="text-xs text-gray-500">Due Friday, 11:59 PM</p>
                <p className="text-sm text-gray-700 font-medium hover:underline cursor-pointer">
                  Unit 4 DBQ Essay: Scientific Enlightenment
                </p>
              </div>

              <div className="md:col-span-3 space-y-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">Dr. Harrison posted a new assignment: Unit 4 DBQ</span>
                    <span className="text-xs text-gray-400">Yesterday</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Please submit your primary source analysis evaluating the impact of mechanical philosophy on eighteenth-century state institutions. Minimum 800 words.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">Class Announcement: Midterm Review Session</span>
                    <span className="text-xs text-gray-400">Oct 6</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Review slides for chapters 12-16 have been updated in the shared class folder. Bring questions to tomorrow&apos;s seminar.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : preset === 'wikipedia' ? (
        /* Wikipedia Disguise */
        <div className="min-h-screen bg-white max-w-4xl mx-auto px-8 py-8 space-y-6 font-serif">
          <div className="border-b border-gray-300 pb-3 font-sans">
            <span className="text-xs text-gray-500 uppercase tracking-wider">From Wikipedia, the free encyclopedia</span>
            <h1 className="text-3xl font-serif text-gray-900 mt-1">Photosynthesis</h1>
          </div>

          <div className="text-base leading-relaxed text-gray-800 space-y-4">
            <p>
              <strong>Photosynthesis</strong> is a biological process utilized by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organism&apos;s activities.
            </p>
            <p>
              Some of this chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water—hence the name photosynthesis, from the Greek φῶς (phōs, &apos;light&apos;) and σύνθεσις (synthesis, &apos;putting together&apos;).
            </p>
            <h2 className="text-xl font-bold font-sans border-b border-gray-200 pb-1 mt-6 text-gray-900">
              1. Light-Dependent Reactions
            </h2>
            <p>
              In the light-dependent reactions, one molecule of the pigment chlorophyll absorbs one photon and loses one electron. This electron is passed to a modified form of chlorophyll called pheophytin, which passes the electron to a quinone molecule, starting the flow of electrons down an electron transport chain.
            </p>
          </div>
        </div>
      ) : (
        /* Google Docs Disguise (Default) */
        <div className="min-h-screen bg-[#f9fbfd] flex flex-col font-sans">
          <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                DOC
              </div>
              <div>
                <input
                  type="text"
                  defaultValue="AP European History - Unit 4 Study Guide"
                  className="font-medium text-base text-gray-800 hover:bg-gray-100 px-1 py-0.5 rounded border-transparent focus:border-blue-500 outline-none"
                />
                <div className="flex gap-3 text-xs text-gray-600 mt-0.5">
                  <span className="cursor-pointer hover:text-black">File</span>
                  <span className="cursor-pointer hover:text-black">Edit</span>
                  <span className="cursor-pointer hover:text-black">View</span>
                  <span className="cursor-pointer hover:text-black">Insert</span>
                  <span className="cursor-pointer hover:text-black">Format</span>
                  <span className="cursor-pointer hover:text-black">Tools</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">All changes saved to Drive</div>
          </header>

          <main className="flex-1 flex justify-center py-6 px-4">
            <div className="w-full max-w-3xl min-h-[840px] bg-white p-12 shadow-md border border-gray-200 rounded-sm">
              <textarea
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                className="w-full h-full min-h-[750px] resize-none border-none outline-none text-gray-800 text-sm leading-relaxed font-sans"
              />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};
