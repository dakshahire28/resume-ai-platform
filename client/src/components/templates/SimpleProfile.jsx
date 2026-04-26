import React from 'react';

const SimpleProfile = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();
  const primaryColor = settings.primaryColor || '#ec4899'; // Default pink

  return (
    <div
      className="bg-[#fafafa] min-h-[1056px] px-12 py-14 flex flex-col gap-10"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
        color: '#4b5563'
      }}
    >
      {/* HEADER */}
      <header className="flex flex-col items-center text-center">
        {resume.picture.url && (
          <img
            src={resume.picture.url}
            alt="Profile"
            style={{
              width: 130,
              height: 130,
              borderRadius: resume.picture.borderRadius === 0 ? '0' : '50%',
              objectFit: 'cover',
              border: `4px solid ${primaryColor}20`
            }}
            className="mb-6 shadow-sm"
          />
        )}
        <h1 
          className="text-[36px] font-bold tracking-tight mb-2"
          style={{ color: primaryColor }}
        >
          {fullName || 'Your Name'}
        </h1>
        {b.headline && (
          <h2 className="text-[15px] font-semibold uppercase tracking-widest text-gray-500 mb-4">
            {b.headline}
          </h2>
        )}
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] font-medium text-gray-400">
          {b.email && <span>{b.email}</span>}
          {b.phone && <span>• {b.phone}</span>}
          {b.location && <span>• {b.location}</span>}
          {b.website && <span>• {b.website}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {b.summary && (
        <section className="text-center px-10">
          <p className="text-[13px] leading-relaxed text-gray-600 italic">
            "{b.summary}"
          </p>
        </section>
      )}

      {/* MAIN CONTENT SPLIT */}
      <div className="flex gap-12 mt-4">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col gap-8">
          {resume.experience.length > 0 && (
            <section>
              <h3 
                className="text-[16px] font-bold uppercase tracking-wider mb-5 border-b pb-2"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Experience
              </h3>
              <div className="flex flex-col gap-6">
                {resume.experience.map(exp => (
                  <div key={exp._id}>
                    <h4 className="font-bold text-gray-800 text-[15px]">{exp.position}</h4>
                    <div className="flex justify-between items-center mt-1 mb-2 text-[12px]">
                      <span className="font-semibold text-gray-500">{exp.company}</span>
                      <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                      </span>
                    </div>
                    {exp.summary && (
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                        {exp.summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.projects && resume.projects.length > 0 && (
            <section>
              <h3 
                className="text-[16px] font-bold uppercase tracking-wider mb-5 border-b pb-2"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Projects
              </h3>
              <div className="flex flex-col gap-4">
                {resume.projects.map(proj => (
                  <div key={proj._id}>
                    <h4 className="font-bold text-gray-800 text-[14px]">{proj.name}</h4>
                    {proj.description && (
                      <p className="text-[12px] leading-relaxed mt-1">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-[35%] flex flex-col gap-8">
          {resume.education.length > 0 && (
            <section>
              <h3 
                className="text-[16px] font-bold uppercase tracking-wider mb-5 border-b pb-2"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Education
              </h3>
              <div className="flex flex-col gap-4">
                {resume.education.map(edu => (
                  <div key={edu._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="font-bold text-gray-800 text-[13px]">{edu.studyType}</p>
                    <p className="text-[12px] text-gray-500 mt-1">{edu.institution}</p>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">
                      {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.skills.length > 0 && (
            <section>
              <h3 
                className="text-[16px] font-bold uppercase tracking-wider mb-5 border-b pb-2"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map(s => (
                  <div 
                    key={s._id} 
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.languages.length > 0 && (
            <section>
              <h3 
                className="text-[16px] font-bold uppercase tracking-wider mb-5 border-b pb-2"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Languages
              </h3>
              <div className="flex flex-col gap-2">
                {resume.languages.map(l => (
                  <div key={l._id} className="flex justify-between items-center text-[12px]">
                    <span className="font-bold text-gray-700">{l.language}</span>
                    <span className="text-gray-400">{l.fluency}</span>
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

export default SimpleProfile;
