import { SiteThemeModel } from "@/models/site-theme.model";
import { modelOptions, prop } from "@typegoose/typegoose";
import { randomUUID } from "node:crypto";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@modelOptions({
  schemaOptions: {
    collection: "sites",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    autoCreate: false,
    autoIndex: false,
  },
})
export class SiteModel {
  @prop({
    type: () => String,
    required: true,
    default: () => randomUUID(),
  })
  _id!: string;

  @prop({
    type: String,
    required: true,
    trim: true,
  })
  name!: string;

  @prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: slugRegex,
  })
  slug!: string;

  @prop({
    type: String,
    trim: true,
  })
  description?: string;

  @prop({
    type: () => SiteThemeModel,
    required: true,
    default: () => ({}),
  })
  theme!: SiteThemeModel;

  declare createdAt: Date;
  declare updatedAt: Date;
}
