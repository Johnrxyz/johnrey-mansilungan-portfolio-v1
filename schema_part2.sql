-- 11. Project Images (NEW - Connected to Projects)
-- Stores multiple extra screenshots for a single project (1-to-many)
CREATE TABLE project_images (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255)
);

-- 12. Project Technologies (NEW - Connected to Projects & Tech Stack)
-- Maps which tech stack was used on which project (Many-to-many)
CREATE TABLE project_technologies (
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    tech_id INT REFERENCES tech_stack(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tech_id)
);
