<script lang="ts">
	import Grid, { GridItem } from '$lib/index.js';
	import { GridStack, type GridStackWidget } from 'gridstack';
	import { onMount } from 'svelte';
	import 'gridstack/dist/gridstack.min.css';
	import './demo.css';

	// Enable HTML content rendering (must be set before any GridStack.init())
	// Default is text-only (textContent) for XSS safety
	// Note: `el` IS the .grid-stack-item-content element
	GridStack.renderCB = (el: HTMLElement, w: GridStackWidget) => {
		if (w.content) {
			el.innerHTML = w.content;
		}
	};

	// Type definitions
	interface GridEvent {
		time: string;
		type: string;
		detail: string;
	}

	interface SavedLayout {
		name: string;
		data: GridStackWidget[];
		timestamp: string;
	}

	// Grid reference and options
	let grid: GridStack | null = $state(null);
	const options = $state({
		margin: 8,
		cellHeight: 70,
		animate: true,
		float: true,
		acceptWidgets: true,
		removable: '#trash',
		removeTimeout: 100,
		column: 12
	});

	// Control panel state
	let columns = $state(12);
	let cellHeight = $state(70);
	let margin = $state(8);
	let animateEnabled = $state(true);
	let floatEnabled = $state(true);
	let staticMode = $state(false);
	let disabled = $state(false);

	// Grid statistics
	let widgetCount = $state(0);
	let currentColumns = $state(12);
	let cellWidth = $state(0);

	// Event log
	let events: GridEvent[] = $state([]);
	const maxEvents = 8;

	// Saved layouts
	let savedLayouts: SavedLayout[] = $state([]);
	let currentLayoutName = $state('');

	// Widget counter for unique IDs
	let widgetIdCounter = $state(12);

	// Log event helper
	function logEvent(type: string, detail: string = '') {
		const timestamp = new Date().toLocaleTimeString();
		events = [
			{
				time: timestamp,
				type,
				detail
			},
			...events
		].slice(0, maxEvents);
	}

	// Update grid statistics
	function updateStats() {
		if (!grid) return;
		widgetCount = grid.engine.nodes.length;
		currentColumns = grid.getColumn();
		cellWidth = Math.round(grid.cellWidth());
	}

	// Grid configuration methods
	function updateColumns() {
		if (!grid) return;
		grid.column(columns);
		logEvent('columns', `Changed to ${columns}`);
		updateStats();
	}

	function updateCellHeight() {
		if (!grid) return;
		grid.cellHeight(cellHeight);
		logEvent('cellHeight', `Set to ${cellHeight}px`);
	}

	function updateMargin() {
		if (!grid) return;
		grid.margin(margin);
		logEvent('margin', `Set to ${margin}px`);
	}

	function toggleAnimate() {
		if (!grid) return;
		grid.opts.animate = animateEnabled;
		logEvent('animate', animateEnabled ? 'Enabled' : 'Disabled');
	}

	function toggleFloat() {
		if (!grid) return;
		grid.float(floatEnabled);
		logEvent('float', floatEnabled ? 'Enabled' : 'Disabled');
	}

	function toggleStatic() {
		if (!grid) return;
		grid.setStatic(staticMode);
		logEvent('static', staticMode ? 'Enabled' : 'Disabled');
	}

	function toggleDisable() {
		if (!grid) return;
		if (disabled) {
			grid.disable();
		} else {
			grid.enable();
		}
		logEvent('grid', disabled ? 'Disabled' : 'Enabled');
	}

	// Grid actions
	function compactGrid() {
		if (!grid) return;
		grid.compact();
		logEvent('compact', 'Layout compacted');
	}

	function clearAll() {
		if (!grid) return;
		grid.removeAll();
		logEvent('clear', 'All widgets removed');
		updateStats();
	}

	function addRandomWidget() {
		if (!grid) return;
		const w = Math.floor(Math.random() * 3) + 1;
		const h = Math.floor(Math.random() * 3) + 1;
		const id = `widget-${widgetIdCounter++}`;

		// Add widget using the new API with content property
		grid.addWidget({
			id,
			w,
			h,
			content: `<div>
				<div class="widget-header">Widget ${widgetIdCounter - 1}</div>
				<div class="widget-info">${w}×${h}</div>
			</div>`
		});

		logEvent('add', `Widget ${widgetIdCounter - 1} (${w}×${h})`);
		updateStats();
	}

	// Layout management
	function saveLayout() {
		if (!grid || !currentLayoutName.trim()) return;

		const layout = grid.save(false) as GridStackWidget[];
		savedLayouts = [
			...savedLayouts,
			{
				name: currentLayoutName,
				data: layout,
				timestamp: new Date().toISOString()
			}
		];

		logEvent('save', `Layout "${currentLayoutName}" saved`);
		currentLayoutName = '';
	}

	function loadLayout(layout: SavedLayout) {
		if (!grid) return;
		grid.load(layout.data);
		logEvent('load', `Layout "${layout.name}" loaded`);
		updateStats();
	}

	function deleteLayout(index: number) {
		const layout = savedLayouts[index];
		savedLayouts = savedLayouts.filter((_, i) => i !== index);
		logEvent('delete', `Layout "${layout.name}" deleted`);
	}

	// Add preset widgets
	function addPresetWidget(type: string) {
		if (!grid) return;
		const id = `widget-${widgetIdCounter++}`;
		let innerContent = '';
		let w = 2,
			h = 2;

		switch (type) {
			case 'chart':
				w = 4;
				h = 3;
				innerContent = `
					<div class="widget-chart">
						<div class="widget-header">📊 Chart Widget</div>
						<div class="chart-placeholder">
							<div class="chart-bar" style="height: 60%"></div>
							<div class="chart-bar" style="height: 80%"></div>
							<div class="chart-bar" style="height: 45%"></div>
							<div class="chart-bar" style="height: 90%"></div>
							<div class="chart-bar" style="height: 70%"></div>
						</div>
					</div>`;
				break;
			case 'table':
				w = 3;
				h = 3;
				innerContent = `
					<div class="widget-table">
						<div class="widget-header">📋 Table Widget</div>
						<table class="mini-table">
							<tr><td>A1</td><td>B1</td><td>C1</td></tr>
							<tr><td>A2</td><td>B2</td><td>C2</td></tr>
							<tr><td>A3</td><td>B3</td><td>C3</td></tr>
						</table>
					</div>`;
				break;
			case 'metric':
				w = 2;
				h = 2;
				innerContent = `
					<div class="widget-metric">
						<div class="widget-header">📈 Metric</div>
						<div class="metric-value">42.5k</div>
						<div class="metric-change">+12.3%</div>
					</div>`;
				break;
			case 'text':
				w = 3;
				h = 2;
				innerContent = `
					<div class="widget-text">
						<div class="widget-header">📝 Text Widget</div>
						<p class="widget-text">This is a text widget with some sample content.</p>
					</div>`;
				break;
			default:
				break;
		}

		// Add widget using the new API with content property
		grid.addWidget({
			id,
			w,
			h,
			content: innerContent
		});

		logEvent('add', `${type} widget added`);
		updateStats();
	}

	// Initialize everything on mount
	onMount(() => {
		// Setup drag from external sources with widget definition
		GridStack.setupDragIn(
			'.newWidget',
			{
				helper: 'clone'
			},
			[
				{
					w: 2,
					h: 2,
					content: `<div>
				<div class="widget-header">New Widget</div>
				<div class="widget-info">Dragged In</div>
			</div>`
				}
			]
		);
	});

	// Setup grid event listeners reactively
	/* eslint-disable @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-call -- ESLint doesn't track Svelte bindings */
	$effect(() => {
		if (!grid) return;

		grid.on('added', (_event: Event, items: unknown[]) => {
			logEvent('added', `${items.length} widget(s)`);
			updateStats();
		});

		grid.on('removed', (_event: Event, items: unknown[]) => {
			logEvent('removed', `${items.length} widget(s)`);
			updateStats();
		});

		grid.on('change', (_event: Event, items: unknown[]) => {
			logEvent('change', `${items.length} widget(s) modified`);
			updateStats();
		});

		grid.on(
			'resize',
			(_event: Event, el: HTMLElement & { gridstackNode?: { w?: number; h?: number } }) => {
				const node = el.gridstackNode;
				if (node) {
					logEvent('resize', `Widget to ${node.w ?? '?'}×${node.h ?? '?'}`);
				}
			}
		);

		grid.on(
			'drag',
			(_event: Event, el: HTMLElement & { gridstackNode?: { x?: number; y?: number } }) => {
				const node = el.gridstackNode;
				if (node) {
					logEvent('drag', `Widget to (${node.x ?? '?'}, ${node.y ?? '?'})`);
				}
			}
		);

		// Initial stats update
		updateStats();
		logEvent('init', 'Grid initialized');
	});
	/* eslint-enable @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-call */
