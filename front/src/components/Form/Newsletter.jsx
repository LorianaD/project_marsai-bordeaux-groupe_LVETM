function Newsletter() {
  return (
    <form className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold leading-6">
        RESTEZ
        <br />
        CONNECTÉ
      </h2>

      <div className="flex items-center gap-3">
        <input
          type="email"
          placeholder="Email Signal"
          className="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 backdrop-blur outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-fuchsia-500"
        />

        <button
          type="submit"
          className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-fuchsia-500 hover:text-white"
        >
          OK
        </button>
      </div>
    </form>
  );
}

export default Newsletter;
