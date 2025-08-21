# gridstack.svelte

A lightweight, modern Svelte 5 wrapper for [GridStack.js](https://gridstackjs.com/) v12 - create draggable, resizable dashboard layouts with ease.

## 📖 Overview

This library provides thin, performant Svelte 5 components that wrap GridStack.js v12, enabling you to build interactive dashboards with drag-and-drop functionality, responsive grids, and dynamic layouts. Built with Svelte's latest runes and snippets syntax for optimal performance.

## ✨ Features

- 🎯 **Svelte 5 Native** - Built with modern runes (`$state`, `$props`, `$bindable`) and snippets
- 🚀 **Lightweight Wrapper** - Minimal abstraction over GridStack.js for maximum performance
- 📦 **TypeScript Support** - Full TypeScript definitions included
- 🎨 **Customizable** - Complete access to GridStack.js options and methods
- 📱 **Responsive** - Mobile-friendly with touch support
- 🔧 **Simple API** - Easy to use with declarative Svelte components

## ⚡️ Quick Start

### Installation

```bash
npm install gridstack.svelte
# or
pnpm add gridstack.svelte
```

### Basic Usage

```svelte
<script lang="ts">
	import Grid, { GridItem } from 'gridstack.svelte';
	import 'gridstack/dist/gridstack.min.css';
</script>

<Grid>
	<GridItem x={0} y={0} w={4} h={2}>Widget 1</GridItem>
	<GridItem x={4} y={0} w={4} h={4}>Widget 2</GridItem>
	<GridItem x={8} y={0} w={2} h={2}>Widget 3</GridItem>
</Grid>
```

### Advanced Example

```svelte
<script lang="ts">
	import Grid, { GridItem } from 'gridstack.svelte';
	import { GridStack } from 'gridstack';
	import 'gridstack/dist/gridstack.min.css';

	let grid = $state.snapshot(null);
	let options = $state({
		margin: 8,
		cellHeight: 70,
		acceptWidgets: true,
		removable: '#trash'
	});

	$effect(() => {
		// Setup drag-in from external elements
		GridStack.setupDragIn('.newWidget', undefined, [{ w: 2, h: 2, content: 'New Item' }]);
	});
</script>

<Grid ref={grid} {options}>
	<GridItem id="w1" x={0} y={0} w={4} h={2}>Dashboard Widget</GridItem>

	<GridItem id="w2" x={4} y={0} w={4} h={4} noResize={true} locked={true}>
		Locked Widget (Can't resize or move)
	</GridItem>

	<GridItem id="w3" x={8} y={0} w={2} h={2} noMove={true}>Can resize but not move</GridItem>
</Grid>
```

## 📚 API

### Grid Component

The main container component that initializes GridStack.

**Props:**

- `ref` - Bindable reference to the GridStack instance
- `options` - GridStack configuration options (margin, cellHeight, etc.)
- `children` - Snippet containing GridItem components

### GridItem Component

Individual grid items that can be dragged and resized.

**Props:**

- `id` - Unique identifier for the item
- `x`, `y` - Grid position (0-based)
- `w`, `h` - Width and height in grid units
- `minW`, `maxW` - Min/max width constraints
- `minH`, `maxH` - Min/max height constraints
- `noResize` - Disable resizing
- `noMove` - Disable moving
- `locked` - Lock item (no resize, move, or drag)
- `autoPosition` - Auto-position item if `x`/`y` not provided
- `children` - Content to display inside the grid item

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test

# Type checking
pnpm check
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [GridStack.js Documentation](https://gridstackjs.com/)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [GitHub Repository](https://github.com/viktorius007/gridstack.svelte)
