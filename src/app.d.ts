/// <reference types="@sveltejs/kit" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface HTMLAttributes {
			'gs-x'?: number;
			'gs-y'?: number;
			'gs-w'?: number;
			'gs-h'?: number;
			'gs-id'?: string;
			'gs-min-w'?: number;
			'gs-max-w'?: number;
			'gs-min-h'?: number;
			'gs-max-h'?: number;
			'gs-auto-position'?: boolean;
			'gs-no-resize'?: boolean;
			'gs-no-move'?: boolean;
			'gs-locked'?: boolean;
			'gs-content'?: string;
			'gs-lazy-load'?: boolean;
			'gs-size-to-content'?: boolean | number;
			'gs-resize-to-content-parent'?: string;
		}
	}
}

export {};
