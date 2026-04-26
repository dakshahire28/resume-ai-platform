import React from 'react';

const Modern = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children, light = false }) => (
    <h3 
      className={`text-xs font-bold uppercase tracking-widest pb-1 mb-4 border-b ${light ? 'border-white/30 text-white' : 'border-gray-200 text-gray-800'}`}
    >
      {children}
    </h3>
  );

  return (
    <div
      className="bg-white flex h-full min-h-[1123px]"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Sidebar */}
      <aside 
        className="w-[35%] p-8 text-white flex flex-col gap-8 shrink-0"
        style={{ backgroundColor: settings.primaryColor }}
      >
        <div className="flex flex-col items-center text-center">
          {resume.picture.url && (
            <img
              src={resume.picture.url}
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid rgba(255,255,255,0.2)',
              }}
              className="mb-4 shadow-lg"
            />
          )}
          <h1 className="text-2xl font-black uppercase tracking-wider mb-1">{fullName || 'Your Name'}</h1>
          {b.headline && <h2 className="text-[13px] font-medium opacity-90">{b.headline}</h2>}
        </div>

        <div>
          <SectionTitle light>Contact</SectionTitle>
          <div className="flex flex-col gap-2 text-[11px] opacity-90 font-medium">
            {b.email && <div>{b.email}</div>}
            {b.phone && <div>{b.phone}</div>}
            {b.location && <div>{b.location}</div>}
            {b.website && <div>{b.website}</div>}
          </div>
        </div>

        {resume.skills.length > 0 && (
          <div>
            <SectionTitle light>Skills</SectionTitle>
            <div className="flex flex-col gap-2">
              {resume.skills.map(s => (
                <div key={s._id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold">{s.name}</span>
                    {s.level && <span className="text-[9px] opacity-80">{s.level}</span>}
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-white h-full" style={{ width: s.level === 'Expert' ? '100%' : s.level === 'Advanced' ? '80%' : s.level === 'Intermediate' ? '60%' : '40%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.languages.length > 0 && (
          <div>
            <SectionTitle light>Languages</SectionTitle>
            <div className="flex flex-col gap-1 text-[11px]">
              {resume.languages.map(l => (
                <div key={l._id} className="flex justify-between">
                  <span className="font-bold">{l.language}</span>
                  <span className="opacity-80">{l.fluency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-[65%] p-8 flex flex-col gap-6 text-gray-800 shrink-0">
        {b.summary && (
          <section>
            <SectionTitle>Profile</SectionTitle>
            <p className="text-[12px] leading-relaxed text-gray-600">{b.summary}</p>
          </section>
        )}

        {resume.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="flex flex-col gap-5">
              {resume.experience.map(exp => (
                <div key={exp._id} className="relative pl-4 border-l-2" style={{ borderColor: settings.primaryColor }}>
                  <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5" style={{ backgroundColor: settings.primaryColor }}></div>
                  <h4 className="font-bold text-[14px] leading-none mb-1">{exp.position}</h4>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 mb-2 font-medium">
                    <span>{exp.company}</span>
                    <span>{[exp.startDate, exp.endDate].filter(Boolean).join(' — ')}</span>
                  </div>
                  {exp.summary && <p className="text-[12px] leading-relaxed text-gray-600 whitespace-pre-wrap">{exp.summary}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="flex flex-col gap-4">
              {resume.education.map(edu => (
                <div key={edu._id}>
                  <h4 className="font-bold text-[13px]">{edu.studyType}</h4>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium mt-0.5">
                    <span>{edu.institution}</span>
                    <span>{[edu.startDate, edu.endDate].filter(Boolean).join(' — ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Modern;
