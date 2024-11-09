const gregorianToJalali = (gy: number, gm: number, gd: number) => {
  const g_days_in_month = [
    31,
    28 + ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 1 : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const gy2 = gy - 1600;
  const gm2 = gm - 1;
  const gd2 = gd - 1;
  const g_day_no =
    365 * gy2 +
    Math.floor(gy2 / 4) -
    Math.floor(gy2 / 100) +
    Math.floor(gy2 / 400) +
    Math.floor((367 * gm2 - 362) / 12) +
    gd2;

  const j_year = 0;
  const j_day_no = g_day_no - 226899; // Adjust for the Julian year
  let j_np = Math.floor(j_day_no / 12053); // 12053 = 365*33 + 8
  const j_day = j_day_no % 12053;
  const j_year_adjusted = j_np * 33 + 1;

  if (j_day >= 365) {
    j_year_adjusted++;
    j_day -= 365;
  }

  let j_month = 0;
  const j_days_in_month = [
    31,
    28 +
      ((j_year_adjusted % 4 === 0 && j_year_adjusted % 100 !== 0) ||
      j_year_adjusted % 400 === 0
        ? 1
        : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  for (j_month = 0; j_month < 12; j_month++) {
    if (j_day < j_days_in_month[j_month]) {
      break;
    }
    j_day -= j_days_in_month[j_month];
  }

  return [j_year_adjusted + 1336, j_month + 1, j_day + 1]; // Adjust for the Jalali year
};

export const getCurrentJalaliDate = () => {
  const now = new Date();
  const [year, month, day] = gregorianToJalali(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(
    2,
    "0"
  )}`;
};
