import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-white pt-16 mt-10 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          Build faster with <span className="text-blue-600">Verified</span>{" "}
          Code.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto"
        >
          ProjectWala is the marketplace for premium source codes, landing
          pages, and full-stack templates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link
            to={"/projects"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all"
          >
            Explore Projects
          </Link>
          <button className="bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg rounded-full px-8 py-3 border-2 border-slate-300 hover:border-slate-400 transition-all shadow-md">
            Sell Your Code
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
