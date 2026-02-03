import { useMemo, useState } from "react";
import { Field, TextInput, Select } from "./Field";

export default function TeamCompositionForm({ onPrev }) {
  const [current, setCurrent] = useState({
    gender: "Mr",
    full_name: "",
    profession: "",
    email: "",
  });

  const [contributors, setContributors] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("contributors") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [ownership, setOwnership] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ownership") || "{}");
    } catch {
      return {};
    }
  });

  function updateCurrent(e) {
    const { name, value } = e.target;
    setCurrent((c) => ({ ...c, [name]: value }));
  }

  function addContributor() {
    const ok =
      current.full_name.trim() &&
      current.profession.trim() &&
      current.email.trim();
    if (!ok) return;

    const next = [...contributors, current];
    setContributors(next);
    localStorage.setItem("contributors", JSON.stringify(next));

    setCurrent({ gender: "Mr", full_name: "", profession: "", email: "" });
  }

  function removeContributor(i) {
    const next = contributors.filter((_, idx) => idx !== i);
    setContributors(next);
    localStorage.setItem("contributors", JSON.stringify(next));
  }

  function toggleOwnership(key) {
    const next = { ...ownership, [key]: !ownership?.[key] };
    setOwnership(next);
    localStorage.setItem("ownership", JSON.stringify(next));
  }

  const canFinish = useMemo(() => {
    return !!ownership?.ownershipCertified;
  }, [ownership]);

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-white p-8">
        <h2 className="text-center text-2xl font-semibold text-purple-500">
          04. COMPOSITION DE L’ÉQUIPE
        </h2>

        <div className="mt-8 rounded-2xl bg-neutral-100 p-6">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={addContributor}
              className="rounded-full bg-neutral-700 px-6 py-2 text-sm font-semibold text-white"
            >
              + Ajouter collaborateur
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Field label="Civilité" required>
              <Select
                name="gender"
                value={current.gender}
                onChange={updateCurrent}
                className="bg-white text-neutral-900"
              >
                <option value="Mr">M.</option>
                <option value="Mrs">Mme</option>
              </Select>
            </Field>

            <Field label="Prénom et nom" required>
              <TextInput
                name="full_name"
                value={current.full_name}
                onChange={updateCurrent}
                placeholder="EX: JEAN DUPOND"
                className="bg-white text-neutral-900 placeholder:text-neutral-400"
              />
            </Field>

            <Field label="Profession" required>
              <TextInput
                name="profession"
                value={current.profession}
                onChange={updateCurrent}
                className="bg-white text-neutral-900 placeholder:text-neutral-400"
              />
            </Field>

            <Field label="Email" required>
              <TextInput
                name="email"
                value={current.email}
                onChange={updateCurrent}
                placeholder="email@exemple.com"
                className="bg-white text-neutral-900 placeholder:text-neutral-400"
              />
            </Field>
          </div>

          {contributors.length ? (
            <div className="mt-6 space-y-3">
              {contributors.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-sm"
                >
                  <div className="text-neutral-800">
                    <span className="font-semibold">{c.full_name}</span> —{" "}
                    {c.profession} — {c.email}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContributor(i)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 text-sm text-neutral-500">
              Aucun contributeur ajouté pour l’instant.
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-neutral-300 p-6 text-neutral-700">
          <div className="mb-3 font-semibold">CERTIFICAT DE PROPRIÉTÉ</div>
          <p className="text-xs leading-relaxed">
            En soumettant ce dossier, vous certifiez sur l'honneur être l'auteur
            original de l'œuvre et détenir l'intégralité des droits de diffusion.
            Vous acceptez que MARS.AI utilise ces éléments pour la promotion du
            festival.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!ownership?.ownershipCertified}
                onChange={() => toggleOwnership("ownershipCertified")}
              />
              Je certifie être l’auteur original et détenir les droits.
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!ownership?.promoConsent}
                onChange={() => toggleOwnership("promoConsent")}
              />
              J’accepte l’utilisation pour la promotion du festival.
            </label>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-xl border border-purple-400 px-10 py-3 font-semibold text-purple-500"
          >
            PRÉCÉDENT
          </button>

          {/* ⚠️ Le vrai ENVOYER FINAL est dans VideoUploadForm pour l’instant.
              Ici on garde un bouton "OK" pour valider l’étape 3. */}
          <button
            type="button"
            disabled={!canFinish}
            className="rounded-xl bg-purple-600 px-10 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
