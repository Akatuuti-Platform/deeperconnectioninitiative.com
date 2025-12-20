import Root from "./navigation-menu.svelte";
import Content from "./navigation-menu-content.svelte";
import Indicator from "./navigation-menu-indicator.svelte";
import Item from "./navigation-menu-item.svelte";
import Link from "./navigation-menu-link.svelte";
import List from "./navigation-menu-list.svelte";
import Trigger from "./navigation-menu-trigger.svelte";
import Viewport from "./navigation-menu-viewport.svelte";

export {
	Root,
	Content,
	Indicator,
	Item,
	Link,
	List,
	Trigger,
	Viewport,
	//
	Root as NavigationMenuRoot,
	Content as NavigationMenuContent,
	Indicator as NavigationMenuIndicator,
	Item as NavigationMenuItem,
	Link as NavigationMenuLink,
	List as NavigationMenuList,
	Trigger as NavigationMenuTrigger,
	Viewport as NavigationMenuViewport,
};

import { cva } from "class-variance-authority";

export const navigationMenuTriggerStyle = cva(
	"group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);
