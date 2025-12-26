<script lang="ts">
	import type { SubGridProps } from './types';

	let {
		x = 0,
		y = 0,
		w = 1,
		h = 1,
		id,
		minW,
		maxW,
		minH,
		maxH,
		noResize,
		noMove,
		locked,
		children,
		class: className
	}: SubGridProps = $props();
</script>

<div
	class="grid-stack-item grid-stack-sub-grid"
	gs-x={x}
	gs-y={y}
	gs-w={w}
	gs-h={h}
	gs-id={id}
	gs-min-w={minW}
	gs-max-w={maxW}
	gs-min-h={minH}
	gs-max-h={maxH}
	gs-no-resize={noResize}
	gs-no-move={noMove}
	gs-locked={locked}
>
	<div class="grid-stack-item-content">
		<div class={`grid-stack ${className ?? ''} grid-stack-nested`.trim()}>
			{@render children?.()}
		</div>
	</div>
</div>
