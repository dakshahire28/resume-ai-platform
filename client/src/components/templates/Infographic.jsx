import React from 'react';

const Infographic = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();

  const SectionTitle = ({ children }) => (
    <h3 className="text-[14px] font-black uppercase tracking-wider mb-3 flex items-center gap-2">
      <span className="w-6 h-6 flex items-center justify-center text-white rounded-md" style={{ backgroundColor: settings.primaryColor }}>
        ✦
      </span>
      {children}
    </h3>
  );

  return (
    <div
      className="bg-gray-50 flex h-full"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      <aside className="w-[30%] bg-white p-6 shadow-xl z-10 shrink-0">
        <div className="text-center mb-8">
          {resume.picture.url ? (
            <img
              src={resume.picture.url}
              alt="Profile"
              style={{
                width: 120, height: 120, borderRadius: '30%', objectFit: 'cover',
                border: `4px solid ${settings.primaryColor}`
              }}
              className="mx-auto mb-4"
            />
          ) : (
            <div className="w-[120px] h-[120px] mx-auto mb-4 rounded-[30%] bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-black border-4" style={{ borderColor: settings.primaryColor }}>
              {b.firstName?.[0]}{b.lastName?.[0]}
            </div>
          )}
          <h1 className="text-2xl font-black uppercase leading-none text-gray-900 mb-1">{b.firstName}<br/><span style={{ color: settings.primaryColor }}>{b.lastName}</span></h1>
          {b.headline && <p className="text-[11px] font-bold text-gray-500 uppercase mt-2">{b.headline}</p>}
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Contact</h4>
            <div className="space-y-2 text-[11px] font-semibold text-gray-700">
              {b.phone && <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: settings.primaryColor}}></span>{b.phone}</div>}
              {b.email && <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: settings.primaryColor}}></span>{b.email}</div>}
              {b.location && <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: settings.primaryColor}}></span>{b.location}</div>}
            </div>
          </section>

          {resume.skills.length > 0 && (
            <section>
              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Skills</h4>
              <div className="space-y-3">
                {resume.skills.map(s => (
                  <div key={s._id}>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span>{s.name}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: s.level === 'Expert' ? '100%' : s.level === 'Advanced' ? '80%' : s.level === 'Intermediate' ? '60%' : '40%', backgroundColor: settings.primaryColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {resume.languages.length > 0 && (
            <section>
              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {resume.languages.map(l => (
                  <span key={l._id} className="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                    {l.language}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      <main className="w-[70%] p-8 shrink-0">
        {b.summary && (
          <section className="mb-8 bg-white p-5 rounded-xl shadow-sm border-l-4" style={{ borderColor: settings.primaryColor }}>
            <p className="text-[12px] font-medium leading-relaxed text-gray-600">{b.summary}</p>
          </section>
        )}

        {resume.experience.length > 0 && (
          <section className="mb-8">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp._id} className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: settings.primaryColor }}></div>
                  <h4 className="font-bold text-[14px] text-gray-900">{exp.position}</h4>
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span>{exp.company}</span>
                    <span>{[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}</span>
                  </div>
                  {exp.summary && <p className="text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap">{exp.summary}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              {resume.education.map(edu => (
                <div key={edu._id} className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-[12px] text-gray-900 mb-1">{edu.studyType}</h4>
                  <p className="text-[11px] font-medium text-gray-500 mb-2">{edu.institution}</p>
                  <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Infographic;
