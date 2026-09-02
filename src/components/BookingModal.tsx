"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useBookingModal } from "@/lib/BookingModalContext";
import artistPhoto from "@/assets/artist.jpg";
import treatmentManicure from "@/assets/treatment-manicure.jpg";
import treatmentGelBiab from "@/assets/treatment-gel-biab.jpg";
import treatmentNagelverlenging from "@/assets/treatment-nagelverlenging.jpg";
import treatmentHandPaintedArt from "@/assets/treatment-hand-painted-art.jpg";
import treatmentPedicure from "@/assets/treatment-pedicure.jpg";
import treatmentSpaHandsFeet from "@/assets/treatment-spa-hands-feet.jpg";

const ARTISTS = [
  {
    id: "amy",
    name: "Amy Peng",
    role: "Oprichter & nagelartiest",
    photo: artistPhoto,
  },
];

const TREATMENTS = [
  { id: "manicure", name: "Manicure", src: treatmentManicure },
  { id: "gel-biab", name: "Gel & BIAB", src: treatmentGelBiab },
  { id: "nagelverlenging", name: "Nagelverlenging", src: treatmentNagelverlenging },
  { id: "hand-painted-art", name: "Hand-Painted Art", src: treatmentHandPaintedArt },
  { id: "pedicure", name: "Pedicure", src: treatmentPedicure },
  { id: "spa-hands-feet", name: "Spa Hands & Feet", src: treatmentSpaHandsFeet },
];

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 11; h <= 16; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

const STEPS = ["Artiest", "Behandeling", "Datum & tijd", "Jouw gegevens"];

function isWeekend(dateStr: string) {
  if (!dateStr) return false;
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  return day === 0 || day === 6;
}

function todayIso() {
  const d = new Date();
  const tz = d.getTimezoneOffset();
  const local = new Date(d.getTime() - tz * 60000);
  return local.toISOString().slice(0, 10);
}

