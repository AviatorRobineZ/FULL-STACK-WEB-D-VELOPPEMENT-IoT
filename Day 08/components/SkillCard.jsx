import { useState } from "react";

const skillsData = [
  {id: 1, category: "Frontend", level: 4, skills: ["HTML5", "CSS3", "JavaScript"],},
  {id: 2, category: "Backend", level: 3, skills: ["PHP", "Laravel", "MySQL"],},
  {id: 3, category: "IoT", level: 2, skills: ["Arduino", "MQTT", "Raspberry Pi"],},
  {id: 4, category: "UI/UX", level: 5, skills: ["Figma", "Adobe XD"],},
  {id: 5, category: "Graphic Design", level: 4, skills: ["Adobe Photoshop", "Adobe Illustrator"],},
];


const StarRating = ({ level }) => (
  <div style={{ display: "flex", gap: "3px", }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} style={{ fontSize: "16px", color: star <= level ? "#fbbf24" : "#374151" }}>
        ★
      </span>
    ))}
  </div>
);


const SkillCard = ({ category, level, color, icon, description, skills }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      border: `1px solid ${color}33`,
      borderLeft: `4px solid ${color}`,
      borderRadius: "12px",
      padding: "20px",
      boxShadow: expanded ? `0 8px 30px ${color}22` : "0 2px 10px #0004",
      transition: "transform 0.2s",
    }}>

  
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>{icon}</span>
          <h2 style={{ margin: 0, color: "#f8fafc", fontSize: "17px" }}>{category}</h2>
        </div>


        {level >= 4 && (
          <span style={{
            background: color,
            color: "#fff",
            fontSize: "11px",
            fontWeight: "700",
            padding: "3px 10px",
            borderRadius: "999px",
            textTransform: "uppercase",
          }}>
            Expert
          </span>
        )}
      </div>


      <StarRating level={level} />

  
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: "10px",
          background: "transparent",
          border: `1px solid ${color}55`,
          color: color,
          borderRadius: "6px",
          padding: "5px 12px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
       
        {expanded ? "▲ Masquer" : "▼ Voir détails"}
      </button>

  
      {expanded && (
        <div style={{ marginTop: "14px", borderTop: `1px solid ${color}22`, paddingTop: "14px" }}>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "12px" }}>{description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {skills.map((skill) => (
              <span key={skill} style={{
                background: `${color}18`,
                border: `1px solid ${color}44`,
                color: "#e2e8f0",
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "12px",
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const SkillsSection = () => {
  const [filter, setFilter] = useState("tous");

  const categories = ["tous", "Expert (≥4)", "Intermédiaire (<4)"];

  const filtered = skillsData.filter((s) => {
    if (filter === "Expert (≥4)") return s.level >= 4;
    if (filter === "Intermédiaire (<4)") return s.level < 4;
    return true;
  });

  return (
    <section style={{ minHeight: "100vh", background: "#020817", padding: "60px 24px" }}>

      <h1 style={{ textAlign: "center", color: "#f8fafc", marginBottom: "40px", fontSize: "42px" }}>
        Compétences
      </h1>

      
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "36px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
         

            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid",
              borderColor: filter === cat ? "#4f8ef7" : "#1e293b",
              background:   filter === cat ? "#4f8ef7" : "transparent",
              color:        filter === cat ? "#fff"    : "#64748b",
              fontWeight:   filter === cat ? "700"     : "400",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

    
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        maxWidth: "960px",
        margin: "0 auto",
      }}>
        {filtered.map((s) => (
          <SkillCard key={s.id} {...s} />
        ))}
      </div>

    </section>
  );
};

export default SkillsSection;

