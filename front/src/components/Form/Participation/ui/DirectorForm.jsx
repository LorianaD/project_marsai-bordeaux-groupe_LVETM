import { useEffect, useMemo, useState } from "react";
import { Field, TextInput, Select } from "./Field";

/* URL drapeau (fiable sur tous OS/navigateurs) */
function flagUrl(code, size = 24) {
  const c = String(code || "").toLowerCase();
  return `https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${c}.png`;
}

/* restcountries: idd = { root:"+33", suffixes:["1"] } => +331 */
function buildDialCode(idd) {
  if (!idd?.root) return "";
  const suffix =
    Array.isArray(idd?.suffixes) && idd.suffixes.length ? idd.suffixes[0] : "";
  return `${idd.root}${suffix}`;
}

function CountryPickerModal({ open, onClose, countries, onPick }) {
  const [q, setQ] = useState("");
  

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return countries;
    return countries.filter((c) => {
      return (
        c.name.toLowerCase().includes(s) ||
        c.dial.toLowerCase().includes(s) ||
        c.code.toLowerCase().includes(s)
      );
    });
  }, [countries, q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Fermer"
      />

      <div className="absolute left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900">
            Choisir un pays
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-xl bg-neutral-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
          >
            Fermer
          </button>
        </div>

        <div className="p-5">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher : France, +33, US..."
            className="w-full rounded-2xl bg-neutral-100 px-5 py-3 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-blue-500/30"
          />

          <div className="mt-4 max-h-[55vh] overflow-auto rounded-2xl ring-1 ring-black/5">
            {filtered.map((c) => (
              <button
                key={`${c.code}-${c.dial}`}
                type="button"
                onClick={() => onPick(c)}
                className="flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3 text-left hover:bg-neutral-50"
              >
                <img
                  src={flagUrl(c.code, 24)}
                  alt=""
                  className="h-4 w-6 rounded-[2px] object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <span className="flex-1 text-sm font-semibold text-neutral-900">
                  {c.name}
                </span>
                <span className="text-sm font-bold text-neutral-700">
                  {c.dial}
                </span>
              </button>
            ))}
            {!filtered.length ? (
              <div className="px-4 py-6 text-center text-sm text-neutral-500">
                Aucun résultat.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DirectorForm({ onNext }) {
  // Etat du formulaire réalisateur
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    gender: "Mr",
    email: "",
    production_role: "Réalisateur",
    birthday: "",
    director_country: "",
    address: "",
    discovery_source: "",
    mobile_number: "",
    home_number: "",
  });

  // Chargement de la liste des pays (select) + pays téléphone (code + dial)
  const [countries, setCountries] = useState([]);
  const [phoneCountries, setPhoneCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  // Téléphone : modal + pays sélectionné + numéro local
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState({
    code: "FR",
    name: "France",
    dial: "+33",
  });
  const [phoneLocal, setPhoneLocal] = useState("");

  // ✅ Chargement des pays
  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        // ✅ On récupère aussi idd + cca2 pour le téléphone
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd",
        );
        const data = await res.json();

        const list = Array.isArray(data) ? data : [];

        const namesOnly = list
          .map((c) => c?.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b, "fr"));

        const phoneList = list
          .map((c) => {
            const code = c?.cca2;
            const name = c?.name?.common;
            const dial = buildDialCode(c?.idd);
            if (!code || !name || !dial) return null;
            return { code, name, dial };
          })
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name, "fr"));

        if (!alive) return;

        setCountries(namesOnly);
        setPhoneCountries(phoneList);

        const fr = phoneList.find((x) => x.code === "FR");
        if (fr) setPhoneCountry(fr);
      } catch {
        if (alive) setCountriesErr("Impossible de charger la liste des pays.");
      } finally {
        if (alive) setCountriesLoading(false);
      }
    }

    loadCountries();
    return () => {
      alive = false;
    };
  }, []);

  // Synchronise form.mobile_number avec dial + local (utilisé par ton submit)
  useEffect(() => {
    const full = `${phoneCountry.dial} ${phoneLocal}`.trim();
    setForm((f) => ({ ...f, mobile_number: full }));
  }, [phoneCountry, phoneLocal]);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Vérifie si les champs requis sont remplis
  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.last_name.trim() &&
      form.email.trim() &&
      (form.gender === "Mr" || form.gender === "Mrs") &&
      form.production_role.trim() &&
      form.birthday.trim() &&
      form.director_country.trim() &&
      form.address.trim() &&
      form.discovery_source.trim() &&
      form.mobile_number.trim()
    );
  }, [form]);

  // Sauvegarde du profil en localStorage puis passage à l'étape suivante
  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    localStorage.setItem(
      "directorProfile",
      JSON.stringify({
        firstName: form.name,
        lastName: form.last_name,
        email: form.email,
        gender: form.gender,
        production_role: form.production_role,
        birthday: form.birthday,
        director_country: form.director_country,
        address: form.address,
        discovery_source: form.discovery_source,
        mobile_number: form.mobile_number,
        home_number: form.home_number,
      }),
    );

    onNext?.();
  }

  return (
    <form onSubmit={submit} className="w-full">
      <CountryPickerModal
        open={phoneOpen}
        onClose={() => setPhoneOpen(false)}
        countries={phoneCountries}
        onPick={(c) => {
          setPhoneCountry(c);
          setPhoneOpen(false);
        }}
      />

      <div className="rounded-2xl border border-neutral-200 bg-white p-8">
        <h2 className="text-center text-2xl font-semibold text-blue-600">
          MON PROFIL RÉALISATEUR
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Prénom" required>
            <TextInput
              name="name"
              value={form.name}
              onChange={update}
              placeholder="PRÉNOM"
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
          </Field>

          <Field label="Nom" required>
            <TextInput
              name="last_name"
              value={form.last_name}
              onChange={update}
              placeholder="NOM"
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
          </Field>

          <Field label="Civilité" required>
            <Select
              name="gender"
              value={form.gender}
              onChange={update}
              className="bg-neutral-100 text-neutral-800"
            >
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </Select>
          </Field>

          <Field label="Adresse e-mail" required>
            <TextInput
              name="email"
              value={form.email}
              onChange={update}
              placeholder="EMAIL@EXEMPLE.COM"
              type="email"
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
          </Field>

          <Field label="Date de naissance" required>
            <TextInput
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={update}
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
          </Field>

          <Field label="Pays réalisateur" required>
            <Select
              name="director_country"
              value={form.director_country}
              onChange={update}
              disabled={countriesLoading || !!countriesErr}
              className="bg-neutral-100 text-neutral-800"
            >
              <option value="">
                {countriesLoading
                  ? "Chargement des pays…"
                  : countriesErr
                    ? "Erreur de chargement"
                    : "Choisir un pays"}
              </option>

              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            {countriesErr ? (
              <div className="mt-2 text-xs text-red-500">{countriesErr}</div>
            ) : null}
          </Field>

          <Field label="Découverte" required>
            <TextInput
              name="discovery_source"
              value={form.discovery_source}
              onChange={update}
              placeholder="Instagram / Ami / Google..."
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
          </Field>

          <Field label="Adresse" required>
            <TextInput
              name="address"
              value={form.address}
              onChange={update}
              placeholder="Adresse complète"
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
          </Field>

          {/* Téléphone (desktop + mobile) : drapeau + dial + recherche */}
          <Field label="Mobile" required>
            <div className="flex w-full items-center gap-3 rounded-2xl bg-neutral-100 px-5 py-4 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-blue-500/30">
              <button
                type="button"
                onClick={() => setPhoneOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 text-sm font-semibold text-neutral-800 ring-1 ring-black/5 hover:bg-white"
                aria-label="Choisir un pays"
              >
                <img
                  src={flagUrl(phoneCountry.code, 24)}
                  alt=""
                  className="h-4 w-6 rounded-[2px] object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <span className="font-bold">{phoneCountry.dial}</span>
                <span className="text-neutral-500">▾</span>
              </button>

              <input
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value)}
                placeholder="Votre numéro"
                inputMode="tel"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="mt-2 text-[11px] text-neutral-500">
              Exemple : {phoneCountry.dial} 6 12 34 56 78
            </div>
          </Field>

          <Field label="Fixe (optionnel)">
            <TextInput
              name="home_number"
              value={form.home_number}
              onChange={update}
              placeholder="01..."
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
          </Field>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-3 rounded-xl bg-[#7C3AED] px-10 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            NEXT <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </form>
  );
}
