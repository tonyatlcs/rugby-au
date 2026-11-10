import { modelOptions, prop } from "@typegoose/typegoose";

const hexColorRegex = /^#[0-9a-fA-F]{6}$/;

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class SiteThemeModel {
  @prop({
    type: String,
    required: true,
    default: "#fa4602",
    match: hexColorRegex,
  })
  primaryColor!: string;

  @prop({
    type: String,
    required: true,
    default: "#FFFFFF",
    match: hexColorRegex,
  })
  backgroundColor!: string;

  @prop({
    type: String,
    required: true,
    default: "#202536",
    match: hexColorRegex,
  })
  textColor!: string;

  @prop({
    type: String,
    required: true,
    default: "Inter",
    trim: true,
  })
  fontFamily!: string;
}
