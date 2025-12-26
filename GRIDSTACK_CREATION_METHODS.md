# GridStack Creation Methods - Complete Reference

## Overview

GridStack provides multiple ways to create and initialize grids, from simple HTML-based initialization to fully programmatic creation. This document covers all available methods with examples and use cases.

## Table of Contents

1. [Basic HTML + init()](#1-basic-html--init---most-common)
2. [Target Specific Element](#2-target-specific-element)
3. [Initialize Multiple Grids](#3-initialize-multiple-grids)
4. [Programmatic Creation with addGrid()](#4-complete-programmatic-creation-with-addgrid)
5. [With Initial Widgets in Options](#5-with-initial-widgets-in-options)
6. [From Existing HTML Widgets](#6-from-existing-html-widgets)
7. [Nested/Sub-grids](#7-nestedsub-grids)
8. [Dynamic Creation in JavaScript](#8-dynamic-creation-in-javascript)
9. [From Saved Layout](#9-from-saved-layout-restoration)
10. [Framework Integration Pattern](#10-framework-integration-pattern)

---

## 1. Basic HTML + init() - Most Common

The simplest and most common approach. HTML structure exists, you just initialize it.

### HTML

```html
<div class="grid-stack">
	<!-- optional existing items -->
</div>
```

### JavaScript

```javascript
// Initialize with defaults
const grid = GridStack.init();

// Initialize with options
const grid = GridStack.init({
	column: 12,
	margin: 10,
	cellHeight: 70,
	animate: true
});
```

### Use Case

- Quick prototyping
- Simple dashboards
- When HTML structure is already defined

---

## 2. Target Specific Element

Initialize a grid on a specific element using ID, class, or element reference.

### HTML

```html
<div id="my-grid" class="custom-grid"></div>
```

### JavaScript

```javascript
// By ID selector
const grid = GridStack.init({}, '#my-grid');

// By class selector
const grid = GridStack.init({}, '.custom-grid');

// By element reference
const element = document.getElementById('my-grid');
const grid = GridStack.init({}, element);

// With options
const grid = GridStack.init(
	{
		column: 6,
		margin: 5
	},
	'#my-grid'
);
```

### Use Case

- Multiple grids with different configs
- Integration with existing page structure
- When default '.grid-stack' class conflicts

---

## 3. Initialize Multiple Grids

Initialize all grids on a page at once with the same configuration.

### HTML

```html
<div class="grid-stack" id="grid1"></div>
<div class="grid-stack" id="grid2"></div>
<div class="grid-stack" id="grid3"></div>
```

### JavaScript

```javascript
// Initialize all with same options
const grids = GridStack.initAll({
	column: 6,
	margin: 10,
	cellHeight: 'auto'
});

// Access individual grids
grids[0].addWidget({ x: 0, y: 0, w: 2, h: 2, content: 'Grid 1 Widget' });
grids[1].addWidget({ x: 0, y: 0, w: 3, h: 2, content: 'Grid 2 Widget' });

// Or with custom selector
const customGrids = GridStack.initAll({}, '.dashboard-grid');
```

### Use Case

- Multi-dashboard pages
- Tab interfaces with grids
- Consistent grid configuration across page

---

## 4. Complete Programmatic Creation with addGrid()

Create both the grid container and initialize it in one step. No HTML needed.

### JavaScript

```javascript
// Get parent container
const parentDiv = document.getElementById('dashboard-container');

// Create grid with configuration and initial widgets
const grid = GridStack.addGrid(parentDiv, {
	column: 12,
	margin: 10,
	cellHeight: 70,
	float: true,
	animate: true,
	children: [
		{
			x: 0,
			y: 0,
			w: 4,
			h: 2,
			content: '<div class="widget">Widget 1</div>',
			id: 'widget-1'
		},
		{
			x: 4,
			y: 0,
			w: 4,
			h: 2,
			content: '<div class="widget">Widget 2</div>',
			id: 'widget-2'
		}
	]
});
```

### Use Case

- SPA applications
- Dynamic dashboard creation
- Loading from database/API
- User-configurable layouts

---

## 5. With Initial Widgets in Options

Initialize a grid and create widgets in one operation using the `children` option.

### HTML

```html
<div class="grid-stack"></div>
```

### JavaScript

```javascript
const grid = GridStack.init({
	column: 12,
	margin: 5,
	cellHeight: 80,
	children: [
		{
			x: 0,
			y: 0,
			w: 3,
			h: 2,
			content: '<div class="chart">Chart Widget</div>',
			id: 'chart-1',
			locked: false,
			noResize: false
		},
		{
			x: 3,
			y: 0,
			w: 3,
			h: 2,
			content: '<div class="metrics">Metrics Widget</div>',
			id: 'metrics-1',
			minW: 2,
			maxW: 6
		},
		{
			x: 6,
			y: 0,
			w: 6,
			h: 3,
			content: '<div class="table">Table Widget</div>',
			id: 'table-1'
		}
	]
});
```

### Use Case

- Pre-defined layouts
- Template-based dashboards
- Initial setup with known widgets

---

## 6. From Existing HTML Widgets

Initialize a grid using pre-existing HTML elements with positioning attributes.

### HTML

```html
<div class="grid-stack">
	<div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="2" gs-id="widget-1">
		<div class="grid-stack-item-content">
			<div class="widget-header">Widget 1</div>
			<div class="widget-body">Content here</div>
		</div>
	</div>
	<div class="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="2" gs-id="widget-2">
		<div class="grid-stack-item-content">
			<div class="widget-header">Widget 2</div>
			<div class="widget-body">Content here</div>
		</div>
	</div>
	<div class="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="2" gs-locked="true">
		<div class="grid-stack-item-content">
			<div class="widget-header">Locked Widget</div>
			<div class="widget-body">Can't move or resize</div>
		</div>
	</div>
</div>
```

### JavaScript

```javascript
// Initialize - will use existing items and their attributes
const grid = GridStack.init({
	column: 12,
	animate: true
});

// Existing items are automatically configured based on gs-* attributes
```

### Supported HTML Attributes

- `gs-x` - X position
- `gs-y` - Y position
- `gs-w` - Width
- `gs-h` - Height
- `gs-id` - Widget ID
- `gs-min-w` - Minimum width
- `gs-max-w` - Maximum width
- `gs-min-h` - Minimum height
- `gs-max-h` - Maximum height
- `gs-locked` - Lock state
- `gs-no-move` - Disable movement
- `gs-no-resize` - Disable resizing
- `gs-auto-position` - Auto-position if x,y invalid

### Use Case

- Server-side rendering
- Progressive enhancement
- SEO-friendly dashboards
- Template engines (Blade, EJS, etc.)

---

## 7. Nested/Sub-grids

Create grids within grid items for complex layouts.

### Method 1: Convert Existing Widget

```javascript
// Start with regular grid
const grid = GridStack.init();

// Add a widget
const widgetEl = grid.addWidget({
	x: 0,
	y: 0,
	w: 6,
	h: 4,
	content: '<div>Will become sub-grid</div>'
});

// Convert to sub-grid
const subGrid = grid.makeSubGrid(widgetEl, {
	column: 6,
	cellHeight: 50,
	margin: 5
});

// Add widgets to sub-grid
subGrid.addWidget({
	x: 0,
	y: 0,
	w: 2,
	h: 1,
	content: 'Nested Widget 1'
});
```

### Method 2: Create with Sub-grid from Start

```javascript
grid.addWidget({
	x: 0,
	y: 0,
	w: 6,
	h: 4,
	subGrid: {
		column: 3,
		margin: 5,
		children: [
			{ x: 0, y: 0, w: 1, h: 1, content: 'Nested 1' },
			{ x: 1, y: 0, w: 1, h: 1, content: 'Nested 2' },
			{ x: 2, y: 0, w: 1, h: 1, content: 'Nested 3' }
		]
	}
});
```

### Method 3: Dynamic Sub-grid Creation

```javascript
// Enable dynamic sub-grid creation on drop
const grid = GridStack.init({
	subGridDynamic: true,
	acceptWidgets: true
});

// When external widget is dropped on existing widget,
// it automatically becomes a sub-grid
```

### Use Case

- Complex layouts
- Widget grouping
- Master-detail views
- Tabbed interfaces within widgets

---

## 8. Dynamic Creation in JavaScript

Create everything programmatically without any initial HTML.

### JavaScript

```javascript
// Create container
const container = document.createElement('div');
container.className = 'grid-stack';
container.style.backgroundColor = '#f5f5f5';
container.style.minHeight = '400px';

// Add to page
document.getElementById('app').appendChild(container);

// Initialize grid
const grid = GridStack.init(
	{
		column: 12,
		margin: 10,
		cellHeight: 70
	},
	container
);

// Add widgets dynamically
for (let i = 0; i < 6; i++) {
	const widget = document.createElement('div');
	widget.innerHTML = `
    <div class="widget-content">
      <h3>Widget ${i + 1}</h3>
      <p>Dynamic content</p>
    </div>
  `;

	grid.addWidget(widget, {
		x: (i * 2) % 12,
		y: Math.floor(i / 6) * 2,
		w: 2,
		h: 2
	});
}
```

### Use Case

- Single Page Applications
- Dynamic form builders
- User-generated layouts
- Conditional dashboard creation

---

## 9. From Saved Layout (Restoration)

Create grids from saved configurations, perfect for persistence.

### Method 1: Using addGrid with Full Config

```javascript
// Load saved configuration (from localStorage, database, etc.)
const savedConfig = {
	column: 12,
	margin: 5,
	cellHeight: 60,
	float: true,
	animate: true,
	responsive: {
		breakpoints: [
			{ w: 768, c: 1 },
			{ w: 1024, c: 6 },
			{ w: 1920, c: 12 }
		]
	},
	children: [
		{
			x: 0,
			y: 0,
			w: 4,
			h: 2,
			id: 'widget-1',
			content: '<div>Saved Widget 1</div>',
			locked: false
		},
		{
			x: 4,
			y: 0,
			w: 4,
			h: 3,
			id: 'widget-2',
			content: '<div>Saved Widget 2</div>',
			minW: 3,
			maxW: 6
		}
	]
};

// Create complete grid from config
const grid = GridStack.addGrid(document.getElementById('dashboard'), savedConfig);
```

### Method 2: Init then Load

```javascript
// Initialize grid with options
const grid = GridStack.init({
	column: 12,
	margin: 10,
	cellHeight: 70
});

// Load saved widget layout
const savedWidgets = JSON.parse(localStorage.getItem('dashboard-layout'));
grid.load(savedWidgets);
```

### Method 3: With Version Management

```javascript
class DashboardManager {
	constructor(containerId) {
		this.container = document.getElementById(containerId);
		this.grid = null;
	}

	loadDashboard(userId, dashboardId) {
		// Fetch from API
		fetch(`/api/dashboards/${userId}/${dashboardId}`)
			.then((res) => res.json())
			.then((config) => {
				// Clear existing
				if (this.grid) {
					this.grid.destroy();
				}

				// Create new grid
				this.grid = GridStack.addGrid(this.container, config);

				// Setup auto-save
				this.setupAutoSave(userId, dashboardId);
			});
	}

	setupAutoSave(userId, dashboardId) {
		let saveTimeout;
		this.grid.on('change', () => {
			clearTimeout(saveTimeout);
			saveTimeout = setTimeout(() => {
				const config = this.grid.save(true, true);
				fetch(`/api/dashboards/${userId}/${dashboardId}`, {
					method: 'PUT',
					body: JSON.stringify(config)
				});
			}, 1000);
		});
	}
}

// Usage
const manager = new DashboardManager('dashboard-container');
manager.loadDashboard('user123', 'dashboard456');
```

### Use Case

- User preferences
- Template systems
- Multi-tenant dashboards
- Layout versioning

---

## 10. Framework Integration Pattern

Custom creation patterns for framework integration (React, Vue, Angular, Svelte).

### Custom Creation Callbacks

```javascript
// Define custom creation/removal callbacks
GridStack.addRemoveCB = (parent, w, add, isGrid) => {
	if (add) {
		if (isGrid) {
			// Create grid container
			const gridEl = document.createElement('div');
			gridEl.className = 'grid-stack';
			parent.appendChild(gridEl);
			return gridEl;
		} else {
			// Create widget using framework
			const component = createFrameworkComponent(w);
			parent.appendChild(component);
			return component;
		}
	} else {
		// Cleanup using framework
		if (!isGrid && w.el) {
			destroyFrameworkComponent(w.el);
		}
	}
};

// Define custom render callback
GridStack.renderCB = (el, widget) => {
	// Render using framework
	renderFrameworkComponent(el, widget.component, widget.props);
};

// Then use normally
const grid = GridStack.addGrid(container, {
	column: 12,
	children: [
		{
			x: 0,
			y: 0,
			w: 4,
			h: 2,
			component: 'ChartComponent',
			props: { type: 'line', data: chartData }
		}
	]
});
```

### React Example

```javascript
// React wrapper component
function GridStackWrapper({ config, children }) {
	const gridRef = useRef(null);
	const [grid, setGrid] = useState(null);

	useEffect(() => {
		// Initialize grid
		const gridInstance = GridStack.init(config, gridRef.current);
		setGrid(gridInstance);

		return () => {
			gridInstance.destroy();
		};
	}, []);

	return (
		<div ref={gridRef} className="grid-stack">
			{children}
		</div>
	);
}
```

### Vue Example

```javascript
// Vue component
export default {
	mounted() {
		this.grid = GridStack.init(this.config, this.$refs.gridElement);

		// Load saved layout if exists
		if (this.savedLayout) {
			this.grid.load(this.savedLayout);
		}
	},
	beforeUnmount() {
		if (this.grid) {
			this.grid.destroy();
		}
	},
	template: `
    <div ref="gridElement" class="grid-stack">
      <slot></slot>
    </div>
  `
};
```

### Svelte Example

```javascript
// Svelte component
<script>
  import { onMount, onDestroy } from 'svelte';
  import { GridStack } from 'gridstack';

  export let config = {};
  export let widgets = [];

  let gridElement;
  let grid;

  onMount(() => {
    grid = GridStack.init(config, gridElement);

    // Add initial widgets
    widgets.forEach(w => grid.addWidget(w));
  });

  onDestroy(() => {
    if (grid) {
      grid.destroy();
    }
  });
</script>

<div bind:this={gridElement} class="grid-stack"></div>
```

### Use Case

- Component-based frameworks
- Reactive data binding
- State management integration
- Complex widget lifecycles

---

## Decision Matrix

| Method          | Best For          | Pros                  | Cons                       |
| --------------- | ----------------- | --------------------- | -------------------------- |
| Basic init()    | Simple dashboards | Easy, minimal code    | Requires HTML              |
| Target specific | Multiple grids    | Flexible targeting    | More complex selectors     |
| initAll()       | Consistent grids  | One line for all      | Same config for all        |
| addGrid()       | Dynamic creation  | Full programmatic     | No progressive enhancement |
| With children   | Known layouts     | Single operation      | All widgets at once        |
| From HTML       | SSR/SEO           | SEO friendly          | More HTML to maintain      |
| Nested grids    | Complex layouts   | Powerful organization | More complexity            |
| Dynamic JS      | SPAs              | Full control          | No fallback                |
| From saved      | Persistence       | User preferences      | Needs storage              |
| Framework       | React/Vue/etc     | Framework integration | More setup                 |

---

## Complete Example: Multi-Method Dashboard

```javascript
class DashboardFactory {
	// Method 1: From template
	createFromTemplate(containerId, templateName) {
		const templates = {
			analytics: {
				column: 12,
				margin: 10,
				children: [
					{ x: 0, y: 0, w: 8, h: 4, content: '<div>Chart</div>' },
					{ x: 8, y: 0, w: 4, h: 2, content: '<div>Metric 1</div>' },
					{ x: 8, y: 2, w: 4, h: 2, content: '<div>Metric 2</div>' }
				]
			},
			monitoring: {
				column: 12,
				margin: 5,
				children: [
					{ x: 0, y: 0, w: 6, h: 3, content: '<div>Server Status</div>' },
					{ x: 6, y: 0, w: 6, h: 3, content: '<div>Network</div>' },
					{ x: 0, y: 3, w: 12, h: 2, content: '<div>Logs</div>' }
				]
			}
		};

		const container = document.getElementById(containerId);
		return GridStack.addGrid(container, templates[templateName]);
	}

	// Method 2: From user config
	createFromUserConfig(containerId, userId) {
		const savedConfig = localStorage.getItem(`user-${userId}-dashboard`);
		if (savedConfig) {
			const container = document.getElementById(containerId);
			return GridStack.addGrid(container, JSON.parse(savedConfig));
		}
		return this.createDefault(containerId);
	}

	// Method 3: Default initialization
	createDefault(containerId) {
		return GridStack.init(
			{
				column: 12,
				margin: 10,
				cellHeight: 70,
				animate: true
			},
			`#${containerId}`
		);
	}

	// Method 4: From existing HTML
	enhanceExisting(selector) {
		return GridStack.init(
			{
				animate: true,
				float: true
			},
			selector
		);
	}
}

// Usage
const factory = new DashboardFactory();

// Different creation methods based on context
const analyticsGrid = factory.createFromTemplate('analytics-container', 'analytics');
const userGrid = factory.createFromUserConfig('user-dashboard', 'user123');
const defaultGrid = factory.createDefault('default-dashboard');
const enhancedGrid = factory.enhanceExisting('.existing-grid');
```

---

## Summary

GridStack provides exceptional flexibility in grid creation:

1. **For simple cases**: Use basic `init()` with existing HTML
2. **For dynamic apps**: Use `addGrid()` for complete programmatic control
3. **For persistence**: Combine `save()` and `load()` or use `addGrid()` with saved config
4. **For frameworks**: Use lifecycle hooks with custom callbacks
5. **For complex layouts**: Leverage nested grids and dynamic creation

Choose the method that best fits your application architecture and requirements. The library's flexibility means you can mix and match approaches as needed.
