import { createSubscriber } from 'svelte/reactivity';

/**
 * A clock that re-reads itself on a timer, for relative labels ("2 hours ago",
 * "online for 3 hours") that must stay current without refetching the data
 * behind them.
 *
 * Built on `createSubscriber`, so the interval is owned by whatever reads
 * `current`: it starts when the first effect or `$derived` reads the getter and
 * is cleared once they are all destroyed. Nothing on screen reading the clock
 * means no timer running, and there is no teardown for callers to remember.
 *
 * Because it holds no runes it can be created anywhere, module scope included —
 * which is what lets table column definitions stay static while their cells
 * still tick.
 *
 * @example
 *   const clock = createNowTicker();
 *
 *   {#each sessions as session (session.id)}
 *     {formatElapsed(durationBetween(clock.current, session.created))}
 *   {/each}
 */
export function createNowTicker(intervalMs: number = 5000) {
  let current = Temporal.Now.instant();
  let interval: ReturnType<typeof setInterval> | null = null;

  const subscribe = createSubscriber((update) => {
    // Resync on every (re)subscribe: a ticker at module scope outlives the
    // components reading it, so `current` is otherwise as old as the last time
    // one was mounted, and the first frame would render against it.
    current = Temporal.Now.instant();

    const handle = setInterval(() => {
      current = Temporal.Now.instant();
      update();
    }, intervalMs);
    interval = handle;

    return () => {
      clearInterval(handle);
      interval = null;
    };
  });

  return {
    get current() {
      // Registers the read so the interval runs for as long as — and only as
      // long as — something reactive is displaying the value.
      subscribe();
      // With no interval running nothing is keeping `current` fresh (an
      // untracked read, or SSR), so read the clock directly instead.
      return interval === null ? Temporal.Now.instant() : current;
    },
  };
}

export type NowTicker = ReturnType<typeof createNowTicker>;
