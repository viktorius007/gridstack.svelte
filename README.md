# Svelte wrapper of [Gridstack.js](https://gridstackjs.com/)

## 📖 Overview

[Gridstack.js](https://gridstackjs.com/) is a modern, mobile-friendly TypeScript library designed for creating flexible dashboard layouts. It simplifies the process of building drag-and-drop, multi-column, responsive dashboards.

svelte-dashboard is a Gridstack.js Svelte wrapper that seamlessly integrates with Svelte 5, allowing you to use it as a native component without sacrificing runtime performance or features.

## ⚡️ Quick Start

### Installation

```js
npm install --save svelte-dashboard
```

### Usage

#### Basic

```svelte
<script lang="ts">
	import Grid, { GridItem } from 'svelte-dashboard';
</script>

<Grid>
	<GridItem x="0" y="0" w="4" h="2">Hello</GridItem>
	<GridItem x="4" y="0" w="4" h="4">World</GridItem>
</Grid>
```
