import aaronImg from '../assets/aaron.png';
import meImg from '../assets/me.png';
import aslImg from '../assets/asl.png';

const WebsiteCard = ({ title, description, image, techStack, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-dark-card shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-shadow hover:shadow-md">
            {image ? (
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-neutral-500 font-medium bg-neutral-50 dark:bg-dark-card">
                    Screenshot Placeholder
                </div>
            )}
        </div>
        <div className="mt-4 space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
            </h3>
            <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                {description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
                {techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-medium rounded-md bg-neutral-100 dark:bg-dark-border text-slate-600 dark:text-neutral-300">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </a>
);

const Websites = () => {
    const websites = [
        {
            title: "Artist/Architecture Student Portfolio Website",
            description: "A minimalist portfolio built for an artist.",
            techStack: ["React", "Tailwind CSS", "Vite", "DJango Rest Framework", "Cloudinary"],
            link: "https://aaronocaya.netlify.app/",
            image: aaronImg
        },
        {
            title: "My Portfolio Website",
            description: "A minimalist portfolio built for myself as a video editor/web developer, focusing on performance and clarity.",
            techStack: ["React", "Tailwind CSS", "Vite"],
            link: "https://notrye.netlify.app/",
            image: meImg
        },
        {
            title: "Armor Sin Limites - E-Commerce Website [in progress]",
            description: "An e-commerce website built for a clothing brand. (preview coming soon)",
            techStack: ["React", "Tailwind CSS", "Vite", "DJango Rest Framework", "Cloudinary", "PayMongo", "PostgreSQL", "Brevo", "Railway"],
            link: "#",
            image: aslImg
        },
    ];

    return (
        <div className="pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Web Development
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Clean, performant, and user-focused websites.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {websites.map((site, index) => (
                        <WebsiteCard key={index} {...site} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Websites;
