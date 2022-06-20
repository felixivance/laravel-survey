module.exports = {
  mode: 'jit',
  purge: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.vue',
  ],
  // content: [
  //   "./resources/**/*.blade.php",
  //   "./resources/**/*.js",
  //   "./resources/**/*.vue",
  // ],
  theme: {
    extend: {
      keyframes:{
        'fade-in-down':{
          "from": {
            transform: "translateY(-0.75rem)",
            opacity:'0'
          },
          "to":{
            transform: "translateY(0rem)",
            opacity:'1'
          }
        }
      },
      animation:{
        'fade-in-down': "fade-in-down 0.2s ease-in-out both"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

// const defaultTheme = require('tailwindcss/defaultTheme');
//
// module.exports = {
//   mode: 'jit',
//   purge: [
//     './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
//     './vendor/laravel/jetstream/**/*.blade.php',
//     './storage/framework/views/*.php',
//     './resources/views/**/*.blade.php',
//     './resources/js/**/*.vue',
//   ],
//
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Nunito', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//
//   variants: {
//     extend: {
//       opacity: ['disabled'],
//     },
//   },
//
//   plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
// };
