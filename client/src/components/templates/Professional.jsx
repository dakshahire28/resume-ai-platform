import React from 'react';

const Professional = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <h3 
      className="text-sm font-bold uppercase tracking-wider mb-3 mt-4 border-b-2 pb-1"
      style={{ color: settings.primaryColor, borderColor: settings.primaryColor }}
    >
      {children}
    </h3>
  );

  return (
    <div
      className="bg-white p-10"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
        color: '#333333',
      }}
    >
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900 mb-1">{fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] font-medium text-gray-600 mt-2">
          {b.location && <span>{b.location}</span>}
          {b.location && (b.phone || b.email) && <span>|</span>}
          {b.phone && <span>{b.phone}</span>}
          {b.phone && b.email && <span>|</span>}
          {b.email && <span>{b.email}</span>}
          {b.website && <span>|</span>}
          {b.website && <span>{b.website}</span>}
        </div>
      </header>

      {b.summary && (
        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-[12px] leading-relaxed text-justify">{b.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section>
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="flex flex-col gap-4">
            {resume.experience.map(exp => (
              <div key={exp._id}>
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-bold text-[14px] text-gray-900">{exp.company} {exp.location && <span className="font-normal text-gray-500">— {exp.location}</span>}</h4>
                  <span className="text-[12px] font-semibold text-gray-600">
                    {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                  </span>
                </div>
                <div className="font-semibold text-[13px] italic mb-1 text-gray-800">{exp.position}</div>
                {exp.summary && <p className="text-[12px] leading-relaxed whitespace-pre-wrap">{exp.summary}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="flex flex-col gap-3">
            {resume.education.map(edu => (
              <div key={edu._id} className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[13px] text-gray-900">{edu.institution}</h4>
                  <div className="text-[12px] text-gray-800">{edu.studyType}</div>
                </div>
                <div className="text-right">
                  <span className="text-[12px] font-semibold text-gray-600 block">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                  </span>
                  {edu.score && <span className="text-[11px] text-gray-500">GPA: {edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <SectionTitle>Core Competencies</SectionTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {resume.skills.map(s => (
              <div key={s._id} className="flex items-center gap-1.5 text-[12px] font-medium w-[30%]">
                <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: settings.primaryColor }}></div>
                {s.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Professional;
