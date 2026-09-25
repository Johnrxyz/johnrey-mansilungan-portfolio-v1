# Graph Report - .  (2026-07-05)

## Corpus Check
- Large corpus: 60 files · ~1,659,527 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 214 nodes · 271 edges · 21 communities (18 shown, 3 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.84)
- Token cost: 150,053 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_V2 Immersive Portfolio UI|V2 Immersive Portfolio UI]]
- [[_COMMUNITY_Résumé Experience & Skills|Résumé: Experience & Skills]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_V1 Portfolio Sections|V1 Portfolio Sections]]
- [[_COMMUNITY_Build & Dev Tooling|Build & Dev Tooling]]
- [[_COMMUNITY_Cinematic Image Series|Cinematic Image Series]]
- [[_COMMUNITY_Preview Verification & Guidance|Preview Verification & Guidance]]
- [[_COMMUNITY_Contact Form & Brevo Backend|Contact Form & Brevo Backend]]
- [[_COMMUNITY_Layout & Theme System|Layout & Theme System]]
- [[_COMMUNITY_Client Project Screenshots|Client Project Screenshots]]
- [[_COMMUNITY_Video Showcase Components|Video Showcase Components]]
- [[_COMMUNITY_Design Mode Context|Design Mode Context]]
- [[_COMMUNITY_Brand & Author Identity|Brand & Author Identity]]
- [[_COMMUNITY_RYE Visuals Branding|RYE Visuals Branding]]
- [[_COMMUNITY_Animated Background Asset|Animated Background Asset]]

