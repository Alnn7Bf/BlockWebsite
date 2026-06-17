export const particlesConfig = {
  fullScreen: {
    enable: false,
  },
  background: {
    color: {
      value: "transparent",
    },
  },  
  particles: {
    number: {
      value: 35,
      density: {
        enable: true,
      }
    },
    paint: {
      fill: {
        enable: true,
        opacity: {min: 0.2, max: 0.4},
        color: {
          value: "#ffffff"
        }
      }
    },
    shape: {
      type: "square",
    },
    move: {
      enable: true,
      direction: "top-right" as const,
      speed: { min: 1, max: 2 }, 
    },
    size: {
      value: { min: 1, max: 3 },
    },
    rotate: {
      value: {min: 0, max: 360},
      animation: {
        enable: true,
        speed: {min: -10, max: 10}
      }
    }
  },
};