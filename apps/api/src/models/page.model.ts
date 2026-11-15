import { modelOptions, prop, Severity, type Ref } from "@typegoose/typegoose";
import { randomUUID } from "node:crypto";
import { SiteModel } from "@/models/site.model";
import type { CardGridComponent, SectionComponent } from "@rugby-au/contracts";

type StoredSection = {
  _id: string;
  type: "section";
  props: SectionComponent["props"];
  children?: ComponentNode[];
};

type StoredCardGrid = {
  _id: string;
  type: "card-grid";
  props: CardGridComponent["props"];
  children?: CardGridComponent["children"];
};

export type ComponentNode = StoredSection | StoredCardGrid;

// Requires page paths to start with "/" (e.g. "/", "/about", "/teams/firsts").
const pageRouteRegex = /^\//;

@modelOptions({
  schemaOptions: {
    collection: "pages",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    autoCreate: false,
    autoIndex: false,
  },
})
export class PageModel {
  @prop({
    type: String,
    default: () => randomUUID(),
  })
  _id!: string;

  @prop({
    ref: () => SiteModel,
    type: String,
    required: true,
  })
  siteId!: Ref<SiteModel, string>;

  @prop({
    type: String,
    required: true,
    trim: true,
  })
  title!: string;

  @prop({
    type: String,
    required: true,
    trim: true,
    match: pageRouteRegex,
  })
  path!: string;

  @prop({
    ref: () => PageModel,
    type: String,
    default: null,
  })
  parentId!: Ref<PageModel, string> | null;

  @prop({
    type: Number,
    required: true,
    default: 0,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "Order must be an integer",
    },
  })
  order!: number;

  @prop({
    type: () => [Object],
    allowMixed: Severity.ALLOW,
    default: () => [],
  })
  components!: ComponentNode[];

  declare createdAt: Date;
  declare updatedAt: Date;
}
