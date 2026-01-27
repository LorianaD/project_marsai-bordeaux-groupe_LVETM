function Newsletter() {
  return (
    <form className="w-full">
      <h2 className="text-lg font-semibold leading-6 text-white">
        RESTEZ
        <br />
        CONNECTÉ
      </h2>

      <div className="mt-6 flex w-full min-w-0 items-center gap-3">
        <input
          type="email"
          placeholder="Email Signal"
          className="h-12 min-w-0 flex-1 rounded-full bg-white/10 px-5 text-sm text-white placeholder-white/45 outline-none ring-1 ring-white/10 backdrop-blur transition focus:ring-2 focus:ring-fuchsia-500"
        />

        <button
          type="submit"
          className="h-12 shrink-0 rounded-full bg-white px-6 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-fuchsia-500 hover:text-white"
        >
          OK
        </button>
      </div>
    </form>
  );
}

export default Newsletter;
