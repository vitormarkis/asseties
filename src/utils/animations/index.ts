export const Animation = {
  emerge: (d: number) => ({
    hidden: {
      opacity: 0,
      y: -20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: d * 0.04,
      },
    },
    exit: {
      opacity: 0,
      x: -400,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }),
}
