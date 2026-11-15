import type { Card, SiteTheme } from "@rugby-au/contracts";
import clsx from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Image from "next/image";
import { editorialFont } from "@/styles/fonts";
import styles from "@/components/elements/ContentCard/ContentCard.module.scss";

dayjs.extend(customParseFormat);

type ContentCardProps = Card & {
  className?: string;
  siteStyle: SiteTheme["style"];
};

export const ContentCard = ({
  id,
  variant,
  siteStyle,
  heading,
  subHeading,
  date,
  link,
  image,
  icon,
  backgroundColor,
  className,
}: ContentCardProps) => {
  const parsedDate = date ? dayjs(date, "YYYY-MM-DD", true) : null;
  const formattedDate = parsedDate?.isValid()
    ? parsedDate.format("D MMMM YYYY")
    : date;

  return (
    <article
      id={id}
      className={clsx(
        styles.card,
        styles[siteStyle],
        siteStyle === "editorial" && editorialFont.variable,
        className,
      )}
    >
      {variant === "image" && image?.url && (
        <div className={styles.media}>
          <Image
            className={styles.image}
            src={image.url}
            alt={image.alt}
            fill
            sizes="100vw"
            unoptimized
          />
        </div>
      )}
      {variant === "icon" && icon && (
        <div className={styles.media}>
          <span className={styles.icon}>{icon}</span>
        </div>
      )}
      <div
        className={styles.content}
        style={{ backgroundColor: backgroundColor || undefined }}
      >
        {date && <time dateTime={date}>{formattedDate}</time>}
        <h3>{heading}</h3>
        {subHeading && <p>{subHeading}</p>}
        {link?.href && (
          <a className={styles.link} href={link.href}>
            <span
              className={
                siteStyle === "promotional"
                  ? styles.visuallyHidden
                  : undefined
              }
            >
              {link.label || heading}
            </span>
            {siteStyle === "promotional" && (
              <span aria-hidden="true">→</span>
            )}
          </a>
        )}
      </div>
    </article>
  );
};