</script>

<div class="showcase-container">
	<header class="showcase-header">
		<h1>GridStack Svelte 5 Showcase</h1>
		<p>Interactive demo of GridStack features with Svelte 5 wrapper</p>
	</header>

	<!-- Control Panel -->
	<section class="control-panel">
		<div class="panel-section">
			<h3>Grid Configuration</h3>
			<div class="control-group">
				<label>
					Columns: <span class="value">{columns}</span>
					<input type="range" min="1" max="12" bind:value={columns} onchange={updateColumns} />
				</label>
				<label>
					Cell Height: <span class="value">{cellHeight}px</span>
					<input
						type="range"
						min="20"
						max="150"
						bind:value={cellHeight}
						onchange={updateCellHeight}
					/>
				</label>
				<label>
					Margin: <span class="value">{margin}px</span>
					<input type="range" min="0" max="20" bind:value={margin} onchange={updateMargin} />
				</label>
			</div>
		</div>

		<div class="panel-section">
			<h3>Actions</h3>
			<div class="button-group">
				<button type="button" class="btn btn-primary" onclick={compactGrid}>Compact</button>
				<button type="button" class="btn btn-danger" onclick={clearAll}>Clear All</button>
				<button type="button" class="btn btn-success" onclick={addRandomWidget}>Add Random</button>
			</div>
		</div>

		<div class="panel-section">
			<h3>Display Options</h3>
			<div class="checkbox-group">
				<label>
					<input type="checkbox" bind:checked={animateEnabled} onchange={toggleAnimate} />
					Animate
				</label>
				<label>
					<input type="checkbox" bind:checked={floatEnabled} onchange={toggleFloat} />
					Float
				</label>
				<label>
					<input type="checkbox" bind:checked={staticMode} onchange={toggleStatic} />
					Static
				</label>
				<label>
					<input type="checkbox" bind:checked={disabled} onchange={toggleDisable} />
					Disable
				</label>
			</div>
		</div>
	</section>

	<!-- Drag Sources and Trash -->
	<section class="interaction-zone">
		<div class="drag-source-container">
			<h3>Drag Source</h3>
			<div class="drag-item newWidget">
				<svg
					class="icon icon-green"
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
					<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
					<path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
					<path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
					<path
						d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
					/>
				</svg>
				<p>Drag Me!</p>
			</div>
			<div class="preset-widgets">
				<h4>Preset Widgets:</h4>
				<div class="preset-buttons">
					<button
						type="button"
						class="btn btn-sm"
						onclick={() => {
							addPresetWidget('chart');
						}}>Chart</button
					>
					<button
						type="button"
						class="btn btn-sm"
						onclick={() => {
							addPresetWidget('table');
						}}>Table</button
					>
					<button
						type="button"
						class="btn btn-sm"
						onclick={() => {
							addPresetWidget('metric');
						}}>Metric</button
					>
					<button
						type="button"
						class="btn btn-sm"
						onclick={() => {
							addPresetWidget('text');
						}}>Text</button
					>
				</div>
			</div>
		</div>

		<div class="trash-container">
			<h3>Trash Zone</h3>
			<div id="trash" class="trash-zone">
				<svg
					class="icon icon-red"
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
					<path d="M3 6h18" />
					<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
					<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					<line x1="10" x2="10" y1="11" y2="17" />
					<line x1="14" x2="14" y1="11" y2="17" />
				</svg>
				<p>Drop Here</p>
			</div>
		</div>
	</section>

	<!-- Main Grid -->
	<section class="grid-section">
		<h3>Main Grid Area</h3>
		<Grid bind:ref={grid} {options}>
			<!-- Standard widget -->
			<GridItem id="w1" x={0} y={0} w={2} h={2}>
				<div>
					<div class="widget-header">Widget #1</div>
					<div class="widget-info">2×2</div>
					<div class="widget-coords">x:0 y:0</div>
				</div>
			</GridItem>

			<!-- Locked widget -->
			<GridItem id="w2" x={4} y={0} w={4} h={4} noResize={true} noMove={true} locked={true}>
				<div class="widget-locked">
					<div class="widget-header">🔒 Locked Widget</div>
					<div class="widget-info">4×4</div>
					<p>Can't move/resize</p>
				</div>
			</GridItem>

			<!-- No resize widget -->
			<GridItem id="w3" x={8} y={0} w={2} h={2} noResize={true}>
				<div class="widget-no-resize">
					<div class="widget-header">Widget #3</div>
					<div class="widget-info">No Resize</div>
				</div>
			</GridItem>

			<!-- Min/Max demo -->
			<GridItem id="w4" x={10} y={0} w={2} h={2} minW={2} maxW={4} minH={1} maxH={3}>
				<div class="widget-constrained">
					<div class="widget-header">Min/Max Demo</div>
					<div class="widget-constraints">
						<small>minW:2 maxW:4</small>
						<small>minH:1 maxH:3</small>
					</div>
				</div>
			</GridItem>

			<!-- More widgets -->
			<GridItem id="w5" x={0} y={2} w={2} h={2}>
				<div>
					<div class="widget-header">Widget #5</div>
					<div class="widget-info">2×2</div>
				</div>
			</GridItem>

			<GridItem id="w6" x={2} y={2} w={2} h={4}>
				<div>
					<div class="widget-header">Widget #6</div>
					<div class="widget-info">2×4</div>
				</div>
			</GridItem>

			<!-- Nested grid container -->
			<GridItem id="w7" x={8} y={2} w={4} h={3}>
				<div class="widget-nested">
					<div class="widget-header">Nested Grid Container</div>
					<div class="nested-grid">
						<div class="nested-item">Sub 1</div>
						<div class="nested-item">Sub 2</div>
						<div class="nested-item">Sub 3</div>
					</div>
				</div>
			</GridItem>
		</Grid>
	</section>

	<!-- Info Panels -->
	<section class="info-panels">
		<div class="info-panel">
			<h3>Grid Info</h3>
			<div class="stats">
				<div class="stat-item">
					<span class="stat-label">Widgets:</span>
					<span class="stat-value">{widgetCount}</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">Columns:</span>
					<span class="stat-value">{currentColumns}</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">Cell Width:</span>
					<span class="stat-value">{cellWidth}px</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">Cell Height:</span>
					<span class="stat-value">{cellHeight}px</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">Float:</span>
					<span class="stat-value">{floatEnabled ? 'enabled' : 'disabled'}</span>
				</div>
			</div>
		</div>

		<div class="info-panel">
			<h3>Event Log</h3>
			<div class="event-log">
				{#if events.length === 0}
					<div class="event-item">No events yet...</div>
				{/if}
				{#each events as event, i (i)}
					<div class="event-item">
						<span class="event-time">{event.time}</span>
						<span class="event-type">{event.type}</span>
						{#if event.detail}
							<span class="event-detail">- {event.detail}</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Saved Layouts -->
	<section class="layouts-section">
		<h3>Saved Layouts</h3>
		<div class="layouts-controls">
			<div class="save-layout">
				<input
					type="text"
					bind:value={currentLayoutName}
					placeholder="Layout name..."
					onkeydown={(e) => {
						if (e.key === 'Enter') saveLayout();
					}}
				/>
				<button
					type="button"
					class="btn btn-primary"
					onclick={saveLayout}
					disabled={!currentLayoutName.trim()}
				>
					Save Current
				</button>
			</div>
			<div class="saved-layouts">
				{#if savedLayouts.length === 0}
					<p class="no-layouts">No saved layouts yet</p>
				{/if}
				{#each savedLayouts as layout, i (layout.timestamp)}
					<div class="layout-item">
						<button
							type="button"
							class="btn btn-sm"
							onclick={() => {
								loadLayout(layout);
							}}
						>
							{layout.name}
						</button>
						<button
							type="button"
							class="btn btn-sm btn-danger"
							onclick={() => {
								deleteLayout(i);
							}}>×</button
						>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>
