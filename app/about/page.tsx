"use client";

import { Section } from "../components/Section";
import { Container } from "../components/Container";
import { ButtonLink } from "../components/Button";
import { useState } from "react";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError("Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while sending your message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative isolate min-h-[18rem] overflow-hidden sm:min-h-[22rem]">
        <img
          src="/design/banner.jpg"
          alt=""
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-black/65" aria-hidden />
        <div className="relative mx-auto flex min-h-[18rem] max-w-7xl items-end px-5 py-12 sm:min-h-[22rem] sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
              About Us
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-white sm:text-6xl">
              Seoulite
            </h1>
          </div>
        </div>
      </section>

      <Section id="about" className="bg-white">
        <Container className="max-w-3xl">
          <p className="font-serif text-2xl italic leading-snug text-[#111111] sm:text-3xl">
            ***Explore the world of journalism***
          </p>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-[#444444]">
            <p>
              Welcome to Seoulite.
            </p>
            <p>
              Seoulite is a Model United Nations (MUN) centered publications club that seeks to report on notable moments/topics discussed in the SEOMUN conference. Our club not only equips students with the necessary skills for future membership in publications like Tiger Times, but also exposes members to a deadline-driven press experience to foster core abilities and interests in journalism. Ranging from reporting, photo, and layout, our club integrates all necessary sectors of the press to provide members with an enriching experience dedicated to journalism. Meetings take place on Tuesdays and Thursdays of the first semester.
            </p>
            <p>
              Explore past issues here on our official website, as an archived collection. Ranging from SEOMUN to international conferences like BEIMUN, THIMUN, and YALEMUN, past issues can be accessed through PDF files.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="contacts" className="border-t border-zinc-100 bg-white">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">
            Connect With Us
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[#111111]">Contacts</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#555555]">
            Questions, feedback, or a pitch for the next issue? Use the form below.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {isSubmitting && (
              <p className="text-sm text-[#8a8a8a]">Sending your message...</p>
            )}
            {success && (
              <div className="border border-green-200 bg-green-50 p-4 text-green-800">
                Your message has been sent successfully!
              </div>
            )}
            {error && (
              <div className="border border-red-200 bg-red-50 p-4 text-red-800">{error}</div>
            )}
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111]"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111]"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none border border-zinc-300 bg-white px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111]"
                placeholder="Write your message here..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center bg-[#111111] px-8 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-12">
            <ButtonLink variant="secondary" href="/">
              Back to Home
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
