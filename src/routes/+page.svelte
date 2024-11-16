<script lang="ts">
	import Grid, { GridItem } from '$lib';
	import { GridStack } from 'gridstack';
	import './demo.css';

	let grid = $state.snapshot(null);
	let options = $state({
		margin: 5,
		acceptWidgets: true,
		removable: '#trash',
		removeTimeout: 100
	});

	$effect(() => {
		GridStack.setupDragIn('.newWidget', null, [{ w: 2, h: 2, content: 'new item' }]);
	});
</script>

<div class="grid grid-cols-2 gap-8 mt-8">
	<div
		class="flex flex-col items-center justify-center p-1 mx-auto transition-colors rounded-lg cursor-pointer bg-green-500/15 hover:bg-green-500/30 size-40 grid-stack-item newWidget"
	>
		<svg
			class="text-green-700 size-8"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
			<path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
			<path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
			<path
				d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
			></path>
		</svg>
		<p class="text-center text-green-700">Drag me into the dashboard!</p>
	</div>
	<div
		id="trash"
		class="flex flex-col items-center justify-center p-1 mx-auto rounded-lg bg-red-500/15 size-40 ui-droppable"
	>
		<svg
			class="text-red-700 size-8"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M3 6h18"></path>
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
			<line x1="10" x2="10" y1="11" y2="17"></line>
			<line x1="14" x2="14" y1="11" y2="17"></line>
		</svg>
		<p class="text-center text-red-700">Drop here to remove widget!</p>
	</div>
</div>

<div class="p-1 mt-8 border rounded-lg bg-gradient-to-br from-gray-200 to-gray-50">
	<Grid ref={grid} {options}>
		<GridItem id="w1" x="0" y="0" w="4" h="2">1</GridItem>
		<GridItem id="w2" x="4" y="0" w="4" h="4" noResize={true} noMove={true} locked={true}>
			<div class="flex flex-col items-center justify-center w-full h-full gap-2 text-red-600">
				<svg
					class="text-red-600 size-8"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="16" r="1"></circle><rect x="3" y="10" width="18" height="12" rx="2"
					></rect>
					<path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
				</svg>
				<p>Can't be moved or dragged, nor pushed by others</p>
			</div>
		</GridItem>
		<GridItem id="w3" x="8" y="0" w="2" h="2" noResize={true}>
			<div class="flex flex-col items-center justify-center w-full h-full gap-2 text-red-600">
				<svg
					class="size-8"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
					<path d="M14 15H9v-5"></path><path d="M16 3h5v5"></path><path d="M21 3 9 15"></path>
				</svg>
				<p>Resize locked</p>
			</div>
		</GridItem>
		<GridItem id="w4" x="10" y="0" w="2" h="2">4</GridItem>
		<GridItem id="w5" x="0" y="2" w="2" h="2">5</GridItem>
		<GridItem id="w6" x="2" y="2" w="2" h="4">6</GridItem>
		<GridItem id="w7" x="8" y="2" w="4" h="2">7</GridItem>
		<GridItem id="w8" x="10" y="4" w="2" h="2">11</GridItem>
		<GridItem id="w9" x="0" y="4" w="2" h="2">8</GridItem>
		<GridItem id="w9" x="4" y="4" w="4" h="2">9</GridItem>
		<GridItem id="w9" x="8" y="4" w="2" h="2">10</GridItem>
	</Grid>
</div>
