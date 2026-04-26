import React from 'react';

const ModernProfessional = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();
  const primaryColor = settings.primaryColor || '#1e3a8a'; // Default dark blue

  return (
    <div
      className="bg-white min-h-[1056px] flex flex-row"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* LEFT COLUMN - SOLID DARK */}
      <div 
        className="w-[32%] p-8 text-white flex flex-col gap-8"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex justify-center">
          {resume.picture.url ? (
            <img
              src={resume.picture.url}
              alt="Profile"
              style={{
                width: 150,
                height: 150,
                borderRadius: resume.picture.borderRadius === 0 ? '0' : '50%',
                objectFit: 'cover',
                border: '3px solid rgba(255,255,255,0.3)'
              }}
            />
          ) : (
            <div 
              className="w-[150px] h-[150px] rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10"
            >
              <span className="text-[40px] font-light opacity-50">{b.firstName?.[0]}{b.lastName?.[0]}</span>
            </div>
          )}
        </div>

        <section>
          <h3 className="text-[15px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Contact Info</h3>
          <div className="flex flex-col gap-3 text-[12px] opacity-90">
            {b.phone && <p>{b.phone}</p>}
            {b.email && <p className="break-all">{b.email}</p>}
            {b.location && <p>{b.location}</p>}
            {b.website && <p>{b.website}</p>}
            {resume.profiles.map(p => (
              <p key={p._id}>{p.url}</p>
            ))}
          </div>
        </section>

        {resume.education.length > 0 && (
          <section>
            <h3 className="text-[15px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Education</h3>
            <div className="flex flex-col gap-4 text-[12px]">
              {resume.education.map(edu => (
                <div key={edu._id}>
                  <p className="font-bold text-[13px]">{edu.studyType}</p>
                  <p className="opacity-90">{edu.institution}</p>
                  <p className="opacity-70 mt-1 italic">{[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.skills.length > 0 && (
          <section>
            <h3 className="text-[15px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Expertise</h3>
            <ul className="list-disc pl-4 flex flex-col gap-2 text-[12px] opacity-90">
              {resume.skills.map(s => (
                <li key={s._id}>
                  <span className="font-bold">{s.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-[68%] p-10 flex flex-col gap-6 text-[#1f2937]">
        <header className="mb-4">
          <h1 
            className="text-[48px] font-light tracking-tight leading-none mb-2"
            style={{ color: primaryColor }}
          >
            <span className="font-bold">{b.firstName}</span> {b.lastName}
          </h1>
          {b.headline && (
            <h2 className="text-[18px] font-medium tracking-wide text-gray-500 uppercase">
              {b.headline}
            </h2>
          )}
        </header>

        {b.summary && (
          <section className="mb-4">
            <h3 
              className="text-[16px] font-bold uppercase tracking-wider mb-3 flex items-center gap-3"
              style={{ color: primaryColor }}
            >
              Professional Profile
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </h3>
            <p className="text-[13px] leading-relaxed text-gray-600">
              {b.summary}
            </p>
          </section>
        )}

        {resume.experience.length > 0 && (
          <section>
            <h3 
              className="text-[16px] font-bold uppercase tracking-wider mb-4 flex items-center gap-3"
              style={{ color: primaryColor }}
            >
              Work Experience
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </h3>
            <div className="flex flex-col gap-6">
              {resume.experience.map(exp => (
                <div key={exp._id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[15px] text-gray-800">{exp.position}</h4>
                    <span className="text-[12px] font-bold" style={{ color: primaryColor }}>
                      {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                    </span>
                  </div>
                  <h5 className="text-[13px] font-semibold text-gray-500 mb-2">{exp.company} {exp.location ? `| ${exp.location}` : ''}</h5>
                  {exp.summary && (
                    <div className="text-[13px] leading-relaxed text-gray-600 whitespace-pre-wrap pl-2 border-l-2 border-gray-200">
                      {exp.summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.projects && resume.projects.length > 0 && (
          <section className="mt-2">
            <h3 
              className="text-[16px] font-bold uppercase tracking-wider mb-4 flex items-center gap-3"
              style={{ color: primaryColor }}
            >
              Key Projects
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </h3>
            <div className="flex flex-col gap-4">
              {resume.projects.map(proj => (
                <div key={proj._id}>
                  <h4 className="font-bold text-[14px] text-gray-800 mb-1">{proj.name}</h4>
                  {proj.description && (
                    <p className="text-[12px] leading-relaxed text-gray-600">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernProfessional;