## God Nodes (most connected - your core abstractions)
1. `Johnrey Mansilungan Resume (public)` - 18 edges
2. `Reveal()` - 10 edges
3. `TiltCard()` - 9 edges
4. `Vite + React 19 Portfolio Site` - 6 edges
5. `Cinematic Alley (cyberpunk neon street)` - 6 edges
6. `handler()` - 5 edges
7. `scripts` - 5 edges
8. `Button()` - 5 edges
9. `Cinematic Eye (mechanical camera lens creature)` - 5 edges
10. `Visual Verification Loop` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Preview Verification Order of Operations` --semantically_similar_to--> `Visual Verification Loop`  [INFERRED] [semantically similar]
  CLAUDE.md → .claude/skills/verify/SKILL.md
- `Johnrey Mansilungan Resume (assets)` --semantically_similar_to--> `Johnrey Mansilungan Resume (public)`  [EXTRACTED] [semantically similar]
  src/assets/Johnrey_Mansilungan_Resume.pdf → public/Johnrey_Mansilungan_Resume.pdf
- `V2Contact()` --indirect_call--> `handler()`  [INFERRED]
  src/components/v2/V2Contact.jsx → netlify/functions/send-contact.js
- `index.html SPA Entry Point` --conceptually_related_to--> `Vite + React 19 Portfolio Site`  [INFERRED]
  index.html → CLAUDE.md
- `Cinematic Alley (cyberpunk neon street)` --semantically_similar_to--> `Cinematic Eye (mechanical camera lens creature)`  [INFERRED] [semantically similar]
  public/cinematic_alley.png → public/cinematic_eye.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **UI Verification Workflow** — _claude_skills_verify_skill_visual_verification_loop, claude_preview_verification_order, _claude_skills_verify_skill_known_good_viewport, _claude_skills_verify_skill_stale_console_buffer [INFERRED 0.85]
- **Video Editing Skillset** — public_johnrey_mansilungan_resume_skill_video_editing, public_johnrey_mansilungan_resume_skill_subtitle_caption_editing, public_johnrey_mansilungan_resume_skill_audio_sync_dubbing, public_johnrey_mansilungan_resume_skill_storytelling_pacing, public_johnrey_mansilungan_resume_skill_motion_graphics_transitions [INFERRED 0.75]
- **Web Development Skillset** — public_johnrey_mansilungan_resume_skill_html, public_johnrey_mansilungan_resume_skill_css, public_johnrey_mansilungan_resume_skill_javascript, public_johnrey_mansilungan_resume_skill_python, public_johnrey_mansilungan_resume_skill_git [INFERRED 0.75]
- **Cinematic image series** — public_cinematic_alley, public_cinematic_crew, public_cinematic_eye, public_cinematic_robot [INFERRED 0.80]
- **Portfolio project screenshots (client work)** — src_assets_aaron, src_assets_asl, src_assets_traininghub [INFERRED 0.80]

## Communities (21 total, 3 thin omitted)

### Community 0 - "V2 Immersive Portfolio UI"
Cohesion: 0.07
Nodes (26): App(), facts, V2About(), cinematics, V2Footer(), useTypewriter(), V2Hero(), Magnetic() (+18 more)

### Community 1 - "Résumé: Experience & Skills"
Cohesion: 0.11
Nodes (22): Johnrey Mansilungan Resume (public), ABM Strand (Senior High), BS Information Technology, Dalubhasaan ng Lungsod ng Lucena, Lucena Dalahican National High School, Freelance (Employer), Aaron Ocaya Portfolio Website, Armor Sin Limites (E-commerce Site) (+14 more)

### Community 2 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (17): dependencies, framer-motion, lucide-react, react, react-dom, react-router-dom, name, private (+9 more)

### Community 3 - "V1 Portfolio Sections"
Cohesion: 0.21
Nodes (8): About(), Contact(), Hero(), Services(), Showreel(), websites, Testimonials(), Button()

### Community 4 - "Build & Dev Tooling"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+8 more)

### Community 5 - "Cinematic Image Series"
Cohesion: 0.18
Nodes (14): Cinematic Alley (cyberpunk neon street), Cyberpunk aesthetic, Neon signage (Japanese/Blade Runner), Lone trench-coat figure, Cinematic Crew (film production set), Cinema camera on dolly track, Film production / on-set crew, Cinematic Eye (mechanical camera lens creature) (+6 more)

### Community 6 - "Preview Verification & Guidance"
Cohesion: 0.17
Nodes (13): Known-Good Viewport 1440x900, Stale Console Buffer Reset, verify skill, Visual Verification Loop, Contact Form via Netlify + Brevo, Full Visual Mockups Fidelity Target, Preview Verification Order of Operations, CLAUDE.md Project Guidance (+5 more)

### Community 7 - "Contact Form & Brevo Backend"
Cohesion: 0.21
Nodes (8): brevoPost(), escapeHtml(), handler(), reply(), fieldBase, labelStyle, socials, V2Contact()

### Community 8 - "Layout & Theme System"
Cohesion: 0.24
Nodes (5): Footer(), Header(), ThemeToggle(), ThemeContext, useTheme()

### Community 9 - "Client Project Screenshots"
Cohesion: 0.22
Nodes (9): aaron.png (AJ's Craft portfolio hero), AJ's Craft (portfolio site), Born to Create (tagline), asl.png (Armor Sin Limites storefront), Armor Sin Limites (streetwear brand), E-commerce storefront UI, trainingHub.png (Training Hub project), Caregiver training & certification (+1 more)

### Community 11 - "Design Mode Context"
Cohesion: 0.47
Nodes (3): DesignToggle(), DesignContext, useDesign()

### Community 12 - "Brand & Author Identity"
Cohesion: 0.50
Nodes (4): logo.png (RYE Visuals logo), RYE Visuals (brand), me.png (author profile / hero image), Johnrey Mansilungan (portfolio owner)

## Knowledge Gaps
- **75 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Build & Dev Tooling` to `Runtime Dependencies`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `V2Contact()` connect `Contact Form & Brevo Backend` to `V2 Immersive Portfolio UI`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `V2 Immersive Portfolio UI` be split into smaller, more focused modules?**
  _Cohesion score 0.06711915535444947 - nodes in this community are weakly interconnected._
- **Should `Résumé: Experience & Skills` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Build & Dev Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._