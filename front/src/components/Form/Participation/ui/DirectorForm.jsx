import { useEffect, useMemo, useState } from "react"; // ✅ AJOUT: useEffect pour charger les pays au chargement
import { Field, TextInput, Select } from "./Field";

export default function DirectorForm({ onNext }) {
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

  // ✅ AJOUT: on stocke la liste des pays récupérée depuis une API
  const [countries, setCountries] = useState([]);
  // ✅ AJOUT: petit état pour dire "ça charge" et gérer l’erreur
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  // ✅ AJOUT: au chargement du composant, je vais chercher la liste des pays sur internet
  useEffect(() => {
    let alive = true; // ✅ AJOUT: petit “truc de sécurité” si on quitte la page pendant le fetch

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        // ✅ AJOUT: appel API publique qui renvoie tous les pays
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name",
        );
        const data = await res.json();

        // ✅ AJOUT: je transforme la réponse en simple liste de noms triés
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
      form.discovery_source.trim()
    );
  }, [form]);

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
            />
          </Field>

          <Field label="Nom" required>
            <TextInput
              name="last_name"
              value={form.last_name}
              onChange={update}
              placeholder="NOM"
            />
          </Field>

          <Field label="Civilité" required>
            <Select name="gender" value={form.gender} onChange={update}>
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
            />
          </Field>

          <Field label="Rôle / fonction" required>
            <TextInput
              name="production_role"
              value={form.production_role}
              onChange={update}
              placeholder="Réalisateur"
            />
          </Field>

          <Field label="Date de naissance" required>
            <TextInput
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={update}
            />
          </Field>

          {/* ✅ AJOUT: ici je remplace le champ texte par une liste déroulante alimentée par l’API */}
          <Field label="Pays réalisateur" required>
            <Select
              name="director_country"
              value={form.director_country}
              onChange={update}
              disabled={countriesLoading || !!countriesErr} // ✅ AJOUT: si ça charge/bug, on bloque le select
            >
              <option value="">
                {/* ✅ AJOUT: petit texte selon l’état */}
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

            {/* ✅ AJOUT: si l’API a planté, j’affiche un mini message */}
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
            />
          </Field>

          <Field label="Adresse" required>
            <TextInput
              name="address"
              value={form.address}
              onChange={update}
              placeholder="Adresse complète"
            />
          </Field>

          <Field label="Mobile (optionnel)">
            <TextInput
              name="mobile_number"
              value={form.mobile_number}
              onChange={update}
              placeholder="06..."
            />
          </Field>

          <Field label="Fixe (optionnel)">
            <TextInput
              name="home_number"
              value={form.home_number}
              onChange={update}
              placeholder="01..."
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
