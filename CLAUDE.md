# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**gridstack.svelte** - A Svelte 5 wrapper library for GridStack.js v12 that provides thin, performant components for building draggable, resizable dashboard layouts.

## Commands

```bash
# Development
pnpm dev              # Run development server
pnpm build            # Build library (vite build + package)
pnpm package          # Package for npm distribution

# Code Quality
pnpm check            # TypeScript type checking
pnpm check:watch      # Type checking in watch mode
pnpm lint             # Run prettier + eslint checks
pnpm format           # Auto-format code with prettier
pnpm clean            # Remove .svelte-kit, build, dist directories
```

**Note:** No test suite is configured yet.

## Architecture

### Library Components (`src/lib/`)

Three thin wrapper components that expose GridStack.js functionality:

- **Grid.svelte** - Container that initializes GridStack instance. Uses `$bindable()` ref for parent access to the GridStack API.
- **GridItem.svelte** - Individual item wrapper. Maps props to GridStack data attributes (gs-x, gs-y, gs-w, gs-h, etc.).
- **SubGrid.svelte** - Nested grid container for hierarchical layouts.
- **types.ts** - Shared TypeScript types (`GridItemProps`, `SubGridProps`, `GridItemBaseProps`).

All components use Svelte 5's snippet pattern (`{@render children?.()}`) for content rendering.

### Demo Application (`src/routes/`)

- **+page.svelte** - Comprehensive demo showcasing all features
- **+page.ts** - Disables SSR (`export const ssr = false`) since GridStack requires browser APIs
- **demo.css** - Demo-specific styling

**SSR Constraint:** Any page using Grid components must disable SSR with `export const ssr = false` in +page.ts because GridStack.js requires browser APIs (DOM, window).

### Key Patterns

**State Management**: Uses Svelte 5 runes (`$state`, `$bindable`) exclusively - no external stores.

**GridStack API Access**: Parent components get the GridStack instance via bindable ref:

```svelte
let grid = $state(null);
<Grid bind:ref={grid} {options}>
```

Then call methods directly: `grid.column()`, `grid.save()`, `grid.addWidget()`, etc.

### Reactivity Model

**Props are read at initial render only.** GridStack reads `gs-*` data attributes during `GridStack.init()`. Changing component props after mount will **not** automatically update the grid layout.

For runtime changes, use the GridStack API directly via the `ref`:

```svelte
<script>
	let grid = $state(null);

	function resizeWidget(element) {
		grid.update(element, { w: 4, h: 2 });
	}

	function moveWidget(element, x, y) {
		grid.move(element, x, y);
	}
</script>
```

This is intentional - the wrapper is "thin" and delegates all runtime behavior to GridStack.js.

## Critical Styling Rules

GridStack uses a "negative space" approach for margins. **Never style these GridStack-managed elements**:

- `.grid-stack` - Container/coordinate system
- `.grid-stack-item` - Positioned wrapper (handles position, dimensions, animations)
- `.grid-stack-item-content` - Gap/margin creator via absolute positioning

**Only style your content** inside `.grid-stack-item-content`:

```html
<div class="grid-stack-item-content">
	<!-- DON'T TOUCH -->
	<div class="your-widget">
		<!-- Style this -->
		<!-- Your content -->
	</div>
</div>
```

## TypeScript

- Strict mode enabled
- GridItem props extend `GridStackWidget` interface from gridstack
- Types are auto-generated during `pnpm package`
- Library exports types: `GridItemProps`, `SubGridProps`, `GridItemBaseProps`

## Reference Documentation

The repository includes comprehensive GridStack.js documentation:

- `GRIDSTACK_GUIDE.md` - Overall concepts and usage patterns
- `GRIDSTACK_API_REFERENCE.md` - Complete API reference
- `GRIDSTACK_CREATION_METHODS.md` - Widget creation methods

## Future Enhancements

Potential improvements (trading simplicity for features):

1. **Reactive Prop Mode** - Add `$effect`-based prop syncing so changing props auto-updates the grid
2. **Svelte Event Forwarding** - Forward GridStack events as native Svelte events (`<Grid onchange={handler}>`)
3. **Runtime Prop Validation** - Dev-mode warnings for invalid prop combinations
