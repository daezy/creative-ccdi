import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">A different path</span>
      <h1>
        Let’s find your
        <br />
        way back.
      </h1>
      <p>This page isn’t here, but there’s plenty to explore at CCDI.</p>
      <Button href="/">Return to the homepage</Button>
    </section>
  );
}
