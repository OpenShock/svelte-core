<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import {
    DateFormatter,
    type DateValue,
    Time,
    ZonedDateTime,
    getLocalTimeZone,
    now,
  } from '@internationalized/date';
  import { CalendarIcon } from '@lucide/svelte';
  import { buttonVariants } from '@openshock/svelte-core/components/ui/button/index.js';
  import { Calendar } from '@openshock/svelte-core/components/ui/calendar/index.js';
  import * as Popover from '@openshock/svelte-core/components/ui/popover/index.js';
  import { cn } from '@openshock/svelte-core/utils/index.js';
  import TimePicker from './time-picker.svelte';

  let contentRef = $state<HTMLElement | null>(null);
  let dateValue = $state<DateValue>();

  let {
    date = $bindable<ZonedDateTime>(),
    setDate,
    locale = 'en-US',
  }: {
    date?: ZonedDateTime;
    setDate?: (date: DateValue) => void;
    /** BCP 47 tag used to format the selected date and the calendar. */
    locale?: string;
  } = $props();

  const df = $derived(
    new DateFormatter(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
  );

  let time = $state(new Time(date?.hour ?? 0, date?.minute ?? 0));

  function onValueChange(_date: DateValue | undefined) {
    if (!date) {
      date = now(getLocalTimeZone());
      time = new Time(date.hour, date.minute, date.second); // set to current time aswell if empty
    }

    date = date?.set({
      year: _date?.year,
      month: _date?.month,
      day: _date?.day,
    });

    setDate?.(date);
  }

  function setTime(time: Time) {
    if (!date) date = now(getLocalTimeZone());

    date = date?.set({
      minute: time.minute,
      hour: time.hour,
      second: time.second,
    });

    setDate?.(date);
  }
</script>

<Popover.Root>
  <Popover.Trigger
    class={cn(
      buttonVariants({
        variant: 'outline',
        class: 'w-[280px] justify-start text-left font-normal',
      }),
      !date && 'text-muted-foreground'
    )}
  >
    <CalendarIcon />
    {date ? df.format(date.toDate()) : m.date_pick()}
  </Popover.Trigger>
  <Popover.Content bind:ref={contentRef} class="w-auto p-0">
    <div class="flex border-b p-2">
      <TimePicker bind:time setTime={(time) => time && setTime(time)} />
    </div>

    <Calendar {onValueChange} {locale} type="single" bind:value={dateValue} />
  </Popover.Content>
</Popover.Root>
