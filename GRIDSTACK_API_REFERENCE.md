# GridStack v12 Complete API Reference

## Table of Contents

1. [Initialization Methods](#initialization-methods)
2. [Grid Options (GridStackOptions)](#grid-options-gridstackoptions)
3. [Widget Options (GridStackWidget)](#widget-options-gridstackwidget)
4. [Instance Methods](#instance-methods)
5. [Static Methods](#static-methods)
6. [Event Handlers](#event-handlers)
7. [Type Definitions](#type-definitions)

---

## Initialization Methods

### `GridStack.init(options?, elOrString?)`

Initialize a single grid instance.

**Parameters:**

- `options` (GridStackOptions, optional): Configuration options for the grid
- `elOrString` (GridStackElement, optional): Element or CSS selector (defaults to '.grid-stack')

**Returns:** GridStack instance

**Example:**

```javascript
const grid = GridStack.init(
	{
		column: 12,
		margin: 10
	},
	'#my-grid'
);
```

### `GridStack.initAll(options?, selector?)`

Initialize multiple grids at once.

**Parameters:**

- `options` (GridStackOptions, optional): Configuration options for all grids
- `selector` (string, optional): CSS selector for grids (defaults to '.grid-stack')

**Returns:** Array of GridStack instances

### `GridStack.addGrid(parent, opt?)`

Create a complete grid from JSON including children.

**Parameters:**

- `parent` (HTMLElement): Parent element for the grid
- `opt` (GridStackOptions, optional): Grid options including children array

**Returns:** GridStack instance

---

## Grid Options (GridStackOptions)

Complete list of configuration options for GridStack initialization:

### Layout Options

| Option           | Type                          | Default | Description                                                         |
| ---------------- | ----------------------------- | ------- | ------------------------------------------------------------------- |
| `column`         | number                        | 12      | Number of columns in the grid                                       |
| `maxRow`         | number                        | 0       | Maximum rows (0 = unlimited)                                        |
| `minRow`         | number                        | 0       | Minimum rows to maintain                                            |
| `row`            | number                        | 0       | Fixed row count (0 = auto)                                          |
| `margin`         | number\|string\|MarginOptions | 10      | Gap between widgets. Can be number, string ('5px'), or object       |
| `cellHeight`     | number\|string                | 'auto'  | Height of each row. Number (pixels), 'auto', '100px', '10rem', etc. |
| `cellHeightUnit` | string                        | 'px'    | Unit for cellHeight if number provided                              |

### MarginOptions

```typescript
{
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
```

### Behavior Options

| Option                   | Type                      | Default | Description                                                         |
| ------------------------ | ------------------------- | ------- | ------------------------------------------------------------------- |
| `float`                  | boolean                   | false   | Allow widgets to float up to fill empty space                       |
| `animate`                | boolean                   | true    | Enable animation for widget movements                               |
| `auto`                   | boolean                   | true    | Auto-position widgets if x,y not provided                           |
| `rtl`                    | boolean                   | false   | Right-to-left layout support                                        |
| `removable`              | boolean\|string           | false   | Allow removing by dragging out. true or CSS selector for trash zone |
| `removeTimeout`          | number                    | 2000    | Time in ms before widget is removed when dragged out                |
| `acceptWidgets`          | boolean\|string\|function | false   | Accept external widgets. true, CSS selector, or validation function |
| `staticGrid`             | boolean                   | false   | Make entire grid static (no interaction)                            |
| `alwaysShowResizeHandle` | boolean\|string           | false   | Always show resize handles. true or 'mobile'                        |

### Interaction Options

| Option                 | Type    | Default | Description                                    |
| ---------------------- | ------- | ------- | ---------------------------------------------- |
| `disableDrag`          | boolean | false   | Disable dragging for all widgets               |
| `disableResize`        | boolean | false   | Disable resizing for all widgets               |
| `disableOneColumnMode` | boolean | false   | Disable special 1-column mode on small screens |
| `oneColumnSize`        | number  | 768     | Screen width to trigger 1-column mode          |

### Drag Options (`draggable`)

```typescript
{
  handle?: string;      // Selector for drag handle (default: '.grid-stack-item-content')
  appendTo?: string;    // Where to append helper (default: 'body')
  scroll?: boolean;     // Enable auto-scroll (default: true)
  helper?: string;      // Helper type: 'clone' or function
  start?: function;     // Callback on drag start
  stop?: function;      // Callback on drag stop
  drag?: function;      // Callback during drag
}
```

### Resize Options (`resizable`)

```typescript
{
  handles?: string;     // Resize handles: 'e,se,s,sw,w,nw,n,ne' (default: 'se')
  start?: function;     // Callback on resize start
  stop?: function;      // Callback on resize stop
  resize?: function;    // Callback during resize
}
```

### Responsive Options

| Option       | Type       | Default   | Description                     |
| ------------ | ---------- | --------- | ------------------------------- |
| `responsive` | Responsive | undefined | Responsive configuration object |

### Responsive Object

```typescript
{
  columnWidth?: number;        // Target column width for auto-columns
  columnMax?: number;          // Maximum columns allowed
  breakpoints?: Breakpoint[];  // Array of breakpoint definitions
  breakpointForWindow?: boolean; // Use window width vs grid width
  layout?: ColumnOptions;      // Global layout mode for column changes
}
```

### Breakpoint Object

```typescript
{
  w?: number;              // Max width for this breakpoint
  c: number;               // Number of columns
  layout?: ColumnOptions;  // Layout mode for this breakpoint
}
```

### Constraint Options

| Option | Type   | Default   | Description                   |
| ------ | ------ | --------- | ----------------------------- |
| `minW` | number | 1         | Default minimum widget width  |
| `maxW` | number | undefined | Default maximum widget width  |
| `minH` | number | 1         | Default minimum widget height |
| `maxH` | number | undefined | Default maximum widget height |

### Nested Grid Options

| Option           | Type             | Default   | Description                                   |
| ---------------- | ---------------- | --------- | --------------------------------------------- |
| `subGrid`        | GridStackOptions | undefined | Default options for nested grids              |
| `subGridDynamic` | boolean          | true      | Allow converting widgets to sub-grids on drop |

### Advanced Options

| Option             | Type                   | Default                    | Description                  |
| ------------------ | ---------------------- | -------------------------- | ---------------------------- |
| `engineClass`      | typeof GridStackEngine | GridStackEngine            | Custom engine class          |
| `handle`           | string                 | '.grid-stack-item-content' | Drag handle selector         |
| `class`            | string                 | 'grid-stack'               | CSS class for grid container |
| `itemClass`        | string                 | 'grid-stack-item'          | CSS class for grid items     |
| `placeholderClass` | string                 | 'grid-stack-placeholder'   | CSS class for placeholder    |
| `placeholderText`  | string                 | ''                         | Text for placeholder         |
| `children`         | GridStackWidget[]      | []                         | Initial widgets to create    |
| `onChange`         | function               | undefined                  | Callback for any changes     |

---

## Widget Options (GridStackWidget)

Complete options for individual widgets:

### Position & Size

| Option         | Type    | Default   | Description                         |
| -------------- | ------- | --------- | ----------------------------------- |
| `x`            | number  | undefined | X position (0-based, left to right) |
| `y`            | number  | undefined | Y position (0-based, top to bottom) |
| `w`            | number  | 1         | Width in grid columns               |
| `h`            | number  | 1         | Height in grid rows                 |
| `autoPosition` | boolean | true      | Auto-position if x,y invalid        |

### Constraints

| Option | Type   | Default   | Description                    |
| ------ | ------ | --------- | ------------------------------ |
| `minW` | number | undefined | Minimum width for this widget  |
| `maxW` | number | undefined | Maximum width for this widget  |
| `minH` | number | undefined | Minimum height for this widget |
| `maxH` | number | undefined | Maximum height for this widget |

### Behavior

| Option     | Type    | Default | Description                          |
| ---------- | ------- | ------- | ------------------------------------ |
| `locked`   | boolean | false   | Lock all interaction for this widget |
| `noMove`   | boolean | false   | Disable moving this widget           |
| `noResize` | boolean | false   | Disable resizing this widget         |

### Content & Identity

| Option    | Type        | Default   | Description                      |
| --------- | ----------- | --------- | -------------------------------- |
| `id`      | string      | undefined | Unique identifier for the widget |
| `content` | string      | undefined | HTML content for the widget      |
| `el`      | HTMLElement | undefined | Existing element to use          |

### Nested Grid

| Option           | Type             | Default   | Description                  |
| ---------------- | ---------------- | --------- | ---------------------------- |
| `subGrid`        | GridStackOptions | undefined | Options for nested grid      |
| `subGridDynamic` | boolean          | undefined | Allow converting to sub-grid |

---

## Instance Methods

### Widget Management

#### `addWidget(w: GridStackWidget): GridItemHTMLElement`

Add a new widget to the grid.

**Parameters:**

- `w`: Widget definition object or existing element

**Returns:** The created/added grid item element

#### `makeWidget(el: GridStackElement, options?: GridStackWidget): GridItemHTMLElement`

Convert an existing element into a grid widget.

**Parameters:**

- `el`: Element to convert
- `options`: Optional widget options

**Returns:** The grid item element

#### `removeWidget(el: GridStackElement, removeDOM?: boolean, triggerEvent?: boolean): GridStack`

Remove a widget from the grid.

**Parameters:**

- `el`: Widget element to remove
- `removeDOM` (default: true): Also remove from DOM
- `triggerEvent` (default: true): Trigger remove event

**Returns:** Grid instance for chaining

#### `removeAll(removeDOM?: boolean): GridStack`

Remove all widgets from the grid.

**Parameters:**

- `removeDOM` (default: true): Also remove from DOM

**Returns:** Grid instance for chaining

#### `update(el: GridStackElement, opts: GridStackWidget): GridStack`

Update widget properties.

**Parameters:**

- `el`: Widget element to update
- `opts`: New options to apply

**Returns:** Grid instance for chaining

### Grid Configuration

#### `batchUpdate(flag?: boolean): GridStack`

Enable/disable batch mode for multiple operations.

**Parameters:**

- `flag` (default: true): Enable or disable batch mode

**Returns:** Grid instance for chaining

#### `cellHeight(val?: numberOrString, update?: boolean): GridStack | number`

Get or set cell height.

**Parameters:**

- `val`: New cell height value
- `update` (default: true): Update existing widgets

**Returns:** Grid instance when setting, number when getting

#### `column(column?: number, layout?: ColumnOptions): GridStack | number`

Get or set column count.

**Parameters:**

- `column`: New column count
- `layout`: How to reposition widgets

**Returns:** Grid instance when setting, number when getting

#### `getColumn(): number`

Get current column count.

**Returns:** Number of columns

#### `margin(value?: marginOptions): GridStack | marginOptions`

Get or set margins.

**Parameters:**

- `value`: New margin value(s)

**Returns:** Grid instance when setting, current margins when getting

#### `getMargin(): number`

Get current margin value.

**Returns:** Margin in pixels

### Grid State

#### `enable(): GridStack`

Enable all grid interactions.

**Returns:** Grid instance for chaining

#### `disable(): GridStack`

Disable all grid interactions.

**Returns:** Grid instance for chaining

#### `enableMove(doEnable: boolean): GridStack`

Enable/disable widget movement.

**Parameters:**

- `doEnable`: true to enable, false to disable

**Returns:** Grid instance for chaining

#### `enableResize(doEnable: boolean): GridStack`

Enable/disable widget resizing.

**Parameters:**

- `doEnable`: true to enable, false to disable

**Returns:** Grid instance for chaining

#### `float(val?: boolean): GridStack | boolean`

Get or set float mode.

**Parameters:**

- `val`: Enable/disable float mode

**Returns:** Grid instance when setting, boolean when getting

#### `getFloat(): boolean`

Get current float mode status.

**Returns:** true if float mode enabled

#### `compact(layout?: CompactOptions): GridStack`

Compact widgets upward.

**Parameters:**

- `layout`: 'list' or 'compact' mode

**Returns:** Grid instance for chaining

### Widget State

#### `locked(el: GridStackElement, locked?: boolean): GridStack | boolean`

Get or set widget lock state.

**Parameters:**

- `el`: Widget element
- `locked`: Lock state to set

**Returns:** Grid instance when setting, boolean when getting

#### `movable(el: GridStackElement, val?: boolean): GridStack | boolean`

Get or set widget movable state.

**Parameters:**

- `el`: Widget element
- `val`: Movable state to set

**Returns:** Grid instance when setting, boolean when getting

#### `resizable(el: GridStackElement, val?: boolean): GridStack | boolean`

Get or set widget resizable state.

**Parameters:**

- `el`: Widget element
- `val`: Resizable state to set

**Returns:** Grid instance when setting, boolean when getting

#### `minW(el: GridStackElement, val?: number): GridStack | number`

Get or set widget minimum width.

**Parameters:**

- `el`: Widget element
- `val`: Minimum width

**Returns:** Grid instance when setting, number when getting

#### `maxW(el: GridStackElement, val?: number): GridStack | number`

Get or set widget maximum width.

**Parameters:**

- `el`: Widget element
- `val`: Maximum width

**Returns:** Grid instance when setting, number when getting

#### `minH(el: GridStackElement, val?: number): GridStack | number`

Get or set widget minimum height.

**Parameters:**

- `el`: Widget element
- `val`: Minimum height

**Returns:** Grid instance when setting, number when getting

#### `maxH(el: GridStackElement, val?: number): GridStack | number`

Get or set widget maximum height.

**Parameters:**

- `el`: Widget element
- `val`: Maximum height

**Returns:** Grid instance when setting, number when getting

### Serialization

#### `save(saveContent?: boolean, saveGridOpt?: boolean, saveCB?: SaveFcn, column?: number): GridStackWidget[] | GridStackOptions`

Save current grid layout.

**Parameters:**

- `saveContent` (default: true): Save widget content
- `saveGridOpt` (default: false): Save grid options
- `saveCB`: Callback to add custom data
- `column`: Save for specific column count

**Returns:** Array of widgets or full grid options

#### `load(items: GridStackWidget[], addRemove?: boolean | AddRemoveFcn): GridStack`

Load a saved layout.

**Parameters:**

- `items`: Widgets to load
- `addRemove` (default: true): Allow adding/removing widgets

**Returns:** Grid instance for chaining

### Utility Methods

#### `isAreaEmpty(x: number, y: number, w: number, h: number): boolean`

Check if an area is empty.

**Parameters:**

- `x`: X position
- `y`: Y position
- `w`: Width
- `h`: Height

**Returns:** true if area is empty

#### `willItFit(node: GridStackWidget): boolean`

Check if a widget will fit.

**Parameters:**

- `node`: Widget definition to test

**Returns:** true if widget will fit

#### `getCellFromPixel(position: MousePosition, useOuterOffset?: boolean): CellPosition`

Convert pixel position to grid cell.

**Parameters:**

- `position`: {left, top} pixel position
- `useOuterOffset` (default: false): Use outer element offset

**Returns:** {x, y} grid position

#### `destroy(removeDOM?: boolean): GridStack`

Destroy the grid instance.

**Parameters:**

- `removeDOM` (default: true): Also remove grid DOM

**Returns:** Grid instance

### Nested Grids

#### `makeSubGrid(el: GridItemHTMLElement, ops?: GridStackOptions, nodeToAdd?: GridStackNode, saveContent?: boolean): GridStack`

Convert widget to nested grid.

**Parameters:**

- `el`: Widget element to convert
- `ops`: Sub-grid options
- `nodeToAdd`: Initial node to add
- `saveContent` (default: true): Save existing content

**Returns:** New sub-grid instance

#### `removeAsSubGrid(nodeThatRemoved?: GridStackNode): void`

Remove empty sub-grid and convert back to regular widget.

**Parameters:**

- `nodeThatRemoved`: Node that triggered removal

### Events

#### `on(name: GridStackEvent, callback: GridStackEventHandlerCallback): GridStack`

Add event listener.

**Parameters:**

- `name`: Event name or space-separated list
- `callback`: Handler function

**Returns:** Grid instance for chaining

#### `off(name?: GridStackEvent, callback?: GridStackEventHandlerCallback): GridStack`

Remove event listener.

**Parameters:**

- `name`: Event name (optional, removes all if not provided)
- `callback`: Specific handler to remove (optional)

**Returns:** Grid instance for chaining

---

## Static Methods

### `GridStack.registerEngine(engineClass: typeof GridStackEngine): void`

Register a custom engine class globally.

**Parameters:**

- `engineClass`: Custom engine class

### `GridStack.setupDragIn(dragElement: HTMLElement, dragOptions?: DDDragOpt): void`

Setup external element for dragging into grids.

**Parameters:**

- `dragElement`: Element to make draggable
- `dragOptions`: Drag configuration options

---

## Event Handlers

### Event Types and Parameters

| Event         | Handler Type            | Parameters                     | Description             |
| ------------- | ----------------------- | ------------------------------ | ----------------------- |
| `added`       | GridStackNodesHandler   | (event, nodes[])               | Widgets added           |
| `removed`     | GridStackNodesHandler   | (event, nodes[])               | Widgets removed         |
| `change`      | GridStackNodesHandler   | (event, nodes[])               | Widgets changed         |
| `disable`     | GridStackEventHandler   | (event)                        | Grid disabled           |
| `enable`      | GridStackEventHandler   | (event)                        | Grid enabled            |
| `dragstart`   | GridStackElementHandler | (event, el)                    | Drag started            |
| `drag`        | GridStackElementHandler | (event, el)                    | During drag             |
| `dragstop`    | GridStackElementHandler | (event, el)                    | Drag ended              |
| `resizestart` | GridStackElementHandler | (event, el)                    | Resize started          |
| `resize`      | GridStackElementHandler | (event, el)                    | During resize           |
| `resizestop`  | GridStackElementHandler | (event, el)                    | Resize ended            |
| `dropped`     | GridStackDroppedHandler | (event, previousNode, newNode) | External widget dropped |

---

## Type Definitions

### `GridStackNode`

Internal representation of a widget with all runtime properties:

```typescript
interface GridStackNode {
	x: number; // Current X position
	y: number; // Current Y position
	w: number; // Current width
	h: number; // Current height
	minW?: number; // Minimum width
	maxW?: number; // Maximum width
	minH?: number; // Minimum height
	maxH?: number; // Maximum height
	locked?: boolean; // Lock state
	noMove?: boolean; // Move disabled
	noResize?: boolean; // Resize disabled
	autoPosition?: boolean; // Auto-positioned
	id?: string; // Unique ID
	content?: string; // HTML content
	el?: GridItemHTMLElement; // DOM element
	grid?: GridStack; // Parent grid (for sub-grids)
	subGrid?: GridStack; // Nested grid instance
	_id?: string; // Internal ID
	_isAboutToRemove?: boolean; // Removal flag
	_temporaryRemoved?: boolean; // Temporary removal flag
	_origX?: number; // Original X (for restore)
	_origY?: number; // Original Y (for restore)
	_origW?: number; // Original width (for restore)
	_origH?: number; // Original height (for restore)
}
```

### `ColumnOptions`

Layout modes for column changes:

```typescript
type ColumnOptions =
	| 'list' // Keep order, stack vertically
	| 'compact' // Compact with reordering
	| 'moveScale' // Scale and move proportionally
	| 'move' // Move only
	| 'scale' // Scale only
	| 'none' // No adjustment
	| ((
			column: number,
			oldColumn: number,
			nodes: GridStackNode[],
			oldNodes: GridStackNode[]
	  ) => void);
```

### `CompactOptions`

Compacting modes:

```typescript
type CompactOptions = 'list' | 'compact';
```

### `numberOrString`

Flexible numeric input:

```typescript
type numberOrString = number | string;
```

### `GridStackElement`

Element reference types:

```typescript
type GridStackElement = string | HTMLElement | GridItemHTMLElement;
```

### `MousePosition`

Pixel coordinates:

```typescript
interface MousePosition {
	top: number;
	left: number;
}
```

### `CellPosition`

Grid coordinates:

```typescript
interface CellPosition {
	x: number;
	y: number;
}
```

### Callback Function Types

```typescript
// Widget add/remove callback
type AddRemoveFcn = (
	parent: HTMLElement,
	w: GridStackWidget,
	add: boolean,
	grid: boolean
) => HTMLElement | undefined;

// Save callback
type SaveFcn = (node: GridStackNode, w: GridStackWidget) => void;

// Render callback
type RenderFcn = (el: HTMLElement, w: GridStackWidget) => void;

// Resize to content callback
type ResizeToContentFcn = (el: GridItemHTMLElement) => void;
```

---

## Complete Example

```javascript
// Full configuration example
const grid = GridStack.init({
	// Layout
	column: 12,
	maxRow: 10,
	minRow: 2,
	margin: { top: 10, right: 10, bottom: 10, left: 10 },
	cellHeight: 70,

	// Behavior
	float: true,
	animate: true,
	auto: true,

	// Interaction
	draggable: {
		handle: '.drag-handle',
		appendTo: 'body',
		scroll: true
	},
	resizable: {
		handles: 'e, se, s, sw, w'
	},

	// Constraints
	minW: 2,
	maxW: 8,
	minH: 1,
	maxH: 6,

	// External widgets
	acceptWidgets: '.external-widget',
	removable: '.trash-zone',

	// Responsive
	responsive: {
		breakpoints: [
			{ w: 768, c: 1, layout: 'list' },
			{ w: 1024, c: 6, layout: 'compact' },
			{ w: 1920, c: 12, layout: 'moveScale' }
		]
	},

	// Nested grids
	subGridDynamic: true,
	subGrid: {
		column: 4,
		margin: 5
	},

	// Initial widgets
	children: [
		{ x: 0, y: 0, w: 4, h: 2, id: 'widget-1', content: 'Widget 1' },
		{ x: 4, y: 0, w: 4, h: 2, id: 'widget-2', content: 'Widget 2' }
	]
});

// Add widget with all options
grid.addWidget({
	x: 0,
	y: 2,
	w: 3,
	h: 2,
	minW: 2,
	maxW: 6,
	minH: 1,
	maxH: 4,
	locked: false,
	noMove: false,
	noResize: false,
	autoPosition: false,
	id: 'widget-3',
	content: '<div class="widget">Widget 3</div>'
});

// Setup events
grid.on('change', (event, items) => {
	console.log('Changed items:', items);
	items.forEach((node) => {
		console.log(`Widget ${node.id}: x=${node.x}, y=${node.y}, w=${node.w}, h=${node.h}`);
	});
});

// Save with all options
const saved = grid.save(
	true, // saveContent
	true, // saveGridOpt
	(node, widget) => {
		// Add custom data
		widget.customData = node.el?.dataset.custom;
	},
	12 // save for 12 columns
);
```
