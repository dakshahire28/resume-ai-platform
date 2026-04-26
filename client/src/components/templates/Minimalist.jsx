import React from 'react';

const Minimalist = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] pb-1 mb-3 border-b border-gray-200" style={{ color: settings.primaryColor }}>
      {children}
    </h3>
  );

  return (
    <div
      className="bg-white"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
        color: '#111827',
      }}
    >
      <header className="mb-6 flex items-center justify-between">
        <div className="flex-1 text-left">
          <h1 className="text-[34px] font-light tracking-wide mb-1 text-gray-900">{fullName || 'Your Name'}</h1>
          {b.headline && (
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] mb-3" style={{ color: settings.primaryColor }}>
              {b.headline}
            </h2>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium text-gray-500">
            {b.email && <span>{b.email}</span>}
            {b.phone && <span>• {b.phone}</span>}
            {b.location && <span>• {b.location}</span>}
            {b.website && <span>• {b.website}</span>}
          </div>
          {b.summary && <p className="mt-4 text-[13px] text-gray-600 leading-relaxed max-w-[90%]">{b.summary}</p>}
        </div>
        {resume.picture.url && (
          <img
            src={resume.picture.url}
            alt="Profile"
            style={{
              width: resume.picture.size,
              height: resume.picture.size,
              borderRadius: resume.picture.borderRadius,
              objectFit: 'cover',
            }}
            className="ml-6 shadow-sm border border-gray-100"
          />
        )}
      </header>

      <div className="flex flex-col gap-6">
        {resume.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="flex flex-col gap-4">
              {resume.experience.map(exp => (
                <div key={exp._id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-[14px] text-gray-900">{exp.company}</h4>
                    <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap ml-2">
                      {[exp.startDate, exp.endDate].filter(Boolean).join(' — ')}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium mb-1" style={{ color: settings.primaryColor }}>{exp.position}</p>
                  {exp.location && <p className="text-[11px] text-gray-400 mb-2">{exp.location}</p>}
                  {exp.summary && <p className="text-[12px] text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.summary}</p>}
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
                <div key={edu._id}>
                  <h4 className="font-bold text-[13px] text-gray-900 leading-tight">{edu.studyType}</h4>
                  <p className="text-[12px] font-medium text-gray-600">{edu.institution}</p>
                  <div className="text-[11px] text-gray-500 mt-1 flex justify-between">
                    <span>{[edu.startDate, edu.endDate].filter(Boolean).join(' — ')}</span>
                    {edu.score && <span className="font-bold" style={{ color: settings.primaryColor }}>{edu.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map(s => (
                <span key={s._id} className="bg-transparent border border-gray-300 text-gray-800 text-[10px] font-medium px-2 py-1 rounded">
                  {s.name} {s.level && <span className="text-gray-400">({s.level})</span>}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Minimalist;
