module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { max: "639px" },

      md: { max: "767px" },

      lg: { max: "1023px" },

      xl: { max: "1279px" },
    },
    fontFamily: {
      sans: ["Ubuntu", "Sans-serif"],
    },
    extend: {
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
    ripple: (theme) => ({
      colors: theme("colors"),
      activeTransition: 'background 1s'
    }),
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-animatecss")({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
      variants: ["responsive"],
    }),
    require("tailwindcss-ripple")(),
  ],
};
