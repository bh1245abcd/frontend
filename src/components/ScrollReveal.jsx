import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ScrollReveal = ({ children, className }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, //  Trigger earlier
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          y: 80, //  More subtle movement
          scale: 0.95, //  Slight zoom-in smooth feel
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8, //  Increase duration for smoothness
            ease: [0.22, 1, 0.36, 1], //  Premium easing ("easeOutExpo")
            delay: 0.1, //  Slight delay feels smoother
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
