<script lang="ts">
	import type { GridStackWidget } from 'gridstack/dist/types.js';
	import type { Snippet } from 'svelte';

	interface GridItemProps extends Omit<GridStackWidget, 'el'> {
		children?: Snippet;
	}

	let {
		x = 0,
		y = 0,
		w = 1,
		h = 1,
		autoPosition,
		minW,
		maxW,
		minH,
		maxH,
		noResize,
		noMove,
		locked,
		id,
		content,
		lazyLoad,
		sizeToContent,
		resizeToContentParent,
		children
	}: GridItemProps = $props();
</script>

<div
	class="grid-stack-item"
	gs-x={x}
	gs-y={y}
	gs-w={w}
	gs-h={h}
	gs-auto-position={autoPosition}
	gs-min-w={minW}
	gs-max-w={maxW}
	gs-min-h={minH}
	gs-max-h={maxH}
	gs-no-resize={noResize}
	gs-no-move={noMove}
	gs-locked={locked}
	gs-id={id}
	gs-content={content}
	gs-lazy-load={lazyLoad}
	gs-size-to-content={sizeToContent}
	gs-resize-to-content-parent={resizeToContentParent}
>
	<div class="grid-stack-item-content">
		{@render children?.()}
	</div>
</div>
