import {
  Code,
  Database,
  Layout,
  Server,
  Cloud,
  Smartphone,
  Palette,
  Lock,
  Zap,
  Globe,
  Package,
  GitBranch,
} from "lucide-react";
import { motion } from "framer-motion";

function Sections() {
  const sections = [
    {
      category: "Frontend",
      items: [
        { icon: Code, name: "React", color: "text-cyan-400" },
        { icon: Layout, name: "Next.js", color: "text-white" },
        { icon: Code, name: "Vue.js", color: "text-green-400" },
        { icon: Palette, name: "Tailwind CSS", color: "text-blue-400" },
      ],
    },
    {
      category: "Backend",
      items: [
        { icon: Server, name: "Node.js", color: "text-green-500" },
        { icon: Code, name: "Express", color: "text-gray-400" },
        { icon: Server, name: "Django", color: "text-green-600" },
        { icon: Code, name: "FastAPI", color: "text-teal-400" },
      ],
    },
    {
      category: "Database",
      items: [
        { icon: Database, name: "MongoDB", color: "text-green-500" },
        { icon: Database, name: "PostgreSQL", color: "text-blue-500" },
        { icon: Database, name: "MySQL", color: "text-orange-400" },
        { icon: Database, name: "Redis", color: "text-red-500" },
      ],
    },
    {
      category: "DevOps & Cloud",
      items: [
        { icon: Cloud, name: "AWS", color: "text-orange-400" },
        { icon: Cloud, name: "Azure", color: "text-blue-500" },
        { icon: GitBranch, name: "Docker", color: "text-blue-400" },
        { icon: Package, name: "Kubernetes", color: "text-blue-600" },
      ],
    },
    {
      category: "Mobile & Other",
      items: [
        { icon: Smartphone, name: "React Native", color: "text-cyan-400" },
        { icon: Smartphone, name: "Flutter", color: "text-blue-400" },
        { icon: Lock, name: "JWT Auth", color: "text-purple-400" },
        { icon: Zap, name: "GraphQL", color: "text-pink-500" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Project Tech Stack
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={sectionVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                {section.category}
              </h2>

              <motion.div
                variants={itemContainerVariants}
                className="flex flex-wrap gap-4"
              >
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={itemIdx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-600 hover:border-slate-500 hover:bg-slate-900/70 transition-all duration-200 cursor-pointer group"
                    >
                      <Icon
                        className={`${item.color} group-hover:scale-110 transition-transform duration-200`}
                        size={20}
                      />
                      <span className="text-gray-200 font-medium">
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Sections;
