import { r as resumeData } from "../../chunks/resume.js";
const load = async () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resumeData.basics.name,
    jobTitle: resumeData.basics.title,
    description: resumeData.summary.join(" "),
    url: resumeData.basics.site,
    email: resumeData.basics.email,
    telephone: resumeData.basics.phone.replace(/[\s\+]/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: resumeData.basics.location.split(",")[0],
      addressCountry: "NL"
    },
    sameAs: [
      resumeData.basics.github,
      resumeData.basics.linkedin,
      resumeData.basics.site
    ],
    knowsAbout: [
      ...resumeData.skills.languages,
      ...resumeData.skills.frameworks,
      ...resumeData.skills.styling,
      ...resumeData.skills.backend,
      ...resumeData.skills.databases
    ].filter(Boolean),
    alumniOf: resumeData.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution
    })),
    hasOccupation: resumeData.experience.map((exp) => ({
      "@type": "Occupation",
      name: exp.role,
      description: exp.bullets.join(" "),
      worksFor: {
        "@type": "Organization",
        name: exp.company
      }
    }))
  };
  return {
    resume: resumeData,
    structuredData
  };
};
export {
  load
};
