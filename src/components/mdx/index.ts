// The components MDX pages can use without importing them, and the elements
// they replace.
import Callout from "./Callout.astro";
import Steps from "./Steps.astro";
import Tabs from "./Tabs.astro";
import Tab from "./Tab.astro";
import Cards from "./Cards.astro";
import Card from "./Card.astro";
import File from "./File.astro";
import FileTree from "./FileTree.astro";
import Badge from "./Badge.astro";
import Link from "./Link.astro";
import Table from "./Table.astro";
import TemplateGallery from "../TemplateGallery.astro";
import ErrorReference from "../ErrorReference.astro";
import TemplateTable from "../TemplateTable.astro";

export const mdxComponents = {
  Callout, Steps, Tabs, Tab, Cards, Card, File, FileTree, Badge,
  TemplateGallery, ErrorReference, TemplateTable,
  a: Link,
  table: Table,
};
