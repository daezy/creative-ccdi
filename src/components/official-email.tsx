import { Mail, ArrowUpRight } from "lucide-react";
import { officialEmails } from "@/lib/content";
import styles from "./official-email.module.css";

export function OfficialEmail({
  department,
}: {
  department: keyof typeof officialEmails;
}) {
  const { label, email } = officialEmails[department];
  return (
    <aside className={styles.contact} aria-label={`${label} email`}>
      <Mail size={24} aria-hidden="true" />
      <div>
        <h3>{label}</h3>
        <a href={`mailto:${email}`}>
          {email}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
