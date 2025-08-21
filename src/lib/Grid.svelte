<script lang="ts">
	import { GridStack } from 'gridstack';
	import { onMount } from 'svelte';

	let { ref = $bindable(), options, children, ...rest } = $props();
	let gridElement: HTMLDivElement;

	onMount(() => {
		ref = GridStack.init(options, gridElement);

		return () => {
			if (ref) {
				ref.destroy(false);
			}
		};
	});
</script>

<div bind:this={gridElement} class={rest.class || 'grid-stack'}>
	{@render children?.()}
</div>
