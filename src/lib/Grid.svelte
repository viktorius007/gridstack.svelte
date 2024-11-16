<script lang="ts">
	import 'gridstack/dist/gridstack.min.css';
	import { GridStack } from 'gridstack';

	let { ref = $bindable(), options, children, ...rest } = $props();

	$effect(() => {
		if (ref != null) {
			console.log('Destroying grid...');
			ref.destroy();
		}

		console.log(`Initializing grid options=${JSON.stringify(options)}`);
		ref = GridStack.init(options);
	});
</script>

<div class={rest.class || 'grid-stack'}>
	{@render children?.()}
</div>
