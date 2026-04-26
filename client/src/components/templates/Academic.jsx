import React from 'react';

const Academic = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <h3 
      className="text-[14px] font-bold uppercase tracking-[0.1em] mb-2 mt-4 border-b border-gray-400 pb-1"
      style={{ color: settings.primaryColor }}
    >
      {children}
    </h3>
  );

  return (
    <div
      className="bg-white p-12"
      style={{
        fontFamily: `'${settings.font}', serif`, // Force serif for academic
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
        color: '#000000', // Solid black for readability
      }}
    >
      <header className="mb-4 border-b-2 border-black pb-4 text-center">
        <h1 className="text-2xl font-black uppercase tracking-widest mb-2">{fullName || 'Curriculum Vitae'}</h1>
        <div className="text-[11px] font-medium flex justify-center gap-3">
          {b.location && <span>{b.location}</span>}
          {b.email && <span>{b.email}</span>}
          {b.phone && <span>{b.phone}</span>}
        </div>
      </header>

      {resume.education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="flex flex-col gap-3">
            {resume.education.map(edu => (
              <div key={edu._id} className="flex gap-4">
                <div className="w-24 shrink-0 text-[11px] font-bold pt-0.5">
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                </div>
                <div>
                  <h4 className="font-bold text-[13px]">{edu.institution}</h4>
                  <p className="text-[12px] italic">{edu.studyType} {edu.score && `— GPA: ${edu.score}`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section>
          <SectionTitle>Academic & Research Experience</SectionTitle>
          <div className="flex flex-col gap-4">
            {resume.experience.map(exp => (
              <div key={exp._id} className="flex gap-4">
                <div className="w-24 shrink-0 text-[11px] font-bold pt-0.5">
                  {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[13px]">{exp.position}</h4>
                  <div className="text-[12px] italic mb-1">{exp.company}</div>
                  {exp.summary && <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{exp.summary}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.publications.length > 0 && (
        <section>
          <SectionTitle>Publications</SectionTitle>
          <ul className="list-disc list-inside text-[11px] space-y-2 leading-relaxed">
            {resume.publications.map(pub => (
              <li key={pub._id}>
                <strong>{pub.name}</strong>. {pub.publisher && <i>{pub.publisher}</i>}. {pub.releaseDate && `(${pub.releaseDate})`}.
              </li>
            ))}
          </ul>
        </section>
      )}

      {resume.awards.length > 0 && (
        <section>
          <SectionTitle>Honors & Awards</SectionTitle>
          <div className="flex flex-col gap-2">
            {resume.awards.map(a => (
              <div key={a._id} className="flex gap-4">
                <div className="w-24 shrink-0 text-[11px] font-bold">{a.date}</div>
                <div className="text-[11px]">
                  <strong>{a.title}</strong>, {a.awarder}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <p className="text-[11px] leading-relaxed">
            {resume.skills.map(s => s.name).join(', ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default Academic;
