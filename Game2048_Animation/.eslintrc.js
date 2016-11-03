module.exports = {
	"parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
	"env": {
		"node": true,
		"browser": true,
		"commonjs": true,
		"es6": true,
		"amd": true,
		"jquery": true
	},
	"extends": "eslint:recommended",
	"rules": {
		"no-console": "off",
		"no-constant-condition": "warn",
		"accessor-pairs": "error",
		"array-callback-return": "error",
		"consistent-return": "error",
		"curly": "error",
		"dot-location": ["error", "property"],
		"dot-notation": "error",
		"eqeqeq": ["error", "smart"],
		"no-alert": "error",
		"no-caller": "error",
		"no-else-return": "error",
		"no-empty-function": "error",
		"no-empty-pattern": "error",
		"no-eq-null": "error",
		"no-eval": "error",
		"no-extend-native": "error",
		"no-extra-bind": "error",
		"no-extra-label": "error",
		"no-floating-decimal": "error",
		"no-implied-eval": "error",
		"no-iterator": "error",
		"no-labels": "error",
		"no-loop-func": "error",
		"no-magic-numbers": "warn",
		"no-multi-spaces": "error",
		"no-new-func": "error",
		"no-new": "error",
		"no-octal-escape": "error",
		"no-octal": "error",
		"no-proto": "error",
		"no-return-assign": "error",
		"no-script-url": "error",
		"no-self-compare": "error",
		"no-sequences": "error",
		"no-throw-literal": "error",
		"no-unmodified-loop-condition": "error",
		"no-unused-expressions": "error",
		"no-useless-concat": "error",
		"no-useless-escape": "error",
		"no-void": "error",
		"no-warning-comments": "error",
		"wrap-iife": ["error", "inside"],
		"yoda": "error",
		"init-declarations": "error",
		"no-label-var": "error",
		"no-shadow": "error",
		"no-undef-init": "error",
		"no-unused-vars": "warn",
		"no-use-before-define": "error",
		"array-bracket-spacing": "error",
		"block-spacing": "error",
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
		"camelcase": "error",
		"comma-spacing": "error",
		"comma-style": "error",
		"eol-last": ["error", "windows"],
		"indent": ["error", "tab", { "SwitchCase": 1 }],
		"key-spacing": "error",
		"keyword-spacing": "error",
		"linebreak-style": ["error", "windows"],
		"new-cap": "error",
		"new-parens": "error",
		"no-lonely-if": "error",
		"no-mixed-operators": "error",
		"no-mixed-spaces-and-tabs": "error",
		"no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1, "maxBOF": 0 }],
		"no-new-object": "error",
		"no-spaced-func": "error",
		"no-trailing-spaces": "error",
		"no-unneeded-ternary": "error",
		"no-whitespace-before-property": "error",
		"object-curly-spacing": ["error", "always"],
		"one-var": ["error", "never"],
		"operator-assignment": "error",
		"operator-linebreak": ["error", "before"],
		"padded-blocks": ["error", "never"],
		"quote-props": ["error", "as-needed"],
		"quotes": ["error", "double", { "avoidEscape": true }],
		"semi-spacing": "error",
		"semi": "error",
		"space-before-blocks": "error",
		"space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }],
		"space-in-parens": "error",
		"space-infix-ops": "error",
		"space-unary-ops": "error"
	}
};