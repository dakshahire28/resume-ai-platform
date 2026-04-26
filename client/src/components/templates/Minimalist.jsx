import React from 'react';

const Minimalist = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <div className="mb-2">
      <h3 className="text-[14px] font-bold uppercase tracking-wider" style={{ color: settings.primaryColor || '#000000' }}>
        {children}
      </h3>
      <div className="w-full h-[1.5px] mt-0.5" style={{ backgroundColor: settings.primaryColor || '#000000' }}></div>
    </div>
  );

  return (
    <div
      className="bg-white px-8 py-10"
      style={{
        fontFamily: `'${settings.font}', serif`, // Jake's usually uses serif but we respect user setting
        fontSize: `${settings.fontSize || 11}px`,
        lineHeight: settings.lineHeight || 1.4,
        color: '#000000',
      }}
    >
      {/* HEADER */}
      <header className="mb-4 text-center">
        <h1 className="text-[28px] font-bold mb-1">{fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-2 text-[11px]">
          {b.phone && <span>{b.phone}</span>}
          {b.phone && b.email && <span>|</span>}
          {b.email && <span>{b.email}</span>}
          {b.email && (b.website || resume.profiles.length > 0) && <span>|</span>}
          {b.website && <span>{b.website}</span>}
          {resume.profiles.map((p, i) => (
            <React.Fragment key={p._id || i}>
              {(i > 0 || b.website) && <span>|</span>}
              <span>{p.url || p.username}</span>
            </React.Fragment>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {/* EDUCATION */}
        {resume.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="flex flex-col gap-2">
              {resume.education.map(edu => (
                <div key={edu._id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold">{edu.institution}</span>
                    <span className="text-right">{[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic">
                    <span>{edu.studyType} {edu.area && `in ${edu.area}`}</span>
                    <span className="text-right">{edu.location}</span>
                  </div>
                  {edu.score && <div className="mt-1">GPA: {edu.score}</div>}
                  {edu.summary && <div className="mt-1">{edu.summary}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {resume.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="flex flex-col gap-3">
              {resume.experience.map(exp => (
                <div key={exp._id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold">{exp.company}</span>
                    <span className="text-right">{[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic mb-1">
                    <span>{exp.position}</span>
                    <span className="text-right">{exp.location}</span>
                  </div>
                  {exp.summary && (
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      {exp.summary.split('\n').map((bullet, i) => (
                        bullet.trim() && <li key={i}>{bullet.trim().replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {resume.projects && resume.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="flex flex-col gap-2">
              {resume.projects.map(proj => (
                <div key={proj._id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span>
                      <span className="font-bold">{proj.name}</span>
                      {proj.url && <span> | <span className="italic">{proj.url}</span></span>}
                    </span>
                    <span className="text-right">{proj.date}</span>
                  </div>
                  {proj.description && (
                    <ul className="list-disc pl-5 space-y-0.5">
                      {proj.description.split('\n').map((bullet, i) => (
                        bullet.trim() && <li key={i}>{bullet.trim().replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {resume.skills.length > 0 && (
          <section>
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="flex flex-col gap-1">
              {resume.skills.map(s => (
                <div key={s._id}>
                  <span className="font-bold">{s.name}: </span>
                  <span>{s.keywords}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Minimalist;
