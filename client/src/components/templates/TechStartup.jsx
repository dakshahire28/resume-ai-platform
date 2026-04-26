import React from 'react';

const TechStartup = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <h3 className="text-[14px] font-black uppercase tracking-tight mb-4 flex items-center">
      <span className="text-gray-900">{children}</span>
      <div className="ml-4 h-1 flex-1" style={{ backgroundColor: settings.primaryColor }}></div>
    </h3>
  );

  return (
    <div
      className="bg-white p-10 flex flex-col gap-8 h-full"
      style={{
        fontFamily: `'${settings.font}', monospace`, // tech vibe
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      <header className="flex justify-between items-end border-b-4 pb-4" style={{ borderColor: settings.primaryColor }}>
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 leading-none">{b.firstName}</h1>
          <h1 className="text-5xl font-black tracking-tighter leading-none" style={{ color: settings.primaryColor }}>{b.lastName}</h1>
          {b.headline && <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-2">&lt;{b.headline}/&gt;</div>}
        </div>
        <div className="text-right text-[11px] font-bold text-gray-600 flex flex-col gap-1">
          {b.email && <div>{b.email}</div>}
          {b.phone && <div>{b.phone}</div>}
          {b.website && <div>{b.website}</div>}
        </div>
      </header>

      {b.summary && (
        <section>
          <p className="text-[13px] font-medium leading-relaxed bg-gray-50 p-4 border border-gray-200 text-gray-800">
            {b.summary}
          </p>
        </section>
      )}

      <div className="flex gap-8">
        <div className="w-[65%] flex flex-col gap-8">
          {resume.experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="flex flex-col gap-6">
                {resume.experience.map(exp => (
                  <div key={exp._id}>
                    <div className="flex justify-between items-end mb-1">
                      <h4 className="font-bold text-[15px] text-gray-900">{exp.position}</h4>
                      <span className="text-[11px] font-black px-2 py-0.5 bg-gray-900 text-white rounded-sm">
                        {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                      </span>
                    </div>
                    <div className="text-[13px] font-bold text-gray-500 mb-2" style={{ color: settings.primaryColor }}>@{exp.company}</div>
                    {exp.summary && <p className="text-[12px] leading-relaxed text-gray-700 whitespace-pre-wrap">{exp.summary}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-[35%] flex flex-col gap-8">
          {resume.skills.length > 0 && (
            <section>
              <SectionTitle>Tech_Stack</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map(s => (
                  <span key={s._id} className="text-[11px] font-bold px-2 py-1 border-2 text-gray-800" style={{ borderColor: settings.primaryColor }}>
                    {s.name}
                  </span>
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
                    <h4 className="font-bold text-[13px] text-gray-900">{edu.studyType}</h4>
                    <div className="text-[12px] font-bold text-gray-500 mb-1">{edu.institution}</div>
                    <span className="text-[10px] font-black text-gray-400 block">
                      {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStartup;
