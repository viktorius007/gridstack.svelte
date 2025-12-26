import type { GridStackWidget } from 'gridstack';
import type { Snippet } from 'svelte';

/**
 * Base props shared between GridItem and SubGrid
 */
export type GridItemBaseProps = Pick<
	GridStackWidget,
	| 'x'
	| 'y'
	| 'w'
	| 'h'
	| 'minW'
	| 'maxW'
	| 'minH'
	| 'maxH'
	| 'noResize'
	| 'noMove'
	| 'locked'
	| 'id'
>;

/**
 * Props for GridItem component
 */
export interface GridItemProps extends Omit<GridStackWidget, 'el'> {
	children?: Snippet;
}

/**
 * Props for SubGrid component
 */
export interface SubGridProps extends GridItemBaseProps {
	children?: Snippet;
	class?: string;
}
