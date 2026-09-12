import { motion } from "framer-motion";

export default function AnimatedSection({ children, className = "", delay = 0, as = "section" }) {
  const MotionTag = motion[as] || motion.section;
  return (
    <MotionTag
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
