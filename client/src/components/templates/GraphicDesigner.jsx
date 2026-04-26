import React from 'react';

const GraphicDesigner = ({ resume, settings }) => {
  const b = resume.basics;
  const fullName = `${b.firstName} ${b.lastName}`.trim();
  const primaryColor = settings.primaryColor || '#f97316'; // Default orange

  return (
    <div
      className="bg-white min-h-[1056px] flex flex-row"
      style={{
        fontFamily: `'${settings.font}', sans-serif`,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* LEFT COLUMN - ACCENT BACKGROUND */}
      <div 
        className="w-[35%] p-8 text-white flex flex-col gap-8"
        style={{ backgroundColor: primaryColor }}
      >
        {resume.picture.url && (
          <div className="w-full flex justify-center mb-4">
            <img
              src={resume.picture.url}
              alt="Profile"
              style={{
                width: 140,
                height: 140,
                borderRadius: resume.picture.borderRadius === 0 ? '0' : '50%',
                objectFit: 'cover',
                border: '4px solid rgba(255,255,255,0.2)'
              }}
            />
          </div>
        )}

        <section>
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-white/30 pb-2 mb-4">Contact</h3>
          <div className="flex flex-col gap-3 text-[13px] font-medium opacity-90">
            {b.phone && <p>{b.phone}</p>}
            {b.email && <p className="break-all">{b.email}</p>}
            {b.location && <p>{b.location}</p>}
            {b.website && <p>{b.website}</p>}
            {resume.profiles.map(p => (
              <p key={p._id}>{p.url}</p>
            ))}
          </div>
        </section>

        {resume.skills.length > 0 && (
          <section>
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-white/30 pb-2 mb-4">Skills</h3>
            <div className="flex flex-col gap-3 text-[13px]">
              {resume.skills.map(s => (
                <div key={s._id}>
                  <p className="font-bold opacity-100">{s.name}</p>
                  {s.keywords && <p className="opacity-80 text-[11px] leading-tight mt-0.5">{s.keywords}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.education.length > 0 && (
          <section>
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-white/30 pb-2 mb-4">Education</h3>
            <div className="flex flex-col gap-4 text-[13px]">
              {resume.education.map(edu => (
                <div key={edu._id}>
                  <p className="font-bold">{edu.studyType}</p>
                  <p className="opacity-90">{edu.institution}</p>
                  <p className="opacity-70 text-[11px] mt-0.5">{[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-[65%] p-10 flex flex-col gap-8 text-[#333333]">
        <header className="mb-2">
          <h1 
            className="text-[42px] font-black uppercase leading-[1.1] tracking-tighter"
            style={{ color: primaryColor }}
          >
            {b.firstName} <br /> {b.lastName}
          </h1>
          {b.headline && (
            <h2 className="text-[16px] font-medium tracking-[0.3em] uppercase mt-4 text-gray-500">
              {b.headline}
            </h2>
          )}
        </header>

        {b.summary && (
          <section>
            <h3 
              className="text-sm font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-4"
              style={{ color: primaryColor }}
            >
              Profile <span className="flex-1 h-[2px] bg-gray-200"></span>
            </h3>
            <p className="text-[13px] leading-relaxed text-gray-600">{b.summary}</p>
          </section>
        )}

        {resume.experience.length > 0 && (
          <section>
            <h3 
              className="text-sm font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-4"
              style={{ color: primaryColor }}
            >
              Experience <span className="flex-1 h-[2px] bg-gray-200"></span>
            </h3>
            <div className="flex flex-col gap-6">
              {resume.experience.map(exp => (
                <div key={exp._id} className="relative pl-4 border-l-2 border-gray-200">
                  <div 
                    className="absolute w-3 h-3 rounded-full -left-[7px] top-1"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <h4 className="font-bold text-[15px]">{exp.position}</h4>
                  <p className="text-[13px] font-semibold text-gray-500 mb-1">{exp.company} | {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}</p>
                  {exp.summary && (
                    <p className="text-[13px] leading-relaxed text-gray-600 mt-2 whitespace-pre-wrap">
                      {exp.summary}
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

export default GraphicDesigner;
