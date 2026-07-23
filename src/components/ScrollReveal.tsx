import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const ScrollReveal = ({ children, delay = 0, className }: ScrollRevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 0.35, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
