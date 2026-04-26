import React from 'react';

const Executive = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <div className="mb-4 text-center">
      <h3 className="text-[13px] font-black uppercase tracking-[0.2em] inline-block pb-1" style={{ borderBottom: `2px solid ${settings.primaryColor}`, color: '#1a1a1a' }}>
        {children}
      </h3>
    </div>
  );

  return (
    <div
      className="bg-white p-10 h-full"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      <header className="flex flex-col items-center mb-8">
        {resume.picture.url && (
          <img
            src={resume.picture.url}
            alt="Profile"
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            className="mb-4 shadow-xl"
          />
        )}
        <h1 className="text-4xl font-extrabold uppercase tracking-widest text-gray-900 mb-1">{fullName || 'Your Name'}</h1>
        {b.headline && <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">{b.headline}</h2>}
        
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
          {b.email && <span>{b.email}</span>}
          {b.phone && <span>{b.phone}</span>}
          {b.location && <span>{b.location}</span>}
          {b.website && <span>{b.website}</span>}
        </div>
      </header>

      {b.summary && (
        <section className="mb-8">
          <SectionTitle>Executive Profile</SectionTitle>
          <p className="text-[12px] leading-relaxed text-center text-gray-700 max-w-2xl mx-auto">{b.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-10">
        <div>
          {resume.experience.length > 0 && (
            <section className="mb-6">
              <SectionTitle>Experience</SectionTitle>
              <div className="flex flex-col gap-6">
                {resume.experience.map(exp => (
                  <div key={exp._id} className="text-center">
                    <h4 className="font-bold text-[14px] text-gray-900 uppercase tracking-wide">{exp.company}</h4>
                    <div className="text-[12px] font-semibold italic text-gray-600 mb-1">{exp.position}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2" style={{ color: settings.primaryColor }}>
                      {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                    </div>
                    {exp.summary && <p className="text-[12px] leading-relaxed text-gray-600 whitespace-pre-wrap">{exp.summary}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {resume.education.length > 0 && (
            <section className="mb-6">
              <SectionTitle>Education</SectionTitle>
              <div className="flex flex-col gap-5">
                {resume.education.map(edu => (
                  <div key={edu._id} className="text-center">
                    <h4 className="font-bold text-[13px] text-gray-900">{edu.studyType}</h4>
                    <p className="text-[12px] font-medium text-gray-600">{edu.institution}</p>
                    <span className="text-[10px] font-bold text-gray-400 block mt-1" style={{ color: settings.primaryColor }}>
                      {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.skills.length > 0 && (
            <section>
              <SectionTitle>Core Competencies</SectionTitle>
              <div className="flex flex-wrap justify-center gap-2">
                {resume.skills.map(s => (
                  <span key={s._id} className="text-[11px] font-bold text-gray-700 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full">
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Executive;
