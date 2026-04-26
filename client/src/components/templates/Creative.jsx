import React from 'react';

const Creative = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 shrink-0">
        {children}
      </h3>
      <div className="h-0.5 w-full bg-gray-200"></div>
    </div>
  );

  return (
    <div
      className="bg-white p-8"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      <header className="relative mb-8 pb-8 border-b-4" style={{ borderColor: settings.primaryColor }}>
        {/* Abstract decorative shape */}
        <div 
          className="absolute right-0 top-0 w-32 h-32 rounded-bl-full opacity-10"
          style={{ backgroundColor: settings.primaryColor }}
        ></div>
        
        <div className="flex items-center gap-6 relative z-10">
          {resume.picture.url && (
            <img
              src={resume.picture.url}
              alt="Profile"
              style={{
                width: 100,
                height: 100,
                borderRadius: '24px', // Squircle effect
                objectFit: 'cover',
                border: `3px solid ${settings.primaryColor}`
              }}
              className="shadow-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-1 leading-none">{b.firstName} <span style={{ color: settings.primaryColor }}>{b.lastName}</span></h1>
            {b.headline && <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">{b.headline}</h2>}
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-gray-600">
              {b.email && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: settings.primaryColor}}></span> {b.email}</span>}
              {b.phone && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: settings.primaryColor}}></span> {b.phone}</span>}
              {b.location && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: settings.primaryColor}}></span> {b.location}</span>}
            </div>
          </div>
        </div>
      </header>

      {b.summary && (
        <section className="mb-8">
          <p className="text-[13px] leading-relaxed text-gray-700 font-medium italic border-l-4 pl-4" style={{ borderColor: settings.primaryColor }}>
            "{b.summary}"
          </p>
        </section>
      )}

      <div className="flex gap-8">
        <div className="w-[60%] flex flex-col gap-6">
          {resume.experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="flex flex-col gap-5">
                {resume.experience.map(exp => (
                  <div key={exp._id} className="relative">
                    <div className="flex justify-between items-end mb-1">
                      <h4 className="font-bold text-[15px] text-gray-900 leading-none">{exp.position}</h4>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: settings.primaryColor }}>
                        {[exp.startDate, exp.endDate].filter(Boolean).join(' — ')}
                      </span>
                    </div>
                    <h5 className="text-[12px] font-bold text-gray-500 mb-2 uppercase tracking-wide">{exp.company}</h5>
                    {exp.summary && <p className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.summary}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-[40%] flex flex-col gap-6">
          {resume.education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="flex flex-col gap-4">
                {resume.education.map(edu => (
                  <div key={edu._id} className="bg-gray-50 p-3 rounded-lg border-l-4" style={{ borderColor: settings.primaryColor }}>
                    <h4 className="font-bold text-[13px] text-gray-900">{edu.studyType}</h4>
                    <p className="text-[11px] font-semibold text-gray-500 mb-1">{edu.institution}</p>
                    <span className="text-[10px] font-bold text-gray-400 block">
                      {[edu.startDate, edu.endDate].filter(Boolean).join(' — ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.skills.length > 0 && (
            <section>
              <SectionTitle>Expertise</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map(s => (
                  <span 
                    key={s._id} 
                    className="text-[10px] font-bold px-2.5 py-1 rounded-md text-white shadow-sm"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
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

export default Creative;