function formatDateNl(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const [step, setStep] = useState(0);
  const [artistId, setArtistId] = useState(ARTISTS[0].id);
  const [treatmentId, setTreatmentId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const artist = ARTISTS.find((a) => a.id === artistId) ?? ARTISTS[0];
  const treatment = TREATMENTS.find((t) => t.id === treatmentId) ?? null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (isOpen) panelRef.current?.scrollTo({ top: 0 });
  }, [step, isOpen]);

  if (!isOpen) return null;

  const dateIsInvalid = date !== "" && isWeekend(date);

  const canNext =
    (step === 0 && !!artistId) ||
    (step === 1 && !!treatmentId) ||
    (step === 2 && !!date && !!time && !dateIsInvalid) ||
    step === 3;

  function handleClose() {
    closeModal();
    window.setTimeout(() => {
      setStep(0);
      setSubmitted(false);
    }, 300);
  }

  function handleSubmit() {
    const subject = `Boekingsaanvraag: ${treatment?.name ?? ""} bij ${artist.name}`;
    const bodyLines = [
      `Nagelartiest: ${artist.name}`,
      `Behandeling: ${treatment?.name ?? ""}`,
      `Datum: ${formatDateNl(date)}`,
      `Tijd: ${time}`,
      "",
      `Naam: ${name}`,
      `E-mailadres: ${email}`,
      phone ? `Telefoonnummer: ${phone}` : "",
      note ? `Opmerking: ${note}` : "",
    ].filter(Boolean);
    const mailto = `mailto:hallo@nagelstudiopoppy.nl?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Boek een afspraak"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto border border-line bg-parchment shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-parchment px-6 py-5 sm:px-8">
          <div>
            <div className="eyebrow mb-1">Nagelstudio Poppy</div>
            {!submitted && (
              <h2 className="font-serif text-xl sm:text-2xl">
                {STEPS[step]}
              </h2>
            )}
          </div>
          <button
            onClick={handleClose}
            aria-label="Sluiten"
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center border border-ink/20 text-lg text-ink hover:border-poppy hover:text-poppy"
          >
            &times;
          </button>
        </div>

        {!submitted && (
          <div className="flex gap-1.5 px-6 pt-5 sm:px-8">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 ${i <= step ? "bg-poppy" : "bg-ink/10"}`}
              />
            ))}
          </div>
        )}

        <div className="flex-1 px-6 py-7 sm:px-8">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="eyebrow mb-3 text-poppy">Bijna klaar</div>
              <h3 className="font-serif text-2xl">Je aanvraag staat klaar om te versturen.</h3>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink">
                We hebben je mailprogramma geopend met alle details al
                ingevuld, gericht aan hallo@nagelstudiopoppy.nl. Verstuur het
                bericht om je aanvraag compleet te maken &mdash; we
                bevestigen daarna zo snel mogelijk je afspraak.
              </p>
              <div className="mx-auto mt-6 max-w-sm border border-line bg-stone p-5 text-left text-sm text-ink">
                <p><strong>{treatment?.name}</strong> bij {artist.name}</p>
                <p className="mt-1 text-ink-soft">{formatDateNl(date)} om {time}</p>
              </div>
              <button onClick={handleClose} className="btn-solid mt-8 w-full">
                Sluiten
              </button>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div>
                  <p className="mb-6 text-sm leading-relaxed text-ink">
                    Bij Poppy werk je altijd met dezelfde vaste nagelartiest.
                  </p>
                  <div className="flex flex-col gap-3">
                    {ARTISTS.map((a) => {
                      const selected = a.id === artistId;
                      return (
                        <button
                          key={a.id}
                          onClick={() => setArtistId(a.id)}
                          className={`focus-ring flex items-center gap-4 border p-3 text-left transition-colors ${
                            selected
                              ? "border-poppy bg-poppy/5"
                              : "border-line hover:border-ink/30"
                          }`}
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden">
                            <img
                              src={a.photo}
                              alt={a.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-serif text-lg leading-tight">{a.name}</div>
                            <div className="mt-0.5 text-xs text-ink-soft">{a.role}</div>
                          </div>
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] ${
                              selected
                                ? "border-poppy bg-poppy text-parchment"
                                : "border-ink/20 text-transparent"
                            }`}
                            aria-hidden
                          >
                            &#10003;
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {TREATMENTS.map((t) => {
                    const selected = t.id === treatmentId;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTreatmentId(t.id)}
                        className={`focus-ring group relative aspect-[4/5] overflow-hidden border ${
                          selected ? "border-poppy" : "border-transparent"
                        }`}
                      >
                        <img
                          src={t.src}
                          alt={t.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                        <span className="absolute bottom-2 left-2 right-2 text-[0.62rem] uppercase leading-snug tracking-[0.08em] text-parchment">
                          {t.name}
                        </span>
                        {selected && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-poppy text-[0.65rem] text-parchment">
                            &#10003;
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
                    Datum
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={todayIso()}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime(null);
                    }}
                    className="focus-ring w-full border border-line bg-parchment px-4 py-3 text-sm text-ink"
                  />
                  {dateIsInvalid && (
                    <p className="mt-2 text-xs text-poppy">
                      We plannen alleen maandag t/m vrijdag &mdash; kies een
                      andere datum.
                    </p>
                  )}

                  <label className="mb-2 mt-6 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
                    Tijd
                  </label>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        disabled={!date || dateIsInvalid}
                        onClick={() => setTime(slot)}
                        className={`focus-ring border px-2 py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                          time === slot
                            ? "border-poppy bg-poppy text-parchment"
                            : "border-line text-ink hover:border-ink/30"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-ink-soft">
                    Maandag t/m vrijdag, 11:00 &ndash; 17:00.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-6 border border-line bg-stone p-4 text-sm text-ink">
                    <p><strong>{treatment?.name}</strong> bij {artist.name}</p>
                    <p className="mt-1 text-ink-soft">{formatDateNl(date)} om {time}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
                        Naam*
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="focus-ring w-full border border-line bg-parchment px-4 py-3 text-sm text-ink"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
                        E-mailadres*
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="focus-ring w-full border border-line bg-parchment px-4 py-3 text-sm text-ink"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
                        Telefoonnummer
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="focus-ring w-full border border-line bg-parchment px-4 py-3 text-sm text-ink"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
                        Opmerking (optioneel)
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        className="focus-ring w-full border border-line bg-parchment px-4 py-3 text-sm text-ink"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!submitted && (
          <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-line bg-parchment px-6 py-5 sm:px-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`btn-line ${step === 0 ? "invisible" : ""}`}
            >
              Vorige
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canNext && setStep((s) => s + 1)}
                disabled={!canNext}
                className="btn-solid disabled:cursor-not-allowed disabled:opacity-40"
              >
                Volgende
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!name || !email}
                className="btn-solid disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verstuur aanvraag
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
