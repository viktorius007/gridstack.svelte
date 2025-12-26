import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,

	// Node.js globals for config files (without strict type checking)
	{
		files: ['*.config.js', '*.config.ts'],
		languageOptions: {
			globals: { ...globals.node },
			parserOptions: {
				projectService: false
			}
		}
	},

	// Enhanced TypeScript configs (strict + type-checked + stylistic)
	...ts.configs.strictTypeChecked
		.filter((config) => config.rules || config.plugins)
		.map((config) => ({
			files: ['**/*.ts', '**/*.tsx', '**/*.svelte'],
			ignores: ['*.config.ts'],
			...(config.plugins && { plugins: config.plugins }),
			...(config.rules && { rules: config.rules })
		})),
	...ts.configs.stylisticTypeChecked
		.filter((config) => config.rules || config.plugins)
		.map((config) => ({
			files: ['**/*.ts', '**/*.tsx', '**/*.svelte'],
			ignores: ['*.config.ts'],
			...(config.plugins && { plugins: config.plugins }),
			...(config.rules && { rules: config.rules })
		})),

	// Parser and language options for TS files only (excluding config files)
	{
		files: ['**/*.ts', '**/*.tsx'],
		ignores: ['*.config.ts'],
		languageOptions: {
			parser: ts.parser,
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: true
			}
		},
		rules: {
			// ESLint Core - Runtime Error Prevention
			'array-callback-return': ['error', { allowImplicit: true }],
			'no-constructor-return': 'error',
			'no-promise-executor-return': 'error',
			'no-template-curly-in-string': 'error',
			'no-unreachable-loop': 'error',
			'no-useless-assignment': 'error',
			'require-atomic-updates': 'error',
			'no-unmodified-loop-condition': 'error',

			// ESLint Core - Security Vulnerabilities
			'no-eval': 'error',
			'no-new-func': 'error',
			'no-script-url': 'error',
			'no-extend-native': 'error',
			'no-proto': 'error',
			'no-caller': 'error',
			'no-iterator': 'error',
			'no-prototype-builtins': 'error',
			'no-alert': 'error',
			'no-new-wrappers': 'error',

			// ESLint Core - Code Quality
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			'no-param-reassign': ['error', { props: false }],
			'no-sequences': 'error',
			radix: 'error',
			'no-return-assign': ['error', 'always'],
			'no-var': 'error',
			'prefer-const': 'error',
			'prefer-template': 'error',
			'no-nested-ternary': 'error',
			'no-else-return': ['error', { allowElseIf: false }],
			'object-shorthand': ['error', 'always'],
			'no-lonely-if': 'error',
			'no-useless-rename': 'error',
			'prefer-object-spread': 'error',
			'prefer-spread': 'error',
			'no-object-constructor': 'error',
			'no-array-constructor': 'error',
			'no-unneeded-ternary': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-exponentiation-operator': 'error',
			'prefer-numeric-literals': 'error',
			'symbol-description': 'error',
			'no-lone-blocks': 'error',
			'no-multi-assign': 'error',
			'no-new': 'warn',
			'grouped-accessor-pairs': ['error', 'getBeforeSet'],
			'accessor-pairs': 'error',

			// ESLint Core - Best Practices
			'guard-for-in': 'warn',
			'default-case-last': 'error',
			'no-await-in-loop': 'warn',
			'block-scoped-var': 'error',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-undef-init': 'error',
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-implicit-coercion': 'error',
			complexity: ['error', 15],
			'max-depth': ['error', 4],
			'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: true }],
			'no-self-compare': 'error',
			'no-throw-literal': 'error',
			'no-unused-expressions': 'error',
			'no-useless-call': 'error',
			'no-useless-return': 'error',
			'prefer-promise-reject-errors': 'error',
			'max-nested-callbacks': ['error', 4],
			'max-params': ['error', 5],
			'no-extra-bind': 'error',
			'prefer-regex-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-rest-params': 'error',

			// TypeScript
			'no-undef': 'off',

			// TypeScript - Type Safety
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'error',
			'@typescript-eslint/require-array-sort-compare': 'error',
			'@typescript-eslint/no-unsafe-type-assertion': 'error',
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/consistent-return': 'error',
			'@typescript-eslint/promise-function-async': 'warn',

			// TypeScript - Code Quality
			'@typescript-eslint/no-shadow': [
				'error',
				{
					ignoreTypeValueShadow: true,
					ignoreFunctionTypeParameterNameValueShadow: true
				}
			],
			'@typescript-eslint/default-param-last': 'error',
			'@typescript-eslint/no-loop-func': 'error',
			'@typescript-eslint/no-unnecessary-qualifier': 'error',
			'@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
			'@typescript-eslint/prefer-enum-initializers': 'error',
			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true
				}
			],

			// TypeScript - Bundle Optimization
			'@typescript-eslint/consistent-type-exports': [
				'error',
				{ fixMixedExportsWithInlineTypeSpecifier: true }
			],
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

			// TypeScript - Additional Code Quality
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/prefer-ts-expect-error': 'error',
			'@typescript-eslint/no-useless-empty-export': 'error',
			'@typescript-eslint/no-invalid-void-type': 'error',
			'@typescript-eslint/no-confusing-void-expression': 'error',
			'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
			'@typescript-eslint/method-signature-style': ['error', 'property'],

			// TypeScript - High Priority Additional Rules
			'@typescript-eslint/no-deprecated': 'warn',
			'@typescript-eslint/no-unused-private-class-members': 'error',
			'@typescript-eslint/related-getter-setter-pairs': 'error',

			// ESLint Core - High Value Additional Rules
			'default-case': 'error',
			'require-unicode-regexp': 'error',
			'prefer-named-capture-group': 'warn',
			'no-bitwise': 'error',
			'prefer-destructuring': 'off', // Using @typescript-eslint/prefer-destructuring instead

			// TypeScript - Additional High Value Rules
			'@typescript-eslint/no-useless-constructor': 'error',
			'@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],

			// TypeScript - Library API Quality
			'@typescript-eslint/explicit-module-boundary-types': 'warn',
			'@typescript-eslint/naming-convention': [
				'warn',
				{ selector: 'default', format: ['camelCase'] },
				{ selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
				{ selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
				{ selector: 'typeLike', format: ['PascalCase'] },
				{ selector: 'enumMember', format: ['UPPER_CASE'] },
				{ selector: 'property', format: null },
				{ selector: 'import', format: null }
			],

			// ESLint Core - Highest ROI Additional Rules
			'class-methods-use-this': 'warn',
			'func-names': ['warn', 'as-needed'],
			'no-implicit-globals': 'error',
			'no-labels': 'error',
			'no-duplicate-imports': 'error',
			'new-cap': ['error', { capIsNew: false }],

			// ESLint Core - Complexity Guards
			'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: false }],
			'max-statements': ['warn', 25],
			'max-classes-per-file': ['error', 1],

			// TypeScript - Additional High Value Rules
			'@typescript-eslint/no-dupe-class-members': 'error',
			'@typescript-eslint/no-redeclare': 'error',
			'@typescript-eslint/prefer-destructuring': ['warn', { array: false, object: true }],

			// Disabled rules
			'@typescript-eslint/prefer-readonly-parameter-types': 'off',
			'@typescript-eslint/explicit-member-accessibility': 'off',
			'@typescript-eslint/member-ordering': 'off',
			'require-await': 'off'
		}
	},

	// Svelte-specific parser configuration and rules
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			// Disable base prefer-const for Svelte files - svelte/prefer-const handles it
			// Svelte 5 $props() requires `let` for reactive prop destructuring
			'prefer-const': 'off',
			'prefer-destructuring': 'off', // Using @typescript-eslint/prefer-destructuring instead

			// ESLint Core - Runtime Error Prevention
			'array-callback-return': ['error', { allowImplicit: true }],
			'no-constructor-return': 'error',
			'no-promise-executor-return': 'error',
			'no-template-curly-in-string': 'error',
			'no-unreachable-loop': 'error',
			'no-useless-assignment': 'error',
			'require-atomic-updates': 'error',
			'no-unmodified-loop-condition': 'error',

			// ESLint Core - Security Vulnerabilities
			'no-eval': 'error',
			'no-new-func': 'error',
			'no-script-url': 'error',
			'no-extend-native': 'error',
			'no-proto': 'error',
			'no-caller': 'error',
			'no-iterator': 'error',
			'no-prototype-builtins': 'error',
			'no-alert': 'error',
			'no-new-wrappers': 'error',

			// ESLint Core - Code Quality
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			'no-param-reassign': ['error', { props: false }],
			'no-sequences': 'error',
			radix: 'error',
			'no-return-assign': ['error', 'always'],
			'no-var': 'error',
			'prefer-template': 'error',
			'no-nested-ternary': 'error',
			'no-else-return': ['error', { allowElseIf: false }],
			'object-shorthand': ['error', 'always'],
			'no-lonely-if': 'error',
			'no-useless-rename': 'error',
			'prefer-object-spread': 'error',
			'prefer-spread': 'error',
			'no-object-constructor': 'error',
			'no-array-constructor': 'error',
			'no-unneeded-ternary': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-exponentiation-operator': 'error',
			'prefer-numeric-literals': 'error',
			'symbol-description': 'error',
			'no-lone-blocks': 'error',
			'no-multi-assign': 'error',
			'no-new': 'warn',
			'grouped-accessor-pairs': ['error', 'getBeforeSet'],
			'accessor-pairs': 'error',

			// ESLint Core - Best Practices
			'guard-for-in': 'warn',
			'default-case-last': 'error',
			'no-await-in-loop': 'warn',
			'block-scoped-var': 'error',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-undef-init': 'error',
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-implicit-coercion': 'error',
			complexity: ['error', 15],
			'max-depth': ['error', 4],
			'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: true }],
			'no-self-compare': 'error',
			'no-throw-literal': 'error',
			'no-unused-expressions': 'error',
			'no-useless-call': 'error',
			'no-useless-return': 'error',
			'prefer-promise-reject-errors': 'error',
			'max-nested-callbacks': ['error', 4],
			'max-params': ['error', 5],
			'no-extra-bind': 'error',
			'prefer-regex-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-rest-params': 'error',

			// TypeScript
			'no-undef': 'off',

			// TypeScript - Type Safety
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'error',
			'@typescript-eslint/require-array-sort-compare': 'error',
			'@typescript-eslint/no-unsafe-type-assertion': 'error',
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/consistent-return': 'error',
			'@typescript-eslint/promise-function-async': 'warn',

			// TypeScript - Code Quality
			'@typescript-eslint/no-shadow': [
				'error',
				{
					ignoreTypeValueShadow: true,
					ignoreFunctionTypeParameterNameValueShadow: true
				}
			],
			'@typescript-eslint/default-param-last': 'error',
			'@typescript-eslint/no-loop-func': 'error',
			'@typescript-eslint/no-unnecessary-qualifier': 'error',
			'@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
			'@typescript-eslint/prefer-enum-initializers': 'error',
			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true
				}
			],

			// TypeScript - Bundle Optimization
			'@typescript-eslint/consistent-type-exports': [
				'error',
				{ fixMixedExportsWithInlineTypeSpecifier: true }
			],
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

			// TypeScript - Additional Code Quality
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/prefer-ts-expect-error': 'error',
			'@typescript-eslint/no-useless-empty-export': 'error',
			'@typescript-eslint/no-invalid-void-type': 'error',
			'@typescript-eslint/no-confusing-void-expression': 'error',
			'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
			'@typescript-eslint/method-signature-style': ['error', 'property'],

			// TypeScript - High Priority Additional Rules
			'@typescript-eslint/no-deprecated': 'warn',
			'@typescript-eslint/no-unused-private-class-members': 'error',
			'@typescript-eslint/related-getter-setter-pairs': 'error',

			// ESLint Core - High Value Additional Rules
			'default-case': 'error',
			'require-unicode-regexp': 'error',
			'prefer-named-capture-group': 'warn',
			'no-bitwise': 'error',

			// TypeScript - Additional High Value Rules
			'@typescript-eslint/no-useless-constructor': 'error',
			'@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],

			// TypeScript - Library API Quality
			'@typescript-eslint/explicit-module-boundary-types': 'warn',
			'@typescript-eslint/naming-convention': [
				'warn',
				{ selector: 'default', format: ['camelCase'] },
				{ selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
				{ selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
				{ selector: 'typeLike', format: ['PascalCase'] },
				{ selector: 'enumMember', format: ['UPPER_CASE'] },
				{ selector: 'property', format: null },
				{ selector: 'import', format: null }
			],

			// ESLint Core - Highest ROI Additional Rules
			'class-methods-use-this': 'warn',
			'func-names': ['warn', 'as-needed'],
			'no-implicit-globals': 'error',
			'no-labels': 'error',
			'no-duplicate-imports': 'error',
			'new-cap': ['error', { capIsNew: false }],

			// ESLint Core - Complexity Guards
			'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: false }],
			'max-statements': ['warn', 25],
			'max-classes-per-file': ['error', 1],

			// TypeScript - Additional High Value Rules
			'@typescript-eslint/no-dupe-class-members': 'error',
			'@typescript-eslint/no-redeclare': 'error',
			'@typescript-eslint/prefer-destructuring': ['warn', { array: false, object: true }],

			// Svelte Security & Accessibility
			'svelte/no-inline-styles': ['error', { allowTransitions: true }],
			'svelte/no-target-blank': 'error',
			'svelte/button-has-type': 'error',
			'svelte/no-at-html-tags': 'error',
			'svelte/valid-compile': 'error',
			'svelte/no-top-level-browser-globals': 'error',
			'svelte/no-ignored-unsubscribe': 'warn',

			// Svelte Code Quality
			'svelte/require-stores-init': 'error',
			'svelte/no-useless-mustaches': 'warn',
			'svelte/no-add-event-listener': 'warn',
			'svelte/no-unused-class-name': 'off', // False positives with Tailwind utility classes
			'svelte/no-inspect': 'off', // $inspect is useful during development
			'svelte/prefer-const': 'error',
			'svelte/require-optimized-style-attribute': 'warn',
			'svelte/experimental-require-slot-types': 'warn',

			// Svelte Best Practices
			'svelte/no-dynamic-slot-name': 'error',
			'svelte/require-store-callbacks-use-set-param': 'error',
			'svelte/derived-has-same-inputs-outputs': 'warn',
			'svelte/prefer-class-directive': 'warn',
			'svelte/prefer-style-directive': 'warn',
			'svelte/shorthand-attribute': 'warn',
			'svelte/shorthand-directive': 'warn',

			// SvelteKit-Specific
			'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
			'svelte/no-navigation-without-resolve': 'error',
			'svelte/valid-prop-names-in-kit-pages': 'error',

			// Additional Svelte Rules
			'svelte/block-lang': ['error', { script: 'ts', style: null }],
			'svelte/consistent-selector-style': 'warn',
			'svelte/first-attribute-linebreak': 'off',
			'svelte/html-closing-bracket-new-line': 'off',
			'svelte/html-closing-bracket-spacing': 'warn',
			'svelte/html-quotes': ['warn', { prefer: 'double' }],
			'svelte/html-self-closing': 'warn',
			'svelte/max-attributes-per-line': 'off',
			'svelte/mustache-spacing': 'warn',
			'svelte/no-extra-reactive-curlies': 'warn',
			'svelte/no-restricted-html-elements': 'off',
			'svelte/no-spaces-around-equal-signs-in-attribute': 'warn',
			'svelte/prefer-destructured-store-props': 'warn',
			'svelte/sort-attributes': 'off',
			'svelte/spaced-html-comment': 'warn',
			'svelte/no-trailing-spaces': 'warn',
			'svelte/valid-style-parse': 'error',
			'svelte/require-each-key': 'error'
		}
	},

	// Demo/routes - relax some strict rules for example code
	{
		files: ['src/routes/**/*.svelte'],
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/no-unsafe-type-assertion': 'off',
			'@typescript-eslint/no-inferrable-types': 'off',
			'no-console': 'off',
			'max-lines': 'off',
			'max-lines-per-function': 'off',
			'max-statements': 'off',
			complexity: 'off'
		}
	},

	// Ignore patterns
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
);
