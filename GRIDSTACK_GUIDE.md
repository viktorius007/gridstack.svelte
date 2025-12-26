# GridStack v12 Comprehensive Usage Guide

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [DOM Structure](#dom-structure)
3. [Initialization](#initialization)
4. [Configuration Options](#configuration-options)
5. [API Methods](#api-methods)
6. [Events](#events)
7. [Widget Management](#widget-management)
8. [Responsive Grids](#responsive-grids)
9. [Nested Grids](#nested-grids)
10. [Serialization](#serialization)
11. [Best Practices](#best-practices)
12. [Common Patterns](#common-patterns)

## Core Concepts

GridStack is a TypeScript/JavaScript library for building draggable, resizable, responsive dashboard layouts. Version 12 uses CSS variables and modern browser features for better performance.

### Key Principles

- **Grid-based layout**: Items snap to a grid defined by columns and rows
- **Widget-centric**: Each item is a "widget" with position (x, y) and size (w, h)
- **CSS Variable driven**: Uses CSS custom properties for dynamic styling
- **Framework agnostic**: Works with any framework or vanilla JS
- **Mobile-first**: Touch support and responsive behavior built-in

## DOM Structure

### Required HTML Structure

```html
<div class="grid-stack">
	<div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="2">
		<div class="grid-stack-item-content">
			<!-- Your content here -->
		</div>
	</div>
</div>
```

### Layer Responsibilities

#### `.grid-stack` (Container)

- **Purpose**: Main grid container
- **Managed by**: Application
- **OK to style**: Background, padding, borders
- **DON'T style**: Position, transform, dimensions (unless setting min-height)

#### `.grid-stack-item` (Positioning Layer)

- **Purpose**: Handles widget positioning and animations
- **Managed by**: GridStack exclusively
- **OK to style**: Nothing related to positioning
- **DON'T style**: Position, transform, transitions, width, height, top, left, right, bottom

#### `.grid-stack-item-content` (Spacing Layer)

- **Purpose**: Creates visual gaps between widgets using negative space
- **Managed by**: GridStack exclusively
- **OK to style**: Nothing - let GridStack handle it
- **DON'T style**: Any styling - this layer uses absolute positioning with offsets

#### Your Content (Inside `.grid-stack-item-content`)

- **Purpose**: Display your widget content
- **Managed by**: Application
- **OK to style**: Everything - this is your domain
- **Typical styles**: `height: 100%`, padding, background, borders, shadows

### CSS Variables System

GridStack uses CSS variables for dynamic styling:

```css
--gs-columns: 12; /* Number of columns */
--gs-rows: 0; /* Number of rows (0 = auto) */
--gs-cell-height: 60px; /* Height of each cell */
--gs-item-margin-top: 10px; /* Top margin */
--gs-item-margin-right: 10px; /* Right margin */
--gs-item-margin-bottom: 10px; /* Bottom margin */
--gs-item-margin-left: 10px; /* Left margin */
```

## Initialization

### Basic Initialization

```javascript
// Simplest form - uses defaults
const grid = GridStack.init();

// With options
const grid = GridStack.init({
	column: 12,
	margin: 10,
	cellHeight: 70,
	animate: true,
	float: true
});

// Target specific element
const grid = GridStack.init({}, '#my-grid');
```

### Multiple Grids

```javascript
// Initialize all grids on page
const grids = GridStack.initAll();

// With same options for all
const grids = GridStack.initAll({ column: 6 });
```

### Create Grid from JSON

```javascript
// Complete grid creation including children
GridStack.addGrid(parentElement, {
	column: 12,
	children: [
		{ x: 0, y: 0, w: 4, h: 2, content: 'Widget 1' },
		{ x: 4, y: 0, w: 4, h: 2, content: 'Widget 2' }
	]
});
```

## Configuration Options

### Essential Options

```javascript
{
  // Layout
  column: 12,              // Number of columns (default: 12)
  maxRow: 0,              // Maximum rows (0 = unlimited)
  margin: 10,             // Gap between widgets (number or string)
  cellHeight: 'auto',     // Height of cells (number, 'auto', '10rem', etc.)

  // Behavior
  float: false,           // Allow widgets to float up
  animate: true,          // Animate widget movements
  auto: true,            // Auto-position widgets if no x,y provided

  // Interaction
  draggable: {
    handle: '.drag-handle',  // Selector for drag handle
    appendTo: 'body',       // Where to append helper
    scroll: true           // Enable scrolling while dragging
  },
  resizable: {
    handles: 'e,se,s,sw,w' // Resize handles to show
  },

  // Constraints
  minRow: 1,             // Minimum grid height
  minW: 1,               // Minimum widget width
  maxW: 12,              // Maximum widget width

  // External widgets
  acceptWidgets: true,    // Accept widgets from other grids
  removable: false,       // Allow removing widgets by dragging out

  // Advanced
  rtl: false,            // Right-to-left support
  disableDrag: false,    // Disable dragging
  disableResize: false,  // Disable resizing
  staticGrid: false      // Make grid completely static
}
```

### Responsive Options

```javascript
{
  responsive: {
    // Option 1: Automatic column width
    columnWidth: 100,     // Target ~100px columns
    columnMax: 12,       // Max columns allowed

    // Option 2: Explicit breakpoints
    breakpoints: [
      { w: 768, c: 1 },   // 1 column below 768px
      { w: 1024, c: 6 },  // 6 columns below 1024px
      { w: 1920, c: 12 }  // 12 columns below 1920px
    ],

    // Layout mode when changing columns
    layout: 'moveScale'   // or 'list', 'compact', 'none', etc.
  }
}
```

## API Methods

### Widget Management

#### Adding Widgets

```javascript
// Add via object definition
const widget = grid.addWidget({
	x: 0,
	y: 0,
	w: 3,
	h: 2,
	content: 'Hello World',
	id: 'widget-1'
});

// Add existing DOM element
const el = document.createElement('div');
el.innerHTML = 'My Widget';
grid.addWidget(el, { x: 2, y: 1, w: 2, h: 3 });

// Convert existing element to widget
grid.makeWidget('.existing-element');
```

#### Updating Widgets

```javascript
// Update single widget
grid.update(el, { w: 4, h: 3 });

// Batch updates (more efficient)
grid.batchUpdate();
grid.update(el1, { x: 0, y: 0 });
grid.update(el2, { x: 4, y: 0 });
grid.update(el3, { x: 8, y: 0 });
grid.batchUpdate(false);
```

#### Removing Widgets

```javascript
// Remove single widget
grid.removeWidget(el);

// Remove without DOM removal
grid.removeWidget(el, false);

// Remove all widgets
grid.removeAll();
```

### Grid Configuration

#### Cell Height

```javascript
// Get current cell height
const height = grid.getCellHeight();

// Set cell height
grid.cellHeight(100); // 100px
grid.cellHeight('5rem'); // 5rem
grid.cellHeight(); // Auto (square cells)
```

#### Columns

```javascript
// Get column count
const cols = grid.getColumn();

// Change columns
grid.column(6); // Change to 6 columns
grid.column(6, 'moveScale'); // With specific layout mode
```

#### Margins

```javascript
// Get current margin
const margin = grid.getMargin();

// Set margin
grid.margin(5); // 5px all sides
grid.margin('10px 5px'); // Vertical 10px, horizontal 5px
```

### Grid State

#### Enable/Disable

```javascript
// Disable all interaction
grid.disable();

// Re-enable
grid.enable();

// Disable only dragging
grid.enableMove(false);

// Disable only resizing
grid.enableResize(false);
```

#### Float Mode

```javascript
// Get float status
const isFloat = grid.getFloat();

// Toggle float
grid.float(true); // Enable
grid.float(false); // Disable
```

#### Compact

```javascript
// Compact items upward
grid.compact();

// With specific mode
grid.compact('list'); // Keep order
grid.compact('compact'); // Allow reordering
```

### Layout Management

#### Save/Load

```javascript
// Save current layout
const layout = grid.save();

// Save with options
const fullSave = grid.save(
	true, // saveContent
	true, // saveGridOpt
	null, // saveCB
	12 // save for 12 columns
);

// Load layout
grid.load(layout);

// Load with custom add/remove
grid.load(layout, (items, grid, add) => {
	if (add) {
		// Custom widget creation
	} else {
		// Custom widget removal
	}
});
```

#### Coordinates & Positioning

```javascript
// Check if area is empty
const isEmpty = grid.isAreaEmpty(0, 0, 3, 2);

// Check if widget will fit
const willFit = grid.willItFit({ x: 2, y: 1, w: 3, h: 2 });

// Get cell from pixel position
const cell = grid.getCellFromPixel({ left: 100, top: 200 });
```

## Events

### Event Types

```javascript
// Setup events
grid.on('added', (event, items) => {
	console.log('Added widgets:', items);
});

grid.on('removed', (event, items) => {
	console.log('Removed widgets:', items);
});

grid.on('change', (event, items) => {
	console.log('Changed widgets:', items);
});

// Drag events
grid.on('dragstart', (event, el) => {});
grid.on('drag', (event, el) => {});
grid.on('dragstop', (event, el) => {});

// Resize events
grid.on('resizestart', (event, el) => {});
grid.on('resize', (event, el) => {});
grid.on('resizestop', (event, el) => {});

// Dropped from external source
grid.on('dropped', (event, previousNode, newNode) => {
	console.log('Dropped widget from', previousNode, 'to', newNode);
});
```

### Event Management

```javascript
// Remove specific handler
const handler = (e, items) => console.log(items);
grid.on('change', handler);
grid.off('change', handler);

// Remove all handlers for event
grid.off('change');

// Remove all event handlers
grid.off();
```

## Widget Management

### Widget Options

```javascript
{
  // Position & Size
  x: 0,                  // X position (0-based)
  y: 0,                  // Y position (0-based)
  w: 4,                  // Width in grid columns
  h: 2,                  // Height in grid rows

  // Constraints
  minW: 2,              // Minimum width
  maxW: 6,              // Maximum width
  minH: 1,              // Minimum height
  maxH: 4,              // Maximum height

  // Behavior
  autoPosition: true,    // Auto-position if x,y not valid
  locked: false,        // Lock all interaction
  noMove: false,        // Disable moving
  noResize: false,      // Disable resizing

  // Content
  content: 'HTML string', // Widget content
  id: 'widget-1',       // Unique identifier

  // Sub-grids
  subGrid: {},          // Options for nested grid
  subGridDynamic: true  // Allow converting to sub-grid
}
```

### Dynamic Widget Properties

```javascript
// Lock/unlock widget
grid.locked(el, true); // Lock
grid.locked(el, false); // Unlock

// Move restriction
grid.movable(el, false); // Can't move
grid.movable(el, true); // Can move

// Resize restriction
grid.resizable(el, false); // Can't resize
grid.resizable(el, true); // Can resize

// Min/max dimensions
grid.minW(el, 2);
grid.maxW(el, 8);
grid.minH(el, 1);
grid.maxH(el, 4);
```

## Responsive Grids

### Automatic Column Adjustment

```javascript
GridStack.init({
	responsive: {
		columnWidth: 100, // Target 100px columns
		columnMax: 12, // Never exceed 12 columns
		layout: 'moveScale' // How to reflow on column change
	}
});
```

### Breakpoint-based

```javascript
GridStack.init({
	responsive: {
		breakpoints: [
			{ w: 480, c: 1, layout: 'list' },
			{ w: 768, c: 3, layout: 'compact' },
			{ w: 1024, c: 6, layout: 'moveScale' },
			{ w: 1920, c: 12, layout: 'moveScale' }
		],
		breakpointForWindow: false // Use grid width, not window
	}
});
```

### Column Layout Modes

- `'list'` - Keep widgets in order, stack vertically
- `'compact'` - Compact upward, may reorder
- `'moveScale'` - Scale and reposition proportionally
- `'move'` - Reposition only, keep sizes
- `'scale'` - Resize only, keep positions
- `'none'` - No automatic adjustment

## Nested Grids

### Creating Sub-grids

```javascript
// Convert widget to sub-grid
const subGrid = grid.makeSubGrid(widgetEl, {
	column: 6,
	cellHeight: 50,
	margin: 5
});

// Add widget with sub-grid
grid.addWidget({
	x: 0,
	y: 0,
	w: 6,
	h: 4,
	subGrid: {
		column: 3,
		children: [
			{ x: 0, y: 0, w: 1, h: 1, content: 'Nested 1' },
			{ x: 1, y: 0, w: 2, h: 1, content: 'Nested 2' }
		]
	}
});
```

### Dynamic Nesting

```javascript
// Allow dropping to create sub-grids
GridStack.init({
	subGridDynamic: true,
	acceptWidgets: true
});

// Remove empty sub-grid
grid.removeAsSubGrid(subGridNode);
```

## Serialization

### Saving Layouts

```javascript
// Basic save
const widgets = grid.save();
// Returns: [{ x, y, w, h, id, content }, ...]

// Save with grid options
const fullConfig = grid.save(true, true);
// Returns: { column: 12, children: [...], ... }

// Custom save data
const customSave = grid.save(true, false, (node, widget) => {
	widget.customData = node.el.dataset.custom;
	widget.title = node.el.querySelector('.title')?.textContent;
});
```

### Loading Layouts

```javascript
// Simple load
grid.load(savedWidgets);

// Load with add/remove control
grid.load(widgets, true); // Allow add/remove

// Custom load handling
grid.load(widgets, (items, grid, add) => {
	items.forEach((item) => {
		if (add) {
			// Create custom widget
			const el = createCustomWidget(item);
			grid.addWidget(el, item);
		} else {
			// Remove widget
			const el = document.querySelector(`#${item.id}`);
			if (el) grid.removeWidget(el);
		}
	});
});
```

### Multi-column Layouts

```javascript
// Save for specific column count
const layout12 = grid.save(true, false, null, 12);
const layout6 = grid.save(true, false, null, 6);
const layout1 = grid.save(true, false, null, 1);

// Store layouts
const layouts = {
	desktop: layout12,
	tablet: layout6,
	mobile: layout1
};

// Load appropriate layout
const currentCols = grid.getColumn();
if (currentCols <= 1) {
	grid.load(layouts.mobile);
} else if (currentCols <= 6) {
	grid.load(layouts.tablet);
} else {
	grid.load(layouts.desktop);
}
```

## Best Practices

### 1. Performance Optimization

```javascript
// Batch operations for better performance
grid.batchUpdate();
widgets.forEach((w) => grid.addWidget(w));
grid.batchUpdate(false);

// Disable animation during bulk operations
grid.opts.animate = false;
grid.load(largeLayout);
grid.opts.animate = true;

// Use willItFit before adding
if (grid.willItFit(widget)) {
	grid.addWidget(widget);
}
```

### 2. Styling Guidelines

```css
/* DO: Style your content */
.grid-stack-item-content > .my-widget {
	height: 100%;
	padding: 1rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* DON'T: Style GridStack layers */
.grid-stack-item {
	/* Never add position, transform, or transition */
}

.grid-stack-item-content {
	/* Never add any styles here */
}
```

### 3. Event Handling

```javascript
// Debounce save operations
let saveTimeout;
grid.on('change', () => {
	clearTimeout(saveTimeout);
	saveTimeout = setTimeout(() => {
		localStorage.setItem('grid-layout', JSON.stringify(grid.save()));
	}, 500);
});

// Track user interactions
grid.on('dragstop', (event, el) => {
	console.log('User moved widget:', el.gridstackNode);
	analytics.track('widget_moved', {
		id: el.gridstackNode.id,
		position: { x: el.gridstackNode.x, y: el.gridstackNode.y }
	});
});
```

### 4. Responsive Design

```javascript
// Save layout per breakpoint
const saveResponsiveLayout = () => {
	const cols = grid.getColumn();
	const key = `layout-${cols}col`;
	localStorage.setItem(key, JSON.stringify(grid.save()));
};

// Load appropriate layout
const loadResponsiveLayout = () => {
	const cols = grid.getColumn();
	const key = `layout-${cols}col`;
	const saved = localStorage.getItem(key);
	if (saved) {
		grid.load(JSON.parse(saved));
	}
};

// Listen for column changes
let lastColumn = grid.getColumn();
grid.on('change', () => {
	const currentColumn = grid.getColumn();
	if (currentColumn !== lastColumn) {
		lastColumn = currentColumn;
		loadResponsiveLayout();
	}
});
```

### 5. Framework Integration

```javascript
// Custom widget creation
GridStack.addRemoveCB = (parent, widget, add, isGrid) => {
	if (add) {
		// Create using framework's method
		const component = createComponent(widget);
		parent.appendChild(component);
		return component;
	} else {
		// Destroy using framework's method
		destroyComponent(widget.el);
	}
};

// Custom content rendering
GridStack.renderCB = (el, widget) => {
	// Use framework's rendering
	renderComponent(el, widget.component, widget.props);
};
```

## Common Patterns

### Dashboard with Toolbar

```javascript
// Draggable widgets from toolbar
const toolbar = document.querySelector('.widget-toolbar');
toolbar.querySelectorAll('.widget-template').forEach((template) => {
	GridStack.setupDragIn(template, {
		helper: 'clone',
		appendTo: 'body'
	});
});

// Handle drop
grid.on('dropped', (event, previousNode, newNode) => {
	const type = newNode.el.dataset.widgetType;
	const widget = createWidgetByType(type);
	grid.addWidget(widget, newNode);
});
```

### Locked Layout with Edit Mode

```javascript
let editMode = false;

function toggleEditMode() {
	editMode = !editMode;
	if (editMode) {
		grid.enable();
		document.body.classList.add('edit-mode');
	} else {
		grid.disable();
		document.body.classList.remove('edit-mode');
		saveLayout();
	}
}

// Show/hide controls based on mode
grid.on('added', (e, items) => {
	items.forEach((el) => {
		el.querySelector('.edit-controls').hidden = !editMode;
	});
});
```

### Widget Templates

```javascript
const widgetTemplates = {
	chart: {
		w: 4,
		h: 3,
		minW: 3,
		minH: 2,
		content: '<div class="chart-widget">Chart</div>'
	},
	metric: {
		w: 2,
		h: 2,
		minW: 1,
		minH: 1,
		content: '<div class="metric-widget">0</div>'
	},
	table: {
		w: 6,
		h: 4,
		minW: 4,
		minH: 3,
		content: '<div class="table-widget">Table</div>'
	}
};

function addWidget(type) {
	const template = widgetTemplates[type];
	if (template && grid.willItFit(template)) {
		grid.addWidget({
			...template,
			id: `widget-${Date.now()}`,
			type: type
		});
	}
}
```

### Persistence with LocalStorage

```javascript
class DashboardPersistence {
	constructor(grid, storageKey = 'dashboard-layout') {
		this.grid = grid;
		this.storageKey = storageKey;
		this.setupAutoSave();
		this.loadLayout();
	}

	setupAutoSave() {
		let saveTimeout;
		this.grid.on('change', () => {
			clearTimeout(saveTimeout);
			saveTimeout = setTimeout(() => this.saveLayout(), 500);
		});
	}

	saveLayout() {
		const layout = this.grid.save(true, false);
		localStorage.setItem(this.storageKey, JSON.stringify(layout));
	}

	loadLayout() {
		const saved = localStorage.getItem(this.storageKey);
		if (saved) {
			try {
				const layout = JSON.parse(saved);
				this.grid.load(layout);
			} catch (e) {
				console.error('Failed to load layout:', e);
			}
		}
	}

	clearLayout() {
		localStorage.removeItem(this.storageKey);
		this.grid.removeAll();
	}
}

// Usage
const persistence = new DashboardPersistence(grid);
```

## Troubleshooting

### Common Issues

1. **Widgets overlap after load**
   - Ensure unique x,y coordinates
   - Call `grid.compact()` after loading
   - Check for invalid positions outside grid bounds

2. **Margins/gaps not showing**
   - Don't style `.grid-stack-item-content`
   - Let GridStack handle the spacing
   - Style only your content inside

3. **Drag/resize not working**
   - Check if grid is disabled
   - Verify widget isn't locked
   - Ensure correct handle selectors

4. **Responsive not working**
   - Include gridstack-extra.css
   - Use correct breakpoint configuration
   - Check if responsive option is enabled

5. **Performance issues**
   - Use batch updates for multiple operations
   - Disable animation during bulk changes
   - Limit number of widgets
   - Use simpler resize handles (e.g., just 'se')

## Migration from Older Versions

### From v10 to v12

- CSS variables replace runtime style injection
- `gs-` prefix for attributes instead of `data-gs-`
- Better TypeScript types
- Simplified API surface
- Improved nested grid support

### Key Changes

- Remove jQuery dependency completely
- Use native `GridStack.init()` instead of `$('.grid-stack').gridstack()`
- Event names simplified (no 'gs' prefix)
- Built-in touch support (no need for separate touch plugin)

## Summary

GridStack v12 is a powerful, flexible grid library that handles the complex positioning and interaction logic while giving you full control over your widget content. The key to success is understanding the layer structure and respecting the separation of concerns:

1. Let GridStack handle positioning and animations
2. Style only your content, not the framework layers
3. Use the API methods rather than direct DOM manipulation
4. Leverage events for state management and persistence
5. Take advantage of built-in responsive features
6. Use batch operations for performance

With these principles in mind, you can build sophisticated, performant dashboard applications that work across all devices and frameworks.
