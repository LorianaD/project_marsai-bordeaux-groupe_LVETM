import { useMemo, useState } from "react";
import { Field, TextInput, Select } from "./Field";

export default function DirectorForm({ onNext }) {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    gender: "Mr",
    email: "",
    production_role: "Réalisateur",
  });

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
      form.production_role.trim()
    );
  }, [form]);

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    // ✅ stocker pour préremplir l’étape 2
    localStorage.setItem(
      "directorProfile",
      JSON.stringify({
        firstName: form.name,
        lastName: form.last_name,
        email: form.email,
        gender: form.gender,
        production_role: form.production_role,
      })
    );

    // ✅ passer à l’étape suivante
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
            <TextInput name="name" value={form.name} onChange={update} placeholder="PRÉNOM" />
          </Field>

          <Field label="Nom" required>
            <TextInput name="last_name" value={form.last_name} onChange={update} placeholder="NOM" />
          </Field>

          <Field label="Civilité" required>
            <Select name="gender" value={form.gender} onChange={update}>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </Select>
          </Field>

          <Field label="Adresse e-mail" required>
            <TextInput name="email" value={form.email} onChange={update} placeholder="EMAIL@EXEMPLE.COM" type="email" />
          </Field>

          <Field label="Rôle / fonction" required>
            <TextInput name="production_role" value={form.production_role} onChange={update} placeholder="Réalisateur" />
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
