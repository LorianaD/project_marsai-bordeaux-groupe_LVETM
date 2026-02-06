import { useEffect, useMemo, useState } from "react";
import { Field, TextInput, Select } from "./Field";

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

  // Chargement de la liste des pays
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name",
        );
        const data = await res.json();

        const list = Array.isArray(data)
          ? data
              .map((c) => c?.name?.common)
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b, "fr"))
          : [];

        if (alive) setCountries(list);
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

          <Field label="Mobile" required>
            <TextInput
              name="mobile_number"
              value={form.mobile_number}
              onChange={update}
              placeholder="06..."
              type="tel"
              required
              className="bg-neutral-100 text-neutral-800 placeholder:text-neutral-400"
            />
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
