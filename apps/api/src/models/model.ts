import { SiteModel } from "@/models/site.model";
import { PageModel } from "@/models/page.model";
import { getModelForClass } from "@typegoose/typegoose";

export const Site = getModelForClass(SiteModel);
export const Page = getModelForClass(PageModel);

export const models = {
  Site,
  Page,
};
