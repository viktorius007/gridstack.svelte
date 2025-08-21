<script lang="ts">
	import { GridStack } from 'gridstack';
	import { onMount } from 'svelte';

	let { ref = $bindable(), options, children, ...rest } = $props();
	let gridElement: HTMLDivElement;

	onMount(() => {
		console.log(`Initializing grid with options=${JSON.stringify(options)}`);
		ref = GridStack.init(options, gridElement);
		
		// Log the actual margin being used
		console.log('Grid initialized with margin:', ref.opts.margin);
		console.log('Grid individual margins:', {
			top: ref.opts.marginTop,
			right: ref.opts.marginRight,
			bottom: ref.opts.marginBottom,
			left: ref.opts.marginLeft
		});
		console.log('Grid cellHeight:', ref.opts.cellHeight);
		
		// Check what CSS variables are set
		const computedStyle = getComputedStyle(gridElement);
		console.log('CSS variables set:', {
			'--gs-item-margin-top': computedStyle.getPropertyValue('--gs-item-margin-top'),
			'--gs-item-margin-bottom': computedStyle.getPropertyValue('--gs-item-margin-bottom'),
			'--gs-item-margin-left': computedStyle.getPropertyValue('--gs-item-margin-left'),
			'--gs-item-margin-right': computedStyle.getPropertyValue('--gs-item-margin-right')
		});
		
		return () => {
			if (ref) {
				console.log('Destroying grid...');
				ref.destroy(false);
			}
		};
	});
</script>

<div bind:this={gridElement} class={rest.class || 'grid-stack'}>
	{@render children?.()}
</div>
