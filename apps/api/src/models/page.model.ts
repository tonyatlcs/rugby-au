import { modelOptions, prop, Severity, type Ref } from "@typegoose/typegoose";
import { randomUUID } from "node:crypto";
import { SiteModel } from "./site.model.ts";

export type ComponentNode = {
  _id: string;
  type: string;
  props: Record<string, unknown>;
  children?: ComponentNode[];
};

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
