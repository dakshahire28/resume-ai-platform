import React from 'react';

const Elegant = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-4 mb-5 mt-6">
      <div className="h-px flex-1" style={{ backgroundColor: settings.primaryColor, opacity: 0.3 }}></div>
      <h3 
        className="text-[14px] font-bold tracking-[0.25em] uppercase text-gray-900"
        style={{ color: settings.primaryColor }}
      >
        {children}
      </h3>
      <div className="h-px flex-1" style={{ backgroundColor: settings.primaryColor, opacity: 0.3 }}></div>
    </div>
  );

  return (
    <div
      className="bg-[#faf9f6] p-12 h-full"
      style={{
        fontFamily: `'${settings.font}', serif`, // Elegant look
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light tracking-[0.1em] text-gray-900 mb-3">{fullName || 'Your Name'}</h1>
        <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
          {b.location && <span>{b.location}</span>}
          {b.phone && <span>{b.phone}</span>}
          {b.email && <span>{b.email}</span>}
        </div>
        {b.summary && (
          <p className="text-[12px] leading-relaxed italic text-gray-600 max-w-[85%] mx-auto">
            {b.summary}
          </p>
        )}
      </header>

      {resume.experience.length > 0 && (
        <section>
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="flex flex-col gap-6">
            {resume.experience.map(exp => (
              <div key={exp._id}>
                <div className="flex justify-between items-end mb-1">
                  <h4 className="font-bold text-[14px] text-gray-900">{exp.position}</h4>
                  <span className="text-[11px] font-medium text-gray-500">
                    {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                  </span>
                </div>
                <div className="text-[12px] uppercase tracking-wider font-semibold text-gray-500 mb-2" style={{ color: settings.primaryColor }}>
                  {exp.company}
                </div>
                {exp.summary && <p className="text-[12px] leading-relaxed text-gray-700 whitespace-pre-wrap">{exp.summary}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="grid grid-cols-2 gap-6">
            {resume.education.map(edu => (
              <div key={edu._id} className="text-center">
                <h4 className="font-bold text-[13px] text-gray-900">{edu.institution}</h4>
                <div className="text-[12px] italic text-gray-600 mb-1">{edu.studyType}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {resume.skills.map(s => (
              <span key={s._id} className="text-[12px] font-medium text-gray-800">
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Elegant;
