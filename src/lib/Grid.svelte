<script lang="ts">
	import { GridStack, type GridStackOptions } from 'gridstack';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		ref?: GridStack | null;
		options?: GridStackOptions;
		children?: Snippet;
		class?: string;
	}

	let { ref = $bindable(null), options, children, class: className }: Props = $props();
	let gridElement: HTMLDivElement;

	onMount(() => {
		try {
			ref = GridStack.init(options, gridElement);
		} catch (error) {
			console.error('GridStack initialization failed:', error);
		}

		return () => {
			ref?.destroy(false);
		};
	});
</script>

<div bind:this={gridElement} class={className ?? 'grid-stack'}>
	{@render children?.()}
</div>
