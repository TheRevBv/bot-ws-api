import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";

const BANNER = [
  "/** \n",
  "* NO TOCAR ESTE ARCHIVO: Es generado automáticamente\n",
  "* de lo contrario mejor ir al servidor de discord link.codigoencasa.com/DISCORD\n",
  "*/",
];

export default {
  input: "src/index.ts",
  output: {
    banner: BANNER.join(""),
    file: "dist/index.js",
    format: "esm", // o 'cjs' si prefieres CommonJS
  },
  plugins: [typescript(), terser()],
};
