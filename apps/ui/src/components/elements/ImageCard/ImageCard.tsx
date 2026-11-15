import type { Card, SiteTheme } from "@rugby-au/contracts";
import clsx from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "@/components/elements/ImageCard/ImageCard.module.scss";

dayjs.extend(customParseFormat);

type CardProps = Card & {
  className?: string;
  siteStyle: SiteTheme["style"];
};

export const ImageCard = ({
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
}: CardProps) => {
  const parsedDate = date ? dayjs(date, "YYYY-MM-DD", true) : null;
  const formattedDate = parsedDate?.isValid()
    ? parsedDate.format("D MMMM YYYY")
    : date;

  return (
    <article
      id={id}
      className={clsx(styles.card, styles[siteStyle], className)}
    >
      {variant === "image" && image?.url && (
        <div className={styles.media}>
          {/* Card images may be hosted externally. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.image} src={image.url} alt={image.alt} />
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
