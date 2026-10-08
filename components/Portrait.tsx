import Image from "next/image";
import { person } from "@/lib/content";

export function Portrait({
  className = "",
  sizes = "(min-width: 1024px) 380px, 80vw",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden border border-[var(--gold)] ${className}`}>
      <Image
        src={person.photo}
        alt={`${person.name}, ${person.honorific}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-[center_18%]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_45%,rgba(7,7,8,0.55))]"
        aria-hidden
      />
    </figure>
  );
}
