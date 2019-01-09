import node from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import replace from "rollup-plugin-replace"
import regenerator from "rollup-plugin-regenerator"

import flow from "rollup-plugin-flow"

export default {
  input: "src/components/index.js",
  output: {
    format: "umd",
    file: "dist/semiotic.js",
    name: "Semiotic",
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    },
    exports: "named"
  },
  external: ["react", "react-dom"],
  plugins: [
    flow(),
    node({ jsnext: true, browser: true, preferBuiltins: false }),
    regenerator({ includeRuntime: true, sourceMap: false }),
    commonjs({
      include: "node_modules/**",
      exclude: /json2csv/,
      namedExports: {
        "node_modules/d3-sankey-circular/dist/index.js": [
          "sankeyCircular",
          "sankeyLeft",
          "sankeyCenter",
          "sankeyRight",
          "sankeyJustify"
        ]
      }
    }),
    replace({
      "process.env.NODE_ENV": '"production"'
    }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        "@babel/preset-flow",
        "@babel/preset-react",
        "@babel/preset-env"
      ],
      plugins: [
        [
          "@babel/plugin-proposal-decorators",
          {
            legacy: true
          }
        ],
        [
          "@babel/plugin-proposal-class-properties",
          {
            loose: true
          }
        ]
      ]
    })
  ]
}
