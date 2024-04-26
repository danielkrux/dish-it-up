import { formatDuration as formatDurationDFNS } from "https://esm.sh/date-fns@2.30.0";

const ISO_8601_DURATION_REGEX =
  /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;

function parseDuration(durationIso?: string) {
  if (!durationIso) return null;
  const matches = durationIso.match(ISO_8601_DURATION_REGEX);
  if (!matches) return null;

  return {
    years: matches[2] === undefined ? 0 : Number(matches[2]),
    months: matches[3] === undefined ? 0 : Number(matches[3]),
    weeks: matches[4] === undefined ? 0 : Number(matches[4]),
    days: matches[5] === undefined ? 0 : Number(matches[5]),
    hours: matches[6] === undefined ? 0 : Number(matches[6]),
    minutes: matches[7] === undefined ? 0 : Number(matches[7]),
    seconds: matches[8] === undefined ? 0 : Number(matches[8]),
  };
}

export function formatDuration(durationIso?: string) {
  if (!durationIso) return null;
  const parsedDuration = parseDuration(durationIso);
  if (!parsedDuration) return null;
  return formatDurationDFNS(parsedDuration);
}

export function isValidURL(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
