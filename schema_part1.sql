-- 1. Main Owner Table
CREATE TABLE portfolio_owner (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    headline VARCHAR(255),
    sub_headline TEXT,
    resume_url VARCHAR(255)
);

-- 2. About Info (Connected to Owner)
CREATE TABLE about_info (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES portfolio_owner(id),
    bio_text TEXT NOT NULL,
    profile_image_url VARCHAR(255),
    years_of_experience INT
);

-- 3. Social Links (Connected to Owner)
CREATE TABLE social_links (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES portfolio_owner(id),
    platform_name VARCHAR(50) NOT NULL,
    profile_url VARCHAR(255) NOT NULL,
    icon_class VARCHAR(50)
);

-- 4. Tech Stack (Skills)
CREATE TABLE tech_stack (
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    icon_url VARCHAR(255)
);

-- 5. Projects (Connected to Owner)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES portfolio_owner(id),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    main_image_url VARCHAR(255)
);

-- 6. Websites (Connected to Owner)
CREATE TABLE websites (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES portfolio_owner(id),
    site_name VARCHAR(150) NOT NULL,
    site_url VARCHAR(255),
    client_name VARCHAR(100)
);

-- 7. Videos (Connected to Owner)
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES portfolio_owner(id),
    title VARCHAR(150),
    video_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    platform VARCHAR(50)
);

-- 8. Cinematics (Connected to Owner)
CREATE TABLE cinematics (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES portfolio_owner(id),
    title VARCHAR(150),
    media_url VARCHAR(255) NOT NULL,
    description TEXT
);

-- 9. Testimonials (Standalone or connected to projects/websites)
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_role VARCHAR(100),
    feedback_text TEXT NOT NULL,
    avatar_url VARCHAR(255)
);

-- 10. Contact Messages (Standalone)
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    sender_email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
